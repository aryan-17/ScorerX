import { NextRequest } from "next/server";
import prisma from "@/db/client";
import { cookies } from "next/headers";

export async function GET(req:NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    console.log(token?.value);

    if(!token){
        // Redirect
        return Response.json({
            success:false,
            message:"Logged Out"
        })
    }

    const userDetails = await prisma.user.findFirst({
        where:{
            token:token.value
        },
        select:{
            FirstName:true,
            LastName:true,
            email:true,
            photoUrl:true,
            Gender:true,
            DOB:true
        }
    })
    
    console.log(userDetails);
    

    return Response.json(
      {
        success: true,
        message: "Fetched User Data",
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

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await req.json();
    const deleteUser = await prisma?.user.delete({
      where: {
        id: userId,
      },
    });
    console.log(deleteUser);

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

export async function PATCH(req: NextRequest) {
  try {
    const { id, firstName, lastName, photoUrl, DOB, gender } = await req.json();

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
        photoUrl:
          photoUrl ||
          `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
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
