import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getSales } from "../../services/sale.service";
import { getUsers } from "../../services/admin.service";

const ManagerDashboard = () => {
  const { user, token } = useAuth();
  const [stats, setStats] = useState({
    totalSales: 0,
    totalRevenue: 0,
    totalStaff: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const sales = await getSales();
      const users = await getUsers(token);

      const staff = users.success
        ? users.data.filter((u) => u.role === "staff")
        : [];

      setStats({
        totalSales: sales.length,
        totalRevenue: sales.reduce(
          (sum, s) => sum + s.quantity_crate * s.price,
          0,
        ),
        totalStaff: staff.length,
        pendingOrders: Math.floor(sales.length * 0.3), // Example calculation
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">⭐ Manager Dashboard</h1>
          <p className="text-xl">
            Welcome back, {user?.full_name || user?.username}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Sales</p>
                <p className="text-2xl font-bold">{stats.totalSales}</p>
              </div>
              <span className="text-3xl">📊</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Revenue</p>
                <p className="text-2xl font-bold">${stats.totalRevenue}</p>
              </div>
              <span className="text-3xl">💰</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Staff</p>
                <p className="text-2xl font-bold">{stats.totalStaff}</p>
              </div>
              <span className="text-3xl">👥</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Pending</p>
                <p className="text-2xl font-bold">{stats.pendingOrders}</p>
              </div>
              <span className="text-3xl">⏳</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/admin/viewsale" // ✅ Added leading slash
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <span className="text-3xl mb-2 block">📋</span>
            <h3 className="font-bold">View All Sales</h3>
            <p className="text-sm text-gray-600">Monitor team performance</p>
          </Link>

          <Link
            to="/admin/users" // ✅ Already correct (has leading slash)
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <span className="text-3xl mb-2 block">👥</span>
            <h3 className="font-bold">Manage Staff</h3>
            <p className="text-sm text-gray-600">View staff members</p>
          </Link>

          <Link
            to="/admin/addsale" // ✅ Added leading slash
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <span className="text-3xl mb-2 block">➕</span>
            <h3 className="font-bold">New Sale</h3>
            <p className="text-sm text-gray-600">Create a test sale</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
