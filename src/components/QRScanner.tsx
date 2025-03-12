import React, { useState } from "react";
import { fetchParticipantById, checkInParticipant } from "../services/api";
import API_BASE_URL from "../services/api";
import Scanner from "./scanner/Scanner";
import ParticipantInfo from "./scanner/ParticipantInfo";
import MessageAlert from "./scanner/MessageAlert";

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
        console.log(`Fetching participant with ID: ${participantId}`);
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
    <div>
      <MessageAlert message={error} type="error" />
      <MessageAlert message={successMessage} type="success" />

      {participantData ? (
        <ParticipantInfo
          participant={participantData}
          onRescan={handleRescan}
        />
      ) : (
        showScanner && (
          <Scanner
            onScan={handleScan}
            onError={handleError}
            isLoading={isLoading}
          />
        )
      )}
    </div>
  );
};

export default QRScanner;
