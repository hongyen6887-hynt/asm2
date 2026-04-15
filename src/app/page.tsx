export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* 1. COMPACT HERO SECTION (Banner nhỏ gọn hơn) */}
      <section className="position-relative py-5 d-flex align-items-center" style={{ 
        minHeight: '60vh', // Giảm chiều cao xuống
        background: "linear-gradient(135deg, #FF4500 0%, #FF7034 100%)",
        borderRadius: "0 0 40px 40px"
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 text-white">
              <span className="badge rounded-pill bg-white text-danger px-3 py-2 mb-3 fw-bold shadow-sm">
                🧋 TRÀ TƯƠI MỖI NGÀY
              </span>
              <h1 className="display-4 fw-bold mb-3">
                SunkTea - Đậm Vị Trà <br /> 
                <span className="text-dark">Cháy Đam Mê</span>
              </h1>
              <p className="fs-6 mb-4 opacity-90 w-75">
                Thưởng thức hương vị trà sữa nguyên bản từ những lá trà chọn lọc, 
                giao tận tay bạn chỉ trong 15 phút.
              </p>
              <div className="d-flex gap-2">
                <button className="btn btn-dark px-4 rounded-pill fw-bold shadow">
                  Đặt ngay
                </button>
                <button className="btn btn-outline-light px-4 rounded-pill">
                  Xem Menu
                </button>
              </div>
            </div>
            
            <div className="col-lg-5 mt-4 mt-lg-0 text-center">
              <div className="position-relative d-inline-block">
                <img 
                  src="https://img.freepik.com/free-photo/delicious-iced-tea-with-straw_23-2148834015.jpg" 
                  alt="SunkTea Small Banner" 
                  className="img-fluid shadow-lg"
                  style={{ 
                    width: '320px', 
                    height: '320px', 
                    objectFit: 'cover',
                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' 
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SIGNATURE MENU (Giữ nguyên hoặc chỉnh nhẹ) */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Món "Best Seller"</h2>
          <div className="mx-auto bg-danger" style={{ height: '3px', width: '60px' }}></div>
        </div>
        <div className="row g-4">
          {[
            { name: 'Sunk Matcha Kem Muối', price: '50.000', img: '/images/matcha-kem-muoi.jpg' },
            { name: 'Trà Sữa Trân Châu Sunk', price: '35.000', img: '/images/tra-sua.webp' },
            { name: 'Trà Cam Sả Nhiệt Đới', price: '45.000', img: '/images/tra-dao-cam-sa.jpg' }
          ].map((item, idx) => (
            <div key={idx} className="col-md-4">
              <div className="card h-100 border-0 shadow-sm hover-up overflow-hidden">
                <img src={item.img} className="card-img-top" alt={item.name} style={{ height: '220px', objectFit: 'cover' }} />
                <div className="card-body p-4 text-center">
                  <h6 className="fw-bold">{item.name}</h6>
                  <p className="text-danger fw-bold mb-3">{item.price}đ</p>
                  <button className="btn btn-outline-danger btn-sm rounded-pill px-4">Thêm vào giỏ</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ĐÁNH GIÁ NGƯỜI DÙNG (Testimonials Section) */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-md-6">
              <h2 className="fw-bold">Khách hàng <span className="text-danger">Yêu Thích</span></h2>
              <p className="text-muted">Hơn 10.000+ lượt đánh giá 5 sao trên khắp cả nước.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="text-warning fs-4">
                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                <span className="ms-2 text-dark fs-6 fw-bold">4.9/5.0</span>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {[
              { name: "Khánh Linh", role: "Food Lover", text: "Trà sữa vị rất đậm, không bị ngọt gắt kiểu hóa chất. Trân châu trắng dai giòn cực thích!", img: "https://i.pravatar.cc/100?u=a" },
              { name: "Minh Hoàng", role: "Designer", text: "Thiết kế bao bì đẹp, giao hàng nhanh. Mình cực kỳ recommend món Trà Cam Sả!", img: "https://i.pravatar.cc/100?u=b" },
              { name: "Thu Thảo", role: "Sinh viên", text: "Giá cả hợp lý cho sinh viên mà chất lượng thì không thua kém gì các thương hiệu lớn.", img: "https://i.pravatar.cc/100?u=c" }
            ].map((review, idx) => (
              <div key={idx} className="col-md-4">
                <div className="bg-white p-4 rounded-4 shadow-sm h-100 border-top border-danger border-4">
                  <div className="d-flex align-items-center mb-3">
                    <img src={review.img} className="rounded-circle me-3" width="50" alt="avatar" />
                    <div>
                      <h6 className="mb-0 fw-bold">{review.name}</h6>
                      <small className="text-muted">{review.role}</small>
                    </div>
                  </div>
                  <p className="text-secondary fst-italic mb-0">"{review.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}