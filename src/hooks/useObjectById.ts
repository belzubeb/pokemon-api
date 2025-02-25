import { useState, useEffect } from "react";
import { ObjectData } from "@/types/object";

const useObjectById = (id: string) => {
  const [object, setObject] = useState<ObjectData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchObjectById = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/objects/${id}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch object: ${response.status} ${response.statusText}`);
        }

        const data: ObjectData = await response.json();
        console.log("✅ Fetched Object:", data);
        setObject(data);
      } catch (err) {
        console.error("❌ Fetch Object Failed:", err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchObjectById();
  }, [id]);

  return { object, loading, error };
};

export default useObjectById;
