import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma"
import bcryptjs from "bcryptjs";
export async function POST(req) {
    const body = await req.json();
    const { email, password,confirmPassword ,name} = body;
    if(password !== confirmPassword) return NextResponse.json({ message: "Password and Confirm Password do not match." } ,{ status: 400 });
    if(password.length < 8 && confirmPassword.length < 8) return NextResponse.json({ message: "Password minimal 8 karakter" } ,{ status: 400 });
    const passhash = await bcryptjs.hash(password, 10);
    const id = Math.floor(Math.random() * 100000000) + 1;
    try{
        const user = await prisma.users.create({
            data: {
                id: id.toString(),
                email: email,
                password: passhash,
                githubId: id.toString(),
                provider: "local",
                name: name
            },
        });
    }catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: "Registration successful! Please check your email to verify your account." });
}