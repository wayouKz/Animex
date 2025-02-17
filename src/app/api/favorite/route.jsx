import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export async function POST(request) {
    try {
        const body = await request.json(); 
        const { mal_id, userID, title, image } = body;


        if (!mal_id || !userID) {
            return NextResponse.json({ message: "Missing mal_id or userID" }, { status: 400 });
        }
        const mal_idInt = parseInt(mal_id,10)
        // const userIDint = parseInt(userID,10)
        const cek = await prisma.favoriteAnime.findFirst({
            where:{
                idUser: userID,
                mal_id: mal_idInt
            }
        })
        if(cek){
        const hapus = await prisma.favoriteAnime.delete({
            where:{
                id: cek.id,
            }
        });
            if(hapus){
                return NextResponse.json(
                    { message: "Favorite anime removed successfully" },
                    { status: 200 }
                );
            }
            return NextResponse.json(
                { message: "Success", data: cek },
                { status: 201 }
            );
        }
            const create = await prisma.favoriteAnime.create({
                data: {
                    idUser: userID,
                    mal_id: mal_idInt,
                    title: title,
                    image: image
                }
            });
    
            if(create){
                return NextResponse.json(
                    { message: "Favorite anime added successfully" },
                    { status: 200 }
                );
            }

    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}
export async function GET(req) {
    try {
        const userID = req.nextUrl.searchParams.get("userID");
        const userIDInt = parseInt(userID, 10);
        const data = await prisma.favoriteAnime.findMany({
            where: {
                idUser: userID
            }
        });

        return NextResponse.json(
            { message: "Success", data: data },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}
