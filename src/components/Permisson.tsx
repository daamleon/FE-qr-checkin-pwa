import React, { useState } from "react";

interface CameraPermissionProps {
  onPermissionGranted: () => void;
}

const CameraPermission: React.FC<CameraPermissionProps> = ({
  onPermissionGranted,
}) => {
  const [permissionStatus, setPermissionStatus] = useState<
    "pending" | "granted" | "denied"
  >("pending");

  const requestPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());

      setPermissionStatus("granted");
      onPermissionGranted();
    } catch (error) {
      console.error("Camera permission denied:", error);
      setPermissionStatus("denied");
    }
  };

  const checkExistingPermission = async () => {
    try {
      const status = await navigator.permissions.query({
        name: "camera" as PermissionName,
      });

      if (status.state === "granted") {
        setPermissionStatus("granted");
        onPermissionGranted();
      } else if (status.state === "denied") {
        setPermissionStatus("denied");
      }
    } catch (error) {
      console.error("Error checking camera permission:", error);
    }
  };

  React.useEffect(() => {
    checkExistingPermission();
  }, []);

  if (permissionStatus === "granted") return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
        <h2 className="text-lg font-semibold mb-4">
          Camera Permission Required
        </h2>
        <p className="text-gray-600 mb-4">
          This app needs access to your camera to scan QR codes.
        </p>

        {permissionStatus === "denied" && (
          <p className="text-red-500 text-sm mb-4">
            Camera access was denied. Please enable camera permissions in your
            browser settings.
          </p>
        )}

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={requestPermission}
        >
          Allow Camera
        </button>
      </div>
    </div>
  );
};

export default CameraPermission;
