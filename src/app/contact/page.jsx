"use client";
import React, { useState } from "react"; // Đảm bảo đã import React

// PHẢI CÓ 'export default' ở đây
export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="py-5 bg-light" style={{ minHeight: "80vh" }}>
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge rounded-pill bg-warning text-dark px-3 py-2 mb-2 fw-bold">CONTACT US</span>
          <h2 className="display-5 fw-bold">Kết Nối Với <span className="text-danger">SunkTea</span></h2>
        </div>

        <div className="row g-4 align-items-stretch">
          <div className="col-lg-5">
            <div className="bg-white p-4 rounded-4 shadow-sm h-100 border-start border-danger border-5">
              <h4 className="fw-bold mb-4">Thông tin liên hệ</h4>
              <p className="small text-muted"><i className="fas fa-map-marker-alt me-2 text-danger"></i> 123 Đường Trà Sữa, Quận 1, TP. HCM</p>
              <p className="small text-muted"><i className="fas fa-phone-alt me-2 text-warning"></i> 1900 1234</p>
              <p className="small text-muted"><i className="fas fa-envelope me-2 text-primary"></i> hello@sunktea.com</p>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm h-100">
              {submitted ? (
                <div className="alert alert-success text-center">Cảm ơn bạn đã liên hệ!</div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Họ và tên</label>
                    <input type="text" className="form-control border-0 bg-light shadow-none" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Email</label>
                    <input type="email" className="form-control border-0 bg-light shadow-none" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Tin nhắn</label>
                    <textarea className="form-control border-0 bg-light shadow-none" rows="4" required></textarea>
                  </div>
                  <button type="submit" className="btn btn-warning fw-bold w-100 rounded-pill">Gửi liên hệ</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}