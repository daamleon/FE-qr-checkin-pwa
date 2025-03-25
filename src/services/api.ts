const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
export default API_BASE_URL;

export const fetchEventById = async (organizerId: number, eventId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/organizers/${organizerId}`);
    if (!response.ok) throw new Error("Organizer not found");

    const organizer = await response.json();
    const event = organizer.events.find((e: any) => e.id === eventId);

    if (!event) throw new Error("Event not found in this organizer");
    return event;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};

export const fetchParticipantById = async (
  eventId: number,
  participantId: string
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/participants`);
    if (!response.ok) throw new Error("Failed to fetch participants");

    const participants = await response.json();
    const participant = participants.find(
      (p: any) => p.id === participantId && p.eventId === eventId
    );

    if (!participant) throw new Error("Participant not found in this event");
    return participant;
  } catch (error) {
    console.error("Error fetching participant:", error);
    throw error;
  }
};

export const checkInParticipant = async (participantId: string) => {
  try {
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

    if (!response.ok) throw new Error("Check-in failed");
    return await response.json();
  } catch (error) {
    console.error("Error during check-in:", error);
    throw error;
  }
};

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
