const useBeepSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const createAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext;
      audioContextRef.current = new AudioContext();
    }

    return audioContextRef.current;
  }, []);

  const playBeepSound = useCallback(() => {
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
  }, []);

  const stopBeepSound = useCallback(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
      gainNodeRef.current = null; // Clear gainNodeRef as well
    }
  }, []);

  useEffect(() => {
    return () => {
      stopBeepSound(); // Ensure cleanup when component unmounts
    };
  }, []);

  return { playBeepSound, stopBeepSound };
};

export default useBeepSound;
