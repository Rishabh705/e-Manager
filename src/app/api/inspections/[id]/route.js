import { NextResponse } from "next/server"
import connect from "@/app/utils/db"
import Inspection from "@/Models/inspections";

//works when a record in allrecords page is clicked

export const GET = async (request,{params}) => {
    const {id} = params
    try {
        await connect()
        const record = await Inspection.findById(id)
        return new NextResponse(JSON.stringify(record), { status: 200 })
    } catch (error) {
        return new NextResponse("Database Error", { status: 500 })
    }
}

//works when update button on edit page is clicked

export const PUT = async(req,{params}) =>{
    const {id} = params
    try{
        const body = await req.json()
        await connect()
        await Inspection.findByIdAndUpdate(id,body)
        return new NextResponse("Record updated", { status: 200 })
    }
    catch(e){
        return new NextResponse("Database Error", { status: 500 })
    }
}


