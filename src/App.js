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
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const pixKey = "123.456.789-00";

  const pages = [
    {
      type: "cover",
      title: "Convite de Casamento"
    },
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
      audioRef.current.volume = 0.5;
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
      className="fixed top-4 right-4 px-4 py-2 rounded-full shadow-lg text-white hover:bg-opacity-90 transition-all z-50 backdrop-blur-sm flex items-center gap-2"
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5" />
      ) : (
        <>
          <VolumeX className="w-5 h-5" />
          <span className="text-sm">Ativar Música</span>
        </>
      )}
    </button>
  );

  const renderCoverPage = () => (
    <div className="text-center space-y-8 py-4 sm:py-8 px-2 sm:px-8 min-h-[60vh] flex flex-col items-center justify-center">
      <div className="space-y-8 max-w-2xl mx-auto p-8 rounded-lg bg-white/80 backdrop-blur-sm shadow-lg">
        <Heart style={{color: '#967AA1'}} className="w-16 h-16 mx-auto animate-pulse" />
        
        <div className="space-y-4">
          <h1 style={{color: '#192A51'}} className="text-4xl sm:text-5xl font-serif">
            Luciano & Maria
          </h1>
          
          <p style={{color: '#967AA1'}} className="text-xl font-light">
            convidam para seu casamento
          </p>

          <div className="pt-8">
            <p style={{color: '#192A51'}} className="text-2xl font-medium">
              27 · Dezembro · 2025
            </p>
          </div>
        </div>

        <button 
          onClick={() => setCurrentPage(currentPage + 1)}
          style={{backgroundColor: '#967AA1'}}
          className="mt-8 text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
        >
          <span>Ver Convite</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
  const renderInvitationPage = () => (
    <div className="text-center space-y-8 py-4 sm:py-8 px-2 sm:px-8">
      <div className="space-y-6">
        <Heart style={{color: '#967AA1'}} className="w-12 h-12 mx-auto animate-pulse" />
        <h2 style={{color: '#192A51'}} className="text-3xl sm:text-5xl font-serif">
          Convite Especial
        </h2>
        <p style={{color: '#967AA1'}} className="text-lg sm:text-xl font-light italic">
          Com muita alegria convidamos você para celebrar nosso amor...
        </p>
      </div>

      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg space-y-8 p-4 sm:p-8">
        <p className="text-lg sm:text-xl leading-relaxed" style={{color: '#192A51'}}>
          Com imensa felicidade e amor, gostaríamos de convidá-lo(a) para celebrar 
          conosco o início desta nova e maravilhosa etapa de nossas vidas.
        </p>

        <div className="space-y-6">
          <div className="flex items-center justify-center gap-2">
            <Calendar style={{color: '#967AA1'}} className="w-6 h-6" />
            <p style={{color: '#192A51'}} className="text-xl sm:text-2xl font-medium">
              27 de Dezembro de 2025
            </p>
          </div>

          {/* Cerimônia */}
          <div style={{backgroundColor: '#F5E6E8'}} 
               className="p-4 rounded-lg space-y-4 transition-all hover:shadow-md">
            <h3 style={{color: '#192A51'}} className="text-xl font-medium">Cerimônia</h3>
            <div className="space-y-2">
              <p style={{color: '#192A51'}} className="text-lg">17:00 horas</p>
              <p style={{color: '#192A51'}} className="text-lg font-medium">
                Igreja Nossa Senhora das Graças
              </p>
              <p style={{color: '#192A51'}} className="text-lg">
                Rua das Flores, 123 - Jardim Primavera
              </p>
              <p style={{color: '#192A51'}} className="text-lg">São Paulo - SP</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <button
                onClick={() => {
                  window.open('https://www.google.com/maps?q=Igreja+Nossa+Senhora+das+Graças');
                }}
                style={{backgroundColor: '#967AA1'}}
                className="flex-1 text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Map className="w-4 h-4" />
                Ver no Maps
              </button>
              <button
                onClick={() => {
                  const event = {
                    text: "Cerimônia de Casamento",
                    dates: "20251227T170000",
                    location: "Igreja Nossa Senhora das Graças"
                  };
                  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.text)}&dates=${event.dates}/${event.dates}&location=${encodeURIComponent(event.location)}`;
                  window.open(googleCalendarUrl);
                }}
                style={{backgroundColor: '#AAA1C8'}}
                className="flex-1 text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Save the Date
              </button>
            </div>
          </div>

          {/* Festa */}
          <div style={{backgroundColor: '#F5E6E8'}} 
               className="p-4 rounded-lg space-y-4 transition-all hover:shadow-md">
            <h3 style={{color: '#192A51'}} className="text-xl font-medium">Festa</h3>
            <div className="space-y-2">
              <p style={{color: '#192A51'}} className="text-lg">20:00 horas</p>
              <p style={{color: '#192A51'}} className="text-lg font-medium">
                Espaço Villa Real
              </p>
              <p style={{color: '#192A51'}} className="text-lg">
                Av. dos Sonhos, 789 - Centro
              </p>
              <p style={{color: '#192A51'}} className="text-lg">Campos do Jordão - SP</p>
              <p style={{color: '#192A51'}} className="text-sm mt-2">
                (180 km de São Paulo - aproximadamente 2h30 de viagem)
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <button
                onClick={() => {
                  window.open('https://www.google.com/maps?q=Espaço+Villa+Real+Campos+do+Jordão');
                }}
                style={{backgroundColor: '#967AA1'}}
                className="flex-1 text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Map className="w-4 h-4" />
                Ver no Maps
              </button>
              <button
                onClick={() => {
                  const event = {
                    text: "Festa de Casamento",
                    dates: "20251227T200000",
                    location: "Espaço Villa Real - Campos do Jordão"
                  };
                  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.text)}&dates=${event.dates}/${event.dates}&location=${encodeURIComponent(event.location)}`;
                  window.open(googleCalendarUrl);
                }}
                style={{backgroundColor: '#AAA1C8'}}
                className="flex-1 text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Save the Date
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p style={{color: '#192A51'}} className="text-lg">
            Por favor, confirme sua presença até 27 de Setembro de 2025
          </p>
          <button 
            style={{backgroundColor: '#967AA1'}}
            className="text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
          >
            Confirmar Presença
          </button>
        </div>

        <div className="space-y-4">
          <div className="text-center max-w-xl mx-auto">
            <p style={{color: '#192A51'}} className="text-lg leading-relaxed">
              O verdadeiro presente é poder compartilhar este momento único com você.
              Sua presença é o que tornará nosso dia ainda mais especial e memorável.
            </p>
            <p style={{color: '#192A51'}} className="text-lg leading-relaxed mt-4">
              Aos queridos que manifestaram interesse em nos presentear além de sua presença, 
              compartilhamos que estamos iniciando a construção do nosso lar juntos.
            </p>
            
            <div style={{backgroundColor: '#F5E6E8'}} 
                 className="rounded-lg p-4 mt-6 transition-all hover:shadow-md">
              <p style={{color: '#192A51'}} className="font-light mb-3">Nossa chave PIX:</p>
              <div className="flex items-center justify-center gap-2 w-full max-w-sm mx-auto">
                <input 
                  type="text" 
                  value={pixKey}
                  readOnly
                  className="w-full px-4 py-2 border rounded-l-lg bg-white text-gray-700"
                />
                <button
                  onClick={copyPixKey}
                  style={{backgroundColor: '#967AA1'}}
                  className="px-4 py-2 rounded-r-lg border-y border-r transition-colors text-white hover:bg-opacity-90 flex-shrink-0"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
              {showCopySuccess && (
                <p className="text-green-600 text-sm mt-2">Chave PIX copiada!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col items-center justify-center" 
         style={{backgroundColor: '#F5E6E8'}}>
      <audio
        ref={audioRef}
        loop
        style={{ display: 'none' }}
        src="/convite-casamento/arquivos/musica.mp3"
      />

      <MusicControl />

      <div className="w-full max-w-4xl mx-auto p-4 sm:p-8">
        <div className="bg-white rounded-lg shadow-2xl p-4 sm:p-8 relative">
          {pages[currentPage].type === 'cover' ? (
            renderCoverPage()
          ) : pages[currentPage].type === 'invitation' ? (
            renderInvitationPage()
          ) : (
            <div className="mb-8 space-y-6">
              <h2 style={{color: '#192A51'}} className="text-2xl sm:text-3xl font-serif text-center">
                {pages[currentPage].title}
              </h2>
              
              <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                <div className="w-full md:w-1/2">
                  {pages[currentPage].media.type === "carousel" && (
                    <Carousel items={pages[currentPage].media.items} />
                  )}
                  {pages[currentPage].media.type === "image" && (
                    <ImagePlayer url={pages[currentPage].media.url} />
                  )}
                  {pages[currentPage].media.type === "video" && (
                    <video
                      className="w-full rounded-lg shadow-md"
                      controls
                      muted
                      autoPlay={false}
                      playsInline
                      preload="metadata"
                    >
                      <source src={pages[currentPage].media.url} type="video/mp4" />
                      Seu navegador não suporta o elemento de vídeo.
                    </video>
                  )}
                </div>
                
                <div className="w-full md:w-1/2">
                  <p style={{color: '#192A51'}} className="text-lg leading-relaxed">
                    {pages[currentPage].text}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navegação minimalista - esconder na capa */}
          {pages[currentPage].type !== 'cover' && (
            <div className="flex justify-between items-center">
              {currentPage > 0 && (
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  style={{backgroundColor: '#AAA1C8'}}
                  className="p-3 rounded-full text-white hover:bg-opacity-90 transition-all shadow-md"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              
              {currentPage < pages.length - 1 && (
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  style={{backgroundColor: '#AAA1C8'}}
                  className={`p-3 rounded-full text-white hover:bg-opacity-90 transition-all shadow-md ${
                    currentPage === 0 ? 'ml-auto' : ''
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryBook;