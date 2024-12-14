import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, Calendar, Copy, Volume2, VolumeX, Map } from 'lucide-react';

// Componente ImagePlayer
const ImagePlayer = ({ url }) => {
  return (
    <div className="w-full">
      <img
        src={url}
        alt="Imagem da história"
        className="w-full rounded-lg shadow-md"
      />
    </div>
  );
};

// Carousel
const Carousel = ({ items }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="relative w-full">
      {items.map((item, index) => (
        <div
          key={index}
          className={`${
            index === current ? 'block' : 'hidden'
          }`}
        >
          <ImagePlayer url={item.url} />
        </div>
      ))}
    </div>
  );
};

const StoryBook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  const pixKey = "123.456.789-00";

  const pages = [
    {
      title: "O Primeiro Encontro",
      text: "Era uma tarde especial de Agosto de 2020, quando marcamos um encontro, que marcou as nossas vidas...",
      media: {
        type: "image",
        url: "/convite-casamento/arquivos/1.png"
      }
    },
    {
      title: "O Pedido de Namoro",
      text: "Sob as estrelas, com o coração acelerado, ele preparou uma surpresa inesquecível...",
      media: {
        type: "carousel",
        items: [
          { type: "image", url: "/convite-casamento/arquivos/2.png" },
          { type: "image", url: "/convite-casamento/arquivos/3.png" }
        ]
      }
    },
    {
      title: "Nossa Jornada",
      text: "Juntos, descobrindo novos horizontes e construindo memórias para toda vida...",
      media: {
        type: "carousel",
        items: [
          { type: "image", url: "/convite-casamento/arquivos/4.png" },
          { type: "image", url: "/convite-casamento/arquivos/5.png" },
          { type: "image", url: "/convite-casamento/arquivos/6.png" },
          { type: "image", url: "/convite-casamento/arquivos/7.png" },
          { type: "image", url: "/convite-casamento/arquivos/8.png" },
          { type: "image", url: "/convite-casamento/arquivos/9.png" },
          { type: "image", url: "/convite-casamento/arquivos/10.png" },
          { type: "image", url: "/convite-casamento/arquivos/11.png" }
        ]
      }
    },
    {
      title: "O Pedido de Casamento",
      text: "No momento perfeito, as palavras certas fizeram o coração transbordar de alegria...",
      media: {
        type: "video",
        url: "/convite-casamento/arquivos/13.mp4"
      }
    },
    {
      type: "invitation",
      title: "Convite Especial"
    }
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // 50% do volume
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            setIsPlaying(false);
            console.log('Reprodução automática bloqueada pelo navegador');
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const toggleMusic = () => setIsPlaying(!isPlaying);
  
  const copyPixKey = () => {
    navigator.clipboard.writeText(pixKey);
    setShowCopySuccess(true);
    setTimeout(() => setShowCopySuccess(false), 2000);
  };

  const MusicControl = () => (
    <button
      onClick={toggleMusic}
      style={{backgroundColor: '#967AA1'}}
      className="fixed bottom-4 right-4 p-3 rounded-full shadow-lg text-white hover:bg-opacity-90 transition-all z-50 backdrop-blur-sm"
    >
      {isPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
    </button>
  );

  // [O resto do código permanece igual, incluindo renderInvitationPage() e return]
  
  // Apenas atualize o caminho da música no elemento audio:
  <audio
    ref={audioRef}
    loop
    style={{ display: 'none' }}
    src="/convite-casamento/arquivos/musica.mp3"
  />

  return (
    <div style={{backgroundColor: '#F5E6E8'}} 
         className="min-h-screen w-full overflow-x-hidden">
      <audio
        ref={audioRef}
        loop
        style={{ display: 'none' }}
        src="/convite-casamento/arquivos/musica.mp3"
      />

      <MusicControl />

      {/* ... resto do código ... */}
    </div>
  );
};

export default StoryBook;
