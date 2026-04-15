import { NextResponse } from "next/server";

const JSON_SERVER_URL = "https://my-json-server.typicode.com/hongyen6887-hynt/sunktea-api/orders";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  const res = await fetch(`${JSON_SERVER_URL}?userId=${userId}&_sort=date&_order=desc`);
  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(request) {
  const body = await request.json();
  
  const res = await fetch(JSON_SERVER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  
  const data = await res.json();
  return NextResponse.json(data);
}