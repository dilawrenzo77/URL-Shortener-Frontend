import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL!;

async function handler(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const url = `${BACKEND_URL}/${path.join("/")}${req.nextUrl.search}`;

  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("content-length");
  headers.delete("origin");
  headers.delete("referer");
  headers.delete("cookie"); // we set it manually below if needed

  // Forward incoming cookies to backend (for /api/me, logout, etc.)
  const incomingCookie = req.headers.get("cookie");
  if (incomingCookie) headers.set("cookie", incomingCookie);

  const body = ["GET", "HEAD"].includes(req.method)
    ? undefined
    : await req.text();

  const res = await fetch(url, {
    method: req.method,
    headers,
    body,
    redirect: "manual",
  });

  const data = await res.text();

  const response = new NextResponse(data, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("content-type") || "application/json",
    },
  });

  // 🔑 Rewrite Set-Cookie so it lands on vercel.app
  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    const rewritten = setCookie
      .replace(/;\s*Domain=[^;]+/gi, "")
      .replace(/;\s*SameSite=[^;]+/gi, "")
      .replace(/;\s*Secure/gi, "");

    response.headers.set(
      "Set-Cookie",
      `${rewritten}; SameSite=Lax; Path=/; Secure`
    );
  }

  return response;
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as DELETE,
  handler as PATCH,
  handler as OPTIONS,
};