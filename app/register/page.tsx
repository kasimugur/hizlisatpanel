import { Navbar } from '@/components/NavBar'
import { Register } from '@/components/Register'
import React from 'react'

export default function registerPage() {
  return (<>
    <Navbar />
    <div className='justify-center items-center mt-20'>
        <Register />
        </div>
  </>
  )
}
