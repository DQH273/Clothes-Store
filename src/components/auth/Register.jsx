import { useState } from "react";

import { Container, Card, Form, Button } from "react-bootstrap";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    try {
      // validate
      if (!username || !password || !confirmPassword) {
        alert("Please fill all fields");

        return;
      }

      // confirm password
      if (password !== confirmPassword) {
        alert("Confirm Password Wrong");

        return;
      }

      // check username
      const checkUser = await axios.get(
        `http://localhost:9999/users?name=${username}`,
      );

      if (checkUser.data.length > 0) {
        alert("Username already exists");

        return;
      }

      // create user
      const newUser = {
        name: username,
        pass: password,
        role: "user",
      };

      await axios.post("http://localhost:9999/users", newUser);

      alert("Register Success");

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card className="p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">REGISTER</h2>

        <Form onSubmit={handleRegister}>
          {/* USERNAME */}
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>

            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          {/* PASSWORD */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>

            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {/* CONFIRM PASSWORD */}
          <Form.Group className="mb-4">
            <Form.Label>Confirm Password</Form.Label>

            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="dark" className="w-100">
            Register
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Register;
