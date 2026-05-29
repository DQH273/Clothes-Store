import { useEffect, useState } from "react";
import axios from "axios";

import { Row, Col, Card } from "react-bootstrap";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const productRes = await axios.get("http://localhost:9999/products");

      const orderRes = await axios.get("http://localhost:9999/orders");

      const userRes = await axios.get("http://localhost:9999/users");

      setProducts(productRes.data);
      setOrders(orderRes.data);
      setUsers(userRes.data);

      let totalRevenue = 0;

      orderRes.data.forEach((order) => {
        order.products.forEach((item) => {
          totalRevenue += item.price * item.quantity;
        });
      });

      setRevenue(totalRevenue);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h2 className="mb-4">Dashboard Overview</h2>

      <Row>
        <Col md={3}>
          <Card className="text-center p-3 shadow">
            <h1>{products.length}</h1>
            <h5>Total Products</h5>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center p-3 shadow">
            <h1>{orders.length}</h1>
            <h5>Total Orders</h5>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center p-3 shadow">
            <h1>{users.length}</h1>
            <h5>Total Users</h5>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center p-3 shadow">
            <h4>{revenue.toLocaleString("vi-VN")}đ</h4>

            <h5>Total Revenue</h5>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
