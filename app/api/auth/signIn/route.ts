import { NextRequest } from "next/server";
import prisma from "@/db/client";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const {data, email} = await req.json();

    const{firstName,
      lastName,
      password,
      confirmPassword,
      gender,
      dob} = data;

      console.log(firstName,
        lastName,
        email,
        password,
        confirmPassword,
        gender,
        dob);
      

    const dateOfBirth = new Date(dob);

    if (
      !firstName ||
      !email ||
      !password ||
      !confirmPassword ||
      !gender ||
      !dob
    ) {
      return Response.json(
        {
          success: false,
          message: "All input fields are required",
        },
        {
          status: 400,
        }
      );
    }

    if (password !== confirmPassword) {
      return Response.json(
        {
          success: false,
          message:
            "Password and Confirm Password do not match. Please try again.",
        },
        {
          status: 400,
        }
      );
    }

    const checkVerified = await prisma.verification.findFirst({
      where: {
        email: email,
        verified: true,
      },
    });

    if (!checkVerified) {
      return Response.json(
        {
          success: false,
          message: "User not verified",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "User already exists.",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const image = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`;

    let result;
    await prisma.$transaction(async (tx) => {
      const userCreated = await tx.user.create({
        data: {
          FirstName: firstName,
          LastName: lastName || null,
          email: email,
          password: hashedPassword,
          photoUrl: image,
          Gender: gender,
          DOB: dateOfBirth,
        },
      });

      const profileCreated = await tx.profile.create({
        data: {
          userId: userCreated.id,
        },
      });

      result = { userCreated, profileCreated };
    });

    return Response.json(
      {
        success: true,
        data: result,
        message: "User Created",
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
        message: "Error in registering user",
      },
      {
        status: 500,
      }
    );
  }
}
