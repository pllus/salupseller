"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import https from 'https';
import Navbar from "../components/navbar";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // Import icons from lucide-react

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); // Next.js router for redirection

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/"); // Redirect if token exists
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      hostname: 'dev-api-findfiles.nawapat.com',
      port: null,
      path: '/customers/login/',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, function (res) {
      const chunks: Uint8Array[] = [];

      res.on('data', function (chunk: Uint8Array) {
        chunks.push(chunk);
      });

      res.on('end', function () {
        const body = Buffer.concat(chunks);
        const responseBody = JSON.parse(body.toString());

        if (responseBody.token) {
          localStorage.setItem("token", responseBody.token);
          setMessage("Login successful!");
          setTimeout(() => {
            router.push("/"); // Redirect after successful login
          }, 1000);
        } else {
          setMessage("Invalid login credentials.");
        }
      });
    });

    req.on('error', function (e: Error) {
      console.error(e);
      setMessage("Login failed!");
    });

    req.write(JSON.stringify({ email, password }));
    req.end();
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-green-200">
        <div className="flex-grow flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl text-black font-bold mb-4">Login ของ ลูกค้า</h2>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                title="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                required
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  title="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1 pr-10 text-black"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
              Login
            </button>
            <Link href="/sellers/login">
              <button className="w-full bg-blue-500 text-white p-2 rounded mt-4">
                หรือคุณต้องการ Login ของ คนขายชีท
              </button>
            </Link>
            {message && <p className="mt-4 text-center text-green-600">{message}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
