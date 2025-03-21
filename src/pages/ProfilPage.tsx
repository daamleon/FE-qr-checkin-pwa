import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { User, Users } from "lucide-react";
import API_BASE_URL from "../services/api";

interface Organizer {
  id: number;
  name: string;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext || !authContext.user) {
    return <p>Anda harus login untuk melihat halaman ini.</p>;
  }

  const { user, logout } = authContext;
  const [organizers, setOrganizers] = useState<Organizer[]>([]);

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/organizers`);
        const data: Organizer[] = await response.json();

        // Ambil hanya organizer yang dimiliki user
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

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   navigate("/login", { replace: true });
  // };

  return (
    <div className="w-full place-items-center">
      <div className="mx-auto p-6 pb-12 bg-white shadow-md h-screen max-w-2xl">
        <div className="flex items-center gap-4">
          <User size={20} className="text-blue-500" />
          <h2 className="text-2xl font-semibold">Profil</h2>
        </div>

        {/* Info User */}
        <div className="flex flex-col items-center">
          <img
            src="/profilpic.jpg"
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-gray-200"
          />
          <h3 className="mt-3 text-xl font-semibold">{user.name}</h3>
          <p className="text-gray-500">{user.email}</p>
          <span className="mt-1 px-3 py-1 bg-green-100 text-green-600 text-sm rounded-full">
            Aktif
          </span>
        </div>

        {/* Daftar Organizer */}
        <div className="mt-6 flex-grow overflow-auto max-h-[30vh] pr-2">
          <h3 className="text-lg font-semibold mb-2">Organizer Anda</h3>
          <div className="space-y-3">
            {organizers.map((org) => (
              <div
                key={org.id}
                className="flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 transition"
                onClick={() => handleOrganizerClick(org.id)}
              >
                <div>
                  <h4 className="text-md font-medium">{org.name}</h4>
                </div>
                <Users size={24} className="text-pink-700" />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={logout}
          className="mt-6 bg-red-500 text-white py-2 px-4 rounded w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
