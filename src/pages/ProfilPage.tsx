import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Users, LogOut } from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();

  const user = {
    name: "Adam Yanuar Zulmi",
    email: "adam@example.com",
    avatar: "/profilpic.jpg",
    joined: "12 Januari 2024",
    organizers: [
      { id: 1, name: "Agentakota", role: "Owner" },
      { id: 2, name: "DailyHotels", role: "Admin" },
    ],
  };

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  const handleOrganizerClick = (organizerId: number) => {
    navigate(`/organizer/${organizerId}/events`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex justify-center bg-gray-50 min-h-screen w-full">
      <div className="relative mx-auto p-6 pb-24 bg-white shadow-md w-full sm:w-96 md:max-w-md min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <User size={20} className="text-pink-700" />
          <h2 className="text-2xl font-semibold">Profil</h2>
        </div>

        {/* Info User */}
        <div className="flex flex-col items-center">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-gray-200"
          />
          <h3 className="mt-3 text-xl font-semibold">{user.name}</h3>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Daftar Organizer */}
        <div className="mt-6 flex-grow overflow-auto max-h-[32vh] pr-2">
          <h3 className="text-lg font-semibold mb-2">Organizer Anda</h3>
          <div className="space-y-3">
            {user.organizers.map((org) => (
              <div
                key={org.id}
                className="flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 transition"
                onClick={() => handleOrganizerClick(org.id)}
              >
                <div>
                  <h4 className="text-md font-medium">{org.name}</h4>
                  <p className="text-sm text-gray-500">{org.role}</p>
                </div>
                <Users size={24} className="text-pink-700" />
              </div>
            ))}
          </div>
        </div>

        {/* Tombol Logout */}
        <div className="">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-pink-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-600 transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
