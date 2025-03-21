import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import EventCard from "../components/event/EventCard";
import { ChevronDown } from "lucide-react";
import API_BASE_URL from "../services/api";

interface Event {
  id: number;
  date: string;
  time: string;
  title: string;
  image: string;
  tickets_sold: number;
  check_ins: number;
}

interface Organizer {
  id: number;
  name: string;
}

const EventPage = () => {
  const { id } = useParams();
  const organizerKey = Number(id);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext || !authContext.user) {
    return <p>Anda harus login untuk melihat halaman ini.</p>;
  }

  const { user } = authContext;
  const [organizers, setOrganizers] = useState<Organizer[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/organizers`);
        const data: Organizer[] = await response.json();

        // Ambil hanya organizer yang dimiliki oleh user
        const userOrganizers = data.filter((org) =>
          user.organizerIds.includes(org.id)
        );
        setOrganizers(userOrganizers);
      } catch (error) {
        console.error("Error fetching organizers:", error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/organizers/${organizerKey}`
        );
        const data = await response.json();
        setEvents(data.events || []);
      } catch (error) {
        console.error("Error fetching event data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizers();
    fetchEvents();
  }, [organizerKey]);

  const handleOrganizerChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = event.target.value;
    navigate(`/organizer/${selectedId}/events`);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-pink-700 animate-pulse">
          Loading...
        </p>
      </div>
    );

  return (
    <div className="mb-12 max-w-3xl mx-auto p-6 min-h-screen overflow-auto">
      {/* Dropdown Pilihan Organizer */}
      <div className="relative mb-4">
        <label
          htmlFor="organizer-select"
          className="block text-lg font-semibold mb-2"
        >
          Pilih Organizer:
        </label>
        <div className="relative">
          <select
            id="organizer-select"
            className="appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={organizerKey}
            onChange={handleOrganizerChange}
          >
            {organizers.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">
        Event oleh {organizers.find((org) => org.id === organizerKey)?.name}
      </h2>

      {events.length > 0 ? (
        events.map((event) => (
          <div
            key={event.id}
            className="mb-4 cursor-pointer"
            onClick={() => navigate(`/detail/${organizerKey}/${event.id}`)}
          >
            <EventCard
              time={event.time}
              date={event.date}
              title={event.title}
              image={undefined}
              ticketsSold={event.tickets_sold}
              checkIns={event.check_ins}
            />
          </div>
        ))
      ) : (
        <p className="text-gray-500">Tidak ada event untuk organizer ini.</p>
      )}
    </div>
  );
};

export default EventPage;
