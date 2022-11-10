import React from 'react'
export default function Login() {
  return (
    <>
    <form action="">
        <label htmlFor="username">Nom d'utilisateur</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Mot de passe</label>
        <input type="password" name="password" id="password" />
        <button onClick={(e) => e.preventDefault()}>Connexion</button>
    </form>
    </>
  )
}
