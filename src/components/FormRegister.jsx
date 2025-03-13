import React, { useState,useEffect } from 'react'

import { Link } from 'react-router-dom';
import llamadosUser from '../services/llamadosUser'

function FormRegister() {
  const [nombreUser, setNombreUser]=useState()
  const [apellidoUser, setApellidoUser]=useState()
  const [edadUser, setEdadUser]=useState()
  const [passwordUser, setPasswordUser]=useState()
  
  function nombre(evento) {
    setNombreUser(evento.target.value)
  }
  
  function apellido(evento) {
    setApellidoUser(evento.target.value)
  }
  function edad(evento) {
    setEdadUser(evento.target.value)
  }
  function password(evento) {
    setPasswordUser(evento.target.value)
  }

  function cargar() {
    llamadosUser.post(nombreUser,apellidoUser,edadUser,passwordUser)
  }
  return (
    <div>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input onChange={nombre} value={nombreUser} type="text" id='nombre' />
        <label htmlFor="apellido">Apellido:</label>
        <input onChange={apellido} value={apellidoUser} type="text" id='apellido' />
        <label htmlFor="edad">Edad:</label>
        <input onChange={edad} value={edadUser} type="number" id='edad' />
        <label htmlFor="password">Contraseña:</label>
        <input onChange={password} value={passwordUser} type="password" id='password' />
        <input onClick={cargar} type="button" value="Registrarse" />
        <p>¿Ya tienes una cuenta? <Link to="/">Inicia Aquí</Link></p>
      </div>
    </div>
  )
}

export default FormRegister