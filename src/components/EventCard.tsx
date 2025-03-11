import React from "react";

interface EventCardProps {
  date: string;
  time: string;
  title: string;
  image: string;
  ticketsSold: number;
  checkIns: number;
}

const EventCard: React.FC<EventCardProps> = ({
  time,
  title,
  image,
  ticketsSold,
  checkIns,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border">
      <div className="flex gap-4">
        <img src={image} alt={title} className="w-24 h-24 rounded-lg" />
        <div className="flex flex-col justify-between">
          <p className="text-sm text-gray-500">{time}</p>
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex text-sm text-gray-600">
            <p className="mr-4">
              <span className="text-red-500 font-bold">{ticketsSold}</span>{" "}
              Tiket Terjual
            </p>
            <p>
              <span className="text-pink-500 font-bold">{checkIns}</span>{" "}
              Check-In
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
