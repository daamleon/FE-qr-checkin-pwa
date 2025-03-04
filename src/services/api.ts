import { Participant, ApiResponse } from "../types";

const API_URL = "https://be-qr-checkin-pwa-production.up.railway.app/";

export const fetchParticipantById = async (id: string) => {
  try {
    console.log(`Fetching participant from: ${API_URL}/participants?id=${id}`);

    const response = await fetch(`${API_URL}/participants?id=${id}`);

    if (!response.ok) {
      throw new Error(`Error fetching participant: ${response.statusText}`);
    }

    const data = await response.json();

    return data.length ? data[0] : null;
  } catch (error) {
    console.error("Error fetching participant:", error);
    throw error;
  }
};

export const checkInParticipant = async (id: string): Promise<ApiResponse> => {
  try {
    console.log(`Checking in participant: ${id}`);

    const getResponse = await fetch(`${API_URL}/participants?id=${id}`);

    if (!getResponse.ok) {
      throw new Error("Failed to fetch participant");
    }

    const data = await getResponse.json();

    if (!data.length) {
      return { success: false, message: "Participant not found" };
    }

    const participant: Participant = data[0];

    if (participant.checked_in) {
      return {
        success: false,
        message: "Participant already checked in",
        data: participant,
      };
    }

    const updateResponse = await fetch(
      `${API_URL}/participants/${participant.id}`,
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
      throw new Error("Failed to update participant");
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
