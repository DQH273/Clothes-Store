import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import CartProvider from "./components/user/CartProvider";

import Details from "./components/user/Details";
import Cart from "./components/user/Cart";
import Checkout from "./components/user/Checkout";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import MyOrders from "./components/user/MyOrder";
import Home from "./components/Home";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminPage from "./components/admin/AdminPage";
import Menu from "./components/Menu";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Menu />
        <Container fluid>
          <Routes>
            {/* PUBLIC */}
            <Route path="/" element={<Home />} />

            <Route path="/details/:id" element={<Details />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            {/* USER */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />

            <Route
              path="/myorders"
              element={
                <ProtectedRoute>
                  <MyOrders />
                </ProtectedRoute>
              }
            />

            {/* ADMIN */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
