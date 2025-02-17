import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export async function POST(req) {
    const body = await req.json();
    const { userID, mal_id, title, image } = body;

    if (!userID || !mal_id) {
        return NextResponse.json({ message: "Missing userID or mal_id" }, { status: 400 });
    }

    try {
        const existingFavorite = await prisma.likeanime.findFirst({
            where: {
                userId: userID,
                mal_id: mal_id,
            },
        });

        if (existingFavorite) {
            await prisma.likeanime.delete({
                where: {
                    id: existingFavorite.id,
                },
            });
            return NextResponse.json({ message: "Favorite removed successfully" }, { status: 200 });
        }

        await prisma.likeanime.create({
            data: {
                userId: userID,
                mal_id: mal_id,
                title: title,
                image: image
            },
        });
        return NextResponse.json({ message: "Favorite added successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const userID = req.nextUrl.searchParams.get("userID");
        const mal_id = req.nextUrl.searchParams.get("mal_id");


        const userIDInt = parseInt(userID, 10);
        const mal_idInt = parseInt(mal_id, 10);
        const data = await prisma.likeanime.findMany({
            where: {
                userId: userID,
                mal_id: mal_idInt
            }
        });
        return NextResponse.json({ message: "Success", data: data }, { status: 200 });
    }catch(erorr){
        return NextResponse.json({ message: "Internal Server Error", error: erorr.message }, { status: 500 });
    }
}