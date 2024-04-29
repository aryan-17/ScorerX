import CredentialsProvider from "next-auth/providers/credentials"
import { signIn } from "next-auth/react";

export const NEXT_AUTH = {
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                username:{label:"Email", type:"text", placeholder:"Enter your Email"},
                password:{label:"Password", type:"password", placeholder:"Enter your Password"}
            },
            async authorize(credentials, req){
                console.log(credentials);

                return {
                    id: "user1",
                    name:"Aryan",
                    admin:true,
                    email:"aryan@gmail.com"
                };
            }
        })
    ],
    session:{
        strategy:'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET || 'secr3t',
    callbacks:{
        jwt:({token}:any)=>{
            console.log(token);
            return token;
        },
        session:({session, token}:any)=>{
            session.token = token.jti;
            return session
        }
    },
    pages:{
        signIn: '/signIn'
    }
}