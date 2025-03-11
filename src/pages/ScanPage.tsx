import React from "react";
import QRScanner from "../components/QRScanner";
import { useNetwork } from "../context/NetworkContext";

const ScanPage: React.FC = () => {
  const { isOnline } = useNetwork();

  return (
    <div
      id="scan"
      className="h-screen w-screen bg-white px-4 pb-6 shadow-md rounded-lg fixed items center"
    >
      <div>
        <h1 className="text-2xl font-semibold text-center text-gray-800 m-2">
          Scan QR Tiket
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
