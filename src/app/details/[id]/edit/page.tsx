"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import useObjectById from "@/hooks/useObjectById";
import useUpdateObject from "@/hooks/useUpdateObject";

const EditObjectPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { object, loading: loadingObject, error: errorObject } = useObjectById(id as string);
  const { updateObject, loading: updating, error: errorUpdate } = useUpdateObject();

  const [name, setName] = useState("");
  const [data, setData] = useState<Record<string, string>>({});

  useEffect(() => {
    if (object) {
      setName(object.name);
      setData(
        object.data
          ? Object.fromEntries(
              Object.entries(object.data).map(([key, value]) => [key, String(value)])
            )
          : {}
      );
    }
  }, [object]);
  

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = { name, data };

    await updateObject(id as string, updatedData);
    router.push(`/details/${id}`);
  };

  if (loadingObject) return <p>Loading object...</p>;
  if (errorObject) return <p className="text-red-500">{errorObject}</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Object</h1>

        <form onSubmit={handleUpdate} className="mt-4 space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Additional Data</label>
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={key}
                  readOnly
                  className="w-1/3 px-4 py-2 border rounded-md bg-gray-100"
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setData({ ...data, [key]: e.target.value })}
                  className="w-2/3 px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                />
              </div>
            ))}
          </div>

          {errorUpdate && <p className="text-red-500">{errorUpdate}</p>}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              disabled={updating}
            >
              {updating ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditObjectPage;
