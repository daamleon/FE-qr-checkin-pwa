import React from "react";
import { CheckCircle } from "lucide-react";

interface CheckInSuccessProps {
  participantName: string;
  ticketType: string;
  eventName: string;
  eventDate: string;
  onClose: () => void;
}

const CheckInSuccess: React.FC<CheckInSuccessProps> = ({
  participantName,
  ticketType,
  eventName,
  eventDate,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-md z-50 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
        <div className="flex justify-center">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>
        <h2 className="text-lg font-semibold text-red-600 mt-4">
          Scan QR Berhasil
        </h2>
        <p className="text-gray-500 text-sm">Semoga eventmu lancar</p>

        <div className="mt-6 space-y-3 text-left">
          <div className="flex items-center gap-2">
            <span className="bg-gray-200 p-2 rounded-full">👤</span>
            <p className="font-semibold">{participantName}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-gray-200 p-2 rounded-full">🎟️</span>
            <div>
              <p className="font-semibold">{ticketType}</p>
              <p className="text-sm text-gray-500">{eventDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-gray-200 p-2 rounded-full">🏷️</span>
            <p className="font-semibold">{eventName}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default CheckInSuccess;
