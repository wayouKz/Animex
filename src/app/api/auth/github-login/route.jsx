import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(req) {
    const body = await req.json();
    const { githubId, email, name, image, provider } = body;

    if (!githubId || !email || !name || !image || !provider) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await prisma.users.findFirst({ where: { email,provider: provider } });

    if (existingUser) {

        return NextResponse.json(existingUser, { status: 200 });
    }

    const password = name;
    const passhash = await bcryptjs.hash(password, 10);
    const githubIdString = String(githubId);
    try {
        const user = await prisma.users.create({
            data: {
                id: githubIdString,
                name,
                email,
                password: passhash,
                githubId : githubIdString,
                image,
                provider: provider,
            },
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

