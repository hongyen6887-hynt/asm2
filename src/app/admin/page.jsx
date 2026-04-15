"use client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, categories: 0, orders: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [resP, resC, resO] = await Promise.all([
        fetch("http://localhost:3001/products"),
        fetch("http://localhost:3001/categories"),
        fetch("http://localhost:3001/orders")
      ]);
      
      const products = await resP.json();
      const categories = await resC.json();
      const orders = await resO.json();

      // Tính tổng doanh thu
      const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

      setStats({
        products: products.length,
        categories: categories.length,
        orders: orders.length,
        revenue: totalRevenue
      });

      setRecentOrders(orders.slice(-5).reverse()); // Lấy 5 đơn mới nhất
    } catch (error) {
      console.error("Lỗi:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-5">Đang tải dữ liệu tổng quan...</div>;

  return (
    <div className="container-fluid pb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Bảng Điều Khiển</h2>
        <button className="btn btn-outline-dark btn-sm" onClick={fetchDashboardData}>
          <i className="fas fa-sync-alt me-2"></i> Làm mới dữ liệu
        </button>
      </div>

      {/* THẺ THỐNG KÊ NHANH */}
      <div className="row g-4 mb-5">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-primary text-white">
            <div className="d-flex justify-content-between">
              <div>
                <small className="opacity-75">Doanh thu</small>
                <h3 className="fw-bold mb-0">{stats.revenue.toLocaleString()}đ</h3>
              </div>
              <i className="fas fa-wallet fs-1 opacity-25"></i>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-success text-white">
            <div className="d-flex justify-content-between">
              <div>
                <small className="opacity-75">Đơn hàng</small>
                <h3 className="fw-bold mb-0">{stats.orders}</h3>
              </div>
              <i className="fas fa-shopping-basket fs-1 opacity-25"></i>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-warning text-white">
            <div className="d-flex justify-content-between">
              <div>
                <small className="opacity-75">Sản phẩm</small>
                <h3 className="fw-bold mb-0">{stats.products}</h3>
              </div>
              <i className="fas fa-box fs-1 opacity-25"></i>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-info text-white">
            <div className="d-flex justify-content-between">
              <div>
                <small className="opacity-75">Danh mục</small>
                <h3 className="fw-bold mb-0">{stats.categories}</h3>
              </div>
              <i className="fas fa-list fs-1 opacity-25"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* ĐƠN HÀNG MỚI NHẤT */}
        <div className="col-md-8">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <div className="d-flex justify-content-between mb-4">
              <h5 className="fw-bold mb-0">Đơn hàng mới nhất</h5>
              <a href="/admin/orders" className="text-decoration-none small">Xem tất cả</a>
            </div>
            <div className="table-responsive">
              <table className="table table-borderless align-middle">
                <thead className="text-muted small border-bottom">
                  <tr>
                    <th>Mã Đơn</th>
                    <th>Khách Hàng</th>
                    <th>Tổng Tiền</th>
                    <th>Trạng Thái</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-bottom-sm">
                      <td className="py-3 fw-bold text-primary">#{order.id}</td>
                      <td>{order.fullname}</td>
                      <td className="fw-bold">{order.total?.toLocaleString()}đ</td>
                      <td>
                        <span className={`badge rounded-pill ${
                          order.status === "Completed" ? "bg-success-subtle text-success" : "bg-warning-subtle text-warning"
                        }`}>
                          {order.status === "Completed" ? "Đã giao" : "Chờ xử lý"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* PHÂN TÍCH NHANH */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
            <h5 className="fw-bold mb-3">Tỉ lệ danh mục</h5>
            {/* Bạn có thể nhúng chart ở đây, tạm thời làm list */}
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between align-items-center">
                <span className="small">Trà Sữa</span>
                <div className="progress w-50" style={{ height: "6px" }}>
                  <div className="progress-bar bg-warning" style={{ width: "70%" }}></div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="small">Trà Trái Cây</span>
                <div className="progress w-50" style={{ height: "6px" }}>
                  <div className="progress-bar bg-info" style={{ width: "45%" }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-warning-subtle border-start border-warning border-4">
             <h6 className="fw-bold text-warning-dark">Ghi chú Admin</h6>
             <p className="small mb-0 text-muted">Kiểm tra kho nguyên liệu trân châu vào mỗi sáng thứ 2 hàng tuần.</p>
          </div>
        </div>
      </div>
    </div>
  );
}