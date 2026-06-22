import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '../public/css/index.css'
import '../public/css/media.css'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import { configureApiClient, configureLocalhostAssetUrls } from './config/api.js'

configureApiClient(axios)
configureLocalhostAssetUrls()

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((error) => {
      console.log("Service worker registration failed", error)
    })
  })
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    <App />
  </StrictMode>
  </BrowserRouter>,
)
