// src/hooks/useCamera.ts
import { useEffect, useRef } from 'react';

export const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const setupCamera = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        // eslint-disable-next-line no-alert
        alert('Camera not supported by your browser');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    };

    setupCamera();
  }, []);

  return videoRef;
};
