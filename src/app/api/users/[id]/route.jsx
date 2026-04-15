import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "db.json");

export async function PATCH(request, { params }) {
  // GIẢI PHÁP: await params trước khi lấy id
  const { id } = await params; 
  const body = await request.json();

  try {
    const fileData = fs.readFileSync(dbPath, "utf-8");
    const data = JSON.parse(fileData);

    // Tìm user (ép kiểu về string để so sánh cho chắc)
    const index = data.users.findIndex(u => String(u.id) === String(id));

    if (index !== -1) {
      data.users[index] = { ...data.users[index], ...body };
      fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
      
      return NextResponse.json(data.users[index]);
    } else {
      return NextResponse.json({ message: "Không tìm thấy user" }, { status: 404 });
    }
  } catch (error) {
    console.error("Lỗi API:", error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}