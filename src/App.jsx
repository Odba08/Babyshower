// src/App.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Film, ScrollText } from 'lucide-react';
import { CONFIG } from './config';
import EnvelopeIntro from './components/EnvelopeIntro';
import StoryViewer from './components/StoryViewer';
import FullCardView from './components/FullCardView';
import { musicBoxSynth } from './services/musicBox';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [viewMode, setViewMode] = useState('story'); // 'story' | 'scroll'
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef(null);

  // Iniciar reproducción de la canción de cuna
  const startAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch((err) => {
        console.log('Audio file play failed, using web audio synth:', err);
        // Respaldo con sintetizador Web Audio API si el archivo falla
        musicBoxSynth.startMelody();
      });
    } else {
      musicBoxSynth.startMelody();
    }
    setIsMuted(false);
  };

  const handleOpenEnvelope = () => {
    setIsOpened(true);
    startAudio();
  };

  const toggleSound = () => {
    if (isMuted) {
      if (audioRef.current) {
        audioRef.current.play().catch(() => musicBoxSynth.startMelody());
      } else {
        musicBoxSynth.startMelody();
      }
      setIsMuted(false);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      musicBoxSynth.stop();
      setIsMuted(true);
    }
  };

  return (
    <main className="main-viewport">
      {/* Elemento de Audio nativo para la canción */}
      <audio 
        ref={audioRef} 
        src={CONFIG.music.url} 
        loop 
        preload="auto"
      >
        <source src={CONFIG.music.url} type="audio/mp4" />
        <source src="/song.mp4" type="video/mp4" />
      </audio>

      {/* Partículas de destellos dorados en el fondo */}
      <div className="ambient-sparkles-container" aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <span 
            key={i} 
            className="ambient-sparkle" 
            style={{
              top: `${(i * 17) % 100}%`,
              left: `${(i * 23) % 100}%`,
              animationDelay: `${(i * 0.4).toFixed(1)}s`,
              animationDuration: `${3 + (i % 4)}s`
            }} 
          />
        ))}
      </div>

      {!isOpened ? (
        // 1. Pantalla Inicial: Sobre/Tarjeta Mágica de Bienvenida
        <EnvelopeIntro onOpen={handleOpenEnvelope} />
      ) : (
        // 2. Experiencia Principal Abierta
        <div className="experience-wrapper">
          {viewMode === 'story' ? (
            <StoryViewer 
              onToggleSound={toggleSound}
              isMuted={isMuted}
              onSwitchToScrollMode={() => setViewMode('scroll')}
            />
          ) : (
            <FullCardView 
              onSwitchToStoryMode={() => setViewMode('story')}
            />
          )}

          {/* Botón flotante para alternar modo Video <-> Tarjeta */}
          <button 
            className="floating-mode-toggle"
            onClick={() => setViewMode(viewMode === 'story' ? 'scroll' : 'story')}
            title={viewMode === 'story' ? "Cambiar a Modo Tarjeta Continua" : "Cambiar a Modo Video / Historias"}
          >
            {viewMode === 'story' ? (
              <>
                <ScrollText size={18} />
                <span className="mode-btn-label">Modo Tarjeta</span>
              </>
            ) : (
              <>
                <Film size={18} />
                <span className="mode-btn-label">Modo Video</span>
              </>
            )}
          </button>
        </div>
      )}
    </main>
  );
}
