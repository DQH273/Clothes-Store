import { Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function Menu() {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));

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
      }}
    >
      <div
        onClick={handleHomeClick}
        className="p-3"
        style={{
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: 18,
          color: "black",
        }}
      >
        HOME
      </div>

      <NavLink
        to="/mua-he"
        className="p-3"
        style={({ isActive }) => ({
          color: isActive ? "white" : "black",
          textDecoration: "none",
        })}
      >
        MÙA HÈ
      </NavLink>

      <NavLink
        to="/mua-dong"
        className="p-3"
        style={({ isActive }) => ({
          color: isActive ? "white" : "black",
          textDecoration: "none",
        })}
      >
        MÙA ĐÔNG
      </NavLink>

      <NavLink
        to="/di-lam"
        className="p-3"
        style={({ isActive }) => ({
          color: isActive ? "white" : "black",
          textDecoration: "none",
        })}
      >
        ĐI LÀM
      </NavLink>

      <NavLink
        to="/su-kien"
        className="p-3"
        style={({ isActive }) => ({
          color: isActive ? "white" : "black",
          textDecoration: "none",
        })}
      >
        SỰ KIỆN
      </NavLink>

      <div
        style={{
          marginLeft: "auto",
          position: "relative",
        }}
      >
        {!currentUser ? (
          <>
            <NavLink
              to="/login"
              className="p-2"
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              ĐĂNG NHẬP
            </NavLink>

            <NavLink
              to="/register"
              className="p-2"
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              ĐĂNG KÝ
            </NavLink>
          </>
        ) : (
          <>
            <div
              onClick={() => setShowMenu(!showMenu)}
              style={{
                cursor: "pointer",
                color: "white",
                fontWeight: "bold",
                padding: "10px",
              }}
            >
              👤 {currentUser.name}
            </div>

            {showMenu && (
              <div
                style={{
                  position: "absolute",
                  top: "45px",
                  right: 0,
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  minWidth: "180px",
                  zIndex: 999,
                }}
              >
                {currentUser.role !== "admin" && (
                  <>
                    <div
                      style={{ padding: "10px", cursor: "pointer" }}
                      onClick={() => navigate("/cart")}
                    >
                      Giỏ hàng
                    </div>

                    <div
                      style={{ padding: "10px", cursor: "pointer" }}
                      onClick={() => navigate("/myorders")}
                    >
                      Đơn mua
                    </div>
                  </>
                )}

                {currentUser.role === "admin" && (
                  <div
                    style={{ padding: "10px", cursor: "pointer" }}
                    onClick={() => navigate("/admin")}
                  >
                    Dashboard
                  </div>
                )}

                <div
                  style={{ padding: "10px", cursor: "pointer" }}
                  onClick={handleLogout}
                >
                  Đăng xuất
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Nav>
  );
}

export default Menu;
