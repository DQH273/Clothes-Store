import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SUB_CATEGORIES = [
  { id: "all", label: "Tất cả" },
  { id: "ao", label: "Áo" },
  { id: "quan", label: "Quần" },
  { id: "vay-dam", label: "Váy - Đầm" },
  { id: "vest-suit", label: "Vest - Suit" },
];

function getSubCategory(title) {
  const t = title.toLowerCase();

  if (t.includes("váy") || t.includes("đầm")) return "vay-dam";
  if (t.includes("vest") || t.includes("suit")) return "vest-suit";
  if (t.includes("áo")) return "ao";
  if (t.includes("quần")) return "quan";

  return "other";
}

function getCategoryName(category) {
  switch (category) {
    case "mua-he":
      return "Mùa Hè";

    case "mua-dong":
      return "Mùa Đông";

    case "di-lam":
      return "Đi Làm";

    case "su-kien":
      return "Sự Kiện";

    default:
      return category;
  }
}

function Categories({ products, currentCategory }) {
  const navigate = useNavigate();

  const [subCategory, setSubCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const showSubCategory = true;

  const mainProducts =
    currentCategory === "all"
      ? products
      : products.filter((p) => p.category === currentCategory);

  let finalProducts = mainProducts.filter((p) => {
    const matchesSub =
      subCategory === "all" || getSubCategory(p.title) === subCategory;

    const matchesSearch = p.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesSub && matchesSearch;
  });

  if (sortOption === "az") {
    finalProducts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "za") {
    finalProducts.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortOption === "price_desc") {
    finalProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "price_asc") {
    finalProducts.sort((a, b) => a.price - b.price);
  }

  return (
    <div>
      {/* Search + Sort */}
      <div
        style={{
          border: "2px solid #ddd",
          padding: "15px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "350px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Sắp xếp</option>
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
          <option value="price_desc">Giá cao → thấp</option>
          <option value="price_asc">Giá thấp → cao</option>
        </select>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        {showSubCategory && (
          <aside
            style={{
              width: "220px",
              border: "1px solid #ddd",
              padding: "15px",
            }}
          >
            <h5>Danh mục</h5>

            {SUB_CATEGORIES.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSubCategory(sub.id)}
                style={{
                  width: "100%",
                  marginBottom: "8px",
                  padding: "8px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  textAlign: "left",
                  backgroundColor: subCategory === sub.id ? "black" : "#f5f5f5",
                  color: subCategory === sub.id ? "white" : "black",
                }}
              >
                {sub.label}
              </button>
            ))}
          </aside>
        )}

        <main style={{ flex: 1 }}>
          {finalProducts.length === 0 ? (
            <h4 style={{ textAlign: "center" }}>Không tìm thấy sản phẩm</h4>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "20px",
              }}
            >
              {finalProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/details/${product.id}`)}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "15px",
                    textAlign: "center",
                    backgroundColor: "white",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={`/${product.img}`}
                    alt={product.title}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />

                  <h5
                    style={{
                      marginTop: "10px",
                    }}
                  >
                    {product.title}
                  </h5>

                  <div
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: "#f1f1f1",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "12px",
                      }}
                    >
                      {getCategoryName(product.category)}
                    </span>
                  </div>

                  <h5
                    style={{
                      color: "red",
                    }}
                  >
                    {product.price.toLocaleString("vi-VN")}₫
                  </h5>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Categories;
