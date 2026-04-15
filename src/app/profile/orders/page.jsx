"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // Lưu đơn hàng đang xem chi tiết
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userStr = sessionStorage.getItem("user");
    if (!userStr) {
      router.push("/login");
      return;
    }
    const user = JSON.parse(userStr);

    fetch(`http://localhost:3001/orders?userId=${user.id}&_sort=date&_order=desc`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Hoàn thành": return "badge bg-success-subtle text-success";
      case "Đang giao": return "badge bg-warning-subtle text-warning";
      case "Đã hủy": return "badge bg-danger-subtle text-danger";
      default: return "badge bg-primary-subtle text-primary";
    }
  };

  if (loading) return <div className="text-center py-5">Đang tải lịch sử đơn hàng...</div>;

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row g-4">
          {/* CỘT TRÁI: SIDEBAR */}
          <div className="col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="list-group list-group-flush">
                <a href="/profile" className="list-group-item list-group-item-action border-0 px-4 py-3 text-secondary small">
                  <i className="fas fa-user-circle me-3"></i>Thông tin cá nhân
                </a>
                <a href="/profile/orders" className="list-group-item list-group-item-action border-0 px-4 py-3 active bg-danger">
                  <i className="fas fa-history me-3"></i>Lịch sử đơn hàng
                </a>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: DANH SÁCH ĐƠN HÀNG */}
          <div className="col-lg-9">
            <h4 className="fw-bold mb-4">Đơn hàng của tôi</h4>
            {orders.map((order) => (
              <div key={order.id} className="card border-0 shadow-sm rounded-4 mb-3 overflow-hidden shadow-hover">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <span className="fw-bold text-dark fs-5">#SUNK-{order.id}</span>
                      <p className="text-muted small mb-0">{new Date(order.date).toLocaleString("vi-VN")}</p>
                    </div>
                    <span className={`px-3 py-2 rounded-pill ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="border-top pt-3 d-flex justify-content-between align-items-center">
                    <div>
                        <p className="mb-0 small text-muted">Tổng cộng</p>
                        <h5 className="fw-bold text-danger mb-0">{order.total?.toLocaleString()}đ</h5>
                    </div>
                    {/* NÚT ẤN ĐỂ HIỆN MODAL */}
                    <button 
                      className="btn btn-outline-danger btn-sm rounded-pill px-4"
                      onClick={() => setSelectedOrder(order)}
                      data-bs-toggle="modal" 
                      data-bs-target="#orderDetailModal"
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- MODAL CHI TIẾT ĐƠN HÀNG --- */}
      <div className="modal fade" id="orderDetailModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 rounded-4 shadow">
            <div className="modal-header border-0 px-4 pt-4">
              <h5 className="fw-bold">Chi tiết đơn hàng #SUNK-{selectedOrder?.id}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            
            <div className="modal-body px-4 pb-4">
              {selectedOrder && (
                <div className="row g-4">
                  <div className="col-md-6">
                    <h6 className="fw-bold mb-3 border-bottom pb-2">Người nhận</h6>
                    <p className="mb-1"><strong>{selectedOrder.fullname}</strong></p>
                    <p className="mb-1 small text-muted"><i className="fas fa-phone me-2"></i>{selectedOrder.phone}</p>
                    <p className="small text-muted"><i className="fas fa-map-marker-alt me-2"></i>{selectedOrder.address}</p>
                    <p className="badge bg-light text-dark border fw-normal mt-2">
                        {selectedOrder.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng' : 'Thanh toán Online'}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h6 className="fw-bold mb-3 border-bottom pb-2">Món đã đặt</h6>
                    <div className="bg-light p-3 rounded-3">
                        {selectedOrder.items.map((item, i) => (
                            <div key={i} className="d-flex justify-content-between mb-2 small">
                                <span>{item.name} <strong>x{item.quantity}</strong></span>
                                <span className="fw-bold">{(item.price * item.quantity).toLocaleString()}đ</span>
                            </div>
                        ))}
                        <hr />
                        <div className="d-flex justify-content-between fw-bold text-danger">
                            <span>Tổng thanh toán:</span>
                            <span>{selectedOrder.total.toLocaleString()}đ</span>
                        </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS Hover */}
      <style jsx>{`
        .shadow-hover { transition: 0.3s; }
        .shadow-hover:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; }
      `}</style>
    </div>
  );
}