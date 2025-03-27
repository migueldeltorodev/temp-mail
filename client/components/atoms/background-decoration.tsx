"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Mail, AtSign, Send, Inbox } from "lucide-react"

export function BackgroundDecoration() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const [decorations, setDecorations] = useState<
    Array<{
      id: number
      x: number
      y: number
      icon: string
      size: number
      rotation: number
      opacity: number
    }>
  >([])

  useEffect(() => {
    setMounted(true)

    // Generar posiciones aleatorias para los iconos
    const generateDecorations = () => {
      const count = window.innerWidth < 768 ? 15 : 30
      const icons = ["mail", "at-sign", "inbox", "send"]
      const newDecorations = []

      for (let i = 0; i < count; i++) {
        newDecorations.push({
          id: i,
          x: Math.random() * 100, // porcentaje de la pantalla
          y: Math.random() * 100, // porcentaje de la pantalla
          icon: icons[Math.floor(Math.random() * icons.length)],
          size: Math.random() * 16 + 8, // tamaño entre 8px y 24px
          rotation: Math.random() * 360, // rotación en grados
          opacity: Math.random() * 0.08 + 0.02, // opacidad entre 0.02 y 0.1
        })
      }

      setDecorations(newDecorations)
    }

    generateDecorations()

    // Regenerar decoraciones cuando cambie el tamaño de la ventana
    const handleResize = () => {
      generateDecorations()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!mounted) return null

  const iconColor = resolvedTheme === "dark" ? "rgba(226, 232, 240, 0.3)" : "rgba(30, 41, 59, 0.3)"

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {decorations.map((decoration) => (
        <div
          key={decoration.id}
          className="absolute"
          style={{
            left: `${decoration.x}%`,
            top: `${decoration.y}%`,
            transform: `rotate(${decoration.rotation}deg)`,
            opacity: decoration.opacity,
          }}
        >
          {decoration.icon === "mail" && <Mail size={decoration.size} color={iconColor} />}
          {decoration.icon === "at-sign" && <AtSign size={decoration.size} color={iconColor} />}
          {decoration.icon === "inbox" && <Inbox size={decoration.size} color={iconColor} />}
          {decoration.icon === "send" && <Send size={decoration.size} color={iconColor} />}
        </div>
      ))}
    </div>
  )
}

