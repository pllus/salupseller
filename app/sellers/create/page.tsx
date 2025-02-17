"use client";
import { useState } from "react";
import Navbar from "@/app/components/navbar";
import { useEffect } from "react";
// import { useRouter } from "next/router";
import { redirect } from 'next/navigation'
export default function CreateSalup() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [previewThumbnail, setPreviewThumbnail] = useState("");
    const [previewFile, setPreviewFile] = useState("");
    const [fullLink, setFullLink] = useState("");
    const [message, setMessage] = useState("");
    // const [isLoading, setIsLoading] = useState(false); // Removed unused variable
    // const router = useRouter();

      useEffect(() => {
        const token = localStorage.getItem("sellerToken");
        if (!token) {
          alert("กรุณา Login ก่อนสร้างชีทใหม่");
          redirect('/'); // Redirect if already logged in
        }
      }, []);
        
    const validateForm = () => {
      if (!name || !description || price < 0) {
        setMessage("Please fill all required fields correctly");
        return false;
      }
      return true;
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      // setIsLoading(true); // Removed unused variable
      setMessage("");
  
      if (!validateForm()) {
        // setIsLoading(false); // Removed unused variable
        return;
      }
  
      try {
        const token = localStorage.getItem('sellerToken'); // Retrieve token from localStorage
        const response = await fetch('https://dev-api-findfiles.nawapat.com/salup/create/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Use the token from localStorage
          },
          body: JSON.stringify({
            name,
            description,
            price: Number(price),
            previewThumbnail,
            previewFile,
            fullLink
          })
        });
  
        const data = await response.json();
        
        if (response.ok) {
          setMessage("Salup has been created successfully!");
        } else {
          setMessage(data.message || "Failed to create salup");
        }
      } catch (error) {
        setMessage("An error occurred while creating salup หรือ คุณไม่ได้ login ");
        console.error(error);
      } finally {
        // setIsLoading(false); // Removed unused variable
      }
    };

  return (
    <>
    <Navbar/>
    <h1>Create a new salup</h1>
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-green-200">
      <div className="flex-grow flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Create Salup</h2>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              title="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
              minLength={1}
              maxLength={100}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="description">Description</label>
            <textarea
              id="description"
              title="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
              minLength={1}
              maxLength={1000}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              title="Price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
              min={0}
              max={1000}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="previewThumbnail">Preview Thumbnail</label>
            <input
              type="url"
              id="previewThumbnail"
              title="Preview Thumbnail"
              value={previewThumbnail}
              onChange={(e) => setPreviewThumbnail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="previewFile">Preview File</label>
            <input
              type="url"
              id="previewFile"
              title="Preview File"
              value={previewFile}
              onChange={(e) => setPreviewFile(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="fullLink">Full Link</label>
            <input
              type="url"
              id="fullLink"
              title="Full Link"
              value={fullLink}
              onChange={(e) => setFullLink(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
            Create
          </button>
          {message && <p className="mt-4 text-center">{message}</p>}
        </form>
      </div>
    </div>
    </>
  );
}
