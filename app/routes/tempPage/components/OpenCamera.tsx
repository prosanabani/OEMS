import React, { useRef, useState } from "react";

const OpenCamera = () => {
  const videoRef = useRef(null); // Ref to the video element
  const [error, setError] = useState(null); // Error state
  const [facingMode, setFacingMode] = useState("user"); // Initial facing mode
  const [isStreaming, setIsStreaming] = useState(false); // Streaming state

  const handleStartStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsStreaming(true);
      } else {
        setError("Unable to access video stream.");
      }
    } catch (error_) {
      setError(error_.message || "Error accessing camera.");
    }
  };

  const handleStopStream = () => {
    const tracks = videoRef.current.srcObject.getTracks();
    for (const track of tracks) track.stop();
    setIsStreaming(false);
  };

  const handleFacingModeChange = () => {
    setFacingMode(facingMode === "user" ? "environment" : "user");
  };

  return (
    <div>
      {error && <p className="error">{error}</p>}
      <video
        autoPlay
        height={480}
        muted
        playsInline
        ref={videoRef}
        width={640}
      />
      <div className="buttons">
        <button disabled={isStreaming} onClick={handleStartStream}>
          Start Camera
        </button>
        <button disabled={!isStreaming} onClick={handleStopStream}>
          Stop Camera
        </button>
        <button disabled={!isStreaming} onClick={handleFacingModeChange}>
          Switch Camera
        </button>
      </div>
    </div>
  );
};

export default OpenCamera;
