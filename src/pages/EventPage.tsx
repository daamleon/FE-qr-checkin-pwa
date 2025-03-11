import { useParams, useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import { ChevronDown } from "lucide-react";

const organizers: Record<number, string> = {
  1: "Agentakota",
  2: "DailyHotels",
};

interface Event {
  id: string;
  date: string;
  time: string;
  title: string;
  image: string;
  ticketsSold: number;
  checkIns: number;
}

const eventData: Record<number, Event[]> = {
  1: [
    {
      id: "1",
      date: "10 Mar 2025",
      time: "13:00 - 16:00 WIB",
      title: "Networking Day for Startups",
      image: "/event1.jpg",
      ticketsSold: 75,
      checkIns: 50,
    },
    {
      id:"2",
      date: "18 Mar 2025",
      time: "10:00 - 14:00 WIB",
      title: "Tech Talks 2025",
      image: "/event2.jpg",
      ticketsSold: 90,
      checkIns: 60,
    },
  ],
  2: [
    {
      id:"3",
      date: "22 Mar 2025",
      time: "09:00 - 12:00 WIB",
      title: "Hotel Business Conference",
      image: "/event3.jpg",
      ticketsSold: 120,
      checkIns: 85,
    },
    {
      id:"4",
      date: "28 Mar 2025",
      time: "14:00 - 18:00 WIB",
      title: "Hospitality Management Workshop",
      image: "/event4.jpg",
      ticketsSold: 100,
      checkIns: 70,
    },
  ],
};

const EventPage = () => {
  const { id } = useParams();
  const organizerKey = Number(id);
  const navigate = useNavigate();

  console.log("Organizer ID dari URL:", id);

  const organizerName = organizers[organizerKey] ?? "Organizer Tidak Diketahui";
  const events = eventData[organizerKey] ?? [];

  const handleOrganizerChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = event.target.value;
    navigate(`/organizer/${selectedId}/events`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen overflow-auto">
      <div className="relative mb-6">
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
            {Object.entries(organizers).map(([key, name]) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Event oleh {organizerName}</h2>

      <div className="flex gap-2 mb-4">
        <button className="bg-pink-500 text-white px-3 py-2 rounded-full">
          + Tambah Event
        </button>
        <button className="border border-gray-300 px-3 py-2 rounded-full flex items-center gap-2">
          📅 Tanggal
        </button>
      </div>

      {events.length > 0 ? (
        events.map((event) => (
          <div
            key={event.id}
            className="mb-4 cursor-pointer"
            onClick={() => navigate(`/detail/${event.id}`, { state: event })}
          >
            <p className="text-gray-500 font-medium">{event.date}</p>
            <EventCard
              time={event.time}
              date={event.date}
              title={event.title}
              image={event.image}
              ticketsSold={event.ticketsSold}
              checkIns={event.checkIns}
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
