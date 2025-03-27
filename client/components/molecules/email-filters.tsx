"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDebounce } from "@/hooks/use-debounce"
import { useState, useEffect } from "react"
import { Filter, Calendar, User } from "lucide-react"

interface EmailFiltersProps {
  dateFilter: string
  setDateFilter: (filter: string) => void
  senderFilter: string
  setSenderFilter: (filter: string) => void
}

export function EmailFilters({ dateFilter, setDateFilter, senderFilter, setSenderFilter }: EmailFiltersProps) {
  const [inputValue, setInputValue] = useState(senderFilter)
  const debouncedValue = useDebounce(inputValue, 300)

  // Actualizar el filtro de remitente después del debounce
  useEffect(() => {
    setSenderFilter(debouncedValue)
  }, [debouncedValue, setSenderFilter])

  return (
    <div className="space-y-4 mb-4 p-4 border-modern bg-white/50 dark:bg-navy/50 backdrop-blur-sm">
      <div className="flex items-center mb-2">
        <Filter className="h-4 w-4 mr-2 text-slate dark:text-lavender" />
        <h3 className="text-sm font-medium text-navy dark:text-lavender">Filtros</h3>
      </div>

      <div>
        <Label htmlFor="date-filter" className="text-navy dark:text-lavender mb-1 block flex items-center text-xs">
          <Calendar className="h-3 w-3 mr-1" />
          Filtrar por fecha
        </Label>
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger
            id="date-filter"
            className="bg-white/70 dark:bg-navy/70 border-slate/20 dark:border-slate/30 focus:ring-2 focus:ring-slate/30 dark:focus:ring-lavender/30"
          >
            <SelectValue placeholder="Seleccionar período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="today">Hoy</SelectItem>
            <SelectItem value="yesterday">Ayer</SelectItem>
            <SelectItem value="lastWeek">Última semana</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="sender-filter" className="text-navy dark:text-lavender mb-1 block flex items-center text-xs">
          <User className="h-3 w-3 mr-1" />
          Filtrar por remitente
        </Label>
        <Input
          id="sender-filter"
          type="text"
          placeholder="Nombre o dominio del remitente"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-white/70 dark:bg-navy/70 border-slate/20 dark:border-slate/30 text-navy dark:text-lavender focus:ring-2 focus:ring-slate/30 dark:focus:ring-lavender/30 transition-all"
          aria-label="Filtrar por remitente"
        />
      </div>
    </div>
  )
}

