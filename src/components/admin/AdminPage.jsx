import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Dashboard from "./Dashboard";
import ProductManagement from "./ProductManagement";
import OrderManagement from "./OrderManagement";
import UserManagement from "./UserManagement";

function AdminPage() {
  const [tab, setTab] = useState("dashboard");

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/login");
  }

  return (
    <Container fluid>
      <Row>
        {/* SIDEBAR */}
        <Col md={2} className="bg-dark text-white vh-100 p-3">
          <h3 className="mb-4">ADMIN</h3>

          <Button
            variant="outline-light"
            className="w-100 mb-2"
            onClick={() => setTab("dashboard")}
          >
            Dashboard
          </Button>

          <Button
            variant="outline-light"
            className="w-100 mb-2"
            onClick={() => setTab("products")}
          >
            Products
          </Button>

          <Button
            variant="outline-light"
            className="w-100 mb-2"
            onClick={() => setTab("orders")}
          >
            Orders
          </Button>

          <Button
            variant="outline-light"
            className="w-100 mb-2"
            onClick={() => setTab("users")}
          >
            Users
          </Button>

          <Button
            variant="danger"
            className="w-100 mt-4"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Col>

        {/* CONTENT */}
        <Col md={10} className="p-4">
          {tab === "dashboard" && <Dashboard />}

          {tab === "products" && <ProductManagement />}

          {tab === "orders" && <OrderManagement />}

          {tab === "users" && <UserManagement />}
        </Col>
      </Row>
    </Container>
  );
}

export default AdminPage;
