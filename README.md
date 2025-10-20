# 🎉 Invitación Cumpleaños 30 Años

Invitación web interactiva y animada para celebrar un cumpleaños especial.

## 🚀 Características

- ✨ Animaciones fluidas con Framer Motion
- 🎵 Música de fondo con controles
- 🎨 Cursor personalizado (vela animada)
- 🎊 Efecto de confeti al interactuar
- 🎂 Pastel animado con CSS
- 📱 Diseño completamente responsivo
- 💜 Paleta de colores elegante (#8600FB y tonos rosados)

## 📦 Instalación

```bash
npm install
```

## 🎵 Configuración de Audio

1. Coloca tu archivo de música en: `public/audio/birthday-song.mp3`
2. Formatos soportados: `.mp3`, `.wav`

## 🏃‍♂️ Ejecutar en Desarrollo

```bash
npm run dev
```

Abre tu navegador en [http://localhost:5173](http://localhost:5173)

## 🎯 Flujo de la Experiencia

1. **Pantalla inicial**: Fondo rojo oscuro con número "30" flotando
2. **Interacción**: Cursor de vela animada
3. **Clic en el 30**:
   - El número explota
   - Caen confetis
   - El fondo cambia a rosado suave
4. **Invitación**: Aparece el texto y animación del pastel

## 🎨 Personalización

### Colores principales:
- `#8600FB` - Color morado (según instrucciones)
- `#b30000` - Rojo oscuro (fondo inicial)
- `#ffb6c1` - Rosado suave (fondo final)

### Tipografías:
- **Poppins**: Texto general
- **Playfair Display**: Títulos elegantes
- **Dancing Script**: Detalles decorativos

### Modificar el texto:
Edita el componente `App.jsx` en la sección "COLUMNA IZQUIERDA - TEXTO"

## 🏗️ Build para Producción

```bash
npm run build
```

Los archivos optimizados estarán en la carpeta `dist/`

## 📁 Estructura del Proyecto

```
invi30/
├── public/
│   └── audio/
│       └── birthday-song.mp3  (coloca tu música aquí)
├── src/
│   ├── App.jsx                (componente principal)
│   ├── index.css              (estilos y animaciones)
│   └── main.jsx               (punto de entrada)
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 💡 Notas Importantes

- **Autoplay de audio**: Algunos navegadores bloquean la reproducción automática. La música se iniciará al primer clic del usuario si es necesario.
- **Cursor personalizado**: Funciona mejor en dispositivos de escritorio con mouse.
- **Rendimiento**: Las animaciones están optimizadas pero el efecto de confeti puede ser intensivo en dispositivos más antiguos.

## 🎁 Características Especiales

- **Número 30**: Animación flotante suave, explota al hacer clic
- **Confeti**: 150 partículas con colores aleatorios y física realista
- **Pastel CSS**: Animación de construcción por capas con velas parpadeantes
- **Botón de música**: Control flotante en esquina inferior derecha
- **Transiciones**: Cambios de color y aparición de elementos suavizados

---

💕 Creado con amor para un cumpleaños especial
