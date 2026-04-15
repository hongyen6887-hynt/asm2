import { NextResponse } from "next/server";
const URL = "http://localhost:3001/orders";

export async function GET() {
  const res = await fetch(URL, { cache: 'no-store' });
  return NextResponse.json(await res.json());
}