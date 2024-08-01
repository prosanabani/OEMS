/* eslint-disable react-hooks/exhaustive-deps */
import * as faceApi from 'face-api.js';
import Webcam from 'react-webcam';

type Point = { x: number; y: number };
type Landmark = Point[];

const FaceApi = () => {
  const [modelLoaded, setModelLoaded] = useState<boolean>(false);
  const [faceDirection, setFaceDirection] = useState<number>(0); // 0 represents center, positive for right, negative for left
  const webcamRef = useRef<Webcam>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

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

  // Function to calculate the centroid of an array of points

  const getCentroid = (points: Landmark): Point | null => {
    if (!points || points.length === 0) return null;
    const centroid = points.reduce(
      (accumulator, point) => {
        accumulator.x += point.x;
        accumulator.y += point.y;
        return accumulator;
      },
      { x: 0, y: 0 }
    );
    centroid.x /= points.length;
    centroid.y /= points.length;
    return centroid;
  };

  const captureAndLogFacePose = async () => {
    if (modelLoaded && webcamRef.current) {
      const imageSource = webcamRef.current.getScreenshot() ?? '';
      const img = await faceApi.fetchImage(imageSource);
      const detections = await faceApi
        .detectSingleFace(img, new faceApi.TinyFaceDetectorOptions())
        .withFaceLandmarks();
      if (detections) {
        const { landmarks } = detections;

        // Calculate the centroid of left and right eye
        const leftEye = getCentroid(landmarks.getLeftEye()) ?? { x: 0, y: 0 };
        const rightEye = getCentroid(landmarks.getRightEye()) ?? { x: 0, y: 0 };

        // Calculate the center of the face as the midpoint between left and right eye
        const faceCenterX = (leftEye.x + rightEye.x) / 2;
        const faceCenterY = (leftEye.y + rightEye.y) / 2;

        // Calculate the angle between the nose and the center of the face
        const nose = getCentroid(landmarks.getNose()) ?? { x: 0, y: 0 };
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

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceApi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceApi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceApi.nets.faceRecognitionNet.loadFromUri('/models'),
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
};

export default FaceApi;
