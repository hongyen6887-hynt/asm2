import { NextResponse } from "next/server";
const URL = "https://my-json-server.typicode.com/hongyen6887-hynt/sunktea-api/orders";

export async function GET() {
  const res = await fetch(URL, { cache: 'no-store' });
  return NextResponse.json(await res.json());
}