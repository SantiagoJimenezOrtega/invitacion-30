import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  // ============ ESTADOS ============
  const [isExploded, setIsExploded] = useState(false) // Controla si el 30 ya explotó
  const [showInvitation, setShowInvitation] = useState(false) // Muestra la invitación
  const [showEventDetails, setShowEventDetails] = useState(false) // Muestra los detalles del evento
  const [confetti, setConfetti] = useState([]) // Array de confetis
  const [isMusicPlaying, setIsMusicPlaying] = useState(false) // Estado de la música
  const [userInteracted, setUserInteracted] = useState(false) // Detecta interacción del usuario

  const audioRef = useRef(null) // Referencia al elemento de audio

  // ============ SISTEMA DE AUDIO ============
  // Intenta reproducir la música automáticamente al cargar
  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.7 // Volumen al 70%
          await audioRef.current.play()
          setIsMusicPlaying(true)
        }
      } catch (error) {
        // Si falla autoplay, esperar interacción del usuario
        console.log('Autoplay bloqueado, esperando interacción del usuario')
        setIsMusicPlaying(false)
      }
    }

    // Pequeño delay para asegurar que el DOM esté listo
    const timer = setTimeout(() => {
      playAudio()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Reproduce audio en la primera interacción si no se ha iniciado
  useEffect(() => {
    if (userInteracted && !isMusicPlaying && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsMusicPlaying(true))
        .catch(err => console.log('Error al reproducir:', err))
    }
  }, [userInteracted, isMusicPlaying])

  // Toggle de música
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause()
        setIsMusicPlaying(false)
      } else {
        audioRef.current.play()
        setIsMusicPlaying(true)
      }
    }
  }


  // ============ EXPLOSIÓN Y CONFETI ============
  // Genera confetis aleatorios que caen infinitamente
  const generateConfetti = () => {
    const newConfetti = []
    const colors = ['#8600FB', '#ff1744', '#ffb6c1', '#fff', '#ffd700', '#ff69b4']

    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: i,
        left: Math.random() * 100, // Posición horizontal aleatoria (%)
        delay: Math.random() * 5, // Retraso aleatorio más amplio
        duration: 4 + Math.random() * 3, // Duración de caída
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 6 + Math.random() * 8, // Tamaño aleatorio
      })
    }
    return newConfetti
  }

  // Genera confeti inicial cuando aparece la invitación
  useEffect(() => {
    if (showInvitation) {
      setConfetti(generateConfetti())
    }
  }, [showInvitation])

  // Maneja el clic en el número 30
  const handleNumberClick = () => {
    if (!userInteracted) setUserInteracted(true) // Marca que el usuario interactuó

    if (!isExploded) {
      setIsExploded(true) // Activa la animación de explosión

      // Después de la explosión, cambia el fondo y muestra la invitación
      setTimeout(() => {
        setShowInvitation(true)
      }, 1200) // Espera a que termine la explosión
    }
  }

  // ============ RENDER ============
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animación de fondo con Framer Motion */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ background: 'linear-gradient(to bottom right, #b30000, #8b0000)' }}
        animate={{
          background: showInvitation
            ? 'linear-gradient(to bottom right, #ffb6c1, #ffc0cb, #ffe4e1)'
            : 'linear-gradient(to bottom right, #b30000, #8b0000)'
        }}
        transition={{ duration: 2.5, ease: 'easeInOut' }}
      />

      {/* Overlay con animación de opacidad para transición más suave */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-soft-pink via-pink-200 to-pink-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: showInvitation ? 1 : 0 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />

      <div className="relative min-h-screen"
    >
      {/* ============ ELEMENTO DE AUDIO ============ */}
      <audio
        ref={audioRef}
        src="/audio/Treinta Años Contigo.wav"
        loop
        autoPlay
        preload="auto"
      />

      {/* ============ BOTÓN DE CONTROL DE MÚSICA ============ */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 bg-white/20 backdrop-blur-md p-4 rounded-full shadow-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
        aria-label="Control de música"
      >
        {isMusicPlaying ? (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        )}
      </motion.button>


      {/* ============ CONFETI CONTINUO EN EL FONDO ============ */}
      {showInvitation && confetti.map((conf) => (
        <motion.div
          key={conf.id}
          initial={{ y: -100, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight + 100,
            rotate: 720,
            opacity: [1, 1, 0.5, 0]
          }}
          transition={{
            duration: conf.duration,
            delay: conf.delay,
            ease: 'linear',
            repeat: Infinity,
            repeatDelay: 0
          }}
          className="fixed pointer-events-none z-0"
          style={{
            left: `${conf.left}%`,
            width: `${conf.size}px`,
            height: `${conf.size}px`,
            backgroundColor: conf.color,
            borderRadius: conf.id % 3 === 0 ? '50%' : '2px',
          }}
        />
      ))}

      {/* ============ PANTALLA INICIAL - NÚMERO 30 ============ */}
      {!showInvitation && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-8">
            <motion.div
              className={`text-[200px] font-bold text-white select-none cursor-pointer ${
                !isExploded ? 'float-animation' : 'explode'
              }`}
              onClick={handleNumberClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={!isExploded ? {
                textShadow: [
                  '0 0 40px rgba(255,255,255,0.5), 0 0 80px rgba(255,255,255,0.3)',
                  '0 0 60px rgba(255,255,255,0.8), 0 0 120px rgba(255,255,255,0.5)',
                  '0 0 40px rgba(255,255,255,0.5), 0 0 80px rgba(255,255,255,0.3)'
                ]
              } : {}}
              transition={{
                textShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              style={{
                textShadow: '0 0 40px rgba(255,255,255,0.5), 0 0 80px rgba(255,255,255,0.3)',
                fontFamily: 'Playfair Display, serif'
              }}
            >
              30
            </motion.div>

            {!isExploded && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-white text-2xl font-light tracking-wide font-poppins"
              >
                Toca para comenzar ✨
              </motion.p>
            )}
          </div>
        </div>
      )}

      {/* ============ INVITACIÓN ============ */}
      <AnimatePresence>
        {showInvitation && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="min-h-screen flex items-center justify-center p-6 lg:p-12"
          >
            <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">

              {/* ============ COLUMNA IZQUIERDA - TEXTO ============ */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 1.2 }}
                className="space-y-8"
              >
                <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/50">
                  <h1 className="text-4xl lg:text-5xl font-bold text-pink-600 mb-8 font-playfair text-center lg:text-left">
                    Celebremos juntos ✨
                  </h1>

                  <AnimatePresence mode="wait">
                    {!showEventDetails ? (
                      <motion.div
                        key="invitation-text"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6 text-gray-700 text-lg leading-relaxed font-poppins"
                      >
                        <p>
                          La vida se celebra mejor en buena compañía,<br />
                          y en esta ocasión queremos hacerlo contigo.
                        </p>

                        <p>
                          Con mucho cariño, <strong className="text-pink-600">mi familia te invita a festejar mis 30 años</strong>,
                          un momento que marca el inicio de una nueva etapa llena de amor, alegría y esperanza.
                        </p>

                        <p className="italic text-pink-500">
                          Tu presencia hará de este día algo verdaderamente especial.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="event-details"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6 text-gray-700 text-lg leading-relaxed font-poppins"
                      >
                        <div className="text-center lg:text-left">
                          <p className="text-2xl font-bold text-pink-600 mb-4">
                            ¡Nos vemos pronto! 💕
                          </p>

                          <div className="space-y-4">
                            <div className="bg-pink-50 rounded-2xl p-6">
                              <p className="text-sm uppercase tracking-wider text-pink-400 font-semibold mb-2">📅 Fecha</p>
                              <p className="text-xl font-semibold text-gray-800">
                                Sábado 25 de Octubre
                              </p>
                            </div>

                            <div className="bg-pink-50 rounded-2xl p-6">
                              <p className="text-sm uppercase tracking-wider text-pink-400 font-semibold mb-2">🕔 Hora</p>
                              <p className="text-xl font-semibold text-gray-800">
                                5:00 PM
                              </p>
                            </div>

                            <div className="bg-pink-50 rounded-2xl p-6">
                              <p className="text-sm uppercase tracking-wider text-pink-400 font-semibold mb-2">📍 Dirección</p>
                              <p className="text-xl font-semibold text-gray-800">
                                Carrera 9 #66-24<br />
                                Barrio El Nogal
                              </p>
                            </div>
                          </div>

                          <p className="mt-6 italic text-pink-500">
                            Te esperamos para celebrar juntos este momento tan especial.
                          </p>

                          {/* Botón de WhatsApp */}
                          <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(134, 0, 251, 0.3)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              const phoneNumber = '573175710585'
                              const message = encodeURIComponent(
                                '¡Hola! Confirmo mi asistencia a tu celebración de 30 años el sábado 25 de octubre a las 5:00 PM. ¡Nos vemos! 🎉💕'
                              )
                              window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
                            }}
                            className="mt-6 w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-lg shadow-xl transition-all duration-300"
                            style={{
                              background: 'linear-gradient(135deg, #8600FB 0%, #ff1744 100%)',
                            }}
                          >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                            Enviar mi confirmación por WhatsApp
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ============ BOTÓN DE CONFIRMACIÓN ============ */}
                  {!showEventDetails && (
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(134, 0, 251, 0.3)' }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-8 w-full lg:w-auto px-12 py-4 rounded-full text-white font-semibold text-lg shadow-xl transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, #8600FB 0%, #ff1744 100%)',
                      }}
                      onClick={() => setShowEventDetails(true)}
                    >
                      Confirmar asistencia
                    </motion.button>
                  )}
                </div>
              </motion.div>

              {/* ============ COLUMNA DERECHA - ANIMACIÓN ============ */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 1.4 }}
                className="flex items-center justify-center"
              >
                <div className="relative w-full max-w-md">
                  {/* Pastel animado con CSS */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1, delay: 1, type: 'spring' }}
                    className="relative"
                  >
                    {/* Base del pastel */}
                    <div className="w-full aspect-square max-w-sm mx-auto relative flex items-end justify-center">
                      {/* Piso 3 (base - más grande) */}
                      <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="absolute bottom-0 left-0 right-0 h-24 rounded-t-3xl"
                        style={{
                          background: 'linear-gradient(135deg, #8600FB 0%, #d946ef 100%)',
                          boxShadow: '0 4px 20px rgba(134, 0, 251, 0.4)'
                        }}
                      >
                        <div className="absolute top-0 w-full h-3 bg-white/30 rounded-full"></div>
                      </motion.div>

                      {/* Piso 2 (medio) */}
                      <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.4 }}
                        className="absolute bottom-24 h-20 rounded-t-3xl"
                        style={{
                          width: '80%',
                          left: '10%',
                          background: 'linear-gradient(135deg, #ff1744 0%, #ff69b4 100%)',
                          boxShadow: '0 4px 20px rgba(255, 23, 68, 0.4)'
                        }}
                      >
                        <div className="absolute top-0 w-full h-3 bg-white/30 rounded-full"></div>
                      </motion.div>

                      {/* Piso 1 (superior - más pequeño) */}
                      <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.6 }}
                        className="absolute bottom-44 h-16 rounded-t-3xl"
                        style={{
                          width: '60%',
                          left: '20%',
                          background: 'linear-gradient(135deg, #ffb6c1 0%, #ffc0cb 100%)',
                          boxShadow: '0 4px 20px rgba(255, 182, 193, 0.4)'
                        }}
                      >
                        <div className="absolute top-0 w-full h-3 bg-white/30 rounded-full"></div>
                      </motion.div>

                      {/* Velas en el pastel - 3 velas representando 30 años (cada una = 10 años) */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.8, type: 'spring' }}
                        className="absolute flex gap-4"
                        style={{
                          bottom: '240px',
                          left: '45%',
                          transform: 'translateX(-50%)'
                        }}
                      >
                        {/* Vela 1 (10 años) */}
                        <div className="relative">
                          <div className="w-2 h-8 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-t-lg"></div>
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-5 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 rounded-full flame"></div>
                        </div>
                        {/* Vela 3 (10 años) */}
                        <div className="relative">
                          <div className="w-2 h-8 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-t-lg"></div>
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-5 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 rounded-full flame"></div>
                        </div>
                        {/* Vela 2 (10 años) */}
                        <div className="relative">
                          <div className="w-2 h-8 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-t-lg"></div>
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-5 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 rounded-full flame"></div>
                        </div>
                        
                      </motion.div>

                      {/* Decoraciones flotantes alrededor del pastel */}
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 5, 0]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute -right-8 top-20 text-6xl"
                      >
                        🎈
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, -15, 0],
                          rotate: [0, -5, 0]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5
                        }}
                        className="absolute -left-8 top-32 text-6xl"
                      >
                        🎀
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, -12, 0],
                          rotate: [0, 8, 0]
                        }}
                        transition={{
                          duration: 2.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1
                        }}
                        className="absolute -right-4 bottom-8 text-5xl"
                      >
                        ✨
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Contenedor reservado para Spline (opcional) */}
                  {/* Puedes reemplazar el pastel CSS con una animación 3D de Spline */}
                  <div id="spline-container" className="hidden w-full h-96"></div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  )
}

export default App
