import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/client";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import { redirect } from "next/navigation";

// User Data
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(NEXT_AUTH);
    
    if(!session?.user){
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
        ownedTeams:true,
        profile:{
          include:{
            team:{
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
    });

    return Response.json(
      {
        success: true,
        message: "Fetched User Data",
        data:userDetails
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
    const { id, firstName, lastName, DOB, gender } = await req.json();

    if (!firstName || !lastName || !DOB || !gender) {
      return Response.json(
        {
          success: false,
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    const dateOfBirth = new Date(DOB);

    const updateUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        FirstName: firstName,
        LastName: lastName,
        DOB: dateOfBirth,
        Gender: gender,
      },
    });
    console.log(updateUser);

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
