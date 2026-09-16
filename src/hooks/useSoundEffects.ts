import { useState, useCallback, useRef } from 'react';

export function useSoundEffects() {
  const [isMuted, setIsMuted] = useState(true); // muted by default for accessibility
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playTone = useCallback((freq: number, type: OscillatorType, duration: number, gainValue = 0.05) => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(gainValue, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore audio failure gracefully
    }
  }, [isMuted, getAudioContext]);

  const playStepSound = useCallback(() => {
    playTone(520, 'sine', 0.1, 0.04);
  }, [playTone]);

  const playProductSound = useCallback(() => {
    playTone(680, 'triangle', 0.15, 0.05);
  }, [playTone]);

  const playSuccessSound = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 chord
      freqs.forEach((f, idx) => {
        setTimeout(() => {
          playTone(f, 'sine', 0.35, 0.05);
        }, idx * 90);
      });
    } catch {
      // Ignore
    }
  }, [isMuted, getAudioContext, playTone]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  return {
    isMuted,
    toggleMute,
    playStepSound,
    playProductSound,
    playSuccessSound
  };
}
