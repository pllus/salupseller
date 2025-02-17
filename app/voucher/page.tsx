"use client";
import { useState } from "react";
import Navbar from "../components/navbar";


export default function VouchersPage() {
  const [vouchers, setVouchers] = useState<{ code: string; discount: string }[]>([
    { code: "DISCOUNT10", discount: "10% Off" },
    { code: "FREESHIP", discount: "Free Shipping" },
  ]);
  const [newVoucher, setNewVoucher] = useState<string>("");

  const addVoucher = () => {
    if (!newVoucher.trim()) return;
    setVouchers([...vouchers, { code: newVoucher, discount: "Custom Discount" }]);
    setNewVoucher("");
  };

  const applyVoucher = (code: string) => {
    alert(`Voucher "${code}" applied successfully!`);
  };

  return (
  <>
  <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-green-200 ">
  <Navbar />
  <div className="pt-20 p-6 max-w-xl mx-auto">
    <h1 className="text-3xl font-bold mb-4 text-black">Voucher Management</h1>

    {/* Add Voucher Section */}
    <div className="mb-4 flex gap-2">
      <input 
        type="text"
        value={newVoucher} 
        onChange={(e) => setNewVoucher(e.target.value)} 
        placeholder="Enter voucher code"
        className="border rounded-lg px-3 py-2 w-full"
      />
      <button 
        onClick={addVoucher} 
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Add Voucher
      </button>
    </div>

    {/* Voucher List */}
    <div className="space-y-3">
      {vouchers.map((voucher, index) => (
        <div 
          key={index} 
          className="border p-4 rounded-lg flex justify-between items-center bg-gray-100"
        >
          <div>
            <span className="text-lg font-semibold text-black">{voucher.code}</span>
            <p className="text-black">{voucher.discount}</p>
          </div>
          <button 
            onClick={() => applyVoucher(voucher.code)} 
            className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
          >
            Apply
          </button>
        </div>
      ))}
    </div>
  </div>
  </div>
</>

  );
}
