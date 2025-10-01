<<<<<<< HEAD
import React from 'react'
import { Login } from '../components/Login'
import TestProtected from '../components/TestProtected'

export default function Home() {
  return (
    <div>
      <h1>Bienvenido a Moonlight</h1>
      <Login />
      <hr />
      <TestProtected />
    </div>
  )
=======

import NavbarAdmin from "@/components/admin/NavbarAdmin";



export default function Home() {
  return (
   <div>
   <NavbarAdmin />
        <main className="p-6 max-w-2xl mx-auto">
         
        </main>
      </div>
  );
>>>>>>> 3630d4b (Mis cambios antes de hacer pull)
}
