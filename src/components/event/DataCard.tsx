import React from "react";

interface TicketSalesProps {
  revenue: number;
  tickets_sold: number;
}

const TicketSalesCard: React.FC<TicketSalesProps> = ({
  revenue,
  tickets_sold,
}) => {
  return (
    <div>
      <p className="text-xl font-bold mb-4">Event Information</p>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold">Tickets Revenue Selling</h2>
        <p className="text-xl font-bold">
          IDR {revenue.toLocaleString("id-ID")},-
        </p>
        <p>{tickets_sold} Terjual</p>
      </div>
    </div>
  );
};

export default TicketSalesCard;
