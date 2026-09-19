import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/style/style.scss'
import './assets/style/responsive.scss'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
