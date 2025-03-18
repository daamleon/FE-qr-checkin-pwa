import React from "react";
import QrScanner from "react-qr-scanner";
import { Loader } from "lucide-react";

interface ScannerProps {
  onScan: (result: any) => void;
  onError: (err: any) => void;
  isLoading: boolean;
}

const Scanner: React.FC<ScannerProps> = ({ onScan, onError, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center py-6">
          <Loader className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="relative flex items-center justify-center h-[70vh] rounded-xl overflow-hidden">
          <p className="absolute top-3 text-white bg-pink-700/80 px-3 py-1 rounded-md text-sm z-10">
            Arahkan kamera ke kode QR
          </p>

          <QrScanner
            delay={500}
            onScan={onScan}
            onError={onError}
            constraints={{ video: { facingMode: "environment" } }}
            style={{
              width: "600px",
              height: "100%",
              objectFit: "cover",
              border: "1px solid gray",
              borderRadius: "2%",
            }}
          />

          {window.innerWidth <= 768 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="border-2 border-white rounded-lg w-64 h-64 animate-pulse"></div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Scanner;
