import React from "react";

const OnTabMonitor = () => {
  //   window.addEventListener("beforeunload", function (e) {
  //     // Cancel the event
  //     e.preventDefault();
  //     // Chrome requires the event to be triggered
  //     e.returnValue = "";

  //     // Display a custom message
  //     var message = "Are you sure you want to leave?";
  //     e.returnValue = message; // This is for older browsers

  //     // Return the message to display in modern browsers
  //     return message;
  //   });

  function playBeep() {
    // Create AudioContext instance
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioCtx = new AudioContext();

    // Create oscillator
    var oscillator = audioCtx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = 1000; // Adjust the frequency as desired

    // Connect the oscillator to the audio context destination (output)
    oscillator.connect(audioCtx.destination);

    // Start and stop the oscillator to generate the beep sound
    oscillator.start();
    setTimeout(function () {
      oscillator.stop();
    }, 5000); // Adjust the duration of the beep sound (in milliseconds)
  }
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
      // User switched to a different tab
      console.log("User switched to a different tab");
      playBeep();
    } else if (document.visibilityState === "visible") {
      // User came back to the tab
      console.log("User came back to the tab");
    }
  });

  return <div>OnTabMonitor</div>;
};

export default OnTabMonitor;
