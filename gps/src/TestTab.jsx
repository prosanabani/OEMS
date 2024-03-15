import React, { useEffect } from "react";

const OnTabtest = () => {
  let oscillator = null;

  function playBeep() {
    // Create AudioContext instance
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioCtx = new AudioContext();

    // Create oscillator
    oscillator = audioCtx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = 1000; // Adjust the frequency as desired

    // Connect the oscillator to the audio context destination (output)
    oscillator.connect(audioCtx.destination);

    // Start the oscillator to generate the beep sound
    oscillator.start();
  }

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // User switched to a different tab
        console.log("User switched to a different tab");
        playBeep();
      } else if (document.visibilityState === "visible") {
        // User came back to the tab
        console.log("User came back to the tab");
        if (oscillator) {
          oscillator.stop();
          oscillator.disconnect();
          oscillator = null;
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
        oscillator = null;
      }
    };
  }, []);

  return <div>test</div>;
};

export default OnTabtest;
