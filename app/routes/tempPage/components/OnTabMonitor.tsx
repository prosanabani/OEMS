import React, { useEffect, useRef } from "react";

const OnTabMonitor = () => {
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  function createAudioContext() {
    if (!audioContextRef.current) {
      // Create AudioContext instance
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
    }

    return audioContextRef.current;
  }

  function createOscillator() {
    const audioContext = createAudioContext();
    if (!oscillatorRef.current) {
      // Create oscillator
      oscillatorRef.current = audioContext.createOscillator();
      oscillatorRef.current.type = "sine";
      oscillatorRef.current.frequency.value = 1_000; // Adjust the frequency as desired

      // Create gain node
      gainNodeRef.current = audioContext.createGain();
      oscillatorRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(audioContext.destination);

      // Start the oscillator
      oscillatorRef.current.start();
    }

    return oscillatorRef.current;
  }

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // User switched to a different tab
        console.log("User switched to a different tab");
        createOscillator();
      } else if (document.visibilityState === "visible") {
        // User came back to the tab
        console.log("User came back to the tab");
        if (gainNodeRef.current) {
          // Gradually decrease the volume to make the sound fade out quickly
          const initialVolume = gainNodeRef.current.gain.value;
          const fadeOutDuration = 0.1; // in seconds
          const fadeOutInterval = 10; // in milliseconds
          const intervalStep =
            initialVolume / ((fadeOutDuration * 1_000) / fadeOutInterval);

          const fadeOutIntervalId = setInterval(() => {
            if (gainNodeRef.current.gain.value <= 0) {
              // Stop the oscillator and clear the interval when volume reaches 0
              clearInterval(fadeOutIntervalId);
              oscillatorRef.current.stop();
              oscillatorRef.current.disconnect();
              oscillatorRef.current = null;
            } else {
              gainNodeRef.current.gain.value -= intervalStep;
            }
          }, fadeOutInterval);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }
    };
  }, []);

  return <div>test</div>;
};

export default OnTabMonitor;
