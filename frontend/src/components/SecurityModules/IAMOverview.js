import { useEffect, useState } from "react";

export default function IAMOverview() {
  const [iamData, setIamData] = useState(null);

  useEffect(() => {
    fetch("/api/iam")
      .then((res) => res.json())
      .then((data) => setIamData(data));
  }, []);

  return (
    <div className="p-4 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-semibold">IAM Overview</h2>
      {iamData ? (
        <div>
          <p className="text-gray-700">Total Users: {iamData.totalUsers}</p>
          <p className="text-gray-700">Active Sessions: {iamData.activeSessions}</p>
        </div>
      ) : (
        <p className="text-gray-500">Loading IAM data...</p>
      )}
    </div>
  );
}
