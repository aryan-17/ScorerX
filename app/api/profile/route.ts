import { NextRequest } from "next/server";
import prisma from "@/db/client";
import { fetchJwt } from "@/services/utils/fetchJwt";

// Role Change
export async function PATCH(req: NextRequest) {
  try {
    // const session = await getServerSession(NEXT_AUTH);
    // const token = session?.accessToken;
    const { token,role } = await req.json();

    const profileId = await fetchJwt(token);
    
    
    const player = await prisma.profile.findFirst({
        where:{
            userId:profileId
        }
    })
    console.log(player);

    if(!player){
        return Response.json({
            success:false,
            message:"Invalid Profile"
        },{
            status:400
        })
    }

    const updatedRole = await prisma.profile.update({
        where:{
            id:player.id
        },
        data:{
            Role:role
        }
    })

    console.log(updatedRole);

    return Response.json({
        success:true,
        message:"Role changed"
    },{
        status:200
    })
    

  } catch (error) {
    console.log(error);
    return Response.json({
      success: false,
      message: "Role cannot be changed",
    },{
        status:500
    });
  }
}
