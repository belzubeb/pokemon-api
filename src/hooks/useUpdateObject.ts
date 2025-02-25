import { useState } from "react";
import { ObjectData } from "@/types/object";

const useUpdateObject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateObject = async (id: string, updatedData: Partial<ObjectData>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/objects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update object: ${response.status} ${response.statusText}`);
      }

      console.log("✅ Object Updated Successfully");
      return await response.json();
    } catch (err) {
      console.error("❌ Update Object Failed:", err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { updateObject, loading, error };
};

export default useUpdateObject;
