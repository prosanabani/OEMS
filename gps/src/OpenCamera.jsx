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
    } catch (err) {
      setError(err.message || "Error accessing camera.");
    }
  };

  const handleStopStream = () => {
    const tracks = videoRef.current.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
    setIsStreaming(false);
  };

  const handleFacingModeChange = () => {
    setFacingMode(facingMode === "user" ? "environment" : "user");
  };
  return (
    <div>
      {error && <p className="error">{error}</p>}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        width={640}
        height={480}
      />
      <div className="buttons">
        <button onClick={handleStartStream} disabled={isStreaming}>
          Start Camera
        </button>
        <button onClick={handleStopStream} disabled={!isStreaming}>
          Stop Camera
        </button>
        <button onClick={handleFacingModeChange} disabled={!isStreaming}>
          Switch Camera
        </button>
      </div>
    </div>
  );
};

export default OpenCamera;
