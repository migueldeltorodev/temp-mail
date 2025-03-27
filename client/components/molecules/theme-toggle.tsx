"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Monitor } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // Efecto para manejar la persistencia en localStorage
  useEffect(() => {
    // Recuperar el tema guardado en localStorage al montar el componente
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme)
    }
    setMounted(true)
  }, [setTheme])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9">
        <span className="sr-only">Toggle theme</span>
        <div className="h-5 w-5 bg-muted rounded-full animate-pulse" />
      </Button>
    )
  }

  const currentIcon =
    resolvedTheme === "dark" ? (
      <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0" />
    ) : (
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 transition-all dark:-rotate-90" />
    )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="w-9 h-9 rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
          aria-label="Seleccionar tema"
        >
          {currentIcon}
          <span className="sr-only">Cambiar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={() => setTheme("light")}>
          <Sun className="h-4 w-4" />
          <span>Claro</span>
          {theme === "light" && <span className="ml-auto text-primary-500">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={() => setTheme("dark")}>
          <Moon className="h-4 w-4" />
          <span>Oscuro</span>
          {theme === "dark" && <span className="ml-auto text-primary-500">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={() => setTheme("system")}>
          <Monitor className="h-4 w-4" />
          <span>Sistema</span>
          {theme === "system" && <span className="ml-auto text-primary-500">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

