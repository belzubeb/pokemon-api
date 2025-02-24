import { useState, useEffect } from "react";
import { ObjectData } from "@/types/object";

const useObjects = () => {
  const [objects, setObjects] = useState<ObjectData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🚀 Fungsi untuk fetch data dari API
  const fetchObjects = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/objects`, {
        cache: "no-store", // 🔥 Mencegah caching
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch objects: ${response.status} ${response.statusText}`);
      }

      const data: ObjectData[] = await response.json();
      console.log("✅ Fetched Objects:", data);

      // 🚀 Paksa update state dengan cara yang lebih agresif
      setObjects([...data]); // Membuat array baru agar React mendeteksi perubahan
    } catch (err) {
      console.error("❌ Fetch Objects Failed:", err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObjects(); // Ambil data saat pertama kali di-load
  }, []);

  return { objects, loading, error, fetchObjects };
};

export default useObjects;
