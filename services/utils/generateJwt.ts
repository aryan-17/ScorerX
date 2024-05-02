import jwt from "jsonwebtoken"

export async function generateJwt(payload:any) {
    const secret = process.env.NEXTAUTH_SECRET as string;

    const jwtToken = jwt.sign(payload,secret);
    return jwtToken;
}