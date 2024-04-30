import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/db/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        if(session?.user){
            session.user.token = token.token;
        }
      return session;
    },
    jwt: ({ token, user }: any) => {
        if(user){
            console.log("user---------------->", user);
            token.token = user.token
        }
        console.log("token------------------->",token);
        
        return token;
    },
  },
};
