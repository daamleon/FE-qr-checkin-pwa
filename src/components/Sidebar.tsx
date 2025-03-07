import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={toggleSidebar} className="p-2 lg:hidden">
        <Menu size={24} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 transition-opacity"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
         
          <button onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        {/* Avatar & Nama Organizer */}
        <div className="text-center py-4 border-b">
          <img
            src="https://via.placeholder.com/60"
            alt="Avatar"
            className="w-16 h-16 rounded-full mx-auto"
          />
          <p className="mt-2 text-lg font-semibold">Ordinary</p>
        </div>

        {/* Informasi Event */}
        <div className="p-4 border-b">
          <p className="text-lg font-semibold">Test</p>
          <p className="text-sm text-gray-500">📍 Istituto di Moda Burgo</p>
          <p className="text-sm text-gray-500">08 Mar 2025 - 15 Mar 2025</p>
        </div>

        {/* List Menu Tetap */}
        <nav className="p-4 space-y-4">
          <Link to="/scan" className="block text-blue-600 font-semibold">
            Scan Ticket
          </Link>
          <Link
            to="/payment"
            className="block text-gray-700 hover:text-blue-600"
          >
            Scan Pembayaran
          </Link>
          <Link
            to="/log-scan"
            className="block text-gray-700 hover:text-blue-600"
          >
            Log Scan
          </Link>
          <Link
            to="/settings"
            className="block text-gray-700 hover:text-blue-600"
          >
            Pengaturan
          </Link>
        </nav>

        {/* Footer - Email & Logout */}
        <div className="p-4 mt-auto border-t bg-gray-50">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-white shadow">
            <img
              src="https://via.placeholder.com/30"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex flex-row gap-8">
              <div className="">
                <p className="text-sm text-gray-700">withdaamleon@gmail.com</p>
                <p className="text-sm text-orange-500">Adam</p>
              </div>

              <button className="w-full flex items-center text-red-500 font-semibold text-xs">
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar;
