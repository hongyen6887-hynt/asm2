"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Nhớ import thêm Link

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset lỗi mỗi lần bấm login
    try {
      const res = await fetch(`https://my-json-server.typicode.com/hongyen6887-hynt/sunktea-api/users?username=${username}&password=${password}`);
      const user = await res.json();

      if (user.length > 0) {
        alert("Đăng nhập thành công!");
        sessionStorage.setItem("user", JSON.stringify(user[0]));
        router.push("/");
      } else {
        setError("Sai tên đăng nhập hoặc mật khẩu!");
      }
    } catch (err) {
      setError("Lỗi kết nối server!");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
      <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-danger">Đăng Nhập</h2>
          <p className="text-muted small">Chào mừng bạn quay lại với SunkTea</p>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label small fw-bold">Tên đăng nhập</label>
            <input 
              type="text" 
              className="form-control custom-input" 
              placeholder="vanna123"
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          
          <div className="mb-4">
            <label className="form-label small fw-bold">Mật khẩu</label>
            <input 
              type="password" 
              className="form-control custom-input" 
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            {error && <div className="text-danger small mt-2 fw-bold"><i className="fas fa-exclamation-circle me-1"></i> {error}</div>}
          </div>

          <div className="d-flex justify-content-between mb-4 small">
            <div className="form-check">
              <input className="form-check-input shadow-none" type="checkbox" id="remember" />
              <label className="form-check-label text-muted" htmlFor="remember">Ghi nhớ</label>
            </div>
            <a href="#" className="text-danger text-decoration-none fw-bold">Quên mật khẩu?</a>
          </div>

          <button type="submit" className="btn btn-danger w-100 rounded-pill py-2 fw-bold shadow-sm mb-4">
            ĐĂNG NHẬP
          </button>

          <p className="text-center small mb-0 text-muted">
            Chưa có tài khoản? <Link href="/register" className="text-danger fw-bold text-decoration-none">Đăng ký ngay</Link>
          </p>
        </form>
      </div>
    </div>
  );
}