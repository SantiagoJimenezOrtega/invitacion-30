import { useEffect } from 'react'

/**
 * Componente para generar la imagen de preview de Open Graph
 * Accede a: http://localhost:5173/preview y toma screenshot
 */
function PreviewImage() {
  useEffect(() => {
    // Espera a que las fuentes carguen
    document.fonts.ready.then(() => {
      console.log('Preview listo - Toma screenshot ahora (1200x630)')
    })
  }, [])

  return (
    <div
      className="w-[1200px] h-[630px] flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #8600FB 0%, #ff1744 100%)'
      }}
    >
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-white blur-3xl"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 text-center px-12">
        <div
          className="text-[180px] font-bold text-white mb-6"
          style={{
            fontFamily: 'Playfair Display, serif',
            textShadow: '0 0 60px rgba(255,255,255,0.5)'
          }}
        >
          30
        </div>

        <h1
          className="text-5xl font-bold text-white mb-4"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Estás invitado a mi celebración
        </h1>

        <p
          className="text-3xl text-white/90 mb-8"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Sábado 25 de Octubre • 5:00 PM
        </p>

        <div
          className="inline-block px-8 py-4 bg-white/20 backdrop-blur-md rounded-full border-2 border-white"
        >
          <p
            className="text-2xl text-white font-semibold"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            ✨ Toca para abrir tu invitación ✨
          </p>
        </div>
      </div>

      {/* Confeti decorativo */}
      <div className="absolute top-20 left-20 text-6xl">🎈</div>
      <div className="absolute top-40 right-32 text-6xl">🎉</div>
      <div className="absolute bottom-32 left-40 text-6xl">✨</div>
      <div className="absolute bottom-20 right-20 text-6xl">💕</div>
    </div>
  )
}

export default PreviewImage
