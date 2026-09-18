// app/api/me/route.ts
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies(); // ← await the Promise first
  const token = cookieStore.get("userJWT")?.value; // ← now .get() works

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!) as { id: string, name: string, email: string, createdAt: Date };
    return NextResponse.json({
      user: { id: decoded.id, name: decoded.name, email: decoded.email, createdAt: decoded.createdAt },
    });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}