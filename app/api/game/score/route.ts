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
    });

    const scoreCard = await prisma.game.findFirst({
      where: {
        umpireId: profile?.id,
      },
      select: {
        scoreCard: true,
      },
    });

    return Response.json({
      success: true,
      message: "Fetched Live Score",
      data: scoreCard,
    });
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Error in fetching score.",
      },
      {
        status: 400,
      }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(NEXT_AUTH);
    const scoreJson = await req.json();

    if (!session?.user) {
      return redirect("/login");
    }

    const userId = session.id;
    const profile = await prisma.profile.findFirst({
      where: {
        userId: userId,
      },
    });

    const game = await prisma.game.findFirst({
      where: {
        umpireId: profile?.id,
      }
    });

    const updatedGame = await prisma.game.update({
      where:{
        id:game?.id
      },
      data:{
        scoreCard:scoreJson
      }
    })

    return Response.json({
      success: true,
      message: "Score Updated",
    });
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Error in updating score.",
      },
      {
        status: 400,
      }
    );
  }
}
