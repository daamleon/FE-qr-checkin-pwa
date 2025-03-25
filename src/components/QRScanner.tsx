import React, { useState } from "react";
import {
  fetchParticipantById,
  checkInParticipant,
  fetchEventById,
  getCurrentUser
} from "../services/api";
import Scanner from "./scanner/Scanner";
import ParticipantInfo from "./scanner/ParticipantInfo";
import MessageAlert from "./scanner/MessageAlert";
import CheckInSuccess from "./scanner/CheckInSuccess";
import { toast } from "react-toastify";

const QRScanner: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [participantData, setParticipantData] = useState<any>(null);
  const [showScanner, setShowScanner] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isAlreadyCheckedIn, setIsAlreadyCheckedIn] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  const handleScan = async (result: any) => {
    if (!result) return;

    const scannedData = result?.text || result?.data || result;
    console.log("Scanned data:", scannedData);

    // Validate QR format
    const parts = scannedData.trim().split("-");
    if (parts.length !== 3) {
      setError("Format QR tidak valid. Harap gunakan QR resmi dari event ini.");
      return;
    }

    const [organizerId, eventId, participantId] = parts;
    
    // Validate IDs
    if (!organizerId || !eventId || !participantId) {
      setError("Data QR code tidak lengkap");
      return;
    }

    if (isNaN(Number(organizerId)) || isNaN(Number(eventId))) {
      setError("ID organizer atau event tidak valid");
      return;
    }

    setIsLoading(true);
    setError(null);
    setParticipantData(null);
    setEventName("Memuat data event...");
    setEventDate("");

    try {
      const user = getCurrentUser();
      if (!user) throw new Error("Harap login terlebih dahulu");

      // Verify user has access to this organizer
      if (!user.organizerIds.includes(Number(organizerId))) {
        throw new Error("Anda tidak memiliki akses ke organizer ini");
      }

      // 1. Fetch event data
      const event = await fetchEventById(Number(organizerId), Number(eventId));
      setEventName(event.title);
      setEventDate(`${event.date} ${event.time}`);

      // 2. Fetch participant
      const participant = await fetchParticipantById(Number(eventId), participantId);
      
      // 3. Check if already checked in
      if (participant.checked_in) {
        setParticipantData(participant);
        setIsAlreadyCheckedIn(true);
        setShowSuccess(true);
        toast.info(`${participant.name} sudah check-in sebelumnya`);
        return;
      }

      // 4. Perform check-in
      const updatedParticipant = await checkInParticipant(participantId);
      setParticipantData(updatedParticipant);
      setIsAlreadyCheckedIn(false);
      setShowSuccess(true);
      toast.success(`Berhasil check-in ${participant.name}!`);

    } catch (err: any) {
      console.error("Proses check-in gagal:", err);
      setError(err.message || "Gagal melakukan check-in. Silakan coba lagi.");
      toast.error(err.message || "Check-in gagal");
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (err: any) => {
    console.error("Error scanner QR:", err);
    setError("Gagal mengakses kamera. Pastikan izin kamera diberikan.");
    toast.error("Akses kamera diperlukan untuk scanning");
  };

  const handleRescan = () => {
    setShowScanner(true);
    setShowSuccess(false);
    setParticipantData(null);
    setError(null);
  };

  return (
    <div className="qr-scanner-container">
      <MessageAlert message={error} type="error" />

      {showSuccess && participantData && (
        <CheckInSuccess
          participantName={participantData.name}
          ticketType={participantData.ticket_type || "General"}
          eventName={eventName}
          eventDate={eventDate || participantData.check_in_time}
          isAlreadyCheckedIn={isAlreadyCheckedIn}
          onClose={handleRescan}
        />
      )}

      {!showSuccess && (participantData ? (
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