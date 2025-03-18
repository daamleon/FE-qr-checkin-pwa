import React from "react";
import { CheckCircle, User, Ticket, Calendar } from "lucide-react";

interface CheckInSuccessProps {
  participantName: string;
  ticketType: string;
  eventName: string;
  eventDate: string;
  isAlreadyCheckedIn: boolean;
  onClose: () => void;
}

const CheckInSuccess: React.FC<CheckInSuccessProps> = ({
  participantName,
  ticketType,
  eventName,
  eventDate,
  isAlreadyCheckedIn,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full text-center">
        {/* Status Icon */}
        <div className="flex justify-center">
          <CheckCircle
            className={`w-16 h-16 ${
              isAlreadyCheckedIn ? "text-yellow-500" : "text-green-500"
            }`}
          />
        </div>

        {/* Status Text */}
        <h2
          className={`text-lg font-semibold ${
            isAlreadyCheckedIn ? "text-yellow-600" : "text-green-600"
          } mt-4`}
        >
          {isAlreadyCheckedIn ? "Sudah Check-In" : "Check-In Berhasil"}
        </h2>

        {/* Informasi Peserta */}
        <div className="mt-5 space-y-3 text-left">
          <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg">
            <User className="text-pink-700" size={20} />
            <p className="font-semibold text-gray-800">{participantName}</p>
          </div>

          <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg">
            <Ticket className="text-pink-700" size={20} />
            <div>
              <p className="font-semibold text-gray-800">{ticketType}</p>
              <p className="text-sm text-gray-500">{eventDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg">
            <Calendar className="text-pink-700" size={20} />
            <p className="font-semibold text-gray-800">{eventName}</p>
          </div>
        </div>

        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-pink-700 hover:bg-pink-600 text-white font-medium py-2 rounded-lg transition"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default CheckInSuccess;
