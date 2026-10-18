import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// HashRouter: сайт остаётся работоспособным на любом статическом хостинге
// и при открытии собранных файлов без серверных переписей URL.
import { HashRouter } from 'react-router'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
