"use client";

import { useState } from "react";
import useCreateObject from "@/hooks/useCreateObject";
import toast from "react-hot-toast";

const CreateObjectForm = () => {
  const { createObject, loading, error } = useCreateObject();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [data, setData] = useState({
    year: "",
    price: "",
    "CPU model": "",
    "Hard disk size": "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newObject = {
      name,
      data: {
        year: Number(data.year),
        price: Number(data.price),
        "CPU model": data["CPU model"],
        "Hard disk size": data["Hard disk size"],
      },
    };

    console.log("Submitting Form Data:", newObject);

    try {
      await createObject(newObject);
      toast.success("Object created successfully! 🎉");
      setName("");
      setData({ year: "", price: "", "CPU model": "", "Hard disk size": "" });
      setIsOpen(false); // Close modal after submission
    } catch (err) {
      console.error("Error creating object:", err);
      toast.error((err as Error).message || "Failed to create object! ❌");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Create Object
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Create Object</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded w-full"
                required
              />
              <input
                type="number"
                placeholder="Year"
                value={data.year}
                onChange={(e) => setData({ ...data, year: e.target.value })}
                className="border p-2 rounded w-full mt-2"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={data.price}
                onChange={(e) => setData({ ...data, price: e.target.value })}
                className="border p-2 rounded w-full mt-2"
                required
              />
              <input
                type="text"
                placeholder="CPU Model"
                value={data["CPU model"]}
                onChange={(e) => setData({ ...data, "CPU model": e.target.value })}
                className="border p-2 rounded w-full mt-2"
                required
              />
              <input
                type="text"
                placeholder="Hard Disk Size"
                value={data["Hard disk size"]}
                onChange={(e) => setData({ ...data, "Hard disk size": e.target.value })}
                className="border p-2 rounded w-full mt-2"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white p-2 rounded w-full mt-4"
              >
                {loading ? "Submitting..." : "Create Object"}
              </button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 bg-gray-400 text-white px-4 py-2 rounded w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateObjectForm;
