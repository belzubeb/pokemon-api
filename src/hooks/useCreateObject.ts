import { useState } from "react";
import { ObjectData } from "@/types/object";
import useObjects from "@/hooks/useObjects";

const useCreateObject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { fetchObjects } = useObjects(); // 🔥 Ambil fungsi untuk fetch ulang data

  // 🚀 Fungsi untuk mengirim data ke API
  const createObject = async (newObject: Omit<ObjectData, "id">) => {
    setLoading(true);
    setError(null);

    try {
      console.log("🔹 Sending Data:", JSON.stringify(newObject));

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/objects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newObject),
      });

      console.log("🔹 Raw API Response:", response);

      if (!response.ok) {
        throw new Error(`Failed to create object: ${response.status} ${response.statusText}`);
      }

      const data: ObjectData = await response.json();
      console.log("✅ API Response Data:", data);

      setTimeout(() => {
        fetchObjects(); // Fetch ulang daftar objek agar data baru muncul
      }, 1000);

      return data;
    } catch (err) {
      console.error("❌ API Request Failed:", err);
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createObject, loading, error };
};

export default useCreateObject;
