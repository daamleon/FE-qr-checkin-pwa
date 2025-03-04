import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NetworkProvider } from "./context/NetworkContext";
import Header from "./components/Header";
import NetworkStatus from "./components/NetworkStatus";
import HomePage from "./pages/HomePage";
import ScanPage from "./pages/ScanPage";
import AboutPage from "./pages/AboutPage";
import DataPage from "./pages/DataPage";
import NotFound from "./pages/NotFound";
import { registerSW } from "virtual:pwa-register";

function App() {
  useEffect(() => {
    const updateSW = registerSW({
      onNeedRefresh() {
        if (confirm("New content available. Reload?")) {
          updateSW(true);
        }
      },
      onOfflineReady() {
        console.log("App ready to work offline");
      },
    });

    const processPendingCheckIns = async () => {
      if (navigator.onLine) {
        try {
          const pendingCheckIns = JSON.parse(
            localStorage.getItem("pendingCheckIns") || "[]"
          );
          if (pendingCheckIns.length === 0) return;

          const { checkInParticipant } = await import("./services/api");

          for (const id of pendingCheckIns) {
            try {
              await checkInParticipant(id);
            } catch (err) {
              console.error(
                `Failed to process offline check-in for ID: ${id}`,
                err
              );
            }
          }
          localStorage.setItem("pendingCheckIns", JSON.stringify([]));
        } catch (err) {
          console.error("Error processing pending check-ins:", err);
        }
      }
    };

    window.addEventListener("online", processPendingCheckIns);

    return () => {
      window.removeEventListener("online", processPendingCheckIns);
    };
  }, []);

  return (
    <NetworkProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <NetworkStatus />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/scan" element={<ScanPage />} />
              <Route path="/data" element={<DataPage />} />{" "}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </NetworkProvider>
  );
}

export default App;
