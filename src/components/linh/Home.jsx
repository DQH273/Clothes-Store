import { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9999/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleSearchClick() {
    const result = products.filter(
      (c) =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.price.toString().includes(search),
    );
    setFilteredProducts(result);
  }

  return (
    <div
      className="p-4"
      style={{ backgroundColor: "#ebe6e6", minHeight: "100vh" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Form className="d-flex" style={{ gap: "10px" }}>
          <Form.Control
            type="search"
            placeholder="Tìm kiếm sản phẩm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 750 }}
          />
          <Button variant="info" onClick={handleSearchClick}>
            Search
          </Button>
          <Link to="/cart" style={{ marginLeft: "20px" }}>
            <Button variant="warning" style={{ fontWeight: "bold" }}>
              {" "}
              🛒{" "}
            </Button>
          </Link>
        </Form>
      </div>
      <Row className="g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((c) => (
            <Col className="mt-3" lg={2} md={3} sm={4} xs={6} key={c.id}>
              <Link to={`/home/${c.id}`} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    border: "1px solid #0c0909",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    padding: "15px",
                    textAlign: "center",
                    minHeight: "320px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={c.img}
                    alt={c.title}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />

                  <h6
                    className="mt-3"
                    style={{
                      color: "#333",
                      minHeight: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    {c.title}
                  </h6>

                  <p
                    style={{
                      color: "#d9534f",
                      fontWeight: "bold",
                      marginTop: "10px",
                    }}
                  >
                    {c.price.toLocaleString("vi-VN")}đ
                  </p>
                </div>
              </Link>
            </Col>
          ))
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Không tìm thấy sản phẩm
          </p>
        )}
      </Row>
    </div>
  );
}

export default Home;
