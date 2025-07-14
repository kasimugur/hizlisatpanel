import { Login } from '@/components/Login'
import { Navbar } from '@/components/NavBar'
import React from 'react'

function LoginPage() {
  return (
    <>
    <Navbar />
    <div className='justify-center items-center mt-20'>
      
    <Login />
    </div>
    </>
  )
}

export default LoginPage