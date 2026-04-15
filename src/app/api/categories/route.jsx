import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("http://localhost:3001/categories"); // Đảm bảo trong db.json có bảng categories
  const data = await res.json();
  return NextResponse.json(data);
}