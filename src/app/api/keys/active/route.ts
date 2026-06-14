import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authorization = req.headers.get("authorization") ?? "";

  const base = process.env.BACKEND_URL ?? "http://localhost:8080/api/v1";
  const upstream = await fetch(`${base}/keys/active`, {
    headers: { Authorization: authorization },
  });

  const text = await upstream.text();
  let data: unknown;
  try { data = JSON.parse(text); } catch { data = { message: text || "Upstream error" }; }
  return NextResponse.json(data, { status: upstream.status });
}
