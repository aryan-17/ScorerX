import { NEXT_AUTH } from "@/lib/auth";
import prisma from "@/db/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(NEXT_AUTH);

    if (!session?.user) {
      return redirect("/login");
    }

    const userId = session.id;

    const profile = await prisma.profile.findFirst({
      where: {
        userId: userId,
      },
      include: {
        team: {
          include:{
            Game:{
              where:{
                started:true
              },
              include:{
                teams:{
                  include:{
                    players:{
                      include:{
                        user:true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
    });
    

    return Response.json({
      success:true,
      message:"Fetched Live Match Details",
      data:profile?.team
    })

  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Error in fetching match details.",
      },
      {
        status: 400,
      }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { firstName, lastName, gameCode } = await req.json();
    const session = await getServerSession(NEXT_AUTH);

    if (!session?.user) {
      return redirect("/login");
    }

    const userId = session?.id;

    const owner = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        ownedTeams: true,
      },
    });

    const game = await prisma.game.findFirst({
      where: {
        gameCode: gameCode,
      },
      include: {
        teams: true,
      },
    });

    const teams = game?.teams;

    console.log(owner?.ownedTeams);
    console.log(teams);

    if(!owner || !owner.ownedTeams){
      return Response.json(
        {
          success: false,
          message: "You don't own a team.",
        },
        {
          status: 400,
        }
      );
    }

    if (owner && owner.ownedTeams && teams) {
      const checkForTeam = (teamName: string) => {
        return teams.find((team) => team.name === teamName);
      };

      if (!checkForTeam(owner.ownedTeams.name)) {
        return Response.json(
          {
            success: false,
            message: "You don't own a team in this game",
          },
          {
            status: 400,
          }
        );
      }
    }

    const umpire = await prisma.user.findFirst({
      where: {
        FirstName: firstName,
        LastName: lastName,
      },
      include: {
        profile: {
          include: {
            team: true,
          },
        },
      },
    });

    if (!umpire?.profile) {
      return Response.json(
        {
          success: false,
          message: "User not found.",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.game.update({
      where: {
        id: game?.id,
      },
      data: {
        umpireId: umpire.profile.id,
      },
    });

    return Response.json(
      {
        success: true,
        message: "Umpire Appointed",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Error in hosting match.",
      },
      {
        status: 400,
      }
    );
  }
}
