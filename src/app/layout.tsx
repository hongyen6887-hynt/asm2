import Link from "next/link"; // Import Link
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import UserNav from "@/components/UserNav";
import "bootstrap/dist/css/bootstrap.min.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SunkTea - Trà Sữa Chuyên Nghiệp",
  description: "Thương hiệu trà sữa SunkTea đậm vị",
};

async function getCategories() {
  try {
    const res = await fetch("http://localhost:3001/categories", { next: { revalidate: 3600 } });
    return res.ok ? res.json() : [];
  } catch { return []; }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();

  return (
    <html lang="vi" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body className="d-flex flex-column min-vh-100">
        <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top py-3">
          <div className="container">
            <Link className="navbar-brand fw-bold text-warning fs-3" href="/">
              <i className="fas fa-leaf me-2"></i>SunkTea
            </Link>
            
            <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mx-auto text-center">
                <li className="nav-item"><Link className="nav-link fw-bold" href="/">Trang Chủ</Link></li>
                <li className="nav-item dropdown">
                  <a className="nav-link fw-bold dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Thực Đơn</a>
                  <ul className="dropdown-menu border-0 shadow-sm rounded-3">
                    <li><Link className="dropdown-item small" href="/products">Tất cả sản phẩm</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    {categories.map((cat: { id: string | number; name: string }) => (
                    <li key={cat.id}>
                      <Link className="dropdown-item small" href={`/products?category=${cat.id}`}>
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                  </ul>
                </li>
                <li className="nav-item"><Link className="nav-link fw-bold" href="/cart">Giỏ Hàng</Link></li>
                <li className="nav-item"><Link className="nav-link fw-bold" href="/contact">Liên Hệ</Link></li>
              </ul>

              <div className="d-flex align-items-center justify-content-center gap-3">
                <UserNav /> 
                <button className="btn btn-warning rounded-pill px-4 fw-bold text-white shadow-sm">Đặt Giao Hàng</button>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow-1">{children}</main>
        <footer className="bg-dark text-white pt-5 pb-4 mt-auto" style={{ borderRadius: "40px 40px 0 0" }}>
              <div className="container">
                <div className="row g-4">
                  {/* Cột 1: Thương hiệu */}
                  <div className="col-lg-4 col-md-6">
                    <Link href="/" className="text-decoration-none">
                      <h4 className="fw-bold text-warning mb-4">
                        <i className="fas fa-leaf me-2"></i>SunkTea
                      </h4>
                    </Link>
                    <p className="small opacity-75 text-light" style={{ lineHeight: '1.8' }}>
                      SunkTea tự hào mang đến những ly trà sữa đậm vị, kết hợp giữa trà tươi truyền thống và phong cách pha chế hiện đại. 
                    </p>
                    <div className="d-flex gap-3 mt-4">
                      <a href="#" className="btn btn-outline-light btn-sm rounded-circle shadow-none"><i className="fab fa-facebook-f"></i></a>
                      <a href="#" className="btn btn-outline-light btn-sm rounded-circle shadow-none"><i className="fab fa-instagram"></i></a>
                      <a href="#" className="btn btn-outline-light btn-sm rounded-circle shadow-none"><i className="fab fa-tiktok"></i></a>
                    </div>
                  </div>
        
                  {/* Cột 2: Danh mục sản phẩm */}
                  <div className="col-lg-2 col-md-6">
                    <h6 className="fw-bold mb-4">Khám phá</h6>
                    <ul className="list-unstyled small">
                      <li className="mb-2"><Link href="/products" className="text-white-50 text-decoration-none">Tất cả sản phẩm</Link></li>
                      <li className="mb-2"><Link href="/products?category=1" className="text-white-50 text-decoration-none">Trà sữa truyền thống</Link></li>
                      <li className="mb-2"><Link href="/products?category=2" className="text-white-50 text-decoration-none">Trà trái cây</Link></li>
                      <li className="mb-2"><Link href="/products?category=3" className="text-white-50 text-decoration-none">Topping đặc biệt</Link></li>
                    </ul>
                  </div>
        
                  {/* Cột 3: Hỗ trợ */}
                  <div className="col-lg-2 col-md-6">
                    <h6 className="fw-bold mb-4">Hỗ trợ khách hàng</h6>
                    <ul className="list-unstyled small">
                      <li className="mb-2"><Link href="/contact" className="text-white-50 text-decoration-none">Liên hệ</Link></li>
                      <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Chính sách giao hàng</a></li>
                      <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Điều khoản sử dụng</a></li>
                      <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Câu hỏi thường gặp</a></li>
                    </ul>
                  </div>
        
                  {/* Cột 4: Đăng ký */}
                  <div className="col-lg-4 col-md-6">
                    <h6 className="fw-bold mb-4">Đăng ký nhận ưu đãi</h6>
                    <p className="small text-white-50">Để lại email để nhận mã giảm giá 20% cho đơn hàng đầu tiên.</p>
                    <div className="input-group mb-3 mt-3">
                      <input type="email" className="form-control border-0 bg-secondary-subtle shadow-none" placeholder="Email của bạn" style={{ borderRadius: "20px 0 0 20px" }} />
                      <button className="btn btn-warning fw-bold px-3 text-white" type="button" style={{ borderRadius: "0 20px 20px 0" }}>Gửi</button>
                    </div>
                  </div>
                </div>
        
                <hr className="my-4 opacity-25" />
        
                <div className="row align-items-center">
                  <div className="col-md-6 small text-white-50 text-center text-md-start">
                    © 2026 <span className="text-warning fw-bold">SunkTea</span>. All rights reserved.
                  </div>
                  <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
                    <div className="d-flex gap-2 justify-content-center justify-content-md-end opacity-50">
                      <i className="fab fa-cc-visa fs-3"></i>
                      <i className="fab fa-cc-mastercard fs-3"></i>
                      <i className="fab fa-cc-apple-pay fs-3"></i>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" defer></script>
      </body>
    </html>
  );
}