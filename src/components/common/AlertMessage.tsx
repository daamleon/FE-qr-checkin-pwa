import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

interface AlertMessageProps {
  type: "success" | "error";
  message: string;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ type, message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`flex items-center gap-2 text-white text-sm px-4 py-3 rounded-md shadow-md transition-opacity duration-500 ${
        type === "success" ? "bg-green-500/90" : "bg-red-500/90"
      }`}
    >
      {type === "success" ? <CheckCircle size={18} /> : <XCircle size={18} />}
      <span>{message}</span>
    </div>
  );
};

export default AlertMessage;
