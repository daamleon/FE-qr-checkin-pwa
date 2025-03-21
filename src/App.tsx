import { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { NetworkProvider } from "./context/NetworkContext";
import { AuthContext } from "./context/AuthContext"; // Tambahkan ini
import Header from "./components/Header";
import NetworkStatus from "./components/NetworkStatus";
import HomePage from "./pages/HomePage";
import ScanPage from "./pages/ScanPage";
import AboutPage from "./pages/AboutPage";
import DetailEventPage from "./pages/DetailEventPage";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilPage";
import EventPage from "./pages/EventPage";
import LoginPage from "./pages/LoginPage";
import { registerSW } from "virtual:pwa-register";
import { AuthProvider } from "./context/AuthContext";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const authContext = useContext(AuthContext);

  // Pastikan authContext tidak null sebelum mengakses user
  if (!authContext || !authContext.user) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  useEffect(() => {
    registerSW({
      onNeedRefresh() {
        if (confirm("New content available. Reload?")) {
          window.location.reload();
        }
      },
      onOfflineReady() {
        console.log("App ready to work offline");
      },
    });
  }, []);

  return (
    <AuthProvider>
      <NetworkProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <header className="sticky top-0 left-0 w-full bg-white z-50">
              <Header />
            </header>
            <NetworkStatus />
            <main className="w-screen">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route
                  path="/scan"
                  element={
                    <PrivateRoute>
                      <ScanPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <ProfilePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/organizer/:id/events"
                  element={
                    <PrivateRoute>
                      <EventPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/detail/:organizerId/:eventId"
                  element={
                    <PrivateRoute>
                      <DetailEventPage />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </Router>
      </NetworkProvider>
    </AuthProvider>
  );
}

export default App;
