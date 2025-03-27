"use client"

import { useState } from "react"
import type { Email } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Reply, Trash, Star, Download, Forward, Clock, Mail, Paperclip } from "lucide-react"

interface EmailDetailProps {
  email: Email | null
}

export function EmailDetail({ email }: EmailDetailProps) {
  const [isStarred, setIsStarred] = useState(false)

  if (!email) {
    return (
      <div className="h-full flex items-center justify-center p-8 border-modern bg-white/50 dark:bg-navy/50 backdrop-blur-sm">
        <div className="text-center text-slate dark:text-lavender">
          <div className="w-16 h-16 mx-auto rounded-full bg-slate/10 dark:bg-lavender/10 flex items-center justify-center mb-4">
            <Mail className="h-8 w-8 text-slate dark:text-lavender" />
          </div>
          <p className="text-lg font-medium mb-2">Selecciona un email para ver su contenido</p>
          <p className="text-sm">No hay ningún email seleccionado</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full border-modern bg-white/50 dark:bg-navy/50 backdrop-blur-sm overflow-hidden flex flex-col">
      <div className="p-4 border-b dark:border-slate/20">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-navy dark:text-lavender">{email.subject}</h2>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsStarred(!isStarred)}
              aria-label={isStarred ? "Quitar estrella" : "Marcar con estrella"}
              className="hover:bg-slate/10 dark:hover:bg-lavender/10"
            >
              <Star
                className={`h-5 w-5 ${isStarred ? "fill-yellow-400 text-yellow-400" : "text-slate dark:text-lavender"}`}
              />
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="font-medium text-navy dark:text-lavender">{email.sender}</p>
            <p className="text-sm text-slate dark:text-lavender/70">Para: {email.recipient}</p>
          </div>
          <p className="text-sm text-slate dark:text-lavender/70 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {formatDate(new Date(email.receivedAt))}
          </p>
        </div>

        {email.labels && email.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {email.labels.map((label) => (
              <Badge key={label} variant="outline" className="bg-slate/5 dark:bg-lavender/5">
                {label}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 overflow-auto flex-grow">
        <div
          className="prose dark:prose-invert max-w-none text-navy dark:text-lavender"
          dangerouslySetInnerHTML={{ __html: email.body }}
        />

        {email.attachments && email.attachments.length > 0 && (
          <div className="mt-6 border-t dark:border-slate/20 pt-4">
            <h3 className="font-medium text-navy dark:text-lavender mb-2 flex items-center">
              <Paperclip className="h-4 w-4 mr-1" />
              Archivos adjuntos ({email.attachments.length})
            </h3>
            <div className="space-y-2">
              {email.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center justify-between p-2 border rounded-md dark:border-slate/20 bg-white/30 dark:bg-navy/30"
                >
                  <span className="text-sm text-navy dark:text-lavender">{attachment.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Descargar adjunto"
                    className="hover:bg-slate/10 dark:hover:bg-lavender/10"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t dark:border-slate/20 flex justify-between">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 border-slate/30 dark:border-lavender/30 hover:bg-slate/10 dark:hover:bg-lavender/10"
          >
            <Reply className="h-4 w-4" />
            <span>Responder</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 border-slate/30 dark:border-lavender/30 hover:bg-slate/10 dark:hover:bg-lavender/10"
          >
            <Forward className="h-4 w-4" />
            <span>Reenviar</span>
          </Button>
        </div>
        <Button variant="destructive" size="sm" className="flex items-center gap-1">
          <Trash className="h-4 w-4" />
          <span>Eliminar</span>
        </Button>
      </div>
    </div>
  )
}

