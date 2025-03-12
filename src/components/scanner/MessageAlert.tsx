import React from "react";
import { AlertCircle, CheckCircle } from "lucide-react";

interface MessageAlertProps {
  message: string | null;
  type: "success" | "error";
}

const MessageAlert: React.FC<MessageAlertProps> = ({ message, type }) => {
  if (!message) return null;

  return (
    <div
      className={`p-3 text-sm rounded-lg flex items-center ${
        type === "error"
          ? "bg-red-50 text-red-600"
          : "bg-green-50 text-green-600"
      }`}
    >
      {type === "error" ? (
        <AlertCircle className="h-4 w-4 mr-2" />
      ) : (
        <CheckCircle className="h-4 w-4 mr-2" />
      )}
      <p>{message}</p>
    </div>
  );
};

export default MessageAlert;
