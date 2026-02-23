import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getSales } from "../../services/sale.service";

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [recentOrders, setRecentOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
  });

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      const sales = await getSales();
      // Filter orders by current user (assuming customer_name matches username)
      const userOrders = sales.filter((sale) =>
        sale.customer_name
          .toLowerCase()
          .includes(user?.username?.toLowerCase()),
      );

      setRecentOrders(userOrders.slice(0, 5));

      const totalSpent = userOrders.reduce(
        (sum, order) => sum + order.quantity_crate * order.price,
        0,
      );

      setStats({
        totalOrders: userOrders.length,
        totalSpent,
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">
            Welcome back, {user?.full_name || user?.username}! 👋
          </h1>
          <p className="text-xl text-green-100">
            Browse our products and place your order today
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Orders</p>
                <p className="text-3xl font-bold text-gray-800">
                  {stats.totalOrders}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <span className="text-2xl">📦</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Spent</p>
                <p className="text-3xl font-bold text-gray-800">
                  ${stats.totalSpent}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Member Since</p>
                <p className="text-lg font-bold text-gray-800">
                  {new Date(user?.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <span className="text-2xl">⭐</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          🍹 Our Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Product Card - Coca Cola */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-red-600 flex items-center justify-center">
              <span className="text-6xl">🥤</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Coca Cola</h3>
              <p className="text-gray-600 text-sm mb-3">
                Classic refreshing taste
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-green-600">
                  $25/crate
                </span>
                <Link
                  to="/addsale"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </div>

          {/* Product Card - Pepsi */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-blue-600 flex items-center justify-center">
              <span className="text-6xl">🥤</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Pepsi</h3>
              <p className="text-gray-600 text-sm mb-3">
                The choice of a new generation
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-green-600">
                  $24/crate
                </span>
                <Link
                  to="/addsale"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </div>

          {/* Product Card - Sprite */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-green-600 flex items-center justify-center">
              <span className="text-6xl">🥤</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Sprite</h3>
              <p className="text-gray-600 text-sm mb-3">
                Crisp and refreshing lemon-lime
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-green-600">
                  $23/crate
                </span>
                <Link
                  to="/addsale"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </div>

          {/* Product Card - Fanta */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-orange-600 flex items-center justify-center">
              <span className="text-6xl">🥤</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Fanta</h3>
              <p className="text-gray-600 text-sm mb-3">
                Fun and fruity orange taste
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-green-600">
                  $22/crate
                </span>
                <Link
                  to="/addsale"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            📋 Your Recent Orders
          </h2>

          {recentOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Product
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Total
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.sale_id}>
                      <td className="px-4 py-3">{order.product}</td>
                      <td className="px-4 py-3">
                        {order.quantity_crate} crates
                      </td>
                      <td className="px-4 py-3">
                        ${order.quantity_crate * order.price}
                      </td>
                      <td className="px-4 py-3">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          Delivered
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No orders yet. Start shopping!
            </p>
          )}

          <div className="mt-4 text-right">
            <Link
              to="/viewsale"
              className="text-green-600 hover:text-green-700"
            >
              View All Orders →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
