import { NextRequest } from "next/server";
import prisma from "@/db/client";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import { fetchJwt } from "@/services/utils/fetchJwt";

// Get All teams
export async function GET(req: NextRequest) {
  try {
    // const session = await getServerSession(NEXT_AUTH);
    // const token = session?.accessToken;

    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return Response.json(
        {
          success: false,
          message: "Logged Out",
        },
        {
          status: 401,
        }
      );
    }

    const userId = await fetchJwt(token);

    const teams = await prisma.profile.findFirst({
      where: {
        userId: userId,
      },
      include: {
        team: true,
      },
    });

    const ownedTeams = await prisma.team.findFirst({
      where: {
        ownerId: userId,
      },
      include:{
        players:true
      }
    });

    console.log("Teams in which user is a player---->", teams?.team);
    console.log("Teams in which user is a owner---->", ownedTeams);

    return Response.json({
      success: true,
      message: "Fetched Teams",
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
    // const session = await getServerSession(NEXT_AUTH);
    // const token = session?.accessToken;
    const { teamName, token } = await req.json();

    if (!token) {
      return Response.json({
        success: false,
        message: "Logged Out",
      });
    }

    const userId = await fetchJwt(token);
    console.log("User Id---------->", userId);

    const profile = await prisma.profile.findFirst({
      where: {
        userId: userId,
      },
    });
    console.log("Profile---------->", profile);

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
        status: 200,
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
    // const session = await getServerSession(NEXT_AUTH);
    // const token = session?.accessToken;
    const { token } = await req.json();

    if (!token) {
      return Response.json(
        {
          success: false,
          message: "Logged Out",
        },
        {
          status: 401,
        }
      );
    }

    const userId = await fetchJwt(token);

    const deletedTeam = await prisma.team.delete({
        where:{
            ownerId:userId
        }
    })

    console.log(deletedTeam);

    return Response.json({
        success:true,
        message:"Team Deleted"
    })

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
