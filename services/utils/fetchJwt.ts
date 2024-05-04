import jwt from "jsonwebtoken"
import { JwtPayload } from "jsonwebtoken";
export async function fetchJwt(token:string) {
    const payload = jwt.verify(token, process.env.NEXTAUTH_SECRET as string) as JwtPayload;
    const userId  = payload.id;

    return userId;
}