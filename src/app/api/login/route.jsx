import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = "SunkTea_Secret_Key_2024"; // Nên để trong file .env

export async function POST(request) {
  const { username, password } = await request.json();
  
  // Giả sử cậu đã tìm thấy user trong db.json
  const user = data.users.find(u => u.username === username && u.password === password);

  if (user) {
    // Tạo Token chứa ID và Role (Hết hạn sau 1 ngày)
    const token = jwt.sign(
      { id: user.id, role: user.role },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    // Lưu vào Cookie (HttpOnly để chống XSS)
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true, // JavaScript không thể đọc được, cực kỳ bảo mật
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 ngày
      path: "/",
    });

    return Response.json({ message: "Đăng nhập thành công", role: user.role });
  }

  return Response.json({ message: "Sai tài khoản!" }, { status: 401 });
}