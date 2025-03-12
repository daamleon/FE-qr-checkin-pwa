import React from "react";
import ParticipantRow from "../ParticipantRow";

interface ParticipantTableProps {
  participants: any[];
  organizerId: string;
  eventId: string;
}

const ParticipantTable: React.FC<ParticipantTableProps> = ({
  participants,
  organizerId,
  eventId,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
                organizerId={organizerId}
                eventId={eventId}
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
  );
};

export default ParticipantTable;
