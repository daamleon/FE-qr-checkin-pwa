import React from "react";
import { User, RotateCw } from "lucide-react";

interface ParticipantInfoProps {
  participant: any;
  onRescan: () => void;
}

const ParticipantInfo: React.FC<ParticipantInfoProps> = ({
  participant,
  onRescan,
}) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center space-x-4 mb-4">
        <User className="h-8 w-8 text-gray-700" />
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {participant.name}
          </h3>
          <p className="text-sm text-gray-600">
            {participant.checked_in
              ? `Checked in at: ${participant.check_in_time}`
              : "Not checked in yet."}
          </p>
        </div>
      </div>
      <button
        onClick={onRescan}
        className="mt-6 w-full flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
      >
        <RotateCw className="h-4 w-4 mr-2" />
        <span>Scan Again</span>
      </button>
    </div>
  );
};

export default ParticipantInfo;
