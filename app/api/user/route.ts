import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/client";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import { redirect } from "next/navigation";

// User Data
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(NEXT_AUTH);

    if (!session?.user) {
      return redirect("/login");
    }

    const userId = session.id;

    const userDetails = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        FirstName: true,
        LastName: true,
        email: true,
        photoUrl: true,
        Gender: true,
        DOB: true,
        ownedTeams: true,
        profile: {
          include: {
            team: {
              include: {
                players: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return Response.json(
      {
        success: true,
        message: "Fetched User Data",
        data: userDetails,
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
        message: "Failed to Fetch User Data",
      },
      {
        status: 500,
      }
    );
  }
}

// Delete User
export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await req.json();
    const userTobeDeleted = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!userTobeDeleted) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const verificationId = await prisma.verification.findFirst({
      where: {
        email: userTobeDeleted.email,
      },
      select: {
        id: true,
      },
    });

    const [deleteUser, deleteVerification] = await prisma.$transaction([
      prisma?.user.delete({
        where: {
          id: userId,
        },
      }),
      prisma.verification.delete({
        where: {
          id: verificationId?.id,
        },
      }),
    ]);

    return Response.json(
      {
        success: true,
        message: "User Deleted",
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
        message: "User cannot be deleted",
      },
      {
        status: 500,
      }
    );
  }
}

// Update User Details
export async function PATCH(req: NextRequest) {
  try {
    const { firstName, lastName, role, photoUrl } = await req.json();
    const session = await getServerSession(NEXT_AUTH);

    if (!session?.user) {
      return redirect("/login");
    }

    const userId = session.id;

    if (!firstName) {
      return Response.json(
        {
          success: false,
          message: "First Name can not be empty.",
        },
        {
          status: 400,
        }
      );
    }

    if (role) {
      const updatedRole = await prisma.profile.update({
        where: {
          userId: userId,
        },
        data: {
          Role: role,
        },
      });
    }

    if (!photoUrl) {
      const updateUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          FirstName: firstName,
          LastName: lastName,
        },
      });
    }

    const updateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        FirstName: firstName,
        LastName: lastName,
        photoUrl: photoUrl,
      },
    });
    return Response.json(
      {
        success: true,
        message: "User has been updated.",
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
        message: "User cannot be updated",
      },
      {
        status: 500,
      }
    );
  }
}
