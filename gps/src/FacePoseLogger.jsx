import React, { useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";

const FacePoseLogger = () => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [faceDirection, setFaceDirection] = useState(0); // 0 represents center, positive for right, negative for left
  const webcamRef = React.useRef(null);

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
    }, 1000); // Capture face pose every 10 seconds

    return () => clearInterval(interval);
  }, [modelLoaded]);

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
        setFaceDirection(9898);
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

export default FacePoseLogger;
