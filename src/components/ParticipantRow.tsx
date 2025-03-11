import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

interface ParticipantProps {
  id: number;
  ticketType: string;
  buyer: string;
  status: string;
}

const ParticipantRow: React.FC<ParticipantProps> = ({
  id,
  ticketType,
  buyer,
  status,
}) => {
  const [showQR, setShowQR] = useState(false);

  return (
    <>
      <tr className="border-b">
        <td className="p-3">{ticketType}</td>
        <td className="p-3">{buyer}</td>
        <td className="p-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              status === "Check-In"
                ? "bg-green-200 text-green-800"
                : "bg-yellow-200 text-yellow-800"
            }`}
          >
            {status}
          </span>
        </td>
        <td className="p-3">
          <button
            onClick={() => setShowQR(true)}
            className="text-blue-500 hover:underline"
          >
            📷 QR Code
          </button>
        </td>
      </tr>

      {/* Modal untuk menampilkan QR Code */}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-2">
              QR Code untuk {buyer}
            </h3>

            {/* Menampilkan QR Code */}
            <QRCodeCanvas value={String(id)} size={150} />

            <button
              onClick={() => setShowQR(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ParticipantRow;
