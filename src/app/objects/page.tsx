"use client";

import React from "react";
import CreateObjectForm from "@/components/CreateObjectForm";
import useObjects from "@/hooks/useObjects";
import ObjectCard from "@/components/ObjectCard";
import Skeleton from "@/components/Skeleton";

const ObjectsPage = () => {
  const { objects, loading, error } = useObjects();

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">📦 Objects List</h1>

      <div className="flex justify-center">
        <CreateObjectForm />
      </div>

      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {loading
          ? [...Array(6)].map((_, index) => <Skeleton key={index} />)
          : objects.map((obj) => <ObjectCard key={obj.id} object={obj} />)}
      </div>
    </div>
  ); 
};

export default ObjectsPage;
