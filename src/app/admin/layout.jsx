"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  // Style cho các mục Menu
  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: "fas fa-th-large" },
    { name: "Sản phẩm", path: "/admin/products", icon: "fas fa-box" },
    { name: "Đơn hàng", path: "/admin/orders", icon: "fas fa-shopping-cart" },
    { name: "Người dùng", path: "/admin/users", icon: "fas fa-users" },
  ];

  const isActive = (path) => 
    pathname === path 
      ? "bg-warning text-dark fw-bold shadow-sm" 
      : "text-white-50 hover-sidebar";

  return (
    <div className="container-fluid p-0">
      <div className="d-flex">
        {/* --- SIDEBAR --- */}
        <aside 
          className="bg-dark min-vh-100 d-flex flex-column p-3 position-fixed" 
          style={{ width: "240px", zIndex: 1000 }}
        >
          <div className="py-3 px-2 mb-4 border-bottom border-secondary text-center">
            <h4 className="text-warning fw-bold m-0 italic">SunkTea <small className="text-white-50 fs-6">Admin</small></h4>
          </div>
          
          <ul className="nav nav-pills flex-column gap-2 mb-auto">
            {menuItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link href={item.path} className={`nav-link py-2 px-3 d-flex align-items-center rounded-3 transition-all ${isActive(item.path)}`}>
                  <i className={`${item.icon} me-3`} style={{ width: "20px" }}></i>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-3 border-top border-secondary">
            <Link href="/" className="nav-link text-info small d-flex align-items-center ps-2">
              <i className="fas fa-sign-out-alt me-2"></i> Quay lại Web
            </Link>
          </div>
        </aside>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex-grow-1" style={{ marginLeft: "240px" }}>
          {/* TOPBAR */}
          <header className="navbar bg-white border-bottom sticky-top py-2 px-4 shadow-sm">
            <div className="container-fluid d-flex justify-content-between">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb m-0 small">
                  <li className="breadcrumb-item text-muted">Admin</li>
                  <li className="breadcrumb-item active text-dark fw-semibold">
                    {menuItems.find(i => i.path === pathname)?.name || "Hệ thống"}
                  </li>
                </ol>
              </nav>

              <div className="d-flex align-items-center gap-3">
                <div className="text-end d-none d-sm-block">
                  <p className="m-0 small fw-bold">Quản trị viên</p>
                  <p className="m-0 text-muted" style={{ fontSize: '10px' }}>Đang hoạt động</p>
                </div>
                <div className="position-relative">
                    <img 
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
                        width="38" 
                        className="rounded-circle border p-1" 
                        alt="admin" 
                    />
                    <span className="position-absolute bottom-0 end-0 p-1 bg-success border border-light rounded-circle"></span>
                </div>
              </div>
            </div>
          </header>

          {/* PAGE CONTENT */}
          <main className="p-4 bg-light min-vh-100">
            <div className="fade-in">
                {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}