import type React from "react"
import type { Metadata } from "next"
import { Providers } from "@/components/providers"
import { Inter } from "next/font/google"
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TempMail - Servicio de Emails Temporales",
  description: "Crea emails temporales para proteger tu privacidad en línea",
  keywords: "email temporal, privacidad, protección de datos, email desechable",
  openGraph: {
    title: "TempMail - Servicio de Emails Temporales",
    description: "Crea emails temporales para proteger tu privacidad en línea",
    // url: "https://tempmail.example.com",
    // siteName: "TempMail",
    // images: [
    //   {
    //     url: "https://tempmail.example.com/og-image.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "TempMail - Servicio de Emails Temporales",
    //   },
    // ],
    locale: "es_ES",
    type: "website",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}



import './globals.css'