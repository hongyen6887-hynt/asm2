import { NextResponse } from "next/server";

const JSON_SERVER_URL = "http://localhost:3001/users";

// GET: Lấy danh sách thành viên
export async function GET() {
  const res = await fetch(JSON_SERVER_URL, { cache: 'no-store' });
  const data = await res.json();
  return NextResponse.json(data);
}

// POST: Tạo user mới (nếu cần)
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