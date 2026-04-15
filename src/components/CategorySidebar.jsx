"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function CategorySidebar({ categories }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const handleFilter = (id) => {
    if (id === "all") {
      router.push("/products"); // Về trang tất cả sản phẩm
    } else {
      router.push(`/products?category=${id}`); 
    }
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-3 sticky-top" style={{ top: "100px" }}>
      <h6 className="fw-bold mb-3 px-2"><i className="fas fa-filter me-2 text-warning"></i>Danh mục</h6>
      <div className="list-group list-group-flush">
        <button
          onClick={() => handleFilter("all")}
          className={`list-group-item list-group-item-action border-0 rounded-3 mb-1 ${!currentCategory ? "bg-warning-subtle fw-bold text-warning" : "text-secondary"}`}
        >
          Tất cả món
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleFilter(cat.id)}
            className={`list-group-item list-group-item-action border-0 rounded-3 mb-1 ${currentCategory === cat.id ? "bg-warning-subtle fw-bold text-warning" : "text-secondary"}`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}