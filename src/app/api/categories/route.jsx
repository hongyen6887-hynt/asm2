import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://my-json-server.typicode.com/hongyen6887-hynt/sunktea-api/categories"); // Đảm bảo trong db.json có bảng categories
  const data = await res.json();
  return NextResponse.json(data);
}