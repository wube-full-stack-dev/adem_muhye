import React, { useState, useEffect } from "react";
import { getSales, deleteSale } from "../../services/sale.service";
import { useAuth } from "../../context/AuthContext";

const ViewSales = () => {
  const { user } = useAuth();
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    setLoading(true);
    const data = await getSales();
    setSales(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this sale?")) {
      await deleteSale(id);
      loadSales();
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">📋 Sales Records</h1>

        {/* Mobile Card View */}
        <div className="block lg:hidden space-y-4">
          {sales.map((sale) => (
            <div key={sale.sale_id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold text-lg">{sale.customer_name}</p>
                  <p className="text-sm text-gray-600">{sale.customer_phone}</p>
                </div>
                {user?.role === "admin" && (
                  <button
                    onClick={() => handleDelete(sale.sale_id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    🗑️
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Product:</span>
                  <p className="font-medium">{sale.product}</p>
                </div>
                <div>
                  <span className="text-gray-500">Category:</span>
                  <p className="font-medium">{sale.category}</p>
                </div>
                <div>
                  <span className="text-gray-500">Quantity:</span>
                  <p className="font-medium">{sale.quantity_crate} crates</p>
                </div>
                <div>
                  <span className="text-gray-500">Price:</span>
                  <p className="font-medium">${sale.price}</p>
                </div>
                <div>
                  <span className="text-gray-500">Total:</span>
                  <p className="font-bold text-green-600">
                    ${sale.quantity_crate * sale.price}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Date:</span>
                  <p className="font-medium">
                    {new Date(sale.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Qty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                {user?.role === "admin" && (
                  <th className="px-6 py-3">Action</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sales.map((sale) => (
                <tr key={sale.sale_id}>
                  <td className="px-6 py-4">{sale.customer_name}</td>
                  <td className="px-6 py-4">{sale.customer_phone}</td>
                  <td className="px-6 py-4">{sale.product}</td>
                  <td className="px-6 py-4">{sale.quantity_crate}</td>
                  <td className="px-6 py-4">${sale.price}</td>
                  <td className="px-6 py-4">
                    ${sale.quantity_crate * sale.price}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(sale.created_at).toLocaleDateString()}
                  </td>
                  {user?.role === "admin" && (
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(sale.sale_id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewSales;
