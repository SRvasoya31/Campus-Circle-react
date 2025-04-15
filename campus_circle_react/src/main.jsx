import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
// import SignUp from './pages/SignUp'
import BookingForm from './components/Bokingform'
// import Signin from './pages/Signin'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>
            <App/>
            {/* <SignUp/> */}
                     
      
     </div>      
  </StrictMode>,
)
