import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { BiQrScan } from "react-icons/bi";


interface ParticipantProps {
  id: string;
  organizerId: string;
  eventId: string;
  name: string;
  checked_in: boolean;
}

const ParticipantRow: React.FC<ParticipantProps> = ({
  id,
  organizerId,
  eventId,
  name,
  checked_in,
}) => {
  const [showQR, setShowQR] = useState(false);

  return (
    <>
      <tr className="border-b text-xs text-center md:text-left">
        <td className="p-3">{id}</td>
        <td className="p-3">{name}</td>
        <td className="p-3">
          <span
            className={`px-2 py-1 rounded-full font-medium ${
              checked_in ? "text-green-800" : "text-yellow-800"
            }`}
          >
            {checked_in ? "Check-In" : "Belum Check-In"}
          </span>
        </td>
        <td className="p-3">
          <button
            onClick={() => setShowQR(true)}
            className="text-gray-700 hover:text-gray-800 transition"
          >
            <BiQrScan size={18} />
          </button>
        </td>
      </tr>

      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center place-items-center">
            <h3 className="text-lg font-semibold mb-4">QR Code untuk {name}</h3>
            <QRCodeCanvas
              value={`${organizerId}-${eventId}-${id}`}
              size={180}
            />
            <button
              onClick={() => setShowQR(false)}
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg"
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
