
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { Provider } from 'react-redux'
import { store } from './store'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
console.log("RECAPTCHA_SITE_KEY ", RECAPTCHA_SITE_KEY)

createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
        <BrowserRouter>
          <Toaster position="top-right" />
          <App />
        </BrowserRouter>
      </GoogleReCaptchaProvider>
    </Provider>
  </>,
)
