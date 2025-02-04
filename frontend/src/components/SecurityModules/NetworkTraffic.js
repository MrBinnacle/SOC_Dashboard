import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function NetworkTraffic() {
  const [trafficData, setTrafficData] = useState([]);

  useEffect(() => {
    fetch("/api/network-traffic")
      .then((res) => res.json())
      .then((data) => setTrafficData(data));
  }, []);

  return (
    <div className="p-4 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-semibold">Network Traffic</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={trafficData}>
          <XAxis dataKey="time" />
          <YAxis />
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="bytesTransferred" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
