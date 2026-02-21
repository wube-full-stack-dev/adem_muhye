import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
} from "react-bootstrap";
import SalesTable from "../components/SalesTable";
import { getSales, deleteSale } from "../services/sale.service";
import { useNavigate } from "react-router-dom";
const ViewSales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();
  // Fetch sales when component loads
  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    setLoading(true);
    const data = await getSales();
    setSales(data);
    setLoading(false);
  };
  const handleDelete = async (saleId) => {
    setMessage({ text: "", type: "" }); // Clear previous messages
    const response = await deleteSale(saleId);
    if (response.success) {
      setMessage({
        text: "✅ Sale deleted successfully!",
        type: "success",
      });
      loadSales(); // Refresh the list after delete
    } else {
      setMessage({
        text: "❌ Failed to delete sale",
        type: "danger",
      });
    }
  };

  // Add logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };


  return (
    <Container className="py-4 bg-secondary">
      <Row className="mb-3">
        <Col>
          <Card>
            // Add logout button in Card.Header:
            <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">📋 Sales Records</h4>
              <div>
                <Button
                  variant="light"
                  size="sm"
                  onClick={loadSales}
                  className="me-2"
                >
                  🔄 Refresh
                </Button>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                >
                  🚪 Logout
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              {/* Show message if any */}
              {message.text && (
                <Alert variant={message.type} className="mb-3">
                  {message.text}
                </Alert>
              )}

              <SalesTable
                sales={sales}
                loading={loading}
                onDelete={handleDelete}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};;

export default ViewSales;
