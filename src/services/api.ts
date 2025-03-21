const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
export default API_BASE_URL;

/**
 * Fetch event data by organizer ID and event ID.
 */
export const fetchEventById = async (organizerId: number, eventId: number) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/organizers/${organizerId}/events/${eventId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch event: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    return null;
  }
};

/**
 * Fetch participant data by event ID and participant ID.
 */
export const fetchParticipantById = async (
  eventId: number,
  participantId: string
) => {
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
    return participants.find((p: any) => p.id === participantId) || null;
  } catch (error) {
    console.error("Error fetching participant:", error);
    return null;
  }
};

/**
 * Check-in participant
 */
export const checkInParticipant = async (participantId: string) => {
  try {
    console.log(`Checking in participant: ${participantId}`);

    const response = await fetch(
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

    if (!response.ok) {
      throw new Error("Failed to check in participant");
    }

    return await response.json();
  } catch (error) {
    console.error("Error checking in participant:", error);
    return null;
  }
};

/**
 * Login user
 */
export const loginUser = async (email: string, password: string) => {
  try {
    console.log(`Logging in user with email: ${email}`);

    const response = await fetch(`${API_BASE_URL}/users`);

    if (!response.ok) {
      throw new Error(`Error fetching users: ${response.statusText}`);
    }

    const users = await response.json();
    const user = users.find(
      (u: any) => u.email === email && u.password === password
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
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

/**
 * Logout user
 */
export const logoutUser = () => {
  localStorage.removeItem("user");
};

/**
 * Fetch organizers for the logged-in user
 */
export const fetchUserOrganizers = async (userId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/organizers`);

    if (!response.ok) {
      throw new Error(`Error fetching organizers: ${response.statusText}`);
    }

    const organizers = await response.json();
    return organizers.filter((org: any) => org.ownerId === userId);
  } catch (error) {
    console.error("Error fetching organizers:", error);
    return [];
  }
};
