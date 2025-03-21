import React, { useState } from "react";
import {
  fetchParticipantById,
  checkInParticipant,
  fetchEventById,
} from "../services/api";
import Scanner from "./scanner/Scanner";
import ParticipantInfo from "./scanner/ParticipantInfo";
import MessageAlert from "./scanner/MessageAlert";
import CheckInSuccess from "./scanner/CheckInSuccess";

const QRScanner: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [participantData, setParticipantData] = useState<any>(null);
  const [showScanner, setShowScanner] = useState<boolean>(true);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [isAlreadyCheckedIn, setIsAlreadyCheckedIn] = useState<boolean>(false);
  const [eventName, setEventName] = useState<string>("Event Tidak Diketahui"); // Nama event default

const handleScan = async (result: any) => {
  if (result) {
    const scannedData = result?.text || result?.data || result;
    console.log("Scanned QR Data:", scannedData);

    if (!scannedData) {
      setError("Invalid QR Code.");
      return;
    }

    const [organizerId, eventId, participantId] = scannedData.trim().split("-");
    if (!organizerId || !eventId || !participantId) {
      setError("QR Code format invalid.");
      return;
    }

    console.log(
      `📌 Memanggil fetchEventById dengan organizerId: ${organizerId}, eventId: ${eventId}`
    );

    setIsLoading(true);
    setError(null);
    setParticipantData(null);
    setEventName("Event Tidak Diketahui");

    try {
      console.log(`Fetching participant with ID: ${participantId}`);
      const participant = await fetchParticipantById(eventId, participantId);

      if (!participant) {
        setError(`Participant ${participantId} not found in event ${eventId}`);
        return;
      }

      // Mengambil nama event berdasarkan organizerId dan eventId
      const event = await fetchEventById((organizerId), (eventId));
      if (event) {
        setEventName(event.title);
        console.log(`✅ Event ditemukan: ${event.title}`);
      } else {
        console.warn(`❌ Event ID ${eventId} tidak ditemukan di database.`);
      }

      if (participant.checked_in) {
        setParticipantData(participant);
        setIsAlreadyCheckedIn(true);
        setShowScanner(false);
        setShowSuccess(true);
        return;
      }

      const checkInResponse = await checkInParticipant(participantId);

      if (checkInResponse.success) {
        const updatedParticipant = {
          ...participant,
          checked_in: true,
          check_in_time: new Date().toLocaleString(),
        };

        setParticipantData(updatedParticipant);
        setIsAlreadyCheckedIn(false);
        setShowScanner(false);
        setShowSuccess(true);
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
    setError(null);
    setShowSuccess(false);
  };

  return (
    <div>
      <MessageAlert message={error} type="error" />

      {showSuccess && participantData && (
        <CheckInSuccess
          participantName={participantData.name}
          ticketType={participantData.ticket_type || "General Admission"}
          eventName={eventName} // Nama event yang diambil otomatis
          eventDate={participantData.check_in_time || "Belum Check-in"}
          isAlreadyCheckedIn={isAlreadyCheckedIn}
          onClose={handleRescan}
        />
      )}

      {!showSuccess &&
        (participantData ? (
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
        ))}
    </div>
  );
};

export default QRScanner;
