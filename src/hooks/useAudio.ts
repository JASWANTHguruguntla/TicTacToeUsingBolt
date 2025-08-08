import { useCallback, useRef } from 'react';

interface AudioFiles {
  [key: string]: HTMLAudioElement;
}

export const useAudio = () => {
  const audioFiles = useRef<AudioFiles>({});

  const createAudioContext = useCallback(() => {
    // Create audio elements with data URLs for immediate availability
    audioFiles.current = {
      uiClick: createBeepSound(800, 0.1, 0.05),
      placeX: createBeepSound(1200, 0.2, 0.15),
      placeO: createBeepSound(400, 0.3, 0.2),
      win: createBeepSound(600, 0.5, 0.4),
      draw: createBeepSound(200, 0.4, 0.3),
      error: createBeepSound(150, 0.2, 0.1),
    };
  }, []);

  const createBeepSound = (frequency: number, duration: number, volume: number): HTMLAudioElement => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);
    
    const audio = new Audio();
    // Create a simple beep sound data URL
    audio.src = `data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+D2vGAkBTJ+zfPTfC4HKXzA9OCQSAYZa73m77BGERdLsuKcWjQPNHzD9N11MQYseBHnQsJ`;
    
    return audio;
  };

  const playSound = useCallback((soundName: string) => {
    try {
      if (!audioFiles.current[soundName]) {
        createAudioContext();
      }
      const audio = audioFiles.current[soundName];
      if (audio) {
        audio.currentTime = 0;
        audio.volume = 0.3;
        audio.play().catch(() => {
          // Ignore audio play errors (user interaction required)
        });
      }
    } catch (error) {
      // Ignore audio errors
    }
  }, [createAudioContext]);

  return {
    playUIClick: () => playSound('uiClick'),
    playPlaceX: () => playSound('placeX'),
    playPlaceO: () => playSound('placeO'),
    playWin: () => playSound('win'),
    playDraw: () => playSound('draw'),
    playError: () => playSound('error'),
  };
};