import Link from "next/link";
import React from "react";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 h-screen p-4">
        <h2 className="font-bold mb-4">Dashboard</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard/add-product" className="text-blue-600">
              ➕ Add Product
            </Link>
          </li>
          <li>
            <Link href="/products" className="text-blue-600">
              🛒 View Products
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
