"use client";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import WebsiteCard from "./components/websiteCard";
import { useState, useEffect } from "react";

type DropdownOption = "All" | "#Official" | "#Community";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<DropdownOption>("All");
  const [searchQuery, setSearchQuery] = useState<string>(""); //  for the search query
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [data, setData] = useState<{ name: string; description: string;price:number;id: string; tag: string; url?: string }[]>([]); // State to hold fetched data with specific type
  const [page, setPage] = useState(1); // State for pagination
  const limit = 6; // Items per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        const response = await fetch(
          `https://dev-api-findfiles.nawapat.com/salup/?page=${page}&limit=${limit}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Use the token from localStorage
            },
          }
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const result = await response.json();
        console.log("Fetched result:", result);
  
        if (Array.isArray(result.data)) {
          setData((prevData) => [...prevData, ...result.data]); // Append new items to existing data
        } else {
          console.error("Unexpected response format:", result);
          setData([]); // Set empty array to avoid TypeError
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [page, limit]);
  

  const handleShowMore = () => {
    setPage(page + 1); // Increase the page number to fetch more items
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const changeDropdownOption = (option: DropdownOption) => {
    setSelectedOption(option);
    setDropdownVisible(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form refresh
  };

  return (
    <>
       <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-green-200">
        <Navbar />
        <div className="mt-10 flex-grow items-center w-full flex flex-col p-2 justify-center">

          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl ">
              <span className="inline-block mr-2 pulse-spin">🌟</span>FindFile
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 ">
              ชื้อ-ขาย ชีทสรุปได้ที่นี้เลยจ้า
            </p>
            {/* ---------------------------------------------------------------- */}
            {/* Dropdown and Search Input */}
            <form
              className="flex w-full justify-center items-center"
              onSubmit={handleSubmit}
            >
              <div className="flex ">
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only">
                  Your Email
                </label>
                <div className="relative">
                  <button
                    id="dropdown-button"
                    data-dropdown-toggle="dropdown"
                    className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
                    type="button"
                    onClick={toggleDropdown}
                  >
                    <span id="selected-option">{selectedOption}</span>
                    <svg
                      className={`w-2.5 h-2.5 ml-2.5 ${
                        dropdownVisible ? "transform rotate-180" : ""
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  {dropdownVisible && (
                    <div
                      id="dropdown"
                      className="bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute z-20"
                    >
                      <ul
                        className="py-2 text-sm text-gray-700"
                        aria-labelledby="dropdown-button"
                      >
                        <li>
                          <button
                            type="button"
                            onClick={() => changeDropdownOption("All")}
                            className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                          >
                            All
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            onClick={() => changeDropdownOption("#Official")}
                            className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                          >
                            <span className="flex w-2 h-2 mr-1 bg-blue-500 rounded-full"></span>
                            Official
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            onClick={() => changeDropdownOption("#Community")}
                            className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                          >
                            <span className="flex w-2 h-2 mr-1 bg-yellow-300 rounded-full"></span>
                            Community
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="relative w-full">
                <input
                  type="search"
                  id="search-dropdown"
                  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-green-300 focus:border-green-400"
                  placeholder="ค้นหา ชีทสรุป"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // Handle search input change
                  required
                />
              </div>
            </form>

            {/* ---------------------------------------------------------------- */}
          </div>

          <section className="flex flex-wrap w-full items-center justify-center mx-auto">
            {data
              .filter((item) => {
                if (selectedOption === "All") {
                  return true; // Show all items
                } else if (selectedOption === "#Official") {
                  return item.tag === "official"; // Show items with tag 'official'
                } else if (selectedOption === "#Community") {
                  return item.tag === "community"; // Show items with tag 'community'
                }
                return false; // Default to not showing anything
              })
              .filter(
                (item) =>
                  item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  item.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  item.price||
                  item.id
              )
              .slice(0, limit) // Display a limited number of items based on limit
              .map((item, index) => (
                <div key={index} className="">
                  <WebsiteCard
                    websiteName={item.name}
                    description={item.description}
                    price={item.price}
                    websiteTag={item.tag}
                    websiteURL={item.id || "#"} // Provide a default value if item.url is undefined
                  />
                </div>
              ))}
          </section>
          {data.length > limit && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleShowMore}
                className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 shadow-md"
              >
                Show More
              </button>
            </div>
          )}
          {/* ---------------------------------------------------------------- */}
        </div>

        <div className="sticky bottom-0 md:pl-36 md:pr-36">
          <Footer />
        </div>
      </div>
    </>
  );
}
