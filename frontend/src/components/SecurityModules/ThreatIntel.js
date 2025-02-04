import { useEffect, useState } from "react";

export default function ThreatIntel() {
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    fetch("/api/threat-intel")
      .then((res) => res.json())
      .then((data) => setThreats(data));
  }, []);

  return (
    <div className="p-4 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-semibold">Threat Intelligence</h2>
      <ul className="list-disc pl-4">
        {threats.map((threat, index) => (
          <li key={index} className="text-red-600">
            {threat.type} - {threat.level}
          </li>
        ))}
      </ul>
    </div>
  );
}
