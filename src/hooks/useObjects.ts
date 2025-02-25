import { useState, useEffect } from "react";
import { ObjectData } from "@/types/object";

const useObjects = () => {
  const [objects, setObjects] = useState<ObjectData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchObjects = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/objects`, {
        cache: "no-store", 
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch objects: ${response.status} ${response.statusText}`);
      }

      const data: ObjectData[] = await response.json();
      console.log("✅ Fetched Objects:", data);

      setObjects([...data]);
    } catch (err) {
      console.error("❌ Fetch Objects Failed:", err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObjects();
  }, []);

  return { objects, loading, error, fetchObjects };
};

export default useObjects;
