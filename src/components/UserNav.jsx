"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserNav() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Kiểm tra login khi component mount
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

  if (!user) {
    return (
      <a href="/login" className="text-dark">
        <i className="fas fa-user fs-5"></i>
      </a>
    );
  }

  return (
    <div className="dropdown">
      <a 
        href="#" 
        className="text-dark text-decoration-none dropdown-toggle fw-bold d-flex align-items-center gap-2" 
        data-bs-toggle="dropdown"
      >
        <i className="fas fa-user-circle fs-5 text-warning"></i>
        <span className="d-none d-md-inline">Chào, {user.fullName || user.username}</span>
      </a>
      <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-3">
        <li><Link className="dropdown-item" href="/profile"><i className="fas fa-id-card me-2"></i>Thông tin</Link></li>
        <li><Link className="dropdown-item" href="/profile/orders"><i className="fas fa-history me-2"></i>Đơn hàng</Link></li>
        {user.role === 'admin' && (
           <li><Link className="dropdown-item text-primary fw-bold" href="/admin"><i className="fas fa-user-shield me-2"></i>Quản trị</Link></li>
        )}
        <li><hr className="dropdown-divider" /></li>
        <li>
          <button className="dropdown-item text-danger fw-bold" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt me-2"></i>Đăng xuất
          </button>
        </li>
      </ul>
    </div>
  );
}