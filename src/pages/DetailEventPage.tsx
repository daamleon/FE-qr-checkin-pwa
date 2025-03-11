import { useLocation } from "react-router-dom";
import ParticipantRow from "../components/ParticipantRow";

interface Participant {
  id: number;
  ticketType: string;
  buyer: string;
  status: string;
}

interface EventDetail {
  id: number;
  title: string;
  date: string;
  time: string;
  ticketsSold: number;
  checkIns: number;
  participants: Participant[];
}

const DetailEventPage = () => {
  const location = useLocation();
  const event = location.state as EventDetail | null; 
  if (!event) return <p>Event tidak ditemukan.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold">{event.title}</h2>
      <p className="text-gray-600">
        {event.date} | {event.time}
      </p>
      <p className="text-sm text-gray-500">
        {event.ticketsSold} Tiket Terjual • {event.checkIns} Check-Ins
      </p>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Cari Transaksi"
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

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
            {event.participants?.map((participant) => (
              <ParticipantRow key={participant.id} {...participant} />
            )) || (
              <tr>
                <td colSpan={4} className="p-3 text-center">
                  Tidak ada peserta.
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
