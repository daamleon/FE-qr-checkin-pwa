import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { useNetwork } from '../context/NetworkContext';

const NetworkStatus: React.FC = () => {
  const { isOnline } = useNetwork();

  return (
    <div className={`fixed bottom-16 right-0 m-4 p-2 rounded-full ${isOnline ? 'bg-green-100' : 'bg-red-100'}`}>
      {isOnline ? (
        <Wifi className="h-5 w-5 text-green-600" />
      ) : (
        <WifiOff className="h-5 w-5 text-red-600" />
      )}
    </div>
  );
};

export default NetworkStatus;