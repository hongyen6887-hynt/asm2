"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // 1. Lấy thông tin user từ sessionStorage
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      router.push("/login"); // Nếu chưa đăng nhập thì đẩy về trang login
      return;
    }
    setUser(JSON.parse(storedUser));
  }, []);

  // 2. Hàm Đăng xuất
  const handleLogout = () => {
    if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      sessionStorage.removeItem("user");
      router.push("/login");
    }
  };

  if (!user) return <div className="text-center py-5">Đang tải hồ sơ...</div>;

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row g-4">
          
          {/* CỘT TRÁI: SIDEBAR MENU */}
          <div className="col-lg-4 col-xl-3">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="card-body p-0">
                {/* Header Profile */}
                <div className="text-center py-4 bg-danger text-white">
                  <div className="position-relative d-inline-block mb-3">
                    <img 
                      src={user.avatar || "https://i.pravatar.cc/150?u=sunktea"} 
                      alt="Avatar" 
                      className="rounded-circle border border-3 border-white shadow-sm" 
                      width="100" 
                      height="100" 
                    />
                  </div>
                  <h6 className="fw-bold mb-0">{user.fullname}</h6>
                  <small className="opacity-75">Thành viên SunkTea</small>
                </div>

                {/* List Menu */}
                <div className="list-group list-group-flush py-2">
                  <a href="/profile" className="list-group-item list-group-item-action border-0 px-4 py-3 bg-danger-subtle text-danger fw-bold">
                    <i className="fas fa-user-circle me-3"></i>Thông tin cá nhân
                  </a>
                  <a href="/profile/orders" className="list-group-item list-group-item-action border-0 px-4 py-3 text-secondary">
                    <i className="fas fa-history me-3"></i>Lịch sử đơn hàng
                  </a>
                  <a href="#" className="list-group-item list-group-item-action border-0 px-4 py-3 text-secondary">
                    <i className="fas fa-map-marker-alt me-3"></i>Sổ địa chỉ
                  </a>
                  {/* Nút Đăng xuất thực tế */}
                  <button 
                    onClick={handleLogout}
                    className="list-group-item list-group-item-action border-0 px-4 py-3 text-danger fw-bold mt-2 text-start"
                  >
                    <i className="fas fa-sign-out-alt me-3"></i>Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: NỘI DUNG CHI TIẾT */}
          <div className="col-lg-8 col-xl-9">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Hồ Sơ Của Tôi</h4>
                <button className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-bold">
                  <i className="fas fa-edit me-2"></i>Chỉnh sửa
                </button>
              </div>

              <form className="row g-4">
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Họ và tên</label>
                  <input type="text" className="form-control border-light-subtle bg-light shadow-none" defaultValue={user.fullname} readOnly />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Username</label>
                  <input type="text" className="form-control border-light-subtle bg-light shadow-none" defaultValue={user.username} readOnly />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Số điện thoại</label>
                  <input type="tel" className="form-control border-light-subtle bg-light shadow-none" defaultValue={user.phone || "Chưa cập nhật"} readOnly />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Email</label>
                  <input type="email" className="form-control border-light-subtle bg-light shadow-none" defaultValue={user.email} readOnly />
                </div>
                
                <div className="col-md-12 border-top pt-4 mt-5">
                  <h6 className="fw-bold mb-3">Bảo mật tài khoản</h6>
                  <div className="d-flex gap-2">
                    <button type="button" className="btn btn-dark rounded-pill px-4">Đổi mật khẩu</button>
                    <button type="button" className="btn btn-outline-secondary rounded-pill px-4">Thiết lập 2FA</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}