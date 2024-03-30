import React, { useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";

const FacePoseLogger = () => {
  const [modelLoaded, setModelLoaded] = useState(false);
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
        console.log("Landmarks:", landmarks);

        // Calculate the centroids of nose, left eye, and right eye
        const nose = getCentroid(landmarks.getNose());
        const leftEye = getCentroid(landmarks.getLeftEye());
        const rightEye = getCentroid(landmarks.getRightEye());

        // Ensure all required landmarks have valid centroids
        if (nose && leftEye && rightEye) {
          // Calculate the angles between the lines connecting eyes and nose centroid
          const leftTilt = calculateTiltAngle(leftEye, nose);
          const rightTilt = calculateTiltAngle(rightEye, nose);

          // Calculate the average tilt angle
          const faceTilt = (leftTilt + rightTilt) / 2;

          console.log("Face tilt:", faceTilt.toFixed(2), "degrees");
        } else {
          console.log(
            "Error: Not all required landmarks detected or have valid centroids"
          );
        }
      } else {
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

  // Function to calculate the angle between the line connecting two points and the horizontal axis
  const calculateTiltAngle = (point1, point2) => {
    const deltaY = point2.y - point1.y;
    const deltaX = point2.x - point1.x;
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  };

  return (
    <div>
      {modelLoaded ? (
        <Webcam
          ref={webcamRef}
          mirrored={true} // Mirror the webcam feed for better user experience
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "calc(100vh - 200px)", // Adjust height as needed
          }}
        />
      ) : (
        <div>Loading models...</div>
      )}
    </div>
  );
};

export default FacePoseLogger;
