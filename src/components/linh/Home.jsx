import { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9999/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleSearchClick() {
    const result = products.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.price.toString().includes(search),
    );

    setFilteredProducts(result);
  }

  return (
    <div className="p-4">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
          gap: "10px",
        }}
      >
        <Form.Control
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "600px" }}
        />

        <Button onClick={handleSearchClick}>Search</Button>
      </div>

      <Row className="g-4">
        {filteredProducts.map((product) => (
          <Col key={product.id} lg={2} md={3} sm={4} xs={6}>
            <div
              onClick={() => navigate(`/details/${product.id}`)}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "10px",
                cursor: "pointer",
                backgroundColor: "white",
                height: "100%",
              }}
            >
              <img
                src={`/${product.img}`}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <h6
                style={{
                  marginTop: "10px",
                  minHeight: "50px",
                }}
              >
                {product.title}
              </h6>

              <p
                style={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                {product.price.toLocaleString("vi-VN")}₫
              </p>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;
