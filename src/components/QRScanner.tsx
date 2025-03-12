import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
import { AlertCircle, CheckCircle, Loader, User, RotateCw } from "lucide-react";
import { fetchParticipantById, checkInParticipant } from "../services/api";
import API_BASE_URL from "../services/api";

const QRScanner: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [participantData, setParticipantData] = useState<any>(null);
  const [showScanner, setShowScanner] = useState<boolean>(true);

  const handleScan = async (result: any) => {
    if (result) {
      const scannedData = result?.text || result?.data || result;
      console.log("Scanned QR Data:", scannedData);

      if (!scannedData) {
        setError("Invalid QR Code.");
        return;
      }

      // Pecah QR Code menjadi organizerId, eventId, participantId
      const [organizerId, eventId, participantId] = scannedData
        .trim()
        .split("-");
      if (!organizerId || !eventId || !participantId) {
        setError("QR Code format invalid.");
        return;
      }

      setIsLoading(true);
      setError(null);
      setSuccessMessage(null);
      setParticipantData(null);

      try {
        console.log(
          `Fetching participant with ID: ${participantId} in Event: ${eventId} under Organizer: ${organizerId}`
        );
        const participant = await fetchParticipantById(eventId, participantId);

        if (!participant) {
          setError(
            `Participant ${participantId} not found in event ${eventId}`
          );
          return;
        }

        console.log(`Fetching latest participant data for ${participant.id}`);
        const latestParticipantResponse = await fetch(
          `${API_BASE_URL}/participants/${participant.id}`
        );
        const latestParticipant = await latestParticipantResponse.json();

        if (latestParticipant.checked_in) {
          setSuccessMessage(
            `${latestParticipant.name} has already checked in.`
          );
          setParticipantData(latestParticipant);
          setShowScanner(false);
          return;
        }

        const checkInResponse = await checkInParticipant(participantId);

        if (checkInResponse.success) {
          setSuccessMessage(`Checked in ${participant.name} successfully!`);
          setParticipantData({
            ...participant,
            checked_in: true,
            check_in_time: new Date().toLocaleString(),
          });
          setShowScanner(false);
        } else {
          setError("Failed to check-in participant.");
        }
      } catch (err) {
        console.error("Error during check-in:", err);
        setError("Failed to process check-in.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleError = (err: any) => {
    console.error("QR Scanner error:", err);
    setError("Error accessing camera. Please try again.");
  };

  const handleRescan = () => {
    setShowScanner(true);
    setParticipantData(null);
    setSuccessMessage(null);
    setError(null);
  };

  return (
    <div className="">
      {error && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center">
          <AlertCircle className="h-4 w-4 mr-2" />
          <p>{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="p-3 bg-green-50 text-green-600 text-sm rounded-lg flex items-center">
          <CheckCircle className="h-4 w-4 mr-2" />
          <p>{successMessage}</p>
        </div>
      )}

      {participantData && (
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center space-x-4 mb-4">
            <User className="h-8 w-8 text-gray-700" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {participantData.name}
              </h3>
              <p className="text-sm text-gray-600">
                {participantData.checked_in
                  ? `Checked in at: ${participantData.check_in_time}`
                  : "Not checked in yet."}
              </p>
            </div>
          </div>
          <button
            onClick={handleRescan}
            className="mt-6 w-full flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <RotateCw className="h-4 w-4 mr-2" />
            <span>Scan Again</span>
          </button>
        </div>
      )}

      {showScanner && (
        <>
          {isLoading ? (
            <div className="flex justify-center py-6">
              <Loader className="h-8 w-8 text-blue-500 animate-spin" />
            </div>
          ) : (
            <div className="relative flex items-center justify-center h-[70vh] rounded-xl overflow-hidden">
              <p className="absolute top-3 text-white bg-gray-700 px-3 py-1 rounded-md text-sm z-10">
                Arahkan kamera ke kode QR
              </p>

              <QrScanner
                delay={500}
                onScan={handleScan}
                onError={handleError}
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
      )}
    </div>
  );
};

export default QRScanner;
