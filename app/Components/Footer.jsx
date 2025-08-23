"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="text-lg font-semibold text-white">Next Product App</div>

        {/* Links */}
        <div className="flex gap-6 text-sm">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <Link href="/products" className="hover:text-white transition">
            Products
          </Link>
          <Link href="/login" className="hover:text-white transition">
            Login
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} Next Product App. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
