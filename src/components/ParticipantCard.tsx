import React from 'react';
import { Participant } from '../types';
import { CheckCircle, XCircle, User, Mail, Phone, Ticket } from 'lucide-react';

interface ParticipantCardProps {
  participant: Participant;
  onCheckIn: () => void;
  isLoading: boolean;
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({ 
  participant, 
  onCheckIn, 
  isLoading 
}) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not checked in';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">{participant.name}</h2>
          <div className={`flex items-center ${participant.checked_in ? 'text-green-500' : 'text-gray-500'}`}>
            {participant.checked_in ? (
              <CheckCircle className="h-6 w-6" />
            ) : (
              <XCircle className="h-6 w-6" />
            )}
          </div>
        </div>
        
        <div className="mt-4 space-y-3">
          <div className="flex items-center text-gray-600">
            <User className="h-5 w-5 mr-2" />
            <span>ID: {participant.id}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Mail className="h-5 w-5 mr-2" />
            <span>{participant.email}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Phone className="h-5 w-5 mr-2" />
            <span>{participant.phone}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Ticket className="h-5 w-5 mr-2" />
            <span className="capitalize">{participant.ticket_type} Ticket</span>
          </div>
          
          <div className="pt-2 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              <span className="font-medium">Status:</span>{' '}
              {participant.checked_in ? 'Checked In' : 'Not Checked In'}
            </p>
            {participant.checked_in && participant.check_in_time && (
              <p className="text-sm text-gray-500">
                <span className="font-medium">Check-in time:</span>{' '}
                {formatDate(participant.check_in_time)}
              </p>
            )}
          </div>
        </div>
        
        {!participant.checked_in && (
          <button
            onClick={onCheckIn}
            disabled={isLoading}
            className={`mt-6 w-full py-2 px-4 rounded-md text-white font-medium 
              ${isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
              }`}
          >
            {isLoading ? 'Processing...' : 'Check In Participant'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ParticipantCard;