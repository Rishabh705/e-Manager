import connect from "@/app/utils/db";
import Routes from "@/Models/routes";
import {NextResponse} from "next/server";


export const GET = async (request) => {
  
    try {
      await connect();
      const posts = await Routes.find();
      return new NextResponse(JSON.stringify(posts), { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error", { status: 500 });
    }
  };


export async function POST(req, res) {
    try {

        const body = await req.json();
        await connect();

        await Routes.create(body);

        return NextResponse.json({
            message:"Data sent successfully!"
        }, {
            status: 200
        })

    }catch (e) {
        return NextResponse.json(
            { message: "Server error, please try again!" },
            { status: 500 }
        )
    }
}

export async function DELETE(req){
    const id = req.nextUrl.searchParams.get("id")
    try{
        await connect()
        await Routes.findByIdAndDelete(id)
        return new NextResponse("Record deleted", {status:200})
    }catch(e){
        return new NextResponse("Database Error", { status: 500 })
    }
}