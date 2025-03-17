import React from "react";

interface TicketSalesProps {
  revenue: number;
  tickets_sold: number;
  user_regist: number;
  check_ins: number;
}

const TicketSalesCard: React.FC<TicketSalesProps> = ({
  revenue,
  tickets_sold,
  user_regist,
  check_ins,
}) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Attendees */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-gray-500 font-semibold text-sm">ATTENDEES</h3>
          <p className="text-3xl font-bold">{check_ins}</p>
          <p className="text-gray-400 text-sm">Sudah Checkin</p>
        </div>

        {/* Pendaftar */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-gray-500 font-semibold text-sm">PENDAFTAR</h3>
          <p className="text-3xl font-bold">{user_regist}</p>
          <p className="text-gray-400 text-sm">Akun Pengguna</p>
        </div>
      </div>

      {/* Revenue Section */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-gray-500 font-semibold text-sm">
          Tickets Revenue Selling
        </h2>
        <p className="text-2xl font-bold">
          IDR {revenue.toLocaleString("id-ID")},-
        </p>
        <p className="text-gray-400 text-sm">{tickets_sold} Terjual</p>

        {/* Filter Buttons */}
        <div className="mt-4 flex space-x-2">
          <button className="px-3 py-1 text-sm bg-pink-500 text-white rounded-md">
            All time
          </button>
          <button className="px-3 py-1 text-sm border rounded-md">Today</button>
          <button className="px-3 py-1 text-sm border rounded-md">
            This Week
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketSalesCard;
