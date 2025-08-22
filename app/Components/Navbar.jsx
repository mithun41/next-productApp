"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="w-full shadow bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-blue-600">
            ProductApp
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Products
            </Link>

            {/* Show Dashboard only if logged in */}
            {session && (
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Login / Logout Button */}
          <div className="hidden md:flex">
            {!session ? (
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </Link>
            ) : (
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col items-center gap-4 py-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Home
            </Link>
            <Link
              href="/products"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Products
            </Link>

            {/* Dashboard for logged-in users */}
            {session && (
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Dashboard
              </Link>
            )}

            {/* Login / Logout */}
            {!session ? (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" }); // redirect to homepage after logout
                  setIsOpen(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
