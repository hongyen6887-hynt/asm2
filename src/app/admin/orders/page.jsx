"use client";
import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null); // Để xem chi tiết đơn

  const API_URL = "https://my-json-server.typicode.com/hongyen6887-hynt/sunktea-api/orders";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      // Sắp xếp đơn mới nhất lên đầu
      setOrders(data.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error("Lỗi tải đơn hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật trạng thái đơn hàng
  const updateStatus = async (orderId, newStatus) => {
    try {
      await fetch(`${API_URL}/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchOrders(); // Load lại danh sách
    } catch (error) {
      alert("Không thể cập nhật trạng thái");
    }
  };

  if (loading) return <div className="p-5 text-center">Đang tải danh sách đơn hàng...</div>;

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Quản lý Đơn hàng</h3>
        <button className="btn btn-sm btn-outline-secondary" onClick={fetchOrders}>
          <i className="fas fa-sync-alt"></i> Làm mới
        </button>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light text-secondary small">
              <tr>
                <th className="ps-4">Mã đơn</th>
                <th>Khách hàng</th>
                <th>Ngày đặt</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th className="text-end pe-4">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="ps-4 fw-bold text-primary">#{order.id}</td>
                  <td>
                    <div className="fw-bold">{order.fullname}</div>
                    <div className="small text-muted">{order.phone}</div>
                  </td>
                  <td className="small">{order.createdAt || "Vừa đặt"}</td>
                  <td className="fw-bold text-danger">
                    {order.total?.toLocaleString()}đ
                  </td>
                  <td>
                    <select 
                      className={`form-select form-select-sm w-auto rounded-pill px-3 ${
                        order.status === "Completed" ? "bg-success-subtle text-success border-success" : 
                        order.status === "Shipping" ? "bg-info-subtle text-info border-info" : 
                        "bg-warning-subtle text-warning border-warning"
                      }`}
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                    >
                      <option value="Pending">Chờ xử lý</option>
                      <option value="Shipping">Đang giao</option>
                      <option value="Completed">Hoàn thành</option>
                      <option value="Cancelled">Đã hủy</option>
                    </select>
                  </td>
                  <td className="text-end pe-4">
                    <button 
                      className="btn btn-sm btn-light border"
                      data-bs-toggle="modal" 
                      data-bs-target="#orderDetailModal"
                      onClick={() => setSelectedOrder(order)}
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL CHI TIẾT ĐƠN HÀNG */}
      <div className="modal fade" id="orderDetailModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 rounded-4 shadow">
            <div className="modal-header border-0">
              <h5 className="fw-bold">Chi tiết đơn hàng #{selectedOrder?.id}</h5>
              <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body pt-0">
              <div className="bg-light p-3 rounded-3 mb-3 small">
                <p className="mb-1"><strong>Địa chỉ:</strong> {selectedOrder?.address}</p>
                <p className="mb-0"><strong>Ghi chú:</strong> {selectedOrder?.note || "Không có"}</p>
              </div>
              
              <h6 className="fw-bold mb-3 small">Danh sách món:</h6>
              {selectedOrder?.items?.map((item, idx) => (
                <div key={idx} className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom border-light">
                  <div className="d-flex align-items-center">
                    <div className="bg-warning-subtle text-warning fw-bold rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '24px', height: '24px', fontSize: '12px'}}>
                      {item.quantity}
                    </div>
                    <span className="small">{item.name}</span>
                  </div>
                  <span className="small fw-bold">{item.price?.toLocaleString()}đ</span>
                </div>
              ))}

              <div className="d-flex justify-content-between mt-3">
                <span className="fw-bold">TỔNG CỘNG:</span>
                <span className="fw-bold text-danger fs-5">{selectedOrder?.total?.toLocaleString()}đ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}