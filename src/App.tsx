import { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { NetworkProvider } from "./context/NetworkContext";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
// import NetworkStatus from "./components/NetworkStatus";
// import HomePage from "./pages/HomePage";
import ScanPage from "./pages/ScanPage";
import AboutPage from "./pages/AboutPage";
import DetailEventPage from "./pages/DetailEventPage";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilPage";
import EventPage from "./pages/EventPage";
import LoginPage from "./pages/LoginPage";
import { registerSW } from "virtual:pwa-register";
import NavMobile from "./components/NavMobile";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const authContext = useContext(AuthContext);
  if (!authContext || !authContext.user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function LayoutWithHeaderAndNav({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="min-h-screen bg-gray-100">
      {!isLoginPage && (
        <>
          <header className="sticky top-0 left-0 w-full bg-white z-50">
            <Header />
          </header>
          {/* <NetworkStatus /> */}
        </>
      )}
      <main className="w-screen">{children}</main>
      {!isLoginPage && <NavMobile />}
    </div>
  );
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
          <Routes>
            {/* Login tidak memerlukan proteksi */}
            <Route path="/login" element={<LoginPage />} />

            {/* Semua halaman lain menggunakan layout */}
            <Route
              path="*"
              element={
                <LayoutWithHeaderAndNav>
                  <Routes>
                    {/* Default route langsung ke /scan */}
                    <Route
                      path="/"
                      element={
                        <PrivateRoute>
                          <Navigate to="/scan" replace />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/scan"
                      element={
                        <PrivateRoute>
                          <ScanPage />
                        </PrivateRoute>
                      }
                    />
                    <Route path="/about" element={<AboutPage />} />
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
                </LayoutWithHeaderAndNav>
              }
            />
          </Routes>
        </Router>
      </NetworkProvider>
    </AuthProvider>
  );
}

export default App;
