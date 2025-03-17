import React from "react";

interface EventCardProps {
  date: string;
  time: string;
  title: string;
  image?: string;
  ticketsSold: number;
  checkIns: number;
}

const EventCard: React.FC<EventCardProps> = ({
  date,
  time,
  title,
  image,
  ticketsSold,
  checkIns,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md border overflow-hidden">
      {/* Gambar di atas dengan cropping bagian atas dan bawah */}
      <div className="w-full h-40 overflow-hidden">
        <img
          src={image || "/event.jpeg"} // Ambil dari public jika tidak ada gambar
          alt={title}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Info Event */}
      <div className="p-4">
        <p className="text-sm text-gray-500">
          {date} | {time}
        </p>
        <h3 className="text-lg font-semibold mt-1">{title}</h3>
        <div className="flex text-sm text-gray-600 mt-2">
          <p className="mr-4">
            <span className="text-red-500 font-bold">{ticketsSold}</span> Tiket
            Terjual
          </p>
          <p>
            <span className="text-pink-500 font-bold">{checkIns}</span> Check-In
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
