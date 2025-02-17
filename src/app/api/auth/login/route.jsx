import prisma from "../../../lib/prisma";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { email, password, provider } = body;

  try {
    const user = await prisma.users.findFirst({
      where: {
        email,
        provider,
      },
    });

    if (!user) {
      return NextResponse.json("User not found", { status: 404 });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json("Invalid password", { status: 401 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, error }, { status: 500 });
  }
}

