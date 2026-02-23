import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth.service";
import { useAuth } from "../context/AuthContext"; // ← ADD THIS

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ← USE AUTH CONTEXT
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

    if (result.success) {
      // Store in context AND localStorage
      login(result.user, result.token); // ← CALL CONTEXT LOGIN

      setMessage({
        text: "✅ Login successful! Redirecting...",
        type: "success",
      });

      // Redirect based on role
      // 🎯 Role-based redirect
      setTimeout(() => {
        switch (result.user.role) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "manager":
            navigate("/manager/dashboard");
            break;
          case "staff":
          default:
            navigate("/customer/dashboard");
            break;
        }
      }, 1500);
    } else {
      setMessage({ text: result.message || "❌ Login failed", type: "danger" });
    }
    setLoading(false);
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
