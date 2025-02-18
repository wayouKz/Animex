import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export async function POST(req) {
    const body = await req.json();
    const { userID, mal_id, comment } = body;

    if (!userID || !mal_id || !comment) {
        return NextResponse.json({ message: "Missing userID or mal_id or comment" }, { status: 400 });
    }

    try {
        await prisma.commentanime.create({
            data: {
                mal_id,
                userId: userID,
                comment
            }
        });
        return NextResponse.json({ message: "Comment added successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        // Ambil mal_id dari URL
        const mal_id = req.nextUrl.searchParams.get("mal_id");

        if (!mal_id) {
            return NextResponse.json({ message: "Missing mal_id" }, { status: 400 });
        }
        // const mal_idInt = parseInt(mal_id, 10);
       
        const res = await prisma.users.findMany({
            where: {
                comment: {
                    some: {
                        mal_id: mal_id // Pastikan tipe data sesuai dengan schema (String)
                    },
                }
            },
            include: {
                comment: {
                    where: {
                        mal_id: mal_id
                    },
                    orderBy: {
                        date_time: 'desc'
                    }
                },
            },
        });

        return NextResponse.json({ message: "Berhasil", data: res }, { status: 200 });
    } catch (error) { 
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
}
