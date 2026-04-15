"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Lấy thông tin user từ sessionStorage khi trang web load xong
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm py-3">
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold text-danger fs-3">SunkTea</Link>
        
        <div className="d-flex align-items-center gap-3 ms-auto">
          {user ? (
            /* KHI ĐÃ ĐĂNG NHẬP: Hiện Tên + Menu thả xuống */
            <div className="dropdown">
              <button 
                className="btn btn-outline-danger dropdown-toggle rounded-pill px-3 fw-bold d-flex align-items-center gap-2"
                type="button"
                data-bs-toggle="dropdown"
              >
                <i className="fas fa-user-circle fs-5"></i>
                Chào, {user.fullName || user.username}
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-3 mt-2">
                <li>
                  <Link href="/profile" className="dropdown-item py-2">
                    <i className="fas fa-id-card me-2"></i> Thông tin cá nhân
                  </Link>
                </li>
                <li>
                  <Link href="/profile/orders" className="dropdown-item py-2">
                    <i className="fas fa-history me-2"></i> Lịch sử đơn hàng
                  </Link>
                </li>
                {user.role === "admin" && (
                  <li>
                    <Link href="/admin" className="dropdown-item py-2 text-primary fw-bold">
                      <i className="fas fa-user-shield me-2"></i> Quản trị viên
                    </Link>
                  </li>
                )}
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button onClick={handleLogout} className="dropdown-item py-2 text-danger fw-bold">
                    <i className="fas fa-sign-out-alt me-2"></i> Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            /* CHƯA ĐĂNG NHẬP: Hiện nút Đăng nhập */
            <Link href="/login" className="btn btn-danger rounded-pill px-4 fw-bold shadow-sm">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}