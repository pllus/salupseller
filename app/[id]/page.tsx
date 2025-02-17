"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from "../components/navbar";

interface Seller {
  id: string;
  name: string;
  email: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  previewThumbnail: string;
  previewFile: string;
  fullLink?: string;  // Optional since it's missing from the API response
  createdAt: string;
  updatedAt: string;
  sellerId: string;
  seller: Seller;
}

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('sellerToken');
        const response = await fetch(`https://dev-api-findfiles.nawapat.com/salup/${params.id}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: "Product name",
            description: "Product description",
            price: 100,
            previewThumbnail: "https://example.com/image.jpg",
            previewFile: "https://example.com/file.pdf",
            fullLink: "https://example.com/product"
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data); // Debugging

        // Directly setting the product since API response is a single object
        setProduct(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-green-200">
      <div className="container mx-auto px-4 pt-20">
        <div className="text-black max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-black text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-black mb-4">{product.description}</p>
          <p className=" text-black text-xl font-semibold mb-4">ราคา: {product.price} บาท</p>
          <img 
            src={product.previewThumbnail} 
            alt={product.name}
            className="w-full h-auto rounded-lg mb-4"
          />
          <div className="mt-4 p-4 bg-gray-50 rounded text-black">
            <h2 className="text-lg font-semibold">ผู้ขาย</h2>
            <p>ชื่อ: {product.seller.name}</p>
            <p>อีเมล: {product.seller.email}</p>
          </div>
          <div className="mt-4 flex gap-4">
            <button
              onClick={() => window.history.back()}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              ย้อนกลับ
            </button>
            <button
              onClick={() => window.history.back()}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Preview(สินค้า)
            </button>
            
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
