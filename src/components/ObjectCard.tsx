import Link from "next/link";
import { ObjectData } from "@/types/object";

interface ObjectCardProps {
  object: ObjectData;
}

const ObjectCard: React.FC<ObjectCardProps> = ({ object }) => {
  return (
    <Link href={`/objects/${object.id}`}>
      <div className="cursor-pointer bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl p-5 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">{object.name}</h2>
        {object.data ? (
          <div className="mt-3 space-y-2">
            {Object.entries(object.data).map(([key, value]) => (
              <span
                key={key}
                className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
              >
                {key}: {String(value)}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm mt-2">No additional data available</p>
        )}
      </div>
    </Link>
  );
};

export default ObjectCard;
