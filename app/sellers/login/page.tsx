"use client";
import { useState, useEffect } from "react";
import https from 'https';
import Navbar from "@/app/components/navbar";
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeOffIcon } from "lucide-react";



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("sellerToken");
    if (token) {
      router.push("/"); // Redirect if token exists
    }
  }, []);

  // Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      hostname: 'dev-api-findfiles.nawapat.com',
      port: null,
      path: '/sellers/login/',
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
        const response = JSON.parse(body.toString());
        if (response.token) {
          // Store token in localStorage
          localStorage.setItem('sellerToken', response.token);
          setToken(response.token);
          setMessage("Login successful!");
          router.push('/'); // Redirect after successful login
        } else {
          setMessage("Login failed!");
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
      <h1>Login Seller</h1>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-green-200">
        <div className="flex-grow flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-black">Login ของคนขายชีท</h2>
            <div className="mb-4">
              <label className="block text-black" htmlFor="email">Email</label>
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
                  className="absolute inset-y-0 right-2 flex items-center"
                >
                  {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
              Login
            </button>
            {message && <p className={`mt-4 text-center ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
            {token && <p className="mt-4 text-center">Token: {token}</p>} {/* Display the token */}
          </form>
        </div>
      </div>
    </>
  );
}