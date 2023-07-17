import connect from "@/app/utils/db";
import Inspection from "@/Models/inspections";
import { NextResponse } from "next/server";


export async function GET(){

    try {
        await connect();
        const posts = await Inspection.find();
        return new NextResponse(JSON.stringify(posts), { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};


export async function POST(req, res) {
    try {

        const body = await req.json();
        await connect();
        await Inspection.create(body);

        return NextResponse.json({
            message: "Message sent successfully!"
        }, {
            status: 200
        })

    } catch (e) {
        return NextResponse.json(
            { message: "Server error, please try again!" },
            { status: 500 }
        )
    }
}

//works when delete button on allrecords page is clicked

export async function DELETE(req){
    const id = req.nextUrl.searchParams.get("id")
    try{
        await connect()
        await Inspection.findByIdAndDelete(id)
        return new NextResponse("Record deleted", {status:200})
    }catch(e){
        return new NextResponse("Database Error", { status: 500 })
    }
}