import React from "react";
import { QrCode, Wifi, WifiOff, Database } from "lucide-react";

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          About QR Check-in App
        </h1>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <QrCode className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-800">
                QR Check-in App
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              This Progressive Web App (PWA) is designed to streamline the
              check-in process for event participants using QR codes. It allows
              event staff to quickly scan participant QR codes and update their
              check-in status.
            </p>
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Key Features:
              </h3>
              <div className="flex items-start">
                <QrCode className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">QR Code Scanning</p>
                  <p className="text-gray-600">
                    Quickly scan participant QR codes to retrieve their
                    information
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Wifi className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Offline Support</p>
                  <p className="text-gray-600">
                    Works offline with data synchronization when connection is
                    restored
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Database className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Real-time Updates</p>
                  <p className="text-gray-600">
                    Instantly update participant check-in status in the database
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">How to Use</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-600">
              <li>Navigate to the Home page</li>
              <li>Allow camera access when prompted</li>
              <li>
                Position the participant's QR code within the scanner frame
              </li>
              <li>Once scanned, review the participant's information</li>
              <li>
                Click the "Check In Participant" button to confirm their
                attendance
              </li>
            </ol>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-md font-semibold text-blue-800 mb-2">
                Offline Mode
              </h3>
              <div className="flex items-start">
                <WifiOff className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <p className="text-blue-700">
                  When offline, the app will queue check-ins and automatically
                  sync them when your connection is restored.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
