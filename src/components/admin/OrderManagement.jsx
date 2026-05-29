import { useEffect, useState } from "react";
import axios from "axios";

import { Table, Button, Modal, ListGroup } from "react-bootstrap";

function OrderManagement() {
  const [orders, setOrders] = useState([]);

  const [show, setShow] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const res = await axios.get("http://localhost:9999/orders");

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleView(order) {
    setSelectedOrder(order);

    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  function getOrderTotal(order) {
    return order.products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  }

  return (
    <>
      <h2 className="mb-3">Order Management ({orders.length})</h2>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>

            <th>User ID</th>

            <th>Date</th>

            <th>Address</th>

            <th>Total</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>

              <td>{order.userId}</td>

              <td>{new Date(order.orderDate).toLocaleDateString("vi-VN")}</td>

              <td>{order.shipAddress}</td>

              <td>{getOrderTotal(order).toLocaleString("vi-VN")}đ</td>

              <td>
                <Button variant="primary" onClick={() => handleView(order)}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Detail</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedOrder && (
            <>
              <p>
                <b>Order ID:</b> {selectedOrder.id}
              </p>

              <p>
                <b>User ID:</b> {selectedOrder.userId}
              </p>

              <p>
                <b>Address:</b> {selectedOrder.shipAddress}
              </p>

              <ListGroup>
                {selectedOrder.products.map((item, index) => (
                  <ListGroup.Item key={index}>
                    {item.name}
                    <br />
                    Price: {item.price.toLocaleString("vi-VN")}
                    đ
                    <br />
                    Quantity: {item.quantity}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default OrderManagement;
