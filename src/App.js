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

// Componente de barra de progresso
const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mt-8">
      <div 
        className="bg-[#967AA1] h-2 rounded-full transition-all duration-300 ease-linear"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

const StoryBook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [showNextButton, setShowNextButton] = useState(false);
  const [nextButtonVisible, setNextButtonVisible] = useState(true);
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const blinkIntervalRef = useRef(null);

  const pixKey = "076.644.995-50";

  // Tempos por página em segundos
  const pageTimes = [5, 8, 20, 2, 8];

  const pages = [
    {
      type: "cover",
      title: "Convite de Casamento"
    },
    {
      title: "O Primeiro Encontro",
      text: "Era uma tarde especial no dia 20 de Agosto de 2020, quando marcamos um encontro, que marcou as nossas vidas...",
      media: {
        type: "image",
        url: "/convite-casamento/arquivos/1.png"
      }
    },
    {
      title: "O Pedido de Namoro",
      text: "No dia 18 de Dezembro de 2020, com o coração acelerado, ele preparou uma surpresa inesquecível e ela disse: SIM... ",
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
      text: "21 de Julho de 2024 um momento perfeito, as palavras certas fizeram o coração transbordar de alegria...",
      media: {
        type: "video",
        url: "/convite-casamento/arquivos/13.mp4"
      }
    },
    {
      title: "Casamento no Civil",
      text: "Em 13 de Fevereiro de 2025 começamos nossa vida casados, escolhemos legalmente nos tornar uma única história, onde cada página será escrita com a tinta do amor e da cumplicidade....",
      media: {
        type: "carousel",
        items: [
          { type: "image", url: "/convite-casamento/arquivos/14.png" },
          { type: "image", url: "/convite-casamento/arquivos/15.png" }
        ]
      }
    },
    {
      type: "special-invitation",
      title: "Nosso Convite Especial",
      text: "Com grande felicidade e amor, convidamos vocês a celebrar este momento especial em nossas vidas. Assim como cada estrela brilha no céu, sua presença iluminará ainda mais o dia em que uniremos nossas almas para sempre."
    },
    {
      type: "invitation",
      title: "Convite Especial"
    }
  ];

  // Efeito para lidar com o temporizador de progresso
  useEffect(() => {
    // Não mostrar a barra de progresso nas páginas especiais
    if (pages[currentPage].type === 'cover' || 
        pages[currentPage].type === 'invitation' || 
        pages[currentPage].type === 'special-invitation') {
      return;
    }

    // Limpar temporizadores anteriores
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    if (blinkIntervalRef.current) {
      clearInterval(blinkIntervalRef.current);
    }

    // Reiniciar o estado
    setProgress(0);
    setShowNextButton(false);
    setNextButtonVisible(true);

    // Determinar o tempo para esta página
    const pageIndex = currentPage - 1; // Ajustar para os índices começarem em 0
    const adjustedIndex = Math.max(0, Math.min(pageIndex, pageTimes.length - 1));
    const duration = pageTimes[adjustedIndex] * 1000;
    const interval = 100;
    const steps = duration / interval;
    let currentStep = 0;

    // Iniciar o temporizador de progresso
    if (timerActive) {
      timerRef.current = setInterval(() => {
        currentStep += 1;
        const newProgress = (currentStep / steps) * 100;
        setProgress(Math.min(newProgress, 100));

        if (newProgress >= 100) {
          clearInterval(timerRef.current);
          setShowNextButton(true);
          
          // Iniciar animação de piscar
          blinkIntervalRef.current = setInterval(() => {
            setNextButtonVisible(prev => !prev);
          }, 800);
        }
      }, interval);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (blinkIntervalRef.current) {
        clearInterval(blinkIntervalRef.current);
      }
    };
  }, [currentPage, timerActive]);

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

  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

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
      className="fixed top-4 left-4 px-4 py-2 rounded-full shadow-lg text-white hover:bg-opacity-90 transition-all z-50 backdrop-blur-sm flex items-center gap-2"
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
    <div className="text-center space-y-12 py-4 sm:py-8 px-2 sm:px-8 min-h-[60vh] flex flex-col items-center justify-center">
      <div className="space-y-12 max-w-2xl mx-auto p-8 rounded-lg bg-white/80 backdrop-blur-sm shadow-lg">
        <Heart style={{color: '#967AA1'}} className="w-16 h-16 mx-auto animate-pulse" />
        
        <div className="space-y-6">
          <h1 style={{color: '#192A51'}} className="text-4xl sm:text-6xl font-serif">
            Lucca & Paloma
          </h1>
          
          <p style={{color: '#967AA1'}} className="text-xl font-light italic px-4">
            "Quando dois corações se encontram, 
            nasce uma história que merece ser eternizada..."
          </p>
        </div>

        <div className="flex justify-center pt-8">
          <button 
            onClick={goToNextPage}
            style={{backgroundColor: '#967AA1'}}
            className="text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <span>Descobrir Nossa História</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderSpecialInvitation = () => (
    <div className="text-center space-y-8 py-4 sm:py-8 px-2 sm:px-8 min-h-[60vh] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Efeito de fogos de artifício - Versão melhorada */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="firework-container">
          <div className="firework" style={{left: '25%', top: '25%'}}></div>
          <div className="firework" style={{left: '75%', top: '33%', animationDelay: '1s'}}></div>
          <div className="firework" style={{left: '50%', top: '20%', animationDelay: '2s'}}></div>
          <div className="firework" style={{left: '33%', top: '66%', animationDelay: '1.5s'}}></div>
          <div className="firework" style={{left: '80%', top: '15%', animationDelay: '0.5s'}}></div>
          <div className="firework" style={{left: '15%', top: '60%', animationDelay: '2.5s'}}></div>
          <div className="firework" style={{left: '65%', top: '75%', animationDelay: '0.8s'}}></div>
          <div className="firework" style={{left: '40%', top: '40%', animationDelay: '3s'}}></div>
        </div>
      </div>
      
      <div className="space-y-12 max-w-2xl mx-auto p-8 rounded-lg bg-white/90 backdrop-blur-sm shadow-lg z-10">
        {/* Corações pulsantes */}
        <div className="flex justify-center gap-6">
          <Heart style={{color: '#967AA1'}} className="w-8 h-8 animate-pulse" />
          <Heart style={{color: '#967AA1'}} className="w-12 h-12 animate-pulse" style={{animationDelay: '0.3s'}} />
          <Heart style={{color: '#967AA1'}} className="w-8 h-8 animate-pulse" style={{animationDelay: '0.7s'}} />
        </div>
        
        <h2 style={{color: '#192A51'}} className="text-3xl sm:text-5xl font-serif">
          Nosso Convite Especial
        </h2>
        
        <p style={{color: '#192A51'}} className="text-xl font-light italic px-4 leading-relaxed">
          Com grande felicidade e amor, convidamos você a celebrar este momento especial em nossas vidas. 
        </p>
        
        <p style={{color: '#192A51'}} className="text-xl font-light italic px-4 leading-relaxed">
          Assim como cada estrela brilha no céu, sua presença iluminará ainda mais o dia em que uniremos nossas almas para sempre.
        </p>

        <div className="flex justify-center pt-4">
          <button 
            onClick={goToNextPage}
            style={{backgroundColor: '#967AA1'}}
            className={`text-white px-10 py-4 text-xl rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg ${nextButtonVisible ? 'animate-pulse' : 'opacity-50'}`}
          >
            Convite
          </button>
        </div>
      </div>
    </div>
  );

  const renderInvitationPage = () => (
    <div className="text-center space-y-8 py-4 sm:py-8 px-2 sm:px-8">
      <div className="space-y-6">
        <Heart style={{color: '#967AA1'}} className="w-12 h-12 mx-auto animate-pulse" />
        <h2 style={{color: '#192A51'}} className="text-3xl sm:text-5xl font-serif">
          Lucca e Paloma
        </h2>
        <p style={{color: '#967AA1'}} className="text-lg sm:text-xl font-light italic">
          Com muita alegria convidamos vocês para celebrar nosso amor...
        </p>
      </div>

      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg space-y-8 p-4 sm:p-8">
        <p className="text-lg sm:text-xl leading-relaxed" style={{color: '#192A51'}}>
          Com imensa felicidade e amor, gostaríamos de convidá-los para celebrar 
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
                Igreja Nossa Senhora da Luz
              </p>
              <p style={{color: '#192A51'}} className="text-lg">
                Av. Nossa Sra. da Luz, 194 - Centro
              </p>
              <p style={{color: '#192A51'}} className="text-lg">Clevelândia - PR</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <button
                onClick={() => {
                  window.open('https://www.google.com/maps/place/Igreja+Nossa+Senhora+da+Luz/@-26.4054754,-52.3553762,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipN2srrWdGyDefwveWJzaZR_IGrMKAp5XFKgAhlC!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipN2srrWdGyDefwveWJzaZR_IGrMKAp5XFKgAhlC%3Dw114-h86-k-no!7i4032!8i3024!4m7!3m6!1s0x94e53dc34c0375fb:0x439b0cf20cda5c80!8m2!3d-26.4054117!4d-52.35541!10e5!16s%2Fg%2F11fn8ww954?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D');
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
                    location: "Igreja Matriz Nossa Senhora da Luz"
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
              <p style={{color: '#192A51'}} className="text-lg">18:30 horas</p>
              <p style={{color: '#192A51'}} className="text-lg font-medium">
                Restaurante Ferreiras
              </p>
              <p style={{color: '#192A51'}} className="text-lg">
                R. Cel. Manoel Ferreira Bello, 639 - Centro
              </p>
              <p style={{color: '#192A51'}} className="text-lg">Clevelândia - PR</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <button
                onClick={() => {
                  window.open('https://bit.ly/festadecasamentolp');
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
                    location: "Restaurante Ferreiras"
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
            Por favor, confirme sua presença até 01 de Setembro de 2025 via WhatsApp! 
          </p>
          
        </div>

        <div className="space-y-4">
          <div className="text-center max-w-xl mx-auto">
            <p style={{color: '#192A51'}} className="text-lg leading-relaxed">
              O verdadeiro presente é poder compartilhar este momento único com vocês.
              Sua presença é o que tornará nosso dia ainda mais especial e memorável.
            </p>
            <p style={{color: '#192A51'}} className="text-lg leading-relaxed mt-4">
              Aos queridos que manifestarem interesse em nos presentear além de sua presença, 
              compartilhamos que já iniciamos a construção do nosso lar juntos, já tendo nossa casa mobilhada, dessa forma deixamos:
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

      {/* Estilos CSS para Fireworks - Versão melhorada */}
      <style jsx>{`
        @keyframes firework {
          0% { transform: translate(0, 0); width: 0.5vmin; opacity: 1; }
          50% { width: 0.5vmin; opacity: 1; }
          100% { width: 10vmin; opacity: 0; }
        }

        .firework-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .firework {
          width: 0.5vmin;
          height: 0.5vmin;
          position: absolute;
          transform: translate(-50%, -50%);
          animation: firework 2s infinite;
        }

        .firework::before, .firework::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          opacity: 0.7;
        }

        .firework::before {
          background: radial-gradient(circle, rgb(255, 189, 189) 0%, rgba(255, 189, 189, 0) 100%);
          animation: firework 2s infinite;
        }

        .firework::after {
          background: radial-gradient(circle, rgb(186, 149, 205) 0%, rgba(186, 149, 205, 0) 100%);
          animation: firework 2.1s 0.1s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      <div className="w-full max-w-4xl mx-auto p-4 sm:p-8">
        <div className="bg-white rounded-lg shadow-2xl p-4 sm:p-8 relative">
          {pages[currentPage].type === 'cover' ? (
            renderCoverPage()
          ) : pages[currentPage].type === 'invitation' ? (
            renderInvitationPage()
          ) : pages[currentPage].type === 'special-invitation' ? (
            renderSpecialInvitation()
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
                      onPlay={() => setTimerActive(false)}
                      onPause={() => setTimerActive(true)}
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
              
              {/* Barra de progresso */}
              <ProgressBar progress={progress} />
            </div>
          )}

          {/* Navegação - Remover para o card de convite especial */}
          {pages[currentPage].type !== 'cover' && 
           pages[currentPage].type !== 'special-invitation' && (
            <div className="flex justify-between items-center mt-6">
              {currentPage > 0 && (
                <button
                  onClick={goToPrevPage}
                  style={{backgroundColor: '#AAA1C8'}}
                  className="p-3 rounded-full text-white hover:bg-opacity-90 transition-all shadow-md"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              
              {showNextButton && currentPage < pages.length - 1 && (
                <button
                  onClick={goToNextPage}
                  style={{
                    backgroundColor: '#AAA1C8',
                    opacity: nextButtonVisible ? 1 : 0.5
                  }}
                  className="p-3 rounded-full text-white hover:bg-opacity-90 transition-all shadow-md animate-pulse flex items-center gap-2"
                >
                  <span>Seguinte</span>
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