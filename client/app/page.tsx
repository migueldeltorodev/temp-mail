import type { Metadata } from "next"
import { EmailDashboard } from "@/components/organisms/email-dashboard"
import { Header } from "@/components/organisms/header"
import { Footer } from "@/components/organisms/footer"
import { BackgroundDecoration } from "@/components/atoms/background-decoration"

export const metadata: Metadata = {
  title: "TempMail - Inicio",
  description: "Gestiona tus emails temporales de forma segura y sencilla",
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <BackgroundDecoration />

      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        <section className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-center">
            Servicio de Emails Temporales
          </h1>
          <p className="text-lg text-muted-foreground mb-6 text-center max-w-2xl mx-auto">
            Protege tu privacidad con nuestro servicio de emails temporales. Recibe emails sin comprometer tu dirección
            personal.
          </p>
        </section>

        <EmailDashboard />
      </main>
      <Footer />
    </div>
  )
}

