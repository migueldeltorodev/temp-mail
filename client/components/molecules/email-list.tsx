"use client"

import { useState, useEffect, useRef } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import type { Email } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Inbox } from "lucide-react"

interface EmailListProps {
  emails: Email[]
  selectedEmail: Email | null
  onSelectEmail: (email: Email) => void
}

export function EmailList({ emails, selectedEmail, onSelectEmail }: EmailListProps) {
  const parentRef = useRef<HTMLDivElement>(null)
  const [windowHeight, setWindowHeight] = useState(0)

  // Actualizar altura de la ventana para virtualización
  useEffect(() => {
    const updateHeight = () => {
      setWindowHeight(window.innerHeight)
    }

    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [])

  // Configurar virtualizador para manejar grandes listas
  const rowVirtualizer = useVirtualizer({
    count: emails.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 5,
  })

  if (emails.length === 0) {
    return (
      <div className="text-center py-8 text-slate dark:text-lavender border-modern bg-white/50 dark:bg-navy/50 backdrop-blur-sm">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-slate/10 dark:bg-lavender/10 flex items-center justify-center mb-3">
            <Inbox className="h-6 w-6 text-slate dark:text-lavender" />
          </div>
          <p>No hay emails que mostrar.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="border-modern bg-white/50 dark:bg-navy/50 backdrop-blur-sm">
      <ScrollArea ref={parentRef} className="h-[calc(100vh-300px)] min-h-[400px]">
        <div className="relative w-full" style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const email = emails[virtualItem.index]
            const isSelected = selectedEmail?.id === email.id
            const isUnread = !email.read

            return (
              <div
                key={email.id}
                className={`absolute top-0 left-0 w-full ${
                  isSelected ? "bg-slate/20 dark:bg-slate/30" : "hover:bg-slate/10 dark:hover:bg-slate/20"
                } cursor-pointer transition-all border-b dark:border-slate/20 ${
                  isUnread ? "border-l-4 border-l-blue-500" : ""
                }`}
                style={{
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
                onClick={() => onSelectEmail(email)}
              >
                <div className="p-3 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="font-medium text-navy dark:text-lavender flex items-center">
                      {isUnread && <span className="h-2 w-2 bg-blue-500 rounded-full mr-2" />}
                      {email.sender}
                    </div>
                    <div className="text-xs text-slate dark:text-lavender/70">
                      {formatDistanceToNow(new Date(email.receivedAt), {
                        addSuffix: true,
                        locale: es,
                      })}
                    </div>
                  </div>

                  <div className="text-sm font-medium text-navy dark:text-lavender truncate mt-1">{email.subject}</div>

                  <div className="text-xs text-slate dark:text-lavender/70 truncate mt-1">
                    {email.body.substring(0, 80)}...
                  </div>

                  {email.labels && email.labels.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      {email.labels.map((label) => (
                        <Badge key={label} variant="outline" className="text-xs">
                          {label}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}

