import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import CartProvider from "./components/user/CartProvider";

// USER
import Home from "./components/linh/Home";
import Details from "./components/user/Details";
import Cart from "./components/user/Cart";
import Checkout from "./components/user/Checkout";
import MyOrders from "./components/user/MyOrder";

// CATEGORY
import Muahe from "./components/linh/Muahe";
import Muadong from "./components/linh/Muadong";
import Dilam from "./components/linh/Dilam";
import Sukien from "./components/linh/Sukien";

// AUTH
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// ADMIN
import AdminPage from "./components/admin/AdminPage";

// MENU
import Menu from "./components/linh/Menu";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Menu />

        <div style={{ marginTop: "70px" }}>
          <Container fluid>
            <Routes>
              {/* PUBLIC */}
              <Route path="/" element={<Home />} />

              <Route path="/mua-he" element={<Muahe />} />
              <Route path="/mua-dong" element={<Muadong />} />
              <Route path="/di-lam" element={<Dilam />} />
              <Route path="/su-kien" element={<Sukien />} />

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
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
