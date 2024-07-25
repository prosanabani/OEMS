import * as faceapi from 'face-api.js';
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

function FacePoseLoggerWithSound() {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [faceDirection, setFaceDirection] = useState(0); // 0 represents center, positive for right, negative for left
  const webcamRef = useRef(null);
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
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
      const imageSource = webcamRef.current.getScreenshot();
      const img = await faceapi.fetchImage(imageSource);
      const detections = await faceapi
        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();
      if (detections) {
        const { landmarks } = detections;

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
        console.log('No face detected');
      }
    }
  };

  // Function to calculate the centroid of an array of points
  const getCentroid = (points) => {
    if (!points || points.length === 0) return null;
    const centroid = points.reduce(
      (accumulator, current) => {
        accumulator.x += current.x;
        accumulator.y += current.y;
        return accumulator;
      },
      { x: 0, y: 0 }
    );
    centroid.x /= points.length;
    centroid.y /= points.length;
    return centroid;
  };

  const createAudioContext = () => {
    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
    }

    return audioContextRef.current;
  };

  const playBeepSound = () => {
    const audioContext = createAudioContext();
    if (!oscillatorRef.current) {
      oscillatorRef.current = audioContext.createOscillator();
      oscillatorRef.current.type = 'sine';
      oscillatorRef.current.frequency.value = 1_000; // Adjust the frequency as desired

      gainNodeRef.current = audioContext.createGain();
      oscillatorRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(audioContext.destination);

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
        <div style={{ display: 'inline-block', position: 'relative' }}>
          <Webcam
            mirrored // Mirror the webcam feed for better user experience
            ref={webcamRef}
            style={{
              height: 'auto',
              maxHeight: 'calc(100vh - 200px)',
              width: '100%', // Adjust height as needed
            }}
          />
          <div
            style={{
              color: 'red',
              left: '50%',
              position: 'absolute',
              top: '50%',
              transform: 'translate(-50%, -50%)',
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
}

export default FacePoseLoggerWithSound;
