"use client"

import { useState, useCallback } from "react"
import axios from "axios"
import type { Email, Inbox } from "@/lib/types"

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error)
    return Promise.reject(error)
  },
)

export function useEmailApi() {
  const [emails, setEmails] = useState<Email[]>([])
  const [currentInbox, setCurrentInbox] = useState<Inbox | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Generar un nuevo inbox (email temporal)
  const generateInbox = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.post("/inboxes")
      setCurrentInbox(response.data)
      return response.data
    } catch (err) {
      setError("Error al generar el inbox")
      console.error(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Obtener todos los emails
  const refreshEmails = useCallback(async () => {
    if (!currentInbox) return

    try {
      setLoading(true)
      setError(null)
      const response = await api.get(`/inboxes/${currentInbox.id}/emails`)
      setEmails(response.data)
    } catch (err) {
      setError("Error al cargar los emails")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [currentInbox])

  // Obtener un email por ID
  const getEmailById = useCallback(async (id: string) => {
    try {
      const response = await api.get(`/emails/${id}`)
      return response.data
    } catch (err) {
      console.error("Error al obtener el email:", err)
      throw err
    }
  }, [])

  // Marcar email como leído
  const markAsRead = useCallback(async (id: string) => {
    try {
      await api.patch(`/emails/${id}/read`, { read: true })
      setEmails((prevEmails) => prevEmails.map((email) => (email.id === id ? { ...email, read: true } : email)))
    } catch (err) {
      console.error("Error al marcar como leído:", err)
      throw err
    }
  }, [])

  // Eliminar email
  const deleteEmail = useCallback(async (id: string) => {
    try {
      await api.delete(`/emails/${id}`)
      setEmails((prevEmails) => prevEmails.filter((email) => email.id !== id))
    } catch (err) {
      console.error("Error al eliminar el email:", err)
      throw err
    }
  }, [])

  return {
    emails,
    loading,
    error,
    currentInbox,
    generateInbox,
    refreshEmails,
    getEmailById,
    markAsRead,
    deleteEmail,
  }
}

