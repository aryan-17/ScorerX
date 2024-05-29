import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/db/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { DefaultSession, NextAuthOptions } from 'next-auth';
import { generateJwt } from "@/services/utils/generateJwt";

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken: string;
    image:string;
    id:string;
  }
}

export const NEXT_AUTH:NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
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
      async authorize(credentials: Record<"email" | "password", string>) {
        try {

          const userDb = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
            select: {
              id: true,
              FirstName: true,
              LastName: true,
              password: true,
              photoUrl:true
            },
          });

          if (
            userDb &&
            userDb.password &&
            (await bcrypt.compare(credentials.password, userDb.password))
          ) {
            const token = await generateJwt({id:userDb.id});            

            return {
              id: userDb.id,
              firstName: userDb.FirstName,
              lastName: userDb.LastName,
              email: credentials.email,
              token: token,
              photoUrl:userDb.photoUrl
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
  pages:{
    signIn:"/auth/login"
  },
  secret: process.env.NEXTAUTH_SECRET || "secr3t",
  jwt: {
    secret: process.env.NEXTAUTH_SECRET || "secr3t",
  },
  callbacks: {
    async jwt ({ token, user }: any){      
      if (user) {
        token.token = user.token;
        token.userId = user.id;
        token.photoUrl = user.photoUrl;
      }
      console.log("token---------->",token);
      
      return token;
    },
    async session ({ session, token }: any){   
      if (session?.user) {
        session.accessToken = token.token; 
        session.id = token.userId;
        session.image = token.photoUrl;
      }
      console.log("Session----------->",session);
      
      return session;
    },
  },
};
