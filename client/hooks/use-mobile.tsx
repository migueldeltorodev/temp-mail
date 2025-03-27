"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Función para verificar si es un dispositivo móvil
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Verificar al montar el componente
    checkMobile()

    // Agregar listener para cambios de tamaño de ventana
    window.addEventListener("resize", checkMobile)

    // Limpiar listener al desmontar
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}

