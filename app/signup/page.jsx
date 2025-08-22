// File: /app/signup/page.js

"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // এরর দেখানোর জন্য স্টেট
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // পুরোনো এরর মুছে দিন

    try {
      // ধাপ ক: প্রথমে আমাদের বানানো সাইন-আপ API-তে রিকোয়েস্ট পাঠান
      const signupRes = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!signupRes.ok) {
        const data = await signupRes.json();
        throw new Error(data.message || "Something went wrong during sign up!");
      }

      // ধাপ খ: সাইন-আপ সফল হলে, অটোমেটিক লগইন করান
      const loginRes = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (loginRes.error) {
        throw new Error(loginRes.error);
      }

      // ধাপ গ: লগইন সফল হলে, প্রোডাক্ট পেজে রিডাইরেক্ট করুন
      router.push("/products");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* ... আপনার input field গুলো অপরিবর্তিত থাকবে ... */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>
        {/* ... বাকি HTML অপরিবর্তিত থাকবে ... */}
        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
