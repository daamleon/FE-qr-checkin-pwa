import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { User, Users } from "lucide-react";
import API_BASE_URL from "../services/api";

interface Organizer {
  id: number;
  name: string;
  category: string;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext || !authContext.user) {
    return (
      <p className="text-center text-red-500">
        Anda harus login untuk melihat halaman ini.
      </p>
    );
  }

  const { user, logout } = authContext;
  const [organizers, setOrganizers] = useState<Organizer[]>([]);

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/organizers`);
        const data: Organizer[] = await response.json();
        const userOrganizers = data.filter((org) =>
          user.organizerIds.includes(org.id)
        );
        setOrganizers(userOrganizers);
      } catch (error) {
        console.error("Error fetching organizers:", error);
      }
    };

    fetchOrganizers();
  }, []);

  const handleOrganizerClick = (organizerId: number) => {
    navigate(`/organizer/${organizerId}/events`);
  };

  return (
    <div className="place-items-center">
      <div className=" bg-white shadow-lg rounded-lg px-6 max-w-md w-full h-screen items-center">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pt-4 border-b pb-4">
          <User size={24} className="text-pink-700" />
          <h2 className="text-2xl font-semibold">Profil</h2>
        </div>

        {/* User Info */}
        <div className="flex flex-col items-center text-center">
          <img
            src="/profilpic.jpg"
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-gray-200"
          />
          <h3 className="mt-3 text-xl font-semibold">{user.name}</h3>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Organizer List */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Organizer Anda</h3>
          {organizers.length > 0 ? (
            <div className="grid gap-3">
              {organizers.map((org) => (
                <div
                  key={org.id}
                  className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm cursor-pointer hover:shadow-md hover:scale-105 transition"
                  onClick={() => handleOrganizerClick(org.id)}
                >
                  <div>
                    <h4 className="text-md font-medium">{org.name}</h4>
                    <p className="text-sm text-gray-500">{org.category}</p>
                  </div>
                  <Users size={24} className="text-pink-700" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center mt-4">
              <p className="text-gray-600">
                Anda belum memiliki organizer. Buat organizer di{" "}
                <a
                  href="https://agendakota.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 font-semibold hover:underline"
                >
                  agendakota.id
                </a>
              </p>
              <button
                onClick={() => window.open("https://agendakota.id", "_blank")}
                className="mt-4 bg-pink-700 text-white py-2 px-4 rounded-lg w-full font-semibold hover:bg-pink-800 transition-all"
              >
                Buat Organizer
              </button>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="mt-6 bg-pink-700 text-white py-2 px-4 rounded-lg w-full font-semibold hover:bg-pink-800 transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
