"use client";

import { useParams, useRouter } from "next/navigation";
import useObjectById from "@/hooks/useObjectById";
import Skeleton from "@/components/Skeleton";
import Link from "next/link";

const ObjectDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { object, loading, error } = useObjectById(id as string);

  if (loading) {
    return (
      <div className="p-6 min-h-screen bg-gray-50 flex items-center justify-center">
        <Skeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">{object?.name}</h1>
        <div className="mt-4 space-y-2">
          {object?.data &&
            Object.entries(object.data).map(([key, value]) => (
              <div key={key} className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-md">
                {key}: {String(value)}
              </div>
            ))}
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => router.back()}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Back
          </button>
          <Link href="/objects">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Go to Objects List</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ObjectDetailPage;
