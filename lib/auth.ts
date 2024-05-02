import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/db/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "Enter your Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your Password",
        },
      },
      async authorize(credentials: any, req) {
        try {
          const secret = process.env.NEXTAUTH_SECRET as string;
          console.log(credentials.username);

          const userDb = await prisma.user.findFirst({
            where: {
              email: credentials.username,
            },
            select: {
              id: true,
              FirstName: true,
              LastName: true,
              password: true,
            },
          });

          if (
            userDb &&
            userDb.password &&
            (await bcrypt.compare(credentials.password, userDb.password))
          ) {
            const token = jwt.sign({ id: userDb.id }, secret);

            await prisma.user.update({
              where: {
                id: userDb.id,
              },
              data: {
                token: token,
              },
            });

            const cookieStore = cookies();
            cookieStore.set("token",token);

            return {
              id: userDb.id,
              firstName: userDb.FirstName,
              lastName: userDb.LastName,
              email: credentials.username,
              token: token,
            };
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "secr3t",
  callbacks: {
    session: ({ session, token }: any) => {            
      if (session?.user) {
        session.accessToken = token.token;
      }
      return session;
    },
    jwt: ({ token, user }: any) => {
      if (user) {
        token.token = user.token;
      }
      return token;
    },
  },
};
