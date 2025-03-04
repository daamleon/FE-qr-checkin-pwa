import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
  ticket_type: string;
  checked_in: boolean;
  check_in_time: string | null;
}

const DataPage: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/participants") // Pastikan JSON Server berjalan
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched participants:", data); // ✅ Debugging
        setParticipants(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching participants:", err);
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-4 text-gray-600">Loading data...</p>;
  }

  if (error) {
    return <p className="text-center mt-4 text-red-600">{error}</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-center mb-4">
        QR Codes for Participants
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="flex flex-col items-center border p-4 rounded-md shadow-md"
          >
            <QRCodeCanvas value={participant.id} size={150} />
            <p className="mt-2 text-sm font-medium">{participant.name}</p>
            <p className="text-xs text-gray-500">
              Ticket Type: {participant.ticket_type}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataPage;
