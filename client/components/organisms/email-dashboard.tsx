"use client"

import { useState, useEffect, useMemo } from "react"
import { useEmailApi } from "@/hooks/use-email-api"
import { EmailList } from "@/components/molecules/email-list"
import { EmailSearch } from "@/components/molecules/email-search"
import { EmailFilters } from "@/components/molecules/email-filters"
import { EmailDetail } from "@/components/molecules/email-detail"
import { InboxGenerator } from "@/components/molecules/inbox-generator"
import { Loader2, Mail } from "lucide-react"
import type { Email } from "@/lib/types"

export function EmailDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [dateFilter, setDateFilter] = useState<string>("all")
  const [senderFilter, setSenderFilter] = useState<string>("")
  const { emails, loading, error, currentInbox, generateInbox, refreshEmails } = useEmailApi()

  // Aplicar filtros y búsqueda
  const filteredEmails = useMemo(() => {
    if (!emails) return []

    return emails.filter((email) => {
      // Filtro de búsqueda
      const matchesSearch =
        searchTerm === "" ||
        email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.body.toLowerCase().includes(searchTerm.toLowerCase())

      // Filtro de fecha
      const emailDate = new Date(email.receivedAt)
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      const lastWeek = new Date(today)
      lastWeek.setDate(lastWeek.getDate() - 7)

      let matchesDate = true
      if (dateFilter === "today") {
        matchesDate = emailDate.toDateString() === today.toDateString()
      } else if (dateFilter === "yesterday") {
        matchesDate = emailDate.toDateString() === yesterday.toDateString()
      } else if (dateFilter === "lastWeek") {
        matchesDate = emailDate >= lastWeek
      }

      // Filtro de remitente
      const matchesSender = senderFilter === "" || email.sender.toLowerCase().includes(senderFilter.toLowerCase())

      return matchesSearch && matchesDate && matchesSender
    })
  }, [emails, searchTerm, dateFilter, senderFilter])

  // Efecto para actualizar los emails periódicamente
  useEffect(() => {
    if (currentInbox) {
      refreshEmails()

      const intervalId = setInterval(() => {
        refreshEmails()
      }, 30000) // Actualizar cada 30 segundos

      return () => clearInterval(intervalId)
    }
  }, [refreshEmails, currentInbox])

  return (
    <div className="border-modern glass-effect shadow-lg overflow-hidden animate-fade-in max-w-6xl mx-auto">
      <div className="p-4 md:p-6">
        <InboxGenerator currentInbox={currentInbox} generateInbox={generateInbox} isLoading={loading} />

        {currentInbox ? (
          <div className="mt-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3">
                <EmailSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                <EmailFilters
                  dateFilter={dateFilter}
                  setDateFilter={setDateFilter}
                  senderFilter={senderFilter}
                  setSenderFilter={setSenderFilter}
                />

                {loading ? (
                  <div className="flex justify-center items-center h-40">
                    <Loader2 className="h-8 w-8 animate-spin text-slate" />
                  </div>
                ) : error ? (
                  <div className="text-red-500 p-4 text-center">Error al cargar los emails: {error}</div>
                ) : (
                  <EmailList emails={filteredEmails} selectedEmail={selectedEmail} onSelectEmail={setSelectedEmail} />
                )}
              </div>

              <div className="w-full md:w-2/3">
                <EmailDetail email={selectedEmail} />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 text-slate dark:text-lavender">
            {loading ? (
              <div className="flex flex-col items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-slate mb-4" />
                <span className="text-lg">Generando inbox...</span>
              </div>
            ) : (
              <div className="max-w-md mx-auto">
                <div className="mb-6 animate-float">
                  <div className="w-20 h-20 mx-auto rounded-full bg-navy/10 dark:bg-lavender/10 flex items-center justify-center">
                    <Mail className="h-10 w-10 text-navy dark:text-lavender" />
                  </div>
                </div>
                <p className="text-lg font-medium mb-4">Genera un inbox para comenzar a recibir emails temporales</p>
                <p className="text-sm text-slate/80 dark:text-lavender/80 mb-6">
                  Protege tu privacidad utilizando una dirección de email temporal para tus registros en línea
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

