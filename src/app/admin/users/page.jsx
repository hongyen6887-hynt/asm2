"use client";
import { useEffect, useState } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State dành cho việc sửa thành viên
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ fullName: "", email: "", role: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      setUsers(await res.json());
    } catch (error) {
      console.error("Lỗi fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (user) => {
    const newStatus = user.status === "active" ? "blocked" : "active";
    await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchUsers();
  };

  // Mở modal và đưa dữ liệu vào form
  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormData({ fullName: user.fullName, email: user.email, role: user.role });
  };

  // Xử lý lưu thông tin sau khi sửa
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      const res = await fetch(`/api/users/${editingUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // Cách đóng Modal an toàn trong Next.js
        if (typeof window !== "undefined" && window.bootstrap) {
          const modalElement = document.getElementById('editUserModal');
          const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
          if (modalInstance) modalInstance.hide();
        }
        
        await fetchUsers(); // Đợi tải xong danh sách mới
        setEditingUser(null);
        alert("Cập nhật thành công!");
      } else {
        const errorData = await res.json();
        alert("Lỗi: " + (errorData.message || "Không thể lưu"));
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Lỗi kết nối server!");
    }
  };

  if (loading) return <div className="text-center p-5">Đang tải thành viên...</div>;

  return (
    <div className="container-fluid py-4">
      <h3 className="fw-bold mb-4 text-dark">Quản lý thành viên</h3>
      
      <div className="row g-3">
        {users.map((user) => (
          <div className="col-md-4" key={user.id}>
            <div className="card border-0 shadow-sm rounded-4 p-3 h-100 position-relative">
              {/* Nút Sửa nằm góc trên bên phải */}
              <button 
                className="btn btn-sm btn-light position-absolute top-0 end-0 m-2 rounded-circle"
                data-bs-toggle="modal"
                data-bs-target="#editUserModal"
                onClick={() => handleEditClick(user)}
              >
                <i className="fas fa-pen text-primary small"></i>
              </button>

              <div className="d-flex align-items-center mb-3">
                <img 
                  src={user.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                  width="50" height="50" className="rounded-circle me-3 object-fit-cover border" alt="" 
                />
                <div className="overflow-hidden">
                  <h6 className="mb-0 fw-bold text-truncate">{user.fullName}</h6>
                  <small className="text-muted d-block text-truncate">{user.email}</small>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                <span className={`badge rounded-pill px-3 ${user.role === 'admin' ? 'bg-danger-subtle text-danger' : 'bg-secondary-subtle text-secondary'}`}>
                  {user.role?.toUpperCase()}
                </span>
                <button 
                  onClick={() => toggleStatus(user)}
                  className={`btn btn-sm rounded-pill px-3 fw-bold ${user.status === 'active' ? 'btn-outline-danger' : 'btn-success text-white'}`}
                >
                  {user.status === 'active' ? "Khóa" : "Mở khóa"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL CHỈNH SỬA THÔNG TIN */}
      <div className="modal fade" id="editUserModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 rounded-4 shadow">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">Sửa thành viên</h5>
              <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal"></button>
            </div>
            <form onSubmit={handleUpdateUser}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label small fw-bold">Họ tên</label>
                  <input 
                    type="text" 
                    className="form-control border-0 bg-light shadow-none"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Email</label>
                  <input 
                    type="email" 
                    className="form-control border-0 bg-light shadow-none"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Vai trò</label>
                  <select 
                    className="form-select border-0 bg-light shadow-none"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button type="button" className="btn btn-light rounded-pill px-4" data-bs-dismiss="modal">Hủy</button>
                <button type="submit" className="btn btn-primary rounded-pill px-4">Lưu thay đổi</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}