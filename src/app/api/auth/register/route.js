import Users from "@/Models/Users"
import connect from "@/app/utils/db"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export const POST = async (request) => {
    const { name, password } = await request.json();
  
    await connect();
  
    const hashedPassword = await bcrypt.hash(password, 5);
  
    const newUser = new Users({
      name,
      password: hashedPassword
    });
  
    try {
      await newUser.save();
      return new NextResponse("User has been created", {
        status: 201,
      });
    } catch (err) {
      return new NextResponse(err.message, {
        status: 500,
      });
    }
  };