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

export const useFacePoseDetection = (
  videoRef: React.RefObject<HTMLVideoElement>
) => {
  const [model, setModel] = useState<blazeFace.BlazeFaceModel | null>(null);
  const [faces, setFaces] = useState<Face[]>([]);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await blazeFace.load();
      setModel(loadedModel);
    };

    loadModel();
  }, []);

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
