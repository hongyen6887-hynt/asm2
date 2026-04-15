"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Import thêm cái này
import AddToCart from "@/components/AddToCart";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Lấy Category ID từ URL (ví dụ: ?category=tra-sua)
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Nếu có categoryId thì gọi API kèm theo tham số lọc của json-server
        const url = categoryId 
          ? `http://localhost:3001/products?category=${categoryId}`
          : "http://localhost:3001/products";

        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Lỗi lấy danh sách sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryId]); // useEffect sẽ chạy lại mỗi khi categoryId trên URL thay đổi

  // Logic tìm kiếm sản phẩm trên danh sách đã lọc theo Category
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-light min-vh-100">
      {/* 1. Header Trang Sản Phẩm */}
      <section className="bg-white border-bottom py-5 mb-5">
        <div className="container text-center">
          <h1 className="fw-bold text-danger">
            {categoryId ? `Danh mục: ${categoryId}` : "Thực Đơn SunkTea"}
          </h1>
          <p className="text-muted">Khám phá hương vị trà sữa đậm đà, tươi mới mỗi ngày</p>
          
          {/* Thanh tìm kiếm */}
          <div className="mx-auto mt-4" style={{ maxWidth: "500px" }}>
            <div className="input-group shadow-sm rounded-pill overflow-hidden">
              <span className="input-group-text bg-white border-0 ps-4">
                <i className="fas fa-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-0 py-3 shadow-none"
                placeholder={`Tìm trong ${categoryId || 'tất cả'}...`}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Danh Sách Sản Phẩm */}
      <div className="container pb-5">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status"></div>
            <p className="mt-3 text-muted">Đang pha chế món ngon...</p>
          </div>
        ) : (
          <>
            {/* Hiển thị số lượng tìm thấy */}
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <h5 className="fw-bold mb-0">Sản phẩm ({filteredProducts.length})</h5>
                {categoryId && (
                    <a href="/products" className="btn btn-sm btn-outline-secondary rounded-pill">
                        Xóa bộ lọc
                    </a>
                )}
            </div>

            <div className="row g-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="col-6 col-md-4 col-lg-3">
                  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden transition-card">
                    <div className="position-relative">
                      <img
                        src={product.image}
                        className="card-img-top"
                        alt={product.name}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      {product.isBestSeller && (
                        <span className="position-absolute top-0 start-0 m-3 badge rounded-pill bg-danger shadow">
                          Bán chạy 🔥
                        </span>
                      )}
                    </div>

                    <div className="card-body p-3 text-center d-flex flex-column">
                      <h6 className="fw-bold mb-2 text-truncate">
                        {product.name}
                      </h6>
                      <p className="badge bg-light text-secondary border fw-normal mb-3 align-self-center">
                        {product.category}
                      </p>
                      
                      <div className="mt-auto">
                        <h5 className="text-danger fw-bold mb-3">
                          {product.price.toLocaleString()}đ
                        </h5>
                        <div className="d-grid">
                           <AddToCart product={product} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Thông báo nếu không tìm thấy */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-5">
                <img src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png" width="120" className="opacity-25 mb-3" />
                <h5 className="text-muted">Không tìm thấy món nào phù hợp!</h5>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}