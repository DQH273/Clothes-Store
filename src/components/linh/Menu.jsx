import { Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../user/CartProvider";

function Menu() {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const { cartCount } = useContext(CartContext);

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/login");
  }

  function handleHomeClick() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }

  return (
    <Nav
      className="d-flex flex-row align-items-center px-4"
      style={{
        backgroundColor: "#c86d63",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      }}
    >
      {/* HOME */}
      <div
        onClick={handleHomeClick}
        className="p-3"
        style={{
          color: "black",
          fontSize: 18,
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        HOME
      </div>

      {/* MÙA HÈ */}
      <NavLink
        to="/mua-he"
        className="p-3"
        style={({ isActive }) => ({
          color: isActive ? "white" : "black",
          textDecoration: isActive ? "underline" : "none",
          fontWeight: isActive ? "bold" : "normal",
          fontSize: 18,
        })}
      >
        MÙA HÈ
      </NavLink>

      {/* MÙA ĐÔNG */}
      <NavLink
        to="/mua-dong"
        className="p-3"
        style={({ isActive }) => ({
          color: isActive ? "white" : "black",
          textDecoration: isActive ? "underline" : "none",
          fontWeight: isActive ? "bold" : "normal",
          fontSize: 18,
        })}
      >
        MÙA ĐÔNG
      </NavLink>

      {/* ĐI LÀM */}
      <NavLink
        to="/di-lam"
        className="p-3"
        style={({ isActive }) => ({
          color: isActive ? "white" : "black",
          textDecoration: isActive ? "underline" : "none",
          fontWeight: isActive ? "bold" : "normal",
          fontSize: 18,
        })}
      >
        ĐI LÀM
      </NavLink>

      {/* SỰ KIỆN */}
      <NavLink
        to="/su-kien"
        className="p-3"
        style={({ isActive }) => ({
          color: isActive ? "white" : "black",
          textDecoration: isActive ? "underline" : "none",
          fontWeight: isActive ? "bold" : "normal",
          fontSize: 18,
        })}
      >
        SỰ KIỆN
      </NavLink>

      {/* RIGHT MENU */}
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          position: "relative",
          paddingRight: "20px",
        }}
      >
        {!currentUser ? (
          <>
            <NavLink
              to="/login"
              className="p-3"
              style={{
                color: "black",
                fontSize: 14,
                textDecoration: "none",
                border: "1px solid white",
                borderRadius: "7px",
                backgroundColor: "#f5f5f5",
                padding: "3px 9px",
                marginRight: "10px",
              }}
            >
              ĐĂNG NHẬP
            </NavLink>

            <NavLink
              to="/register"
              className="p-3"
              style={{
                color: "black",
                fontSize: 14,
                textDecoration: "none",
                border: "1px solid white",
                borderRadius: "7px",
                backgroundColor: "#f5f5f5",
                padding: "3px 9px",
              }}
            >
              ĐĂNG KÝ
            </NavLink>
          </>
        ) : (
          <>
            {/* ICON GIỎ HÀNG */}
            <div
              onClick={() => navigate("/cart")}
              style={{
                cursor: "pointer",
                position: "relative",
                fontSize: "24px",
              }}
            >
              🛒
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-10px",
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    minWidth: "18px",
                    height: "18px",
                    fontSize: "12px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </div>

            {/* USER */}
            <div>
              <div
                onClick={() => setShowMenu(!showMenu)}
                style={{
                  cursor: "pointer",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                👤 {currentUser.name}
              </div>

              {showMenu && (
                <div
                  style={{
                    position: "absolute",
                    top: "50px",
                    right: "10px",
                    backgroundColor: "#222",
                    minWidth: "180px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    zIndex: 999,
                  }}
                >
                  <div
                    onClick={() => navigate("/cart")}
                    style={{
                      padding: "12px",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Giỏ hàng
                  </div>

                  <div
                    onClick={() => navigate("/myorders")}
                    style={{
                      padding: "12px",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Đơn mua
                  </div>

                  {currentUser.role === "admin" && (
                    <div
                      onClick={() => navigate("/admin")}
                      style={{
                        padding: "12px",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      Dashboard
                    </div>
                  )}

                  <div
                    onClick={handleLogout}
                    style={{
                      padding: "12px",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Đăng xuất
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Nav>
  );
}

export default Menu;
