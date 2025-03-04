import React from "react";
import QRScanner from "../components/QRScanner";
import { useNetwork } from "../context/NetworkContext";

const ScanPage: React.FC = () => {
  const { isOnline } = useNetwork();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          QR Code Check-in
        </h1>

        {!isOnline && (
          <div className="mb-4 p-3 bg-yellow-50 text-yellow-700 text-sm rounded-lg text-center">
            You are offline. Check-in will be queued and processed when online.
          </div>
        )}

        <QRScanner />
      </div>
    </div>
  );
};

export default ScanPage;
