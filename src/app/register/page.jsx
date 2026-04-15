"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  // Hàm xử lý khi nhập liệu - Bản JS không có : React.ChangeEvent...
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Kiểm tra độ dài mật khẩu
    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    try {
      // 1. Kiểm tra username tồn tại chưa (Sử dụng port 3001)
      const checkRes = await fetch(`https://my-json-server.typicode.com/hongyen6887-hynt/sunktea-api/users?username=${formData.username}`);
      const existingUser = await checkRes.json();

      if (existingUser.length > 0) {
        setError("Tên đăng nhập này đã được sử dụng!");
        return;
      }

      // 2. Gửi dữ liệu lên JSON Server
      const res = await fetch("https://my-json-server.typicode.com/hongyen6887-hynt/sunktea-api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: "user" }),
      });

      if (res.ok) {
        alert("Đăng ký thành công! Hãy đăng nhập nhé.");
        router.push("/login");
      }
    } catch (err) {
      setError("Không thể kết nối đến Server!");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3 py-5">
      <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5" style={{ maxWidth: "450px", width: "100%" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-danger">Đăng Ký</h2>
          <p className="text-muted small">Nhập thông tin để thưởng thức SunkTea</p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label small fw-bold">Họ và tên</label>
            <input type="text" name="fullName" className="form-control custom-input" placeholder="Nguyễn Văn A" onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold">Tên đăng nhập</label>
            <input type="text" name="username" className="form-control custom-input" placeholder="vanna123" onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold">Email</label>
            <input type="email" name="email" className="form-control custom-input" placeholder="vanna@gmail.com" onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold">Số điện thoại</label>
            <input type="tel" name="phone" className="form-control custom-input" placeholder="0901234567" onChange={handleChange} required />
          </div>

          <div className="mb-4">
            <label className="form-label small fw-bold">Mật khẩu</label>
            <input type="password" name="password" className="form-control custom-input" placeholder="********" onChange={handleChange} required />
            {error && <div className="text-danger small mt-2 fw-bold">{error}</div>}
          </div>

          <button type="submit" className="btn btn-danger w-100 rounded-pill py-2 fw-bold shadow-sm mb-4">
            TẠO TÀI KHOẢN
          </button>

          <p className="text-center small mb-0">
            Đã có tài khoản? <Link href="/login" className="text-danger fw-bold text-decoration-none">Đăng nhập ngay</Link>
          </p>
        </form>
      </div>
    </div>
  );
}