// src/components/Login.tsx
"use client"

import React, { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import type { Session } from "@supabase/supabase-js"

export const Login = () => {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    // obtener sesión inicial al montar
    ;(async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session ?? null)
    })()

    // listener de cambios de sesión
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Evento auth:", _event)
      console.log("Sesión actual:", session)
      setSession(session ?? null)
    })

    // cleanup: desconectar el listener
    return () => {
      listener?.subscription?.unsubscribe?.()
    }
  }, [])

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      })

      if (error) {
        console.error("Error en login:", error)
        return
      }

      console.log("Ventana de login (url):", data.url)
    } catch (err) {
      console.error("Error inesperado en login:", err)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }

  return (
    <div>
      {!session ? (
        <button
          onClick={handleLogin}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3366FF",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Iniciar sesión con Google
        </button>
      ) : (
        <div>
          <p>Logueada como: {session.user?.email}</p>
          <button
            onClick={handleLogout}
            style={{ padding: "8px 14px", borderRadius: 6 }}
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}
