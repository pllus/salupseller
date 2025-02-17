import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [token, setToken] = useState<string | null>(null);
  const [sellerToken, setSellerToken] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [storedCredit, setStoredCredit] = useState(0);
  const [moneyBaht, setMoneyBaht] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const sellerToken = localStorage.getItem("sellerToken");

    console.log("Token from localStorage:", token);
    console.log("SellerToken from localStorage:", sellerToken);

    if (token) {
        setToken(token);
    }
    if (sellerToken) {
        setSellerToken(sellerToken);
    }

    const credit = localStorage.getItem("storedCredit");
    const money = localStorage.getItem("moneyBaht");

    if (credit) {
        setStoredCredit(parseFloat(credit));
    }
    if (money) {
        setMoneyBaht(parseFloat(money));
    }
}, []);

useEffect(() => {
    console.log("Updated sellerToken:", sellerToken);
}, [sellerToken]);

const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("sellerToken");
    setToken(null);
    setSellerToken(null);
};


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">🌟FindFile</span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="flex items-center space-x-4 mr-7">
              <span className="text-gray-900 font-medium">Credit: {storedCredit}฿</span>
            </div>
            {token || sellerToken ?  (
              <button onClick={handleLogout} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
                Logout
              </button>
            ) : (
              <Link href="/login">
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
                  Login(ลูกค้า)
                </button>
              </Link>
            )}
            <button onClick={toggleMobileMenu} data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded={isMobileMenuOpen ? "true" : "false"}>
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link href="/" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0" aria-current="page">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/register" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
                  Register(ลูกค้า)
                </Link>
              </li>
              <li>
                <Link href="/sellers/register" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
                  Register(เเม่ค้า)
                </Link>
              </li>
              <li>
                <Link href="/sellers/login" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
                  Login(เเม่ค้า)
                </Link>
              </li>
              <li>
                <Link href="/sellers/create" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
                  สร้างชีทสรุป(เเม่ค้า)
                </Link>
              </li>
              <li>
                <Link href="/voucher" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
                  จัดการ voucher(เเม่ค้า)
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
