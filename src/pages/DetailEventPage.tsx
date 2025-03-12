import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ParticipantRow from "../components/ParticipantRow";
import API_BASE_URL from "../services/api";

interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
  ticket_type: string;
  checked_in: boolean;
  check_in_time: string | null;
}

interface EventDetail {
  id: number;
  title: string;
  date: string;
  time: string;
  tickets_sold: number;
  check_ins: number;
}

interface Organizer {
  id: number;
  name: string;
  events: EventDetail[];
}

const DetailEventPage = () => {
  const { organizerId, eventId } = useParams();
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        console.log("Fetching organizer data:", organizerId);

        const organizerResponse = await fetch(
          `${API_BASE_URL}/organizers/${organizerId}`
        );
        if (!organizerResponse.ok) throw new Error("Organizer not found");

        const organizerData: Organizer = await organizerResponse.json();

        const eventData = organizerData.events.find(
          (e: EventDetail) => e.id === Number(eventId)
        );

        if (!eventData) throw new Error("Event not found");

        setEvent(eventData);

        console.log("Fetching participants for event:", eventId);
        const participantsResponse = await fetch(
          `${API_BASE_URL}/participants?eventId=${eventId}`
        );
        if (!participantsResponse.ok)
          throw new Error("Failed to fetch participants");

        const participantsData: Participant[] =
          await participantsResponse.json();
        console.log("Participants Data:", participantsData);

        setParticipants(participantsData);
      } catch (error) {
        console.error("Error fetching event or participants:", error);
      } finally {
        setLoading(false);
      }
    };

    if (organizerId && eventId) {
      fetchEventDetail();
    }
  }, [organizerId, eventId]);

  if (loading) return <p>Loading...</p>;
  if (!event) return <p>Event tidak ditemukan.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold">{event.title}</h2>
      <p className="text-gray-600">
        {event.date} | {event.time}
      </p>
      <p className="text-sm text-gray-500">
        {event.tickets_sold} Tiket Terjual • {event.check_ins} Check-Ins
      </p>

      <div className="mt-4 bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Ticket</th>
              <th className="p-3">Buyer</th>
              <th className="p-3">Status</th>
              <th className="p-3">QR</th>
            </tr>
          </thead>
          <tbody>
            {participants.length > 0 ? (
              participants.map((participant) => (
                <ParticipantRow
                  key={participant.id}
                  organizerId={organizerId!}
                  eventId={eventId!}
                  {...participant}
                />
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-500">
                  Tidak ada peserta yang terdaftar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailEventPage;
