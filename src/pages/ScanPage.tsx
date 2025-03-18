import React, { useEffect } from "react";
import QRScanner from "../components/QRScanner";
import { useNetwork } from "../context/NetworkContext";

const ScanPage: React.FC = () => {
  const { isOnline } = useNetwork();

  useEffect(() => {
    document.body.classList.add("overflow-hidden"); // Mencegah scroll horizontal
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  return (
    <div className="fixed min-h-screen w-full bg-white px-4 pb-40 shadow-md flex flex-col items-center justify-center">
      {/* Header */}
      <h1 className="text-xl font-semibold text-gray-800 py-2">
        Scan QR Tiket
      </h1>

      {/* Notifikasi Offline */}
      {!isOnline && (
        <div className="mb-4 p-3 bg-yellow-50 text-yellow-700 text-sm rounded-lg text-center w-full max-w-md">
          You are offline. Check-in will be queued and processed when online.
        </div>
      )}

      {/* Area Scanner */}
      <div className="w-full max-w-md flex justify-center">
        <QRScanner />
      </div>
    </div>
  );
};

export default ScanPage;
