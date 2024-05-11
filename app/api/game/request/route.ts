import { NextRequest } from "next/server";
import prisma from "@/db/client";
import { fetchJwt } from "@/services/utils/fetchJwt";


// Sending req to play match
export async function POST(req: NextRequest) {
  try {
    // const session = await getServerSession(NEXT_AUTH);
    // const token = session?.accessToken;
    const { token, oppTeamId, overs, umpireId } = await req.json();
    const userId = await fetchJwt(token);

    const userTeam = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        ownedTeams: true,
      },
    });

    if (!userTeam) {
      return Response.json(
        {
          success: false,
          message: "You do not own a team",
        },
        {
          status: 400,
        }
      );
    }

    const oppTeam = await prisma.team.findFirst({
      where: {
        id: Number(oppTeamId),
      },
    });

    if (!oppTeam) {
      return Response.json({
        success: false,
        message: "Team doesn't exist",
      });
    }

    const existingGames = await prisma.game.findFirst({
      include: {
        teams: true,
      },
    });

    const ownerTeamExists = existingGames?.teams.some(
      (team) => team.id === userTeam.ownedTeams?.id
    );
    const oppTeamExists = existingGames?.teams.some(
      (team) => team.id === oppTeamId
    );

    if (
      existingGames &&
      userTeam.ownedTeams &&
      (ownerTeamExists || oppTeamExists)
    ) {
      return Response.json(
        {
          success: false,
          message: "One of the Teams is already in a match",
        },
        {
          status: 400,
        }
      );
    }

    let result;
    await prisma.$transaction(async (tx) => {
      const gameCreated = await tx.game.create({
        data: {
          overs: Number(overs),
          umpire:umpireId
        },
      });
      const ownerTeam = await tx.team.update({
        where: {
          ownerId: userId,
        },
        data: {
          matchId: {
            connect: {
              id: gameCreated.id,
            },
          },
        },
      });
      const oppTeam = await tx.team.update({
        where: {
          id: Number(oppTeamId),
        },
        data: {
          matchId: {
            connect: {
              id: gameCreated.id,
            },
          },
        },
      });
      result = { gameCreated, ownerTeam, oppTeam };
    });
    console.log(result);

    
    return Response.json({
      success: true,
      message: "Request sent",
    });

  } catch (error) {
    console.log(error);

    return Response.json({
      success: false,
      message: "Request can not get sent",
    });
  }
}