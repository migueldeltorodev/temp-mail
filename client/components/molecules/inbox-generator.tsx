"use client"

import { useState } from "react"
import type { Inbox } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Clipboard, RefreshCw, Check, Copy, Mail, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

interface InboxGeneratorProps {
  currentInbox: Inbox | null
  generateInbox: () => Promise<Inbox>
  isLoading: boolean
}

export function InboxGenerator({ currentInbox, generateInbox, isLoading }: InboxGeneratorProps) {
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateInbox = async () => {
    try {
      setIsGenerating(true)
      await generateInbox()
    } catch (error) {
      console.error("Error al generar inbox:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    if (!currentInbox) return

    navigator.clipboard
      .writeText(currentInbox.address)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch((err) => {
        console.error("Error al copiar al portapapeles:", err)
      })
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2 md:mb-0 flex items-center">
          <Mail className="h-6 w-6 mr-2 text-primary-500" />
          Email Temporal
        </h2>

        <Button
          onClick={handleGenerateInbox}
          disabled={isGenerating || isLoading}
          className="bg-primary-500 hover:bg-primary-600 text-white shadow-md hover:shadow-lg transition-all"
        >
          {isGenerating || (isLoading && !currentInbox) ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Generando...
            </>
          ) : currentInbox ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Generar nuevo
            </>
          ) : (
            <>
              <Clipboard className="h-4 w-4 mr-2" />
              Generar inbox
            </>
          )}
        </Button>
      </div>

      {currentInbox && (
        <div className="p-6 border-modern bg-card/50 backdrop-blur-sm animate-slide-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Tu dirección de email temporal:</p>
              <p className="text-lg font-medium text-foreground break-all bg-secondary/50 p-2 rounded-md">
                {currentInbox.address}
              </p>
              {currentInbox.expiresAt && (
                <p className="text-xs text-muted-foreground mt-2 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Expira:{" "}
                  {formatDistanceToNow(new Date(currentInbox.expiresAt), {
                    addSuffix: true,
                    locale: es,
                  })}
                </p>
              )}
            </div>

            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="mt-4 md:mt-0 border-border hover:bg-secondary/50 transition-all"
              aria-label="Copiar dirección de email"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2 text-success-500" />
                  Copiado
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

