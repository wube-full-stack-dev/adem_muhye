import React from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const SalesTable = ({ sales, loading, onDelete }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  if (loading) {
    return (
      <div className="text-center p-4">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading sales...</p>
      </div>
    );
  }

  if (!sales || sales.length === 0) {
    return (
      <div className="text-center p-5 text-muted">
        <h5>📭 No Sales Found</h5>
        <p>Add your first sale to see it here!</p>
      </div>
    );
  }

  return (
    <Table striped bordered hover responsive className="mt-3">
      <thead className="bg-primary text-white">
        <tr>
          <th>#</th>
          <th>Customer</th>
          <th>Phone</th>
          <th>Category</th>
          <th>Product</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
          <th>Date</th>
          {isAdmin && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {sales.map((sale, index) => (
          <tr key={sale.sale_id}>
            <td>{index + 1}</td>
            <td>{sale.customer_name}</td>
            <td>{sale.customer_phone}</td>
            <td>{sale.category}</td>
            <td>{sale.product}</td>
            <td>{sale.quantity_crate}</td>
            <td>${sale.price}</td>
            <td>${sale.quantity_crate * sale.price}</td>
            <td>{new Date(sale.created_at).toLocaleDateString()}</td>
            {isAdmin && (
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(sale.sale_id, sale.customer_name)}
                >
                  🗑️ Delete
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SalesTable;
