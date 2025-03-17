import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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

const EventPage = () => {
  const { id } = useParams();
  const organizerKey = Number(id);
  const navigate = useNavigate();

  const [organizerName, setOrganizerName] = useState<string>(
    "Organizer Tidak Diketahui"
  );
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/organizers/${organizerKey}`
        );
        const data = await response.json();

        setOrganizerName(data.name);
        setEvents(data.events || []);
      } catch (error) {
        console.error("Error fetching event data:", error);
      } finally {
        setLoading(false);
      }
    };

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
      <div className="flex justify-center items-center place-items-center  h-full py-[65%]">
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
            <option value="1">Agentakota</option>
            <option value="2">DailyHotels</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Event oleh {organizerName}</h2>

      {/* <div className="flex gap-2 mb-4">
        <button className="bg-pink-600 text-white px-3 py-2 rounded-full">
         Daftar Event
        </button>
      </div> */}

      {events.length > 0 ? (
        events.map((event) => (
          <div
            key={event.id}
            className="mb-4 cursor-pointer"
            onClick={() => navigate(`/detail/${organizerKey}/${event.id}`)}
          >
            {/* <p className="text-gray-500 font-medium">{event.date}</p> */}
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
