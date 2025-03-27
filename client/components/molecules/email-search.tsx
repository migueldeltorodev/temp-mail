"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"

interface EmailSearchProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export function EmailSearch({ searchTerm, setSearchTerm }: EmailSearchProps) {
  const [inputValue, setInputValue] = useState(searchTerm)
  const debouncedValue = useDebounce(inputValue, 300)

  // Actualizar el término de búsqueda después del debounce
  useEffect(() => {
    setSearchTerm(debouncedValue)
  }, [debouncedValue, setSearchTerm])

  return (
    <div className="relative mb-4">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate dark:text-lavender/70" />
      <Input
        type="text"
        placeholder="Buscar emails..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="pl-10 bg-white/70 dark:bg-navy/70 border-slate/20 dark:border-slate/30 text-navy dark:text-lavender focus:ring-2 focus:ring-slate/30 dark:focus:ring-lavender/30 transition-all"
        aria-label="Buscar emails"
      />
    </div>
  )
}

