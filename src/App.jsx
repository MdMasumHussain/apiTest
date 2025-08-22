// import { useState } from 'react'
import './App.css'
// import Navbar from './components/Navbar'

import React, { useState } from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    if (!email || !password) {
      setMessage("Please enter email & password");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("https://dorponbackend.onrender.com/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // ✅ cookie/session পাঠানোর জন্য
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Login successful!");
        console.log("Response:", data);

        // 👉 যদি backend JWT পাঠায়, token localStorage এ রাখতে পারো
        // localStorage.setItem("token", data.token);
      } else {
        setMessage(data.message || "❌ Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-2">Login</h1>
        <p className="text-center text-gray-500 mb-6">Sign in to continue</p>

        {message && (
          <div className="mb-4 text-center text-sm">
            <span
              className={
                message.includes("✅") ? "text-green-600" : "text-red-600"
              }
            >
              {message}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900 shadow-sm outline-none focus:border-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900 shadow-sm outline-none focus:border-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gray-900 px-4 py-2.5 text-white text-sm font-medium shadow-lg hover:bg-black disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}



// function App() {
//   return (
//     <>
//       {/* <Navbar/>
//       <div>
//         <input type="email" />
//         <input type="password" name="" id="" />
//       </div> */}
      
//     </>
//   )
// }

// export default App
