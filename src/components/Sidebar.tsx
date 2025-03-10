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
        className={`fixed left-0 top-0 h-full w-80 bg-white shadow-lg transform z-50 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center">
          <button onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        {/* Avatar & Nama Organizer */}
        <div className="text-center py-4 border-b">
          <img
            src="/genta.png"
            alt="Avatar"
            className="w-16 h-16 rounded-full mx-auto"
          />
          <p className="mt-2 text-lg font-semibold">Agendakota</p>
        </div>

        {/* Informasi Event */}
        <div className="p-4">
          <p className="text-lg font-semibold">Test</p>
          <p className="text-sm text-gray-500">📍 Istituto di Moda Burgo</p>
          <p className="text-sm text-gray-500">08 Mar 2025 - 15 Mar 2025</p>
        </div>

        {/* List Menu Tetap */}
        <nav className="p-6 space-y-4">
          <Link to="/scan" className="block text-blue-600 font-semibold">
            Scan QR
          </Link>
          <Link
            to="/ebent
            "
            className="block text-gray-700 hover:text-blue-600"
          >
            Events
          </Link>
          <Link
            to="/settings"
            className="block text-gray-700 hover:text-blue-600"
          >
            Settings
          </Link>
          <Link to="/about" className="block text-gray-700 hover:text-blue-600">
            About
          </Link>
        </nav>

        {/* Footer - Email & Logout */}
        <div className="h-26 p-4 mt-20 b-2 bg-gray-50">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-white shadow">
            <img
              src="/profilpic.jpg"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
              <Link className="flex flex-row w-full" to="/profile">
                <div>
                  <p className="text-sm text-gray-700">user@gmail.com</p>
                  <p className="text-sm text-orange-500">Adam</p>
                </div>
                <button className="w-full text-red-500 font-semibold text-xs place-items-end pr-2">
                  <LogOut size={20} />
                </button>
              </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar;
