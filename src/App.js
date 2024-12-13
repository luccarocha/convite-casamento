import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, Calendar, Copy, Volume2, VolumeX } from 'lucide-react';

const StoryBook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  const pixKey = "123.456.789-00"; // Substitua pela chave PIX real

  const pages = [
    {
      title: "O Primeiro Encontro",
      text: "Era uma noite especial de junho quando seus caminhos se cruzaram pela primeira vez...",
      imageUrl: "/api/placeholder/400/300"
    },
    {
      title: "O Pedido de Namoro",
      text: "Sob as estrelas, com o coração acelerado, ele preparou uma surpresa inesquecível...",
      imageUrl: "/api/placeholder/400/300"
    },
    {
      title: "A Primeira Viagem",
      text: "Juntos, descobrindo novos horizontes e construindo memórias para toda vida...",
      imageUrl: "/api/placeholder/400/300"
    },
    {
      title: "O Pedido de Casamento",
      text: "No momento perfeito, as palavras certas fizeram o coração transbordar de alegria...",
      imageUrl: "/api/placeholder/400/300"
    },
    {
      type: "invitation",
      title: "Convite Especial"
    }
  ];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.log("Reprodução automática bloqueada pelo navegador");
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  const copyPixKey = () => {
    navigator.clipboard.writeText(pixKey);
    setShowCopySuccess(true);
    setTimeout(() => setShowCopySuccess(false), 2000);
  };

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const MusicControl = () => (
    <button
      onClick={toggleMusic}
      style={{backgroundColor: '#FF4D6D'}}
      className="fixed bottom-4 right-4 p-3 rounded-full shadow-lg text-white hover:bg-opacity-90 transition-all z-50"
    >
      {isPlaying ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
    </button>
  );

  const renderInvitationPage = () => (
    <div className="text-center space-y-8 py-8">
      <div className="space-y-4">
        <div className="flex justify-center gap-4 mb-2">
          <Heart style={{color: '#FF4D6D'}} className="w-8 h-8 animate-bounce" />
          <Heart style={{color: '#C9184A'}} className="w-12 h-12 animate-pulse" />
          <Heart style={{color: '#FF4D6D'}} className="w-8 h-8 animate-bounce" />
        </div>
        <h2 style={{color: '#800F2F'}} className="text-5xl font-serif">Convite Especial</h2>
        <p style={{color: '#C9184A'}} className="text-xl font-light italic">
          Com muita alegria convidamos você para celebrar nosso amor...
        </p>
      </div>

      <div style={{background: 'linear-gradient(to bottom, white, #FFB3C1)'}} 
           className="max-w-2xl mx-auto p-8 rounded-lg shadow-lg space-y-6 relative">
        <p className="text-lg leading-relaxed" style={{color: '#800F2F'}}>
          Com imensa felicidade e amor, gostaríamos de convidá-lo(a) para celebrar 
          conosco o início desta nova e maravilhosa etapa de nossas vidas!
        </p>

        <div style={{borderColor: '#FF758F'}} 
             className="border-t border-b py-8 space-y-6 bg-white bg-opacity-70 rounded-lg">
          <div className="flex items-center justify-center gap-2">
            <Calendar style={{color: '#C9184A'}} className="w-6 h-6" />
            <p style={{color: '#800F2F'}} className="text-2xl font-medium">20 de Junho de 2025</p>
          </div>

          {/* Cerimônia */}
          <div style={{backgroundColor: '#FFB3C1'}} className="p-4 rounded-lg space-y-2">
            <h3 style={{color: '#800F2F'}} className="text-xl font-medium">Cerimônia</h3>
            <div className="space-y-1">
              <p style={{color: '#800F2F'}} className="text-lg">16:00 horas</p>
              <p style={{color: '#800F2F'}} className="text-lg font-medium">Igreja Nossa Senhora das Graças</p>
              <p style={{color: '#800F2F'}} className="text-lg">Rua das Flores, 123 - Jardim Primavera</p>
              <p style={{color: '#800F2F'}} className="text-lg">São Paulo - SP</p>
            </div>
          </div>

          {/* Festa */}
          <div style={{backgroundColor: '#FFB3C1'}} className="p-4 rounded-lg space-y-2">
            <h3 style={{color: '#800F2F'}} className="text-xl font-medium">Festa</h3>
            <div className="space-y-1">
              <p style={{color: '#800F2F'}} className="text-lg">20:00 horas</p>
              <p style={{color: '#800F2F'}} className="text-lg font-medium">Espaço Villa Real</p>
              <p style={{color: '#800F2F'}} className="text-lg">Av. dos Sonhos, 789 - Centro</p>
              <p style={{color: '#800F2F'}} className="text-lg">Campos do Jordão - SP</p>
              <p style={{color: '#800F2F'}} className="text-sm mt-2">
                (180 km de São Paulo - aproximadamente 2h30 de viagem)
              </p>
            </div>
          </div>

          {/* Informações de hospedagem */}
          <div className="mt-4 text-center">
            <p style={{color: '#C9184A'}} className="text-sm">
              Preparamos uma lista de hotéis parceiros em Campos do Jordão 
              com condições especiais para nossos convidados.
            </p>
            <button style={{color: '#FF4D6D'}} className="mt-2 font-medium hover:underline">
              Ver opções de hospedagem
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <p style={{color: '#800F2F'}} className="text-lg">
            Por favor, confirme sua presença até 20 de Maio de 2025
          </p>
          <button 
            style={{backgroundColor: '#C9184A'}}
            className="text-white px-8 py-4 rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
          >
            Confirmar Presença
          </button>
        </div>

        <div className="mt-12 space-y-4">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <p style={{color: '#800F2F'}} className="text-lg leading-relaxed">
              O verdadeiro presente é poder compartilhar este momento único com você.
              Sua presença é o que tornará nosso dia ainda mais especial e memorável.
            </p>
            <p style={{color: '#800F2F'}} className="text-lg leading-relaxed">
              Aos queridos que manifestaram interesse em nos presentear além de sua presença, 
              compartilhamos que estamos iniciando a construção do nosso lar juntos.
            </p>
            
            <div style={{backgroundColor: '#FFB3C1'}} className="pt-6 rounded-lg p-4 mt-6">
              <p style={{color: '#800F2F'}} className="font-light mb-3">Nossa chave PIX:</p>
              <div className="flex items-center justify-center gap-2">
                <input 
                  type="text" 
                  value={pixKey}
                  readOnly
                  className="px-4 py-2 border rounded-l-lg bg-white text-gray-700 w-48"
                />
                <button
                  onClick={copyPixKey}
                  style={{backgroundColor: '#FF4D6D'}}
                  className="px-4 py-2 rounded-r-lg border-y border-r transition-colors text-white"
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
    <div style={{backgroundColor: '#FFB3C1'}} className="max-w-4xl mx-auto p-8 min-h-screen relative">
      {/* Áudio de fundo */}
      <audio
        ref={audioRef}
        loop
        style={{ display: 'none' }}
        src="/caminho-para-sua-musica.mp3" // Substitua pelo caminho real da sua música
      />

      {/* Botão de controle de música */}
      <MusicControl />

      <div className="relative bg-white rounded-lg shadow-2xl p-8">
        {currentPage === 0 && (
          <div className="text-center mb-8">
            <h1 style={{color: '#800F2F'}} className="text-4xl font-serif mb-4">Nossa História de Amor</h1>
            <p style={{color: '#C9184A'}} className="italic">Um conto de amor verdadeiro</p>
          </div>
        )}

        {pages[currentPage].type === 'invitation' ? (
          renderInvitationPage()
        ) : (
          <div className="mb-8">
            <h2 style={{color: '#800F2F'}} className="text-3xl font-serif mb-6 text-center">
              {pages[currentPage].title}
            </h2>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2">
                <img
                  src={pages[currentPage].imageUrl}
                  alt={pages[currentPage].title}
                  className="rounded-lg shadow-md w-full h-64 object-cover"
                />
              </div>
              
              <div className="w-full md:w-1/2 space-y-4">
                <p style={{color: '#800F2F'}} className="text-lg leading-relaxed">
                  {pages[currentPage].text}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            onClick={previousPage}
            disabled={currentPage === 0}
            style={{
              backgroundColor: currentPage === 0 ? '#FFB3C1' : '#FF4D6D',
              color: currentPage === 0 ? '#800F2F' : 'white'
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Anterior
          </button>
          
          <span style={{color: '#800F2F'}}>
            Página {currentPage + 1} de {pages.length}
          </span>
          
          <button
            onClick={nextPage}
            disabled={currentPage === pages.length - 1}
            style={{
              backgroundColor: currentPage === pages.length - 1 ? '#FFB3C1' : '#FF4D6D',
              color: currentPage === pages.length - 1 ? '#800F2F' : 'white'
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full transition-colors"
          >
            Próxima
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryBook;