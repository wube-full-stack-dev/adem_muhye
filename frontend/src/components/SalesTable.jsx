import React from "react";
import { Table ,Button } from "react-bootstrap";
import { Trash2 } from "lucide-react"; // Optional: for trash icon

const SalesTable = ({ sales, loading, onDelete }) => {
  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (!sales || sales.length === 0) {
    return <div className="text-center p-4 text-muted">No sales found</div>;
  }
  const handleDelete = (saleId, customerName) =>
  {
    if (window.confirm(`Are you sure you want to delete sale for ${customerName}?`))
    {
      onDelete(saleId); // Call parent function
    }
  }
  return (
    <Table striped bordered hover responsive className="mt-3">
      <thead className="bg-primary text-white">
        <tr>
          <th>#</th>
          <th>Customer Name</th>
          <th>Phone</th>
          <th>Category</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price ($)</th>
          <th>Total ($)</th>
          <th>Date</th>
          <th>Action</th> {/* NEW: Action column */}
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
            <td>
              {/* ✅ Fixed: Wrapped in div to avoid hydration error */}
              <div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(sale.sale_id, sale.customer_name)}
                  title="Delete sale"
                >
                  🗑️ Delete
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot className="table-light">
        <tr>
          <td colSpan="7" className="text-end fw-bold">
            Total:
          </td>
          <td className="fw-bold text-success">
            {/* Calculate sum of all totals */}$
            {sales
              .reduce((sum, sale) => sum + sale.quantity_crate * sale.price, 0)
              .toFixed(2)}
          </td>
          <td></td>
        </tr>
      </tfoot>
    </Table>
  );
};

export default SalesTable;
