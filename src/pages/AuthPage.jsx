import React from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { useState } from 'react'

const AuthPage = () => {

    const [login, setLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      {login ? <LoginForm state={setLogin}/> : <RegisterForm state={setLogin}/>}
    </div>
  )
}

export default AuthPage