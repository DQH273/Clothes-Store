import { useState, useEffect } from "react";
import { Row, Col, Form, Button, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;

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
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.price.toString().includes(search),
    );

    setFilteredProducts(result);
    setCurrentPage(1);
  }

  // ===== Pagination =====
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div
      className="p-4"
      style={{
        backgroundColor: "#ebe6e6",
        minHeight: "100vh",
        marginTop: "70px",
      }}
    >
      {/* SEARCH */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Form
          className="d-flex"
          style={{
            gap: "10px",
          }}
        >
          <Form.Control
            type="search"
            placeholder="Tìm kiếm sản phẩm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "750px",
            }}
          />

          <Button variant="info" onClick={handleSearchClick}>
            Search
          </Button>
        </Form>
      </div>

      {/* PRODUCT LIST */}
      <Row className="g-4">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <Col lg={3} md={4} sm={6} xs={12} key={product.id}>
              <Link
                to={`/details/${product.id}`}
                style={{
                  textDecoration: "none",
                }}
              >
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
                    {product.title}
                  </h6>

                  <p
                    style={{
                      color: "#d9534f",
                      fontWeight: "bold",
                      marginTop: "10px",
                    }}
                  >
                    {product.price.toLocaleString("vi-VN")}đ
                  </p>
                </div>
              </Link>
            </Col>
          ))
        ) : (
          <p
            style={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Không tìm thấy sản phẩm
          </p>
        )}
      </Row>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            />

            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={currentPage === index + 1}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}

            <Pagination.Next
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
}

export default Home;
