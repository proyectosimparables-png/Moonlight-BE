// src/components/TestProtected.tsx
"use client"

import React, { useState } from "react"
import { getUserProfile } from "../services/userService"

// 👤 Definimos un tipo provisional (ajústalo según tu backend)
interface UserProfile {
  id: string
  email: string
  name?: string
}

export default function TestProtected() {
  const [data, setData] = useState<UserProfile | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCheck = async () => {
    try {
      setError(null)
      const json = await getUserProfile()
      setData(json)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Error desconocido")
      }
    }
  }

  return (
    <div>
      <button onClick={handleCheck}>Pedir endpoint protegido</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}
