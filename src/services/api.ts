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
