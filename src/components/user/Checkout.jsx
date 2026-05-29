import { useEffect, useState, useContext } from "react";

import { Form, Button, Card } from "react-bootstrap";

import axios from "axios";

import { CartContext } from "./CartProvider";

import { useNavigate } from "react-router-dom";

function Checkout() {
  const [carts, setCarts] = useState([]);

  const [shipAddress, setShipAddress] = useState("");

  const { setCartCount } = useContext(CartContext);

  const navigate = useNavigate();

  // current user
  const currentUser = JSON.parse(localStorage.getItem("user"));

  // protect checkout
  useEffect(() => {
    if (!currentUser) {
      alert("Please Login");

      navigate("/login");
    }
  }, []);

  // load carts
  useEffect(() => {
    axios
      .get("http://localhost:9999/carts")
      .then((res) => setCarts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // total
  const total = carts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // checkout
  async function handleCheckout() {
    try {
      // validate
      if (!shipAddress) {
        alert("Please enter shipping address");

        return;
      }

      // cart empty
      if (carts.length === 0) {
        alert("Cart is empty");

        return;
      }

      // create order
      const newOrder = {
        userId: currentUser.id,

        orderDate: new Date().toISOString(),

        products: carts.map((item) => ({
          id: item.productId,
          name: item.title,
          price: item.price,
          quantity: item.quantity,
        })),

        shipAddress,
      };

      // save order
      await axios.post("http://localhost:9999/orders", newOrder);

      // delete carts
      await Promise.all(
        carts.map((item) =>
          axios.delete(`http://localhost:9999/carts/${item.id}`),
        ),
      );

      // reset cart count
      setCartCount(0);

      alert("Checkout Success");

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mt-4">
      <Card className="p-4">
        <h2 className="mb-4">CHECKOUT</h2>

        <h4>Total: {total.toLocaleString("vi-VN")}đ</h4>

        <Form.Group className="mt-4">
          <Form.Label>Shipping Address</Form.Label>

          <Form.Control
            type="text"
            value={shipAddress}
            onChange={(e) => setShipAddress(e.target.value)}
            placeholder="Enter shipping address..."
          />
        </Form.Group>

        <Button variant="success" className="mt-4" onClick={handleCheckout}>
          Confirm Checkout
        </Button>
      </Card>
    </div>
  );
}

export default Checkout;
