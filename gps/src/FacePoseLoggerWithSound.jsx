import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";

const FacePoseLoggerWithSound = () => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [faceDirection, setFaceDirection] = useState(0); // 0 represents center, positive for right, negative for left
  const webcamRef = useRef(null);
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      ]);
      setModelLoaded(true);
    };

    loadModels();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      captureAndLogFacePose();
    }, 500); // Capture face pose every 500 milliseconds

    return () => clearInterval(interval);
  }, [modelLoaded]);

  useEffect(() => {
    if (
      faceDirection === 0 ||
      Math.abs(faceDirection) < 85 ||
      Math.abs(faceDirection) > 95
    ) {
      playBeepSound();
    } else {
      stopBeepSound();
    }
  }, [faceDirection]);

  const captureAndLogFacePose = async () => {
    if (modelLoaded && webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      const img = await faceapi.fetchImage(imageSrc);
      const detections = await faceapi
        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();
      if (detections) {
        const landmarks = detections.landmarks;

        // Calculate the centroid of left and right eye
        const leftEye = getCentroid(landmarks.getLeftEye());
        const rightEye = getCentroid(landmarks.getRightEye());

        // Calculate the center of the face as the midpoint between left and right eye
        const faceCenterX = (leftEye.x + rightEye.x) / 2;
        const faceCenterY = (leftEye.y + rightEye.y) / 2;

        // Calculate the angle between the nose and the center of the face
        const nose = getCentroid(landmarks.getNose());
        const deltaY = nose.y - faceCenterY;
        const deltaX = nose.x - faceCenterX;
        const faceAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

        // Update the face direction based on the calculated angle
        setFaceDirection(faceAngle);
      } else {
        // Reset face direction if no face is detected
        setFaceDirection(0);
        console.log("No face detected");
      }
    }
  };

  // Function to calculate the centroid of an array of points
  const getCentroid = (points) => {
    if (!points || points.length === 0) return null;
    const centroid = points.reduce(
      (acc, curr) => {
        acc.x += curr.x;
        acc.y += curr.y;
        return acc;
      },
      { x: 0, y: 0 }
    );
    centroid.x /= points.length;
    centroid.y /= points.length;
    return centroid;
  };

  const createAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContext();
    }
    return audioCtxRef.current;
  };

  const playBeepSound = () => {
    const audioCtx = createAudioContext();
    if (!oscillatorRef.current) {
      oscillatorRef.current = audioCtx.createOscillator();
      oscillatorRef.current.type = "sine";
      oscillatorRef.current.frequency.value = 1000; // Adjust the frequency as desired

      gainNodeRef.current = audioCtx.createGain();
      oscillatorRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(audioCtx.destination);

      oscillatorRef.current.start();
    }
  };

  const stopBeepSound = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }
  };

  return (
    <div>
      {modelLoaded ? (
        <div style={{ position: "relative", display: "inline-block" }}>
          <Webcam
            ref={webcamRef}
            mirrored={true} // Mirror the webcam feed for better user experience
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "calc(100vh - 200px)", // Adjust height as needed
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "red",
            }}
          >
            <p>Face Direction: {faceDirection.toFixed(2)} degrees</p>
          </div>
        </div>
      ) : (
        <div>Loading models...</div>
      )}
    </div>
  );
};

export default FacePoseLoggerWithSound;
