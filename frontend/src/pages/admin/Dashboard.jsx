import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getSales } from "../../services/sale.service";
import { getUsers } from "../../services/admin.service";

const Dashboard = () => {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalRevenue: 0,
    totalUsers: 0,
    todaySales: 0,
    topProducts: [],
    recentSales: [],
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const salesData = await getSales();
      const usersData = await getUsers(token);

      const sales = Array.isArray(salesData) ? salesData : [];
      const users = usersData.success ? usersData.data : [];

      const totalSales = sales.length;
      const totalRevenue = sales.reduce(
        (sum, sale) => sum + sale.quantity_crate * sale.price,
        0,
      );

      const today = new Date().toDateString();
      const todaySales = sales.filter(
        (sale) => new Date(sale.created_at).toDateString() === today,
      ).length;

      const productMap = {};
      sales.forEach((sale) => {
        const key = `${sale.category} - ${sale.product}`;
        productMap[key] = (productMap[key] || 0) + sale.quantity_crate;
      });

      const topProducts = Object.entries(productMap)
        .map(([name, quantity]) => ({ name, quantity }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5);

      const recentSales = sales
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);

      setStats({
        totalSales,
        totalRevenue,
        totalUsers: users.length,
        todaySales,
        topProducts,
        recentSales,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {user?.full_name || user?.username}! 👋
        </h1>
        <p className="text-gray-300">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Stats Cards - Glass Morphism */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Sales Card */}
        <div className="glass-card p-6 border-l-4 border-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-300 uppercase tracking-wider">
                Total Sales
              </p>
              <p className="text-3xl font-bold text-white mt-2">
                {stats.totalSales}
              </p>
              <p className="text-sm text-green-400 mt-2">
                ↑ 12% from last month
              </p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="glass-card p-6 border-l-4 border-green-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-300 uppercase tracking-wider">
                Total Revenue
              </p>
              <p className="text-3xl font-bold text-white mt-2">
                {formatCurrency(stats.totalRevenue)}
              </p>
              <p className="text-sm text-green-400 mt-2">
                ↑ 8% from last month
              </p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-lg">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>

        {/* Total Users Card */}
        <div className="glass-card p-6 border-l-4 border-purple-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-300 uppercase tracking-wider">
                Total Users
              </p>
              <p className="text-3xl font-bold text-white mt-2">
                {stats.totalUsers}
              </p>
              <p className="text-sm text-green-400 mt-2">↑ 5 new this month</p>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>

        {/* Today's Sales Card */}
        <div className="glass-card p-6 border-l-4 border-yellow-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-300 uppercase tracking-wider">
                Today's Sales
              </p>
              <p className="text-3xl font-bold text-white mt-2">
                {stats.todaySales}
              </p>
              <p className="text-sm text-gray-400 mt-2">Last updated: now</p>
            </div>
            <div className="bg-yellow-500/20 p-3 rounded-lg">
              <span className="text-2xl">📅</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Products Chart */}
        <div className="lg:col-span-2 glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            🏆 Top Products
          </h2>
          {stats.topProducts.length > 0 ? (
            <div className="space-y-4">
              {stats.topProducts.map((product, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-8 text-lg font-bold text-gray-400">
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-white">
                        {product.name}
                      </span>
                      <span className="text-gray-400">
                        {product.quantity} units
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{
                          width: `${(product.quantity / stats.topProducts[0].quantity) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">
              No sales data available
            </p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            ⚡ Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              to="/admin/addsale"
              className="flex items-center space-x-3 p-3 bg-green-500/20 rounded-lg hover:bg-green-500/30 transition-colors border border-green-500/30"
            >
              <span className="text-2xl">➕</span>
              <div>
                <p className="font-medium text-white">Add New Sale</p>
                <p className="text-sm text-gray-400">
                  Record a new sale transaction
                </p>
              </div>
            </Link>

            <Link
              to="/admin/users"
              className="flex items-center space-x-3 p-3 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors border border-blue-500/30"
            >
              <span className="text-2xl">👥</span>
              <div>
                <p className="font-medium text-white">Manage Users</p>
                <p className="text-sm text-gray-400">
                  Add or edit user accounts
                </p>
              </div>
            </Link>

            <Link
              to="/admin/products/add"
              className="flex items-center space-x-3 p-3 bg-purple-500/20 rounded-lg hover:bg-purple-500/30 transition-colors border border-purple-500/30"
            >
              <span className="text-2xl">🥤</span>
              <div>
                <p className="font-medium text-white">Add Product</p>
                <p className="text-sm text-gray-400">
                  Add new beverage product
                </p>
              </div>
            </Link>

            <Link
              to="/admin/viewsale"
              className="flex items-center space-x-3 p-3 bg-yellow-500/20 rounded-lg hover:bg-yellow-500/30 transition-colors border border-yellow-500/30"
            >
              <span className="text-2xl">📊</span>
              <div>
                <p className="font-medium text-white">View Reports</p>
                <p className="text-sm text-gray-400">Analyze sales data</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Sales Table */}
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">🕒 Recent Sales</h2>
          <Link
            to="/admin/viewsale"
            className="text-green-400 hover:text-green-300 text-sm font-medium"
          >
            View All →
          </Link>
        </div>

        {stats.recentSales.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 rounded-lg">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {stats.recentSales.map((sale) => (
                  <tr
                    key={sale.sale_id}
                    className="hover:bg-white/5 transition"
                  >
                    <td className="px-4 py-3 text-sm text-white">
                      {sale.customer_name}
                    </td>
                    <td className="px-4 py-3 text-sm text-white">
                      {sale.product}
                    </td>
                    <td className="px-4 py-3 text-sm text-white">
                      {sale.quantity_crate}
                    </td>
                    <td className="px-4 py-3 text-sm text-green-400 font-medium">
                      {formatCurrency(sale.quantity_crate * sale.price)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-400">
                      {formatDate(sale.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">No recent sales</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
