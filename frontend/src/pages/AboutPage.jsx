// Dashboard.jsx - Admin Home
import React from "react";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, Admin! 👋
        </h1>
        <p className="text-gray-600">Here's what's happening today</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Today's Sales</p>
              <p className="text-2xl font-bold mt-2">$1,250</p>
            </div>
            <span className="text-3xl">💰</span>
          </div>
          <p className="text-green-600 text-sm mt-2">↑ 12% from yesterday</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Cash Collected</p>
              <p className="text-2xl font-bold mt-2">$850</p>
            </div>
            <span className="text-3xl">💵</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Credit Owed</p>
              <p className="text-2xl font-bold mt-2">$400</p>
            </div>
            <span className="text-3xl">📝</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Est. Profit</p>
              <p className="text-2xl font-bold mt-2">$520</p>
            </div>
            <span className="text-3xl">📈</span>
          </div>
        </div>
      </div>

      {/* Low Stock Alerts */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">⚠️ Low Stock Alerts</h2>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <span className="font-medium">Coca Cola</span>
              <span className="text-sm text-gray-500 ml-2">2 left (min 5)</span>
            </div>
            <button className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
              Restock
            </button>
          </div>
          <div className="flex justify-between items-center py-3">
            <div>
              <span className="font-medium">Water 1.5L</span>
              <span className="text-sm text-gray-500 ml-2">
                3 left (min 10)
              </span>
            </div>
            <button className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
              Restock
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">⚡ Quick Actions</h2>
        <div className="flex gap-4">
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
            + New Sale
          </button>
          <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50">
            + Add Customer
          </button>
          <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50">
            Record Payment
          </button>
        </div>
      </div>

      {/* Recent Sales */}
      <div>
        <h2 className="text-lg font-semibold mb-4">📋 Recent Sales</h2>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm">INV-101</td>
                <td className="px-6 py-4 text-sm">John</td>
                <td className="px-6 py-4 text-sm">$50</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Paid
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm">INV-102</td>
                <td className="px-6 py-4 text-sm">Mary</td>
                <td className="px-6 py-4 text-sm">$120</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                    Partial
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm">INV-103</td>
                <td className="px-6 py-4 text-sm">Peter</td>
                <td className="px-6 py-4 text-sm">$80</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                    Credit
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
