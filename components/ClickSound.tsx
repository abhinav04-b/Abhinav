import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Placeholder sound. 
// To use your own: Place 'click.mp3' in the 'public' folder and change this to '/click.mp3'
const SOUND_URL = "/click.mp3";

export const ClickSound: React.FC = () => {
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Pre-load the audio object once on mount
    const audio = new Audio(SOUND_URL);
    audio.volume = 0.3; // Subtle volume (30%)
    audioRef.current = audio;
  }, []);

  useEffect(() => {
    const handleGlobalClick = () => {
      // Logic: Disable sound if user is in the Admin Panel
      if (location.pathname.startsWith('/admin')) {
        return;
      }

      if (audioRef.current) {
        // Reset playback time to 0 to allow rapid firing (e.g., double clicks)
        audioRef.current.currentTime = 0;
        
        // Play sound
        audioRef.current.play().catch(() => {
          // Catch and ignore autoplay errors (rare in click handlers, but good practice)
        });
      }
    };

    // Attach listener to the window to catch ALL clicks
    window.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, [location.pathname]); // Re-bind if location changes to ensure check is fresh

  return null; // This component is invisible
};