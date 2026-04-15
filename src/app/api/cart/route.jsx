import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const item = await request.json();
    
    // Kiểm tra món đã có trong giỏ chưa
    const checkRes = await fetch(`http://localhost:3001/cart?userId=${item.userId}&productId=${item.productId}`);
    const existingItems = await checkRes.json();

    if (existingItems.length > 0) {
      // Nếu có rồi thì tăng số lượng
      const updateRes = await fetch(`http://localhost:3001/cart/${existingItems[0].id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: existingItems[0].quantity + 1 }),
      });
      return NextResponse.json(await updateRes.json());
    } else {
      // Nếu chưa có thì thêm mới
      const addRes = await fetch("http://localhost:3001/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      return NextResponse.json(await addRes.json());
    }
  } catch (error) {
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}