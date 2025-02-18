import { NextResponse } from "next/server"

import prisma from "../../../lib/prisma"

export async function GET(req) {
    const userID = req.nextUrl.searchParams.get("userID");
    try {
        const data = await prisma.favoriteanime.findMany({
            where: {
                idUser: userID
            }
        })
        if(data.length === 0) {
            return NextResponse.json({ message: "Data not found" }, { status: 202 });
        }
        return NextResponse.json({ message: "Success", data: data ,"status": "200"}, { status: 200 });
    }catch(error) {
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
}