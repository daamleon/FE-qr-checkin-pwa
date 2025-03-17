import React from "react";

interface EventHeaderProps {
  title: string;
  date: string;
  time: string;
  // ticketsSold: number;
  // checkIns: number;
  image: string;
}

const EventHeader: React.FC<EventHeaderProps> = ({
  title,
  date,
  time,
  // ticketsSold,
  // checkIns,
  image,
}) => {
  return (
    <div>
      <div className="relative w-full h-48 rounded-lg overflow-hidden shadow-md">
        <img
          src={image || "/event.jpeg"}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-900 to-transparent flex flex-col justify-end p-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <p className="text-gray-300">
            {date} | {time}
          </p>
          {/* <p className="text-sm text-gray-400">
            {ticketsSold} Tiket Terjual • {checkIns} Check-Ins
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default EventHeader;
