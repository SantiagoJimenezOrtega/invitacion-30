import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import PreviewImage from './PreviewImage.jsx'
import './index.css'

// Detectar si estamos en la ruta /preview para generar la imagen
const isPreviewMode = window.location.pathname === '/preview'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isPreviewMode ? <PreviewImage /> : <App />}
  </React.StrictMode>,
)
