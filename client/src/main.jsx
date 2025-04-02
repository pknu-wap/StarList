import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
//import App from './App.jsx'

import LogoStar from './components/common/header/LogoStar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LogoStar />
  </StrictMode>,
)
