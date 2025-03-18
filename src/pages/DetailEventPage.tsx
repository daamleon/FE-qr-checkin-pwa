import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_BASE_URL from "../services/api";
import EventHeader from "../components/event/EventHeader";
import SearchBar from "../components/common/SearchBar";
import ParticipantTable from "../components/event/ParticipantTable";
import TicketSalesCard from "../components/event/DataCard";
import { BiInfoCircle } from "react-icons/bi"; 

interface Participant {
  id: string;
  name: string;
  checked_in: boolean;
}

interface EventDetail {
  id: number;
  title: string;
  date: string;
  time: string;
  tickets_sold: number;
  check_ins: number;
  image_url: string;
  revenue: number;
  user_regist: number;
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
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const organizerResponse = await fetch(
          `${API_BASE_URL}/organizers/${organizerId}`
        );
        if (!organizerResponse.ok) throw new Error("Organizer not found");

        const organizerData: Organizer = await organizerResponse.json();
        const eventData = organizerData.events.find(
          (e) => e.id === Number(eventId)
        );
        if (!eventData) throw new Error("Event not found");

        setEvent(eventData);

        const participantsResponse = await fetch(
          `${API_BASE_URL}/participants?eventId=${eventId}`
        );
        if (!participantsResponse.ok)
          throw new Error("Failed to fetch participants");

        const participantsData: Participant[] =
          await participantsResponse.json();
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

  const filteredParticipants = participants.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-pink-700 animate-pulse">
          Loading...
        </p>
      </div>
    );
  if (!event)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-pink-700">
          Data Event Tidak Ditemukan.
        </p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 pb-24">
      {/* Header dengan Ikon */}
      <div className="flex items-center gap-2 text-gray-700 py-4">
        <BiInfoCircle className="text-pink-700" size={24} />
        <h1 className="font-bold text-xl">Event Detail & Information</h1>
      </div>
      <div className="w-full flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col w-full max-w-2xl justify-center">
          <EventHeader
            title={event.title}
            date={event.date}
            time={event.time}
            image={event.image_url}
          />
        </div>

        <div className="flex flex-col w-full md:max-w-sm ">
          <TicketSalesCard
            revenue={event.revenue}
            tickets_sold={event.tickets_sold}
            check_ins={event.check_ins}
            user_regist={event.user_regist}
          />
        </div>
      </div>
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <ParticipantTable
        participants={filteredParticipants}
        organizerId={organizerId!}
        eventId={eventId!}
      />
    </div>
  );
};

export default DetailEventPage;
