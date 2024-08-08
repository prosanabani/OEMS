import useBeepSound from '../hooks/useBeepSound';
import { Button } from 'primereact/button';

const toggleFullscreen = () => {
  const Document = document.documentElement;
  if (!document.fullscreenElement) {
    Document.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
};

function FullscreenToggle() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { playBeepSound, stopBeepSound } = useBeepSound();

  const handleFullscreenChange = () => {
    setIsFullscreen(Boolean(document.fullscreenElement));
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (isFullscreen) {
      stopBeepSound();
    } else {
      playBeepSound();
    }
  }, [isFullscreen, playBeepSound, stopBeepSound]);

  return (
    <div>
      <Button onClick={toggleFullscreen} type="button">
        {isFullscreen ? 'Exit Fullscreen' : 'Go Fullscreen'}
      </Button>
    </div>
  );
}

export default FullscreenToggle;
