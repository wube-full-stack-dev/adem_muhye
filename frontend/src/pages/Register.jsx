import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.service";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    full_name: "",
    password: "",
    confirmPassword: "",
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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: "Passwords do not match", type: "danger" });
      return;
    }

    if (formData.password.length < 6) {
      setMessage({
        text: "Password must be at least 6 characters",
        type: "danger",
      });
      return;
    }

    setLoading(true);

    const result = await registerUser({
      username: formData.username,
      email: formData.email,
      full_name: formData.full_name,
      password: formData.password,
    });

    setLoading(false);

    if (result.success) {
      setMessage({
        text: "✅ Registration successful! Redirecting to login...",
        type: "success",
      });
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setMessage({
        text: result.message || "❌ Registration failed",
        type: "danger",
      });
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "400px" }} className="shadow">
        <Card.Header className="bg-primary text-white text-center">
          <h4 className="mb-0">📝 Register</h4>
        </Card.Header>
        <Card.Body>
          {message.text && <Alert variant={message.type}>{message.text}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username *</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Enter username"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>
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
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Enter full name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password * (min 6 chars)</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter password"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password *</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm password"
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="w-100"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </Form>

          <div className="text-center mt-3">
            Already have an account? <Link to="/login">Login here</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
