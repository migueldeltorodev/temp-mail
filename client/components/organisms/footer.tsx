import Link from "next/link"
import { Mail, Shield, Clock, ExternalLink } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary dark:bg-navy text-foreground py-12 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.2)_0%,transparent_40%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
                <Mail className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-xl font-bold">TempMail</h3>
            </div>
            <p className="mb-4">Servicio de emails temporales para proteger tu privacidad en línea.</p>
            <div className="flex space-x-4 mt-4">
              <div className="flex items-center space-x-1 text-sm">
                <Shield className="h-4 w-4" />
                <span>Seguro</span>
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <Clock className="h-4 w-4" />
                <span>Temporal</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-primary-500 transition-colors flex items-center space-x-2">
                  <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
                  <span>Inicio</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/como-funciona"
                  className="hover:text-primary-500 transition-colors flex items-center space-x-2"
                >
                  <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
                  <span>Cómo Funciona</span>
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary-500 transition-colors flex items-center space-x-2">
                  <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
                  <span>Preguntas Frecuentes</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacidad"
                  className="hover:text-primary-500 transition-colors flex items-center space-x-2"
                >
                  <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
                  <span>Política de Privacidad</span>
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-primary-500 transition-colors flex items-center space-x-2">
                  <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
                  <span>Términos de Servicio</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-500 transition-colors flex items-center space-x-2"
                >
                  <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
                  <span>Blog</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p>&copy; {currentYear} TempMail. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

