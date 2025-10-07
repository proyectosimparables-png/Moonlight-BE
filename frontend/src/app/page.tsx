
import React from 'react'
import { Login } from '../components/Login'
import TestProtected from '../components/TestProtected'
import NavbarAdmin from '@/components/admin/NavbarAdmin'

export default function Home() {
  return (
    <div>
      <h1>Bienvenido a Moonlight</h1>
      <Login />
      <hr />
      <TestProtected />
      <NavbarAdmin />
    </div>
  )

}
