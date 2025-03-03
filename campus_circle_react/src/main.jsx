import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Footer from './components/Footer.jsx'
import SignIn from './pages/SignIn.jsx'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <>
    <App/>
           <SignIn />
           <Footer/>
    </>
      
  </StrictMode>,
)
