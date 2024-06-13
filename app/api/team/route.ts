import { NextRequest } from "next/server";
import prisma from "@/db/client";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import { fetchJwt } from "@/services/utils/fetchJwt";
import { redirect } from "next/navigation";

// Get teams
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(NEXT_AUTH);

    if (!session?.user) {
      return redirect("/login");
    }

    const userId = session.id;

    const teams = await prisma.profile.findFirst({
      where: {
        userId: userId,
      },
      include: {
        team: {
          include: {
            players: {
              include:{
                user:true
              }
            },
            Game: true,
          },
        },
      },
    });

    const ownedTeams = await prisma.team.findFirst({
      where: {
        ownerId: userId,
      },
      include: {
        players: {
          include:{
            user:true
          }
        },
        Game: true,
      },
    });

    if (ownedTeams !== null) {
      return Response.json({
        success: true,
        message: "Fetched Teams",
        data:ownedTeams,
        type:"Owner"
      });
    }

    return Response.json({
      success: true,
      message: "Fetched Teams",
      data:teams?.team,
      type:"Player"
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Can't fetch Team Details",
    });
  }
}

// Create Team
export async function POST(req: NextRequest) {
  try {
    const { teamName } = await req.json();

    const session = await getServerSession(NEXT_AUTH);

    if (!session?.user) {
      return redirect("/login");
    }

    const userId = session.id;


    console.log("User Id---------->", userId);

    const profile = await prisma.profile.findFirst({
      where: {
        userId: userId,
      },
    });
    console.log("Profile---------->", profile);

    const existingTeam = await prisma.profile.findFirst({
      where: {
        userId: userId,
      },
      include: {
        team: true,
      },
    });

    if (existingTeam?.team !== null) {
      return Response.json(
        {
          success: false,
          message: "You are already in a team",
        },
        {
          status: 400,
        }
      );
    }

    const teamCreated = await prisma.team.create({
      data: {
        name: teamName,
        ownerId: userId,
        players: {
          connect: {
            id: profile?.id,
          },
        },
      },
    });
    console.log("Team------------>", teamCreated);

    return Response.json(
      {
        success: true,
        message: "Team has been created",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        message: "Team can't be created",
      },
      {
        status: 500,
      }
    );
  }
}

// Delete Team
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(NEXT_AUTH);

    if (!session?.user) {
      return redirect("/login");
    }

    const userId = session.id;

    const deletedTeam = await prisma.team.delete({
      where: {
        ownerId: userId,
      },
    });

    console.log(deletedTeam);

    return Response.json({
      success: true,
      message: "Team Deleted",
    });
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Team can't get deleted",
      },
      {
        status: 500,
      }
    );
  }
}

// Appoint a Captain
export async function PATCH(req: NextRequest) {
  try {
    // const session = await getServerSession(NEXT_AUTH);
    // const token = session?.accessToken;
    const { token, playerId } = await req.json();
    const userId = await fetchJwt(token);

    const player = await prisma.profile.findFirst({
      where: {
        id: Number(playerId),
      },
    });

    if (!player) {
      return Response.json(
        {
          success: false,
          message: "No player found",
        },
        {
          status: 400,
        }
      );
    }

    const owner = await prisma.user.findFirst({
      where: {
        id: String(userId),
      },
      include: {
        ownedTeams: {
          include: {
            players: true,
          },
        },
      },
    });

    const exCaptainProfile = await prisma.user.findFirst({
      where: {
        id: String(userId),
      },
      include: {
        ownedTeams: {
          include: {
            players: {
              where: {
                captain: true,
              },
            },
          },
        },
      },
    });

    const players = owner?.ownedTeams?.players;
    const newCaptain = players?.find(
      (player) => player.id === Number(playerId)
    );
    const exCaptain = exCaptainProfile?.ownedTeams?.players[0];

    if (!newCaptain) {
      return Response.json(
        {
          success: false,
          message: "Player not in your team",
        },
        {
          status: 400,
        }
      );
    }

    if (!exCaptain) {
      const newCaptainProfile = await prisma.profile.update({
        where: {
          id: newCaptain.id,
        },
        data: {
          captain: true,
        },
      });
      console.log("New Captain---->", newCaptainProfile);
    } else {
      const [remPrevCaptain, newUpdatedCaptain] = await prisma.$transaction([
        prisma.profile.update({
          where: {
            id: exCaptain?.id,
          },
          data: {
            captain: false,
          },
        }),
        prisma.profile.update({
          where: {
            id: newCaptain.id,
          },
          data: {
            captain: true,
          },
        }),
      ]);
      console.log("Old Captain-------->", remPrevCaptain);
      console.log("New Captain-------->", newUpdatedCaptain);
    }

    return Response.json({
      success: true,
      message: "Captain appointed",
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        message: "Captain cannot get appointed",
      },
      {
        status: 500,
      }
    );
  }
}
