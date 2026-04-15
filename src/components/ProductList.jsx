"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. Lấy tất cả sản phẩm từ JSON Server
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error("Lỗi lấy sản phẩm:", err));
  }, []);

  // 2. Hàm xử lý khi nhấn nút "Mua"
  const handleAddToCart = async (product) => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      alert("Bạn cần đăng nhập để mua hàng!");
      router.push("/login");
      return;
    }

    try {
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng của user này chưa
      const resCheck = await fetch(`http://localhost:3001/cart?userId=${user.id}&productId=${product.id}`);
      const cartData = await resCheck.json();

      if (cartData.length > 0) {
        // Nếu có rồi thì tăng số lượng lên (PATCH)
        const item = cartData[0];
        await fetch(`http://localhost:3001/cart/${item.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: item.quantity + 1 }),
        });
      } else {
        // Nếu chưa có thì thêm mới vào (POST)
        const cartItem = {
          userId: user.id,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        };
        await fetch("http://localhost:3001/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cartItem),
        });
      }

      alert(`Đã thêm ${product.name} vào giỏ hàng!`);
      router.push("/cart"); // Chuyển hướng đến trang giỏ hàng sau khi mua
    } catch (error) {
      alert("Lỗi khi thêm vào giỏ hàng!");
    }
  };

  if (loading) return <div className="text-center py-5">Đang tải sản phẩm...</div>;

  return (
    <div className="container py-5">
      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-md-3">
            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              <img src={product.image} className="card-img-top" alt={product.name} style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body text-center">
                <h6 className="fw-bold">{product.name}</h6>
                <p className="text-danger fw-bold">{product.price.toLocaleString()}đ</p>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="btn btn-warning w-100 rounded-pill fw-bold text-white shadow-sm"
                >
                  <i className="fas fa-cart-plus me-2"></i>MUA NGAY
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}