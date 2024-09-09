import { useCamera } from '../hooks/useCamera';
import { useTensorFlowFacePoseDetection } from '../hooks/useTensorFlowFacePoseDetection';

const TensorFlowPoseMonitoring = () => {
  const videoRef = useCamera();
  const faces = useTensorFlowFacePoseDetection(videoRef);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <video
        ref={videoRef}
        style={{ height: '480px', transform: 'scaleX(-1)', width: '640px' }}
      />
      {faces.map((face, index) => (
        <div
          key={index}
          style={{
            left: `${face.topLeft[0]}px`,
            position: 'absolute',
            top: `${face.topLeft[1]}px`,
          }}
        >
          <div
            style={{
              border: '2px solid #00FF00',
              height: `${face.bottomRight[1] - face.topLeft[1]}px`,
              left: `0px`,
              position: 'absolute',
              top: `0px`,
              width: `${face.bottomRight[0] - face.topLeft[0]}px`,
            }}
          >
            {face.landmarks.map(([x, y], index_) => (
              <div
                key={index_}
                style={{
                  backgroundColor: '#FF0000',
                  borderRadius: '50%',
                  height: '5px',
                  left: `${x - face.topLeft[0]}px`,
                  position: 'absolute',
                  top: `${y - face.topLeft[1]}px`,
                  width: '5px',
                }}
              />
            ))}
          </div>
          <div
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '3px',
              bottom: '10px',
              color: '#fff',
              left: '10px',
              padding: '5px',
              position: 'absolute',
            }}
          >
            Angle: {face.rotation.toFixed(2)}°
          </div>
        </div>
      ))}
    </div>
  );
};

export default TensorFlowPoseMonitoring;
