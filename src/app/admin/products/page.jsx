"use client";
import { useEffect, useState } from "react";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // State quản lý Form
  const [formData, setFormData] = useState({ name: "", price: "", category: "", image: "" });
  const [editId, setEditId] = useState(null);

  // Cấu hình URL API (Dùng JSON Server port 3001)
  const API_URL = "https://my-json-server.typicode.com/hongyen6887-hynt/sunktea-api/products";
  const CAT_URL = "https://my-json-server.typicode.com/hongyen6887-hynt/sunktea-api/categories";

  useEffect(() => {
    loadData();
  }, []);

  // 1. Lấy dữ liệu
  const loadData = async () => {
    setLoading(true);
    try {
      const [resP, resC] = await Promise.all([
        fetch(API_URL),
        fetch(CAT_URL)
      ]);
      setProducts(await resP.json());
      setCategories(await resC.json());
    } catch (error) {
      console.error("Lỗi kết nối API:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Xử lý Xóa
  const handleDelete = async (id) => {
    if (confirm("Xác nhận xóa món này khỏi thực đơn?")) {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      loadData();
    }
  };

  // 3. Chuẩn bị Sửa
  const handleEdit = (product) => {
    setEditId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 4. Xử lý Thêm / Cập nhật
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_URL}/${editId}` : API_URL;

    try {
      await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      alert(editId ? "Đã cập nhật!" : "Đã thêm món mới!");
      setEditId(null);
      setFormData({ name: "", price: "", category: "", image: "" });
      loadData();
    } catch (error) {
      alert("Lỗi khi lưu dữ liệu!");
    }
  };

  if (loading) return <div className="p-5 text-center text-muted">Đang tải dữ liệu...</div>;

  return (
    <div className="container-fluid">
      <div className="row g-4">
        {/* FORM NHẬP LIỆU (Bên trái) */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: "90px" }}>
            <h5 className="fw-bold mb-4 text-warning">
              {editId ? "✏️ Sửa sản phẩm" : "➕ Thêm sản phẩm"}
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-bold">Tên món</label>
                <input type="text" className="form-control border-0 bg-light shadow-none" 
                  value={formData.name} required
                  onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Giá (VNĐ)</label>
                <input type="number" className="form-control border-0 bg-light shadow-none" 
                  value={formData.price} required
                  onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Danh mục</label>
                <select className="form-select border-0 bg-light shadow-none" 
                  value={formData.category} required
                  onChange={(e) => setFormData({...formData, category: e.target.value})}>
                  <option value="">Chọn loại...</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Link ảnh</label>
                <input type="text" className="form-control border-0 bg-light shadow-none" 
                  value={formData.image} required
                  onChange={(e) => setFormData({...formData, image: e.target.value})} />
              </div>
              
              <div className="d-grid gap-2 mt-4">
                <button type="submit" className={`btn fw-bold rounded-pill ${editId ? 'btn-primary' : 'btn-warning text-white'}`}>
                  {editId ? "Cập nhật ngay" : "Thêm vào Menu"}
                </button>
                {editId && (
                  <button type="button" className="btn btn-link text-muted" onClick={() => {setEditId(null); setFormData({name:"", price:"", category:"", image:""})}}>
                    Hủy bỏ
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* DANH SÁCH (Bên phải) */}
        <div className="col-md-8">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">Sản phẩm</th>
                  <th>Giá</th>
                  <th>Danh mục</th>
                  <th className="text-end pe-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td className="ps-4 py-3">
                      <div className="d-flex align-items-center">
                        <img src={p.image} width="50" height="50" className="rounded-3 object-fit-cover me-3 shadow-sm" alt="" />
                        <span className="fw-bold">{p.name}</span>
                      </div>
                    </td>
                    <td className="text-danger fw-bold">{p.price?.toLocaleString()}đ</td>
                    <td>
                        <span className="badge bg-light text-dark border px-3 py-2 fw-normal rounded-pill">
                            {categories.find(c => c.id == p.category)?.name || p.category}
                        </span>
                    </td>
                    <td className="text-end pe-4">
                      <button onClick={() => handleEdit(p)} className="btn btn-sm btn-outline-primary border-0 me-2">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="btn btn-sm btn-outline-danger border-0">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}