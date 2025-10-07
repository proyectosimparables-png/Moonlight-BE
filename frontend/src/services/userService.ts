// services/userService.ts
import { getAuthHeaders } from "../lib/authHelpers"

export async function getUserProfile() {
  const headers = await getAuthHeaders()

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/protected`, {
    method: "GET",
    headers,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Error: ${res.status} ${text}`)
  }

  return res.json()
}
