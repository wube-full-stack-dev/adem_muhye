import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth.service";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    setLoading(true);

    const result = await loginUser(formData);

    setLoading(false);

    if (result.success) {
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(result.user));
      setMessage({
        text: "✅ Login successful! Redirecting...",
        type: "success",
      });
      setTimeout(() => navigate("/viewsale"), 1500);
    } else {
      setMessage({ text: result.message || "❌ Login failed", type: "danger" });
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "350px" }} className="shadow">
        <Card.Header className="bg-primary text-white text-center">
          <h4 className="mb-0">🔐 Login</h4>
        </Card.Header>
        <Card.Body>
          {message.text && <Alert variant={message.type}>{message.text}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter password"
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="w-100"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>

          <div className="text-center mt-3">
            Don't have an account? <Link to="/register">Register here</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
