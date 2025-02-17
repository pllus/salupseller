"use client";
import Navbar from "@/app/components/navbar";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bankingAccount, setBankingAccount] = useState("");
  const [bankingAccountName, setBankingAccountName] = useState("");
  const [bankingAccountNumber, setBankingAccountNumber] = useState("");
  const [message, setMessage] = useState<{ text: string; color: string } | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://dev-api-findfiles.nawapat.com/sellers/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          password: password,
          email: email,
          bankingAccount: bankingAccount,
          bankingAccountName: bankingAccountName,
          bankingAccountNumber: bankingAccountNumber
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setMessage({ text: "Registration successful! กรุณาไปหน้า Login(เเม่ค้า)", color: "text-green-600" });
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error(error);
      setMessage({ text: "An error occurred during registration.", color: "text-red-600" });
    }
  };

  return (
    <>
      <Navbar />
      <h1 className="text-center text-2xl font-bold mt-4">/sellers/register/</h1>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-green-200">
        <div className="flex-grow flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-black">Register</h2>

            <div className="mb-4">
              <label className="block text-black" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                title="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                required
              />
            </div>

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
              <label className="block text-black" htmlFor="password">Password</label>
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

            <div className="mb-4">
              <label className="block text-black" htmlFor="bankingAccount">ชื่อธนาคาร</label>
              <input
                type="text"
                id="bankingAccount"
                title="Banking Account"
                value={bankingAccount}
                onChange={(e) => setBankingAccount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-black" htmlFor="bankingAccountName">ชื่อเจ้าของบัญชี</label>
              <input
                type="text"
                id="bankingAccountName"
                title="Banking Account Name"
                value={bankingAccountName}
                onChange={(e) => setBankingAccountName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-black" htmlFor="bankingAccountNumber">เลขบัญชี</label>
              <input
                type="text"
                id="bankingAccountNumber"
                title="Banking Account Number"
                value={bankingAccountNumber}
                onChange={(e) => setBankingAccountNumber(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                required
              />
            </div>

            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
              Register
            </button>

            {message && <p className={`mt-4 text-center ${message.color}`}>{message.text}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
