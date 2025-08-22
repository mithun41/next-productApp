"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HighlightsProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 6))); // only first 6 products
  }, []);

  if (products.length === 0) {
    return <p className="text-center text-gray-500 mt-10">No products yet.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {p.image && (
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
              <p className="text-gray-600 mb-3 line-clamp-3">{p.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-blue-600">
                  ${p.price}
                </span>
                <Link
                  href={`/products/${p._id}`}
                  className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
