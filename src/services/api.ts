import { Participant, ApiResponse, User } from "../types";

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

    const response = await fetch(
      `${API_BASE_URL}/participants?eventId=${eventId}`
    );

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

/**
 * Login user
 */
export const loginUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    console.log(`Logging in user with email: ${email}`);

    const response = await fetch(`${API_BASE_URL}/users`);

    if (!response.ok) {
      throw new Error(`Error fetching users: ${response.statusText}`);
    }

    const users: User[] = await response.json();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }

    localStorage.setItem("user", JSON.stringify(user));

    return user;
  } catch (error) {
    console.error("Error logging in user:", error);
    return null;
  }
};

/**
 * Get the current logged-in user from localStorage
 */
export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

/**
 * Logout user
 */
export const logoutUser = () => {
  localStorage.removeItem("user");
};

export const fetchEventById = async (eventId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch event: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    return null;
  }
};

