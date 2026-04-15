"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    address: "",
    paymentMethod: "COD"
  });
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (!storedUser) {
      router.push("/login");
      return;
    }
    setUser(storedUser);
    setFormData(prev => ({ ...prev, fullname: storedUser.fullname || "", email: storedUser.email || "" }));

    // Lấy giỏ hàng thực tế
    fetch(`http://localhost:3001/cart?userId=${storedUser.id}`)
      .then(res => res.json())
      .then(data => setCartItems(data));
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = cartItems.length > 0 ? 15000 : 0;
  const total = subtotal + shipping;

  const handleOrder = async () => {
    if (!formData.address || !formData.phone) {
      alert("Vui lòng nhập đầy đủ địa chỉ và số điện thoại!");
      return;
    }

    const orderData = {
      userId: user.id,
      ...formData,
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: total,
      status: "Chờ xác nhận",
      date: new Date().toISOString()
    };

    try {
      // 1. Gửi đơn hàng lên bảng orders
      const res = await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      if (res.ok) {
        // 2. Xóa sạch giỏ hàng của user này sau khi đặt thành công
        for (const item of cartItems) {
          await fetch(`http://localhost:3001/cart/${item.id}`, { method: "DELETE" });
        }
        alert("Đặt hàng thành công! SunkTea sẽ sớm liên hệ bạn.");
        router.push("/profile/orders"); // Chuyển về trang lịch sử đơn hàng
      }
    } catch (error) {
      alert("Có lỗi xảy ra khi đặt hàng.");
    }
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row g-5">
          {/* CỘT TRÁI: FORM NHẬP LIỆU */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-4"><i className="fas fa-map-marker-alt text-danger me-2"></i>Thông tin giao hàng</h5>
              <div className="row g-3">
                <div className="col-md-12">
                  <label className="form-label small fw-bold">Họ và tên</label>
                  <input type="text" className="form-control rounded-3 shadow-none bg-light" 
                    value={formData.fullname} onChange={(e) => setFormData({...formData, fullname: e.target.value})} />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Số điện thoại</label>
                  <input type="tel" className="form-control rounded-3 shadow-none bg-light" 
                    placeholder="0901xxxxxx" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Email</label>
                  <input type="email" className="form-control rounded-3 shadow-none bg-light" 
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="col-md-12">
                  <label className="form-label small fw-bold">Địa chỉ nhận hàng</label>
                  <input type="text" className="form-control rounded-3 shadow-none bg-light" 
                    placeholder="Số nhà, tên đường..." onChange={(e) => setFormData({...formData, address: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h5 className="fw-bold mb-4"><i className="fas fa-credit-card text-danger me-2"></i>Phương thức thanh toán</h5>
              <div className="list-group gap-2 border-0">
                {["COD", "MOMO", "BANK"].map((method) => (
                  <label key={method} className="list-group-item d-flex gap-3 rounded-3 border py-3 cursor-pointer">
                    <input className="form-check-input" type="radio" name="payment" 
                      checked={formData.paymentMethod === method} 
                      onChange={() => setFormData({...formData, paymentMethod: method})} />
                    <span>{method === "COD" ? "Thanh toán khi nhận hàng" : method === "MOMO" ? "Ví MoMo" : "Chuyển khoản"}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: HIỂN THỊ GIỎ HÀNG THỰC */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '100px' }}>
              <h5 className="fw-bold mb-4">Đơn hàng của bạn</h5>
              <div className="mb-4 overflow-auto" style={{ maxHeight: '250px' }}>
                {cartItems.map((item) => (
                  <div key={item.id} className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center">
                      <div className="position-relative">
                        <img src={item.image} width="50" height="50" className="rounded-2 object-fit-cover" alt="item" />
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">{item.quantity}</span>
                      </div>
                      <div className="ms-3">
                        <h6 className="mb-0 small fw-bold">{item.name}</h6>
                      </div>
                    </div>
                    <span className="small fw-bold">{(item.price * item.quantity).toLocaleString()}đ</span>
                  </div>
                ))}
              </div>

              <div className="border-top pt-3">
                <div className="d-flex justify-content-between mb-2"><span className="text-muted">Tạm tính:</span><span>{subtotal.toLocaleString()}đ</span></div>
                <div className="d-flex justify-content-between mb-3"><span className="text-muted">Phí giao hàng:</span><span>{shipping.toLocaleString()}đ</span></div>
                <div className="d-flex justify-content-between mb-4">
                  <span className="fs-5 fw-bold">Tổng:</span>
                  <span className="fs-4 fw-bold text-danger">{total.toLocaleString()}đ</span>
                </div>
              </div>

              <button onClick={handleOrder} className="btn btn-danger w-100 py-3 rounded-pill fw-bold shadow-sm border-0">
                XÁC NHẬN ĐẶT HÀNG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}