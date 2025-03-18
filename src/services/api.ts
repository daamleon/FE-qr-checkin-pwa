import { Participant, ApiResponse } from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
export default API_BASE_URL;

/**
 * Fetch participant data by event ID and participant ID.
 */
export const fetchParticipantById = async (
  eventId: string,
  participantId: string
): Promise<Participant | null> => {
  try {
    console.log(
      `Fetching participant from: ${API_BASE_URL}/participants?eventId=${eventId}`
    );

    const response = await fetch(`${API_BASE_URL}/participants?eventId=${eventId}`);

    if (!response.ok) {
      throw new Error(`Error fetching participants: ${response.statusText}`);
    }

    const participants = await response.json();

    // Cari participant berdasarkan ID
    const participant = participants.find(
      (p: Participant) => p.id === participantId
    );

    return participant || null;
  } catch (error) {
    console.error("Error fetching participant:", error);
    return null;
  }
};

/**
 * Check-in participant
 */
export const checkInParticipant = async (
  participantId: string
): Promise<ApiResponse> => {
  try {
    console.log(`Checking in participant: ${participantId}`);

    // PATCH langsung ke /participants/{id}
    const updateResponse = await fetch(
      `${API_BASE_URL}/participants/${participantId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checked_in: true,
          check_in_time: new Date().toISOString(),
        }),
      }
    );

    if (!updateResponse.ok) {
      throw new Error("Failed to update participant check-in");
    }

    const updatedData: Participant = await updateResponse.json();

    return {
      success: true,
      message: "Check-in successful",
      data: updatedData,
    };
  } catch (error) {
    console.error("Error checking in participant:", error);
    return {
      success: false,
      message: "Failed to check in participant. Please try again.",
    };
  }
};
export const fetchEventById = async (organizerId: number, eventId: number) => {
  try {
    console.log(
      `🔍 Mencari event ID: ${eventId} dalam organizer ID: ${organizerId}`
    );

    // Mengambil data organizer berdasarkan organizerId
    const response = await fetch(`${API_BASE_URL}/organizers/${organizerId}`);
    if (!response.ok) {
      console.error(`❌ Gagal mengambil data untuk organizer ${organizerId}`);
      return null;
    }

    const organizer = await response.json();
    console.log(`✅ Data organizer ditemukan:`, organizer);

    // Pastikan ada event dalam organizer
    if (!organizer.events || organizer.events.length === 0) {
      console.warn(`❌ Organizer ID ${organizerId} tidak memiliki events.`);
      return null;
    }

    // Cari event berdasarkan eventId
    const event = organizer.events.find(
      (event: any) => event.id === Number(eventId)
    );
    if (event) {
      console.log(`✅ Event ditemukan: ${event.title}`);
      return event;
    } else {
      console.warn(
        `❌ Event ID ${eventId} tidak ditemukan dalam organizer ${organizerId}`
      );
      console.log(`📌 Events yang tersedia:`, organizer.events); // Debugging
      return null;
    }
  } catch (error) {
    console.error("❌ Error fetching event:", error);
    return null;
  }
};





