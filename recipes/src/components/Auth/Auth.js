import React, {useState} from 'react'
import Signup from './Signup' 
import Login from './Login'
import './Auth.css'
export default function Auth() {
  const [signUpModal, setSignUpModal] = useState(true);
  const [loginModal, setLoginModal] = useState(false);

  const handleModals = (e) => {
    if (e.target.id === "signup") {
      setLoginModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setLoginModal(true);
      setSignUpModal(false);
    }
  }
  

  return (
    <div className="auth">
      <div className="form-container">
        <ul>
          <li onClick={handleModals} id="signup" className={(signUpModal ? "auth-btn active-btn" : "auth-btn")}>
            Inscription
          </li>
          <li onClick={handleModals} id="login" className={(loginModal ? "auth-btn active-btn" : "auth-btn")}>
            Se connecter
          </li>
        </ul>
        {signUpModal && <Signup />}
        {loginModal && <Login />}
      </div>
    </div>
  )
}
