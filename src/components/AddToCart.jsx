"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddToCart({ product }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddToCart = async () => {
    // 1. Kiểm tra đăng nhập
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      alert("Vui lòng đăng nhập để mua hàng!");
      router.push("/login");
      return;
    }

    const user = JSON.parse(storedUser);
    setLoading(true);

    try {
      // 2. Kiểm tra xem sản phẩm này đã có trong giỏ hàng của user này chưa
      const resCheck = await fetch(
        `http://localhost:3001/cart?userId=${user.id}&productId=${product.id}`
      );
      const cartItems = await resCheck.json();

      if (cartItems.length > 0) {
        // 3. Nếu đã có: Cập nhật số lượng (PATCH)
        const item = cartItems[0];
        await fetch(`http://localhost:3001/cart/${item.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: item.quantity + 1 }),
        });
      } else {
        // 4. Nếu chưa có: Thêm mới (POST)
        await fetch("http://localhost:3001/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
          }),
        });
      }

      alert("Đã thêm vào giỏ hàng thành công! 🧋");
      router.refresh(); // Làm mới dữ liệu trang
    } catch (error) {
      console.error("Lỗi thêm giỏ hàng:", error);
      alert("Có lỗi xảy ra, thử lại sau nhé!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="btn btn-danger rounded-pill px-4 fw-bold shadow-sm"
    >
      {loading ? (
        <span className="spinner-border spinner-border-sm me-2"></span>
      ) : (
        <i className="fas fa-cart-plus me-2"></i>
      )}
      {loading ? "Đang xử lý..." : "Thêm vào giỏ"}
    </button>
  );
}