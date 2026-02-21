import React,{ useEffect, useState } from "react";
import saleService from "../services/sale.service";

export default function SalesList({ refresh }) {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSales = async () => {
    setLoading(true);
    const res = await saleService.getSales();
    setSales(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadSales();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this sale?")) return;
    await saleService.deleteSale(id);
    loadSales();
  };

  if (loading) {
    return <p className="text-center mt-6">Loading sales...</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Sales List</h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {sales.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No sales found
                </td>
              </tr>
            ) : (
              sales.map((sale) => (
                <tr
                  key={sale.sale_id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium">
                    {sale.customer_name}
                  </td>

                  <td className="px-4 py-3">{sale.product}</td>

                  <td className="px-4 py-3">{sale.quantity_crate}</td>

                  <td className="px-4 py-3 font-semibold text-green-600">
                    {sale.price} birr
                  </td>

                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDelete(sale.sale_id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
