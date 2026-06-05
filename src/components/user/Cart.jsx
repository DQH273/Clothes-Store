import { useEffect, useState, useContext } from "react";

import { Row, Col, Card, Button } from "react-bootstrap";

import axios from "axios";

import { CartContext } from "./CartProvider";

import { Link } from "react-router-dom";

function Cart() {
  const [carts, setCarts] = useState([]);

  const { loadCartCount } = useContext(CartContext);

  // load cart
  useEffect(() => {
    getCarts();
  }, []);

  async function getCarts() {
    try {
      const res = await axios.get("http://localhost:9999/carts");

      setCarts(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  // increase
  async function handleIncrease(item) {
    try {
      await axios.patch(`http://localhost:9999/carts/${item.id}`, {
        quantity: item.quantity + 1,
      });

      getCarts();

      loadCartCount();
    } catch (error) {
      console.log(error);
    }
  }

  // decrease
  async function handleDecrease(item) {
    try {
      // xóa nếu = 1
      if (item.quantity === 1) {
        await axios.delete(`http://localhost:9999/carts/${item.id}`);
      }

      // giảm
      else {
        await axios.patch(`http://localhost:9999/carts/${item.id}`, {
          quantity: item.quantity - 1,
        });
      }

      getCarts();

      loadCartCount();
    } catch (error) {
      console.log(error);
    }
  }

  // remove
  async function handleRemove(item) {
    try {
      await axios.delete(`http://localhost:9999/carts/${item.id}`);

      getCarts();

      loadCartCount();
    } catch (error) {
      console.log(error);
    }
  }

  // total
  const total = carts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="mt-4">
      <h1 className="mb-4 text-center">GIỎ HÀNG</h1>

      {carts.length === 0 ? (
        <h3 className="mb-4 text-center">
          Bạn chưa có sản phẩm nào trong giỏ hàng
        </h3>
      ) : (
        <>
          {carts.map((item) => (
            <Card className="mb-3 p-3" key={item.id}>
              <Row className="align-items-center">
                <Col md={2}>
                  <img src={`/${item.img}`} alt={item.title} width="100%" />
                </Col>

                <Col md={3}>
                  <h5>{item.title}</h5>
                </Col>

                <Col md={2}>{item.price.toLocaleString("vi-VN")}đ</Col>

                <Col md={3}>
                  <Button variant="danger" onClick={() => handleDecrease(item)}>
                    -
                  </Button>

                  <span className="mx-3">{item.quantity}</span>

                  <Button
                    variant="success"
                    onClick={() => handleIncrease(item)}
                  >
                    +
                  </Button>
                </Col>

                <Col md={2}>
                  <Button variant="dark" onClick={() => handleRemove(item)}>
                    Remove
                  </Button>
                </Col>
              </Row>
            </Card>
          ))}

          <h3 className="mt-4">Total: {total.toLocaleString("vi-VN")}đ</h3>

          <Link to="/checkout">
            <Button variant="primary" className="mt-3">
              Checkout
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
