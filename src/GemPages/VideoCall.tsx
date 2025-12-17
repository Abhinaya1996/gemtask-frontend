import { useEffect, useRef, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";
import PageMeta from "../components/common/PageMeta";

export default function VideoCall() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      alert("Camera access denied");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <>
      <PageMeta
        title="Video Call | TeleHealth"
        description="Video call preview"
      />

      <PageBreadcrumb pageTitle="Video Call" />

      <ComponentCard title="Camera Preview">
        <div className="space-y-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full max-w-md border rounded"
          />

          <div className="flex gap-3">
            <button
              onClick={startCamera}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Start Camera
            </button>

            <button
              onClick={stopCamera}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Stop Camera
            </button>
          </div>
        </div>
      </ComponentCard>
    </>
  );
}
