import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import './i18n'
import App from './App.jsx'
import { ToastProvider } from './context/ToastContext'
import { ProgressProvider } from './context/ProgressContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProgressProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ProgressProvider>
  </StrictMode>,
)
