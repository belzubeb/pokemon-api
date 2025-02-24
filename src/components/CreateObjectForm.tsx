"use client";

import { useState } from "react";
import useCreateObject from "@/hooks/useCreateObject";
import toast from "react-hot-toast"; // 🚀 Import toast

const CreateObjectForm = () => {
  const { createObject, loading, error } = useCreateObject();
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
      setData({ year: "", price: "", "CPU model": "", "Hard disk size": "" }); // Reset form
    } catch (err) {
      toast.error("Failed to create object! ❌"); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
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
  );
};

export default CreateObjectForm;
