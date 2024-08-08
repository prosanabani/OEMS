// src/hooks/useFacePoseDetection.ts
import '@tensorflow/tfjs-backend-webgl';
import * as blazeFace from '@tensorflow-models/blazeface';

type Face = {
  bottomRight: [number, number];
  landmarks: Array<[number, number]>;
  probability: number[];
  rotation: number;
  topLeft: [number, number]; // New property for rotation
};

export const useTensorFlowFacePoseDetection = (
  videoRef: React.RefObject<HTMLVideoElement>
) => {
  const [model, setModel] = useState<blazeFace.BlazeFaceModel | null>(null);
  const [faces, setFaces] = useState<Face[]>([]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await blazeFace.load();
      setModel(loadedModel);
    };

    loadModel();
  }, []);

  const createAudioContext = () => {
    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext;
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

  useEffect(() => {
    if (faces.some((face) => face.rotation < 45 || face.rotation > 55)) {
      playBeepSound();
    } else {
      stopBeepSound();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faces]);

  useEffect(() => {
    const calculateRotation = (landmarks: number[][]): number => {
      if (landmarks.length < 6) return 0; // Ensure enough landmarks are detected

      // Calculate the angle between the nose and eyes
      const leftEye = landmarks[0]; // assuming landmarks[0] is the left eye
      const rightEye = landmarks[1]; // assuming landmarks[1] is the right eye
      const nose = landmarks[2]; // assuming landmarks[2] is the nose

      const eyeLineAngle = Math.atan2(
        rightEye[1] - leftEye[1],
        rightEye[0] - leftEye[0]
      );
      const noseLineAngle = Math.atan2(
        nose[1] - leftEye[1],
        nose[0] - leftEye[0]
      );

      return (noseLineAngle - eyeLineAngle) * (180 / Math.PI);
    };

    const detectFaces = async () => {
      if (model && videoRef.current) {
        const predictions = await model.estimateFaces(videoRef.current, false);
        const facesWithRotation = predictions.map((prediction) => ({
          ...prediction,

          // @ts-expect-error until it is resolved from the library
          rotation: calculateRotation(prediction.landmarks || []),
        }));
        setFaces(facesWithRotation as unknown as Face[]);
      }
    };

    const interval = setInterval(detectFaces, 100); // Detect at intervals for performance
    return () => clearInterval(interval);
  }, [model, videoRef]);

  return faces;
};
