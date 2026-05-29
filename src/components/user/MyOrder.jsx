import { useEffect, useState } from "react";

import { Card, Row, Col, Badge } from "react-bootstrap";

import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  // current user
  const userString = localStorage.getItem("user");
  const currentUser = userString ? JSON.parse(userString) : null;

  // load orders theo user
  useEffect(() => {
    if (!currentUser) return;

    axios
      .get(`http://localhost:9999/orders?userId=${currentUser.id}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, [currentUser]);

  return (
    <div className="mt-4">
      <h1 className="mb-4">MY ORDERS</h1>

      {orders.length === 0 ? (
        <h3>No Orders Yet</h3>
      ) : (
        orders.map((order) => (
          <Card className="mb-4 p-4" key={order.id}>
            {/* ORDER INFO */}
            <div className="mb-3">
              <h5>Order ID: {order.id}</h5>

              <p>
                <b>Order Date:</b>{" "}
                {new Date(order.orderDate).toLocaleDateString("vi-VN")}
              </p>

              <p>
                <b>Shipping Address:</b> {order.shipAddress}
              </p>
            </div>

            {/* PRODUCTS */}
            {order.products.map((product, index) => (
              <Card key={index} className="mb-3 p-3">
                <Row className="align-items-center">
                  <Col md={5}>
                    <h5>{product.name}</h5>
                  </Col>

                  <Col md={2}>{product.price.toLocaleString("vi-VN")}đ</Col>

                  <Col md={2}>
                    <Badge bg="dark">x{product.quantity}</Badge>
                  </Col>

                  <Col md={3}>
                    <b>
                      {(product.price * product.quantity).toLocaleString(
                        "vi-VN",
                      )}
                      đ
                    </b>
                  </Col>
                </Row>
              </Card>
            ))}

            {/* TOTAL */}
            <h4 className="text-end mt-3">
              Total:{" "}
              {order.products
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toLocaleString("vi-VN")}
              đ
            </h4>
          </Card>
        ))
      )}
    </div>
  );
}

export default MyOrders;
