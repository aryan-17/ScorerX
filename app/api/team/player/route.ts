import { NextRequest } from "next/server";
import prisma from "@/db/client";
import { fetchJwt } from "@/services/utils/fetchJwt";

// Add player
export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, token } = await req.json();

    const profile = await prisma.user.findFirst({
      where: {
        FirstName: firstName,
        LastName: lastName,
      },
      include: {
        profile: {
          select: {
            id: true,
            team: true,
            teamId: true,
          },
        },
      },
    });

    const ownerId = await fetchJwt(token);

    const owner = await prisma.user.findFirst({
      where: {
        id: ownerId,
      },
      include: {
        ownedTeams: true,
      },
    });

    // console.log("Owner------------>",owner);

    const teamId = owner?.ownedTeams?.id;

    if (!profile) {
      return Response.json(
        {
          success: false,
          message: "Invalid Name",
        },
        {
          status: 400,
        }
      );
    }

    // console.log("Player-------------->",profile);

    const profileId = profile.profile?.id;
    const team = profile.profile?.team;
    if (team) {
      return Response.json(
        {
          success: false,
          message: "Player is already in a team",
        },
        {
          status: 400,
        }
      );
    }

    console.log(profileId);
    console.log(teamId);
    const updatedProfile = await prisma.profile.update({
      where: {
        id: profileId,
      },
      data: {
        teamId: teamId,
      },
    });

    const updatedTeam = await prisma.team.findFirst({
      where: {
        id: profileId,
      },
    });

    // console.log("Team--------------->",updatedTeam);

    // console.log(updatedProfile);

    return Response.json(
      {
        success: true,
        message: "Player Added",
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
        message: "Player can't be added",
      },
      {
        status: 500,
      }
    );
  }
}

// Remove player
export async function DELETE(req: NextRequest) {
  try {
    const { playerId } = await req.json();

    const team = await prisma.profile.findFirst({
      where: {
        id: Number(playerId),
      },
      select: {
        teamId: true,
      },
    });

    const teamId = team?.teamId;

    const user = await prisma.profile.findFirst({
      where: {
        id: Number(playerId),
      },
      include: {
        user: {
          include: {
            ownedTeams: true,
          },
        },
      },
    });

    if(!user){
      return Response.json({
        success: false,
        message: "Player doesnt exists",
      });
    }

    const ownedTeamId = user?.user.ownedTeams?.id;

    console.log(user);

    if (teamId === ownedTeamId) {
      return Response.json({
        success: false,
        message: "Player is the owner",
      });
    }

    const updatedProfile = await prisma.profile.update({
      where: {
        id: Number(playerId),
      },
      data: {
        teamId: null,
      },
    });
    console.log(updatedProfile);

    return Response.json({
      success: true,
      message: "Player has been removed",
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        message: "Player can't be removed",
      },
      {
        status: 500,
      }
    );
  }
}
