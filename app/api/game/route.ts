import { NEXT_AUTH } from "@/lib/auth";
import prisma from "@/db/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { generateRandomCode } from "@/services/utils/randomCode";

// Host a Game
export async function POST(req: NextRequest) {
  try {
    const { overs } = await req.json();
    const session = await getServerSession(NEXT_AUTH);

    if (overs <= 0 || overs > 50) {
      return Response.json(
        {
          success: false,
          message: "Overs should be greater than 0 and less than 50.",
        },
        {
          status: 400,
        }
      );
    }

    if (!session?.user) {
      return redirect("/login");
    }

    const userId: string = session.id;
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        ownedTeams: {
          include: {
            Game: true,
          },
        },
      },
    });

    const ownedTeam = user?.ownedTeams;

    if (!ownedTeam) {
      return Response.json(
        {
          success: false,
          message: "You dont't own a team.",
        },
        {
          status: 400,
        }
      );
    }

    if (ownedTeam?.Game !== null) {
      return Response.json(
        {
          success: false,
          message: "You have already hosted a game.",
        },
        {
          status: 400,
        }
      );
    }
    const gameCode = generateRandomCode(6);

    const gameCreated = await prisma.game.create({
      data: {
        teams: {
          connect: [{ id: ownedTeam.id }],
        },
        gameCode: gameCode,
        overs: overs,
      },
    });

    return Response.json(
      {
        success: true,
        message: "Match is hosted.",
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

// Enter a Game
export async function PATCH(req: NextRequest) {
  try {
    const { gameCode } = await req.json();

    const session = await getServerSession(NEXT_AUTH);

    if (!session?.user) {
      return redirect("/login");
    }

    const userId: string = session.id;
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        ownedTeams: {
          include: {
            Game: true,
          },
        },
      },
    });

    const ownedTeam = user?.ownedTeams;

    if (!ownedTeam) {
      return Response.json(
        {
          success: false,
          message: "You dont't own a team.",
        },
        {
          status: 400,
        }
      );
    }

    if (ownedTeam?.Game !== null) {
      return Response.json(
        {
          success: false,
          message: "You have already entered/hosted a game.",
        },
        {
          status: 400,
        }
      );
    }

    const game = await prisma.game.findFirst({
      where: {
        gameCode: gameCode,
      },
      include: {
        teams: true,
      },
    });

    if (!game) {
      return Response.json(
        {
          success: false,
          message: "Invalid Game Code",
        },
        {
          status: 400,
        }
      );
    }
    const gameId = game.id;
    const teamsLength = game.teams.length;

    if (teamsLength > 1) {
      return Response.json(
        {
          success: false,
          message: "Game already started.",
        },
        {
          status: 400,
        }
      );
    }

    const gameUpdated = await prisma.game.update({
      where: {
        id: gameId,
      },
      data: {
        teams: {
          connect: { id: ownedTeam?.id },
        },
      },
    });

    return Response.json(
      {
        success: true,
        message: "Entered the match.",
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

// Get Hosted/Entered Games
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
            Game:true
          }
        }
      },
    });
    

    return Response.json({
      success:true,
      message:"Fetched Game Details",
      data:profile?.team?.Game
    })

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

// Delete Match 
export async function DELETE(req: NextRequest) {
  try{
    const {gameId} = await req.json();

    if(!gameId){
      return Response.json({
        success:false,
        message: "Invalid GameId"
      },{
        status:400
      })
    }

    const deletedGame = await prisma.game.delete({
      where:{
        id:gameId
      }
    })

    return Response.json({
      success:true,
      message:"Game successfully deleted."
    },{
      status:200
    })

  }
  catch(error){
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