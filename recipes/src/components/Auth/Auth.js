import React, { useState } from 'react'
import './Auth.css'
import { StyledAuthButton } from '../StyledComponents';
import Login from './Login';
export default function Auth() {

  return (
    <div className="auth" style={{display: "flex", width: "100%", height: "100%"}}>
      <StyledAuthButton className='hover hover-left' id='login' onClick={() => <Login />}>Connexion</StyledAuthButton>
      <StyledAuthButton className='hover hover-right' id='signup'>Inscription</StyledAuthButton>
    </div>
  )
}
