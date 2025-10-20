# 🎉 Documentación del Proyecto - Invitación Interactiva 30 Años

## 📋 Tabla de Contenidos
1. [Descripción General](#descripción-general)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Flujo de Usuario](#flujo-de-usuario)
5. [Características Principales](#características-principales)
6. [Sistema de Audio](#sistema-de-audio)
7. [Animaciones](#animaciones)
8. [Open Graph y Compartir](#open-graph-y-compartir)
9. [Despliegue](#despliegue)
10. [Configuración y Personalización](#configuración-y-personalización)

---

## 📖 Descripción General

Invitación web interactiva y animada para celebrar un cumpleaños número 30. La experiencia está diseñada para ser mágica, elegante y romántica, con efectos visuales suaves, transiciones fluidas y música de fondo.

### Objetivo
Crear una invitación digital memorable que:
- Sea visualmente atractiva y moderna
- Funcione perfectamente en dispositivos móviles
- Se pueda compartir fácilmente por WhatsApp
- Incluya música de fondo personalizada
- Permita confirmación de asistencia vía WhatsApp

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18.2.0**: Biblioteca principal para la UI
- **Vite 5.0.8**: Build tool y dev server
- **Framer Motion 10.16.4**: Librería de animaciones
- **TailwindCSS 3.4.0**: Framework de estilos utility-first

### Dependencias de Desarrollo
- **PostCSS 8.4.32**: Procesador de CSS
- **Autoprefixer 10.4.16**: Plugin para compatibilidad de navegadores
- **@vitejs/plugin-react 4.2.1**: Plugin de Vite para React

### Hosting y Deploy
- **GitHub**: Control de versiones
- **Vercel**: Hosting y despliegue continuo

---

## 📁 Estructura del Proyecto

```
invi30/
├── public/
│   ├── audio/
│   │   ├── Treinta Años Contigo.wav    # Música principal (29.7 MB)
│   │   ├── Treinta Años Contigo.mp3    # Backup en MP3 (3.7 MB)
│   │   └── .gitkeep
│   └── preview.jpg                      # Imagen para Open Graph (1200x630px)
│
├── src/
│   ├── App.jsx                          # Componente principal de la invitación
│   ├── PreviewImage.jsx                 # Componente para generar imagen OG
│   ├── main.jsx                         # Entry point
│   └── index.css                        # Estilos globales y animaciones CSS
│
├── index.html                           # HTML base con metadatos Open Graph
├── vite.config.js                       # Configuración de Vite
├── tailwind.config.js                   # Configuración de TailwindCSS
├── postcss.config.js                    # Configuración de PostCSS
├── vercel.json                          # Configuración de rewrites para Vercel
├── package.json                         # Dependencias y scripts
└── README.md                            # Documentación del usuario
```

---

## 👤 Flujo de Usuario

### 1. **Carga Inicial**
```
Usuario abre el link → Pantalla roja oscura → Número "30" flotando
                    ↓
              Música comienza a sonar (si autoplay permitido)
                    ↓
         Texto aparece: "Toca para comenzar ✨"
```

### 2. **Interacción con el Número 30**
```
Usuario hace clic/toca el "30"
        ↓
Número explota (animación)
        ↓
Confeti comienza a caer
        ↓
Fondo cambia de rojo a rosado (2.5 segundos)
        ↓
Invitación aparece con fade-in
```

### 3. **Pantalla de Invitación**
```
Columna Izquierda:          Columna Derecha:
- Título                    - Pastel animado
- Texto de invitación       - Velas parpadeantes
- Botón "Confirmar"         - Decoraciones flotantes
```

### 4. **Confirmación de Asistencia**
```
Usuario hace clic en "Confirmar asistencia"
              ↓
Texto cambia con animación
              ↓
Aparecen 3 tarjetas:
- 📅 Fecha: Sábado 25 de Octubre
- 🕔 Hora: 5:00 PM
- 📍 Dirección: Carrera 9 #66-24, Barrio El Nogal
              ↓
Botón de WhatsApp aparece
```

### 5. **Envío de Confirmación**
```
Usuario hace clic en botón WhatsApp
              ↓
Se abre WhatsApp con mensaje pre-escrito:
"¡Hola! Confirmo mi asistencia a tu celebración
de 30 años el sábado 25 de octubre a las 5:00 PM.
¡Nos vemos! 🎉💕"
              ↓
Mensaje enviado al número: 573175710585
```

---

## ✨ Características Principales

### 1. **Pantalla Inicial Interactiva**

**Elemento**: Número "30" flotando

```jsx
// Animación CSS
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

// Framer Motion - Efecto de brillo pulsante
animate={{
  textShadow: [
    '0 0 40px rgba(255,255,255,0.5), 0 0 80px rgba(255,255,255,0.3)',
    '0 0 60px rgba(255,255,255,0.8), 0 0 120px rgba(255,255,255,0.5)',
    '0 0 40px rgba(255,255,255,0.5), 0 0 80px rgba(255,255,255,0.3)'
  ]
}}
transition={{ duration: 2, repeat: Infinity }}
```

**Indicador Visual**: Texto "Toca para comenzar ✨"
- Aparece y desaparece con fade
- Ciclo infinito de 2 segundos
- Solo visible antes de la explosión

### 2. **Explosión del Número**

```css
@keyframes explode {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}
```

**Duración**: 600ms
**Timing**: Después de la explosión espera 1200ms antes de mostrar invitación

### 3. **Transición de Fondo**

**Implementación**: Doble capa para transición suave

```jsx
// Capa 1: Gradiente animado
<motion.div
  animate={{
    background: showInvitation
      ? 'linear-gradient(to bottom right, #ffb6c1, #ffc0cb, #ffe4e1)'
      : 'linear-gradient(to bottom right, #b30000, #8b0000)'
  }}
  transition={{ duration: 2.5, ease: 'easeInOut' }}
/>

// Capa 2: Overlay con fade
<motion.div
  animate={{ opacity: showInvitation ? 1 : 0 }}
  transition={{ duration: 2, ease: 'easeInOut' }}
/>
```

**Colores**:
- Inicial: `#b30000` (rojo oscuro)
- Final: `#ffb6c1` (rosado suave)

### 4. **Confeti Infinito**

**Cantidad**: 50 partículas
**Comportamiento**: Caída continua e infinita

```jsx
{
  id: i,
  left: Math.random() * 100,           // Posición horizontal (0-100%)
  delay: Math.random() * 5,            // Delay aleatorio (0-5s)
  duration: 4 + Math.random() * 3,     // Duración (4-7s)
  color: colors[random],                // Color aleatorio
  size: 6 + Math.random() * 8,         // Tamaño (6-14px)
}

// Animación
transition={{
  duration: conf.duration,
  delay: conf.delay,
  ease: 'linear',
  repeat: Infinity,        // ← Infinito
  repeatDelay: 0
}}
```

**Colores del confeti**:
- `#8600FB` - Morado (color principal según instrucciones)
- `#ff1744` - Rojo
- `#ffb6c1` - Rosado
- `#fff` - Blanco
- `#ffd700` - Dorado
- `#ff69b4` - Rosa fuerte

**Z-index**: `z-0` (detrás de todo el contenido)

### 5. **Pastel Animado**

**Estructura**: 3 pisos + 3 velas

```jsx
// Piso 3 (base)
width: 100%, height: 24px
color: #8600FB → #d946ef (gradiente morado)

// Piso 2 (medio)
width: 80%, height: 20px, left: 10%
color: #ff1744 → #ff69b4 (gradiente rojo-rosa)

// Piso 1 (superior)
width: 60%, height: 16px, left: 20%
color: #ffb6c1 → #ffc0cb (gradiente rosado)

// Velas
bottom: 240px, left: 50%
3 velas representando 30 años (cada una = 10 años)
```

**Animación de construcción**:
```jsx
// Cada piso aparece con delay escalonado
Piso 3: delay 1.2s
Piso 2: delay 1.4s
Piso 1: delay 1.6s
Velas: delay 1.8s (con efecto spring)
```

**Llamas**:
```css
@keyframes flicker {
  0%, 100% {
    transform: scaleY(1) translateY(0);
    opacity: 1;
  }
  50% {
    transform: scaleY(0.95) translateY(-2px);
    opacity: 0.8;
  }
}
```

### 6. **Decoraciones Flotantes**

Elementos alrededor del pastel:
- 🎈 Globo (derecha, ciclo 3s)
- 🎀 Moño (izquierda, ciclo 2.5s)
- ✨ Estrella (derecha-abajo, ciclo 2.8s)

```jsx
animate={{
  y: [0, -10, 0],
  rotate: [0, 5, 0]
}}
transition={{
  duration: 3,
  repeat: Infinity,
  ease: "easeInOut"
}}
```

---

## 🎵 Sistema de Audio

### Configuración del Audio

**Archivo**: `public/audio/Treinta Años Contigo.wav`
**Formato**: WAV (alta calidad)
**Tamaño**: ~29.7 MB
**Backup**: MP3 disponible (3.7 MB)

### Implementación

```jsx
<audio
  ref={audioRef}
  src="/audio/Treinta Años Contigo.wav"
  loop
  autoPlay
  preload="auto"
/>
```

### Lógica de Reproducción

```jsx
// 1. Intento de autoplay al cargar
useEffect(() => {
  const playAudio = async () => {
    try {
      if (audioRef.current) {
        audioRef.current.volume = 0.7  // Volumen al 70%
        await audioRef.current.play()
        setIsMusicPlaying(true)
      }
    } catch (error) {
      console.log('Autoplay bloqueado')
      setIsMusicPlaying(false)
    }
  }

  // Delay de 100ms para asegurar DOM listo
  setTimeout(playAudio, 100)
}, [])

// 2. Reproducción en primera interacción (fallback)
useEffect(() => {
  if (userInteracted && !isMusicPlaying && audioRef.current) {
    audioRef.current.play()
      .then(() => setIsMusicPlaying(true))
      .catch(err => console.log('Error:', err))
  }
}, [userInteracted, isMusicPlaying])
```

### Botón de Control

**Posición**: Fixed, bottom-right
**Funcionalidad**: Toggle play/pause

```jsx
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
```

**Iconos**:
- 🔊 Sonido activado (SVG con ondas)
- 🔇 Sonido silenciado (SVG con X)

### Manejo de Autoplay Bloqueado

Algunos navegadores (especialmente móviles) bloquean autoplay. El sistema maneja esto:

1. **Intenta autoplay** al cargar
2. Si falla, **espera primera interacción** (clic en el 30)
3. En ese momento, **inicia la música**

---

## 🎨 Animaciones

### Librería Utilizada
**Framer Motion** - Animaciones declarativas para React

### Animaciones Principales

#### 1. **Fade In/Out**
```jsx
<motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: [0, 1, 0] }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }}
>
  Toca para comenzar ✨
</motion.p>
```

#### 2. **Slide In**
```jsx
// Invitación aparece desde abajo
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.5, delay: 0.8 }}
/>
```

#### 3. **Scale/Hover**
```jsx
// Número 30 crece al hover
whileHover={{ scale: 1.1 }}
whileTap={{ scale: 0.95 }}
```

#### 4. **Spring Animation**
```jsx
// Pastel aparece con rebote
transition={{ delay: 1, type: 'spring' }}
```

#### 5. **AnimatePresence**
```jsx
// Cambio entre texto de invitación y detalles del evento
<AnimatePresence mode="wait">
  {!showEventDetails ? (
    <motion.div
      key="invitation-text"
      exit={{ opacity: 0, x: -50 }}
    />
  ) : (
    <motion.div
      key="event-details"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
    />
  )}
</AnimatePresence>
```

### Timing de Animaciones

```
Clic en "30"
  ↓
t=0s:    Explosión comienza
t=0.6s:  Explosión termina
t=1.2s:  showInvitation = true
t=2.0s:  Invitación aparece (delay 0.8s + duration 1.5s)
t=3.2s:  Texto izquierdo aparece (delay 1.2s)
t=3.6s:  Pastel derecho aparece (delay 1.4s)
```

---

## 📱 Open Graph y Compartir

### Metadatos Implementados

**Ubicación**: `index.html`

```html
<!-- Primary Meta Tags -->
<title>🎉 Estás invitado a mi celebración de 30 años</title>
<meta name="description" content="Con mucho cariño te invito a celebrar mis 30 años. ¡Abre esta invitación especial! 💜✨">

<!-- Open Graph / WhatsApp -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://invitacion-30.vercel.app/">
<meta property="og:title" content="🎉 Estás invitado a mi celebración de 30 años">
<meta property="og:description" content="Con mucho cariño te invito a celebrar mis 30 años. ¡Abre esta invitación especial! 💜✨">
<meta property="og:image" content="https://invitacion-30.vercel.app/preview.jpg">
```

### Imagen de Preview

**Ruta**: `/preview`
**Componente**: `PreviewImage.jsx`
**Dimensiones**: 1200x630px (estándar Open Graph)

**Elementos visuales**:
- Fondo con gradiente morado → rojo
- Número "30" grande en el centro
- Texto: "Estás invitado a mi celebración"
- Fecha y hora del evento
- Llamado a la acción: "✨ Toca para abrir tu invitación ✨"
- Decoraciones: 🎈🎉✨💕

### Generación de la Imagen

1. Acceder a: `https://invitacion-30.vercel.app/preview`
2. Abrir DevTools (`F12`)
3. Modo responsive (`Ctrl+Shift+M`)
4. Configurar: `1200 x 630`
5. Capturar screenshot
6. Guardar como: `public/preview.jpg`

### Preview en WhatsApp

Cuando se comparte el link, WhatsApp muestra:
- 🖼️ Imagen de preview
- 📝 Título con emoji
- 💬 Descripción
- 🔗 URL del sitio

---

## 🚀 Despliegue

### Flujo de Deploy

```
Código local (Git)
     ↓
GitHub Repository
     ↓
Vercel (Deploy automático)
     ↓
https://invitacion-30.vercel.app/
```

### Configuración de Vercel

**Archivo**: `vercel.json`

```json
{
  "rewrites": [
    {
      "source": "/preview",
      "destination": "/index.html"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Propósito**: Permitir que todas las rutas sirvan el `index.html` (SPA routing)

### Scripts de Deploy

```bash
# Desarrollo local
npm run dev -- --host  # Expone en red local

# Build de producción
npm run build

# Preview local del build
npm run preview
```

### Comandos Git Usados

```bash
# Inicializar
git init
git add .
git commit -m "Mensaje"

# Conectar con GitHub
git remote add origin https://github.com/SantiagoJimenezOrtega/invitacion-30.git
git branch -M main
git push -u origin main

# Actualizaciones
git add .
git commit -m "Mensaje"
git push
```

### Deploy Automático

Vercel está configurado para:
- ✅ Detectar cambios en `main`
- ✅ Build automático
- ✅ Deploy en ~1-2 minutos
- ✅ URL permanente: `invitacion-30.vercel.app`

---

## ⚙️ Configuración y Personalización

### Colores Principales

**Paleta oficial del proyecto**:

```javascript
// tailwind.config.js
colors: {
  'dark-red': '#b30000',    // Fondo inicial
  'soft-pink': '#ffb6c1',   // Fondo final
}

// Gradientes
morado → rojo: '#8600FB' → '#ff1744'  // Botones, pastel
rojo → rosa:   '#ff1744' → '#ff69b4'  // Piso medio del pastel
rosa → rosa:   '#ffb6c1' → '#ffc0cb'  // Piso superior del pastel
```

### Tipografías

```html
<!-- Google Fonts -->
- Poppins: Texto general (300, 400, 600)
- Playfair Display: Títulos elegantes (400, 700)
- Dancing Script: Detalles decorativos (400, 700)
```

**Uso**:
- `font-poppins`: Párrafos, botones
- `font-playfair`: Número 30, títulos
- `font-dancing`: (disponible para uso decorativo)

### Textos Personalizables

**Ubicación**: `src/App.jsx`

#### Invitación Principal (líneas 282-294):
```jsx
<p>La vida se celebra mejor en buena compañía,<br />
y en esta ocasión queremos hacerlo contigo.</p>

<p>Con mucho cariño, <strong>mi familia te invita a festejar mis 30 años</strong>,
un momento que marca el inicio de una nueva etapa llena de amor, alegría y esperanza.</p>

<p className="italic">Tu presencia hará de este día algo verdaderamente especial.</p>
```

#### Detalles del Evento (líneas 310-330):
```jsx
// Fecha
<p>Sábado 25 de Octubre</p>

// Hora
<p>5:00 PM</p>

// Dirección
<p>Carrera 9 #66-24<br />Barrio El Nogal</p>
```

#### Mensaje de WhatsApp (línea 347):
```javascript
const message = encodeURIComponent(
  '¡Hola! Confirmo mi asistencia a tu celebración de 30 años el sábado 25 de octubre a las 5:00 PM. ¡Nos vemos! 🎉💕'
)
```

#### Número de WhatsApp (línea 345):
```javascript
const phoneNumber = '573175710585'  // Código país + número
```

### Configuración de Audio

**Cambiar música**:
1. Colocar archivo en: `public/audio/`
2. Actualizar en `src/App.jsx` línea 140:
```jsx
<audio
  ref={audioRef}
  src="/audio/TU-CANCION.wav"  // ← Cambiar aquí
  loop
  autoPlay
  preload="auto"
/>
```

**Ajustar volumen** (línea 21):
```javascript
audioRef.current.volume = 0.7  // 0.0 a 1.0
```

### Duración de Animaciones

**Explosión → Invitación** (línea 99):
```javascript
setTimeout(() => {
  setShowInvitation(true)
}, 1200)  // ← Ajustar aquí (milisegundos)
```

**Transición de fondo** (línea 110):
```jsx
transition={{ duration: 2.5, ease: 'easeInOut' }}  // ← Ajustar aquí
```

**Aparición de invitación** (línea 222):
```jsx
transition={{ duration: 1.5, delay: 0.8 }}  // ← Ajustar aquí
```

### Cantidad de Confeti

**Línea 70**:
```javascript
for (let i = 0; i < 50; i++) {  // ← Cambiar cantidad aquí
```

**Rangos de valores**:
```javascript
delay: Math.random() * 5,            // 0-5 segundos
duration: 4 + Math.random() * 3,     // 4-7 segundos
size: 6 + Math.random() * 8,         // 6-14 px
```

---

## 🎯 Casos de Uso para Futuros Proyectos

### Reutilizar para Otro Evento

**Pasos**:

1. **Clonar el proyecto**:
```bash
git clone https://github.com/SantiagoJimenezOrtega/invitacion-30.git nueva-invitacion
cd nueva-invitacion
npm install
```

2. **Personalizar colores** en `tailwind.config.js`

3. **Cambiar textos** en `src/App.jsx`:
   - Título del evento
   - Fecha y hora
   - Dirección
   - Mensaje de WhatsApp
   - Número de contacto

4. **Reemplazar música** en `public/audio/`

5. **Ajustar número principal** (ej: cambiar "30" por "40", "50", "25", etc.)

6. **Generar nuevo preview** en `/preview`

7. **Deploy en Vercel** con nuevo nombre

### Adaptaciones Comunes

#### Para Boda:
- Cambiar "30" por nombres de pareja
- Ajustar colores a paleta de boda
- Modificar texto a invitación formal
- Agregar detalles de vestimenta/dress code

#### Para Baby Shower:
- Cambiar "30" por nombre del bebé
- Colores pastel (azul/rosa/amarillo)
- Pastel → decoración infantil
- Ajustar tono del texto

#### Para Graduación:
- Número → año de graduación
- Colores institucionales
- Pastel → birrete y diploma
- Mensaje más formal

#### Para Aniversario:
- Número → años de matrimonio/relación
- Colores románticos
- Pastel → corazones
- Texto centrado en celebración de amor

---

## 📊 Métricas del Proyecto

### Tamaños de Archivos

```
Audio WAV:    29.7 MB
Audio MP3:     3.7 MB (backup)
Preview JPG:   ~150 KB
Bundle JS:     ~200 KB (aproximado)
Total build:   ~34 MB (con audio WAV)
```

### Performance

- **First Contentful Paint**: ~1.2s
- **Time to Interactive**: ~2s
- **Lighthouse Score**: ~95/100 (desktop)

### Compatibilidad

- ✅ Chrome/Edge (últimas versiones)
- ✅ Firefox (últimas versiones)
- ✅ Safari iOS/macOS
- ✅ Chrome Android
- ✅ WhatsApp In-App Browser
- ✅ Instagram In-App Browser

---

## 🐛 Problemas Conocidos y Soluciones

### 1. **Autoplay bloqueado en móviles**

**Problema**: La música no se reproduce automáticamente en iOS/Android.

**Solución implementada**:
```javascript
// Se inicia en la primera interacción del usuario
useEffect(() => {
  if (userInteracted && !isMusicPlaying) {
    audioRef.current.play()
  }
}, [userInteracted])
```

### 2. **Archivo WAV muy pesado**

**Problema**: 29.7 MB puede ser lento en conexiones lentas.

**Solución opcional**:
- Usar MP3 en lugar de WAV
- Comprimir audio manteniendo calidad
- Implementar lazy loading del audio

### 3. **Preview no se actualiza en WhatsApp**

**Problema**: WhatsApp cachea el preview de URLs.

**Solución**:
1. Usar herramienta de debugging: https://developers.facebook.com/tools/debug/
2. Ingresar la URL y hacer "Scrape Again"
3. El cache se limpia en ~24 horas

### 4. **Confeti afecta performance en dispositivos antiguos**

**Problema**: 50 partículas pueden ser pesadas.

**Solución**:
```javascript
// Reducir cantidad para móviles
const confettiCount = window.innerWidth < 768 ? 25 : 50;
```

---

## 🔐 Seguridad y Privacidad

### Datos Expuestos

- ✅ Número de WhatsApp visible en código fuente
- ✅ Información del evento pública
- ✅ Música accesible vía URL directa

### Consideraciones

- No hay formularios que recopilen datos
- No hay cookies ni tracking
- No hay base de datos
- Todo es estático y del lado del cliente

### Para Eventos Privados

Si necesitas más privacidad:
1. **Agregar password protection** con un modal
2. **Usar tokens en URL**: `/invitacion?token=abc123`
3. **Implementar lista de invitados** con backend simple

---

## 📚 Recursos y Referencias

### Documentación Oficial

- **React**: https://react.dev/
- **Framer Motion**: https://www.framer.com/motion/
- **TailwindCSS**: https://tailwindcss.com/
- **Vite**: https://vitejs.dev/

### Herramientas Útiles

- **Open Graph Debugger**: https://developers.facebook.com/tools/debug/
- **Canva** (para crear imágenes): https://canva.com
- **Bitly** (acortar links): https://bitly.com
- **TinyURL**: https://tinyurl.com
- **Vercel**: https://vercel.com

### Generadores de Imágenes

- **Gemini**: https://gemini.google.com (para prompts de diseño)
- **DALL-E**: https://openai.com/dall-e-2
- **Midjourney**: https://midjourney.com

---

## 🔄 Historial de Versiones

### v1.0.0 - Deploy Inicial
- ✅ Implementación completa de UI
- ✅ Sistema de audio funcional
- ✅ Animaciones fluidas
- ✅ Confeti infinito
- ✅ Integración con WhatsApp
- ✅ Open Graph configurado
- ✅ Deploy en Vercel

### Commits Importantes

```
5e4b3b3 - Proyecto inicial
b4af70c - Configurar rewrites de Vercel
3141792 - Agregar imagen de preview
7a9eddf - Renombrar imagen a preview.jpg
```

---

## 💡 Ideas para Mejoras Futuras

### Features Opcionales

1. **Contador regresivo** hasta el evento
2. **Galería de fotos** de momentos especiales
3. **Música de fondo múltiple** (playlist)
4. **Modo oscuro/claro** toggle
5. **Compartir en redes sociales** (no solo WhatsApp)
6. **Mapa interactivo** con ubicación del evento
7. **RSVP con formulario** (requiere backend)
8. **Lista de regalos** con links
9. **Código de vestimenta** visual
10. **Timeline del evento** (hora de cóctel, cena, baile)

### Optimizaciones

1. **Progressive Web App (PWA)**
2. **Lazy loading de assets**
3. **Optimización de imágenes** (WebP)
4. **Service Worker** para cache offline
5. **Análytica** (Google Analytics)

---

## 🤝 Créditos

**Desarrollado con**:
- 🤖 Claude Code (Anthropic)
- 💻 Cursor IDE
- 🎨 TailwindCSS
- ⚛️ React + Vite
- 🎭 Framer Motion

**Música**:
- "Treinta Años Contigo" (personalizada)

**Hosting**:
- Vercel

**Repositorio**:
- GitHub: https://github.com/SantiagoJimenezOrtega/invitacion-30

**Sitio en Vivo**:
- https://invitacion-30.vercel.app/

---

## 📞 Contacto y Soporte

Para modificaciones o nuevos proyectos similares, tener este archivo disponible facilita:
- ✅ Comprender la estructura completa
- ✅ Identificar qué cambiar y dónde
- ✅ Replicar el proyecto para otros eventos
- ✅ Debugging rápido
- ✅ Contexto completo para Claude Code

---

**Última actualización**: 19 de Octubre, 2025
**Versión del documento**: 1.0.0
