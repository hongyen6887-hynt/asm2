"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. Lấy dữ liệu giỏ hàng từ JSON Server
  const fetchCart = async () => {
    const userStr = sessionStorage.getItem("user");
    if (!userStr) {
      router.push("/login");
      return;
    }
    const user = JSON.parse(userStr);

    try {
      const res = await fetch(`http://localhost:3001/cart?userId=${user.id}`);
      const data = await res.json();
      setCartItems(data);
    } catch (error) {
      console.error("Lỗi lấy giỏ hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // 2. Hàm cập nhật số lượng (Tăng/Giảm)
  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await fetch(`http://localhost:3001/cart/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      // Cập nhật state tại chỗ để giao diện mượt mà
      setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    } catch (error) {
      alert("Không thể cập nhật số lượng");
    }
  };

  // 3. Hàm xóa món khỏi giỏ
  const removeItem = async (id) => {
    if (!confirm("Bạn muốn xóa món này khỏi giỏ hàng?")) return;
    try {
      await fetch(`http://localhost:3001/cart/${id}`, { method: "DELETE" });
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (error) {
      alert("Lỗi khi xóa món");
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = cartItems.length > 0 ? 15000 : 0;
  const total = subtotal + shipping;

  if (loading) return <div className="text-center py-5">Đang kiểm tra giỏ hàng...</div>;

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <h2 className="fw-bold mb-4">
          Giỏ hàng của bạn <span className="text-muted fs-5">({cartItems.length} món)</span>
        </h2>

        <div className="row g-4">
          {/* CỘT TRÁI: DANH SÁCH MÓN */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 p-4">
              {cartItems.map((item, index) => (
                <div key={item.id} className={`d-md-flex align-items-center py-3 ${index !== cartItems.length - 1 ? 'border-bottom' : ''}`}>
                  <img src={item.image} alt={item.name} className="rounded-3 object-fit-cover mb-3 mb-md-0" style={{ width: '100px', height: '100px' }} />
                  
                  <div className="flex-grow-1 ms-md-4">
                    <h6 className="fw-bold mb-1">{item.name}</h6>
                    <p className="small text-muted mb-2">Giá: {item.price.toLocaleString()}đ</p>
                    
                    <div className="d-flex align-items-center">
                      <div className="input-group input-group-sm" style={{ width: '110px' }}>
                        <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <input type="text" className="form-control text-center border-secondary shadow-none" value={item.quantity} readOnly />
                        <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="btn btn-link text-danger text-decoration-none small ms-3">
                        <i className="fas fa-trash-alt me-1"></i> Xóa
                      </button>
                    </div>
                  </div>

                  <div className="text-md-end mt-3 mt-md-0">
                    <span className="fw-bold text-dark fs-5">{(item.price * item.quantity).toLocaleString()}đ</span>
                  </div>
                </div>
              ))}

              {cartItems.length === 0 && (
                <div className="text-center py-5">
                  <i className="fas fa-shopping-basket fa-3x text-light mb-3"></i>
                  <p className="text-muted">Giỏ hàng đang trống.</p>
                  <a href="/products" className="btn btn-danger rounded-pill px-4">Đến Menu ngay</a>
                </div>
              )}
            </div>
          </div>

          {/* CỘT PHẢI: TỔNG KẾT */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '100px' }}>
              <h5 className="fw-bold mb-4">Tóm tắt đơn hàng</h5>
              
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Tạm tính:</span>
                <span className="fw-bold">{subtotal.toLocaleString()}đ</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Phí vận chuyển:</span>
                <span className="fw-bold">{shipping.toLocaleString()}đ</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4 mt-2">
                <span className="fs-5 fw-bold">Tổng cộng:</span>
                <span className="fs-4 fw-bold text-danger">{total.toLocaleString()}đ</span>
              </div>

              <button 
                disabled={cartItems.length === 0}
                className="btn btn-danger w-100 py-3 rounded-pill fw-bold shadow-sm mb-3"
                onClick={() => router.push("/checkout")}
              >
                TIẾN HÀNH THANH TOÁN  
              </button>
              
              <div className="text-center">
                <a href="/products" className="text-muted small text-decoration-none">
                  <i className="fas fa-arrow-left me-1"></i> Tiếp tục mua thêm
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}