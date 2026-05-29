import { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import axios from "axios";

function UserManagement() {
  const [users, setUsers] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const res = await axios.get("http://localhost:9999/users");

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Bạn có chắc muốn xóa user này?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:9999/users/${id}`);

      alert("Delete Success");

      loadUsers();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRoleChange(userId, newRole) {
    try {
      await axios.patch(`http://localhost:9999/users/${userId}`, {
        role: newRole,
      });

      loadUsers();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h2 className="mb-3">User Management ({users.length})</h2>

      <Table bordered hover>
        <thead>
          <tr>
            <th>ID</th>

            <th>Username</th>

            <th>Role</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>

              <td>{user.name}</td>

              <td style={{ width: "200px" }}>
                <Form.Select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="user">User</option>

                  <option value="admin">Admin</option>
                </Form.Select>
              </td>

              <td>
                {currentUser.id === user.id ? (
                  <span>Current Account</span>
                ) : (
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default UserManagement;
