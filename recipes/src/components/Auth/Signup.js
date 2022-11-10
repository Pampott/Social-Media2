import React from 'react'
import { StyledButton } from '../StyledComponents'

export default function Signup() {
  return (
    <>
    <form action="">
        <label htmlFor="firstName">Prénom</label>
        <input type="text" name="" id="firstName" />
        <label htmlFor="lastName">Nom</label>
        <input type="text" name="" id="lastName" />
        <label htmlFor="username">Nom d'utilisateur</label>
        <input type="text" name="" id="username" />
        <label htmlFor="email">Email</label>
        <input type="email" name="" id="email" />
        <label htmlFor="password">Mot de passe</label>
        <input type="password" name="" id="password" />
        <StyledButton>S'inscrire</StyledButton>
    </form>
    </>
  )
}
