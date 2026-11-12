import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ScrollRevealProvider } from '@/components/ScrollRevealProvider'
import { getMarcas, getServicios, getSiteSettings } from '@/lib/cms'
import { resolveMediaUrl } from '@/lib/payload'

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-rubik',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Avintech | Soluciones creativas para el desarrollo de espacios inteligentes',
  description:
    'Creamos entornos automatizados que combinan confort, eficiencia y tecnología: audio, video, iluminación, seguridad, redes y control.',
  icons: {
    icon: '/imagenes/favicon.png',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [settings, servicios, marcas] = await Promise.all([
    getSiteSettings(),
    getServicios(),
    getMarcas(),
  ])

  const logoLight = resolveMediaUrl(settings.logoLight, '/imagenes/white-logo.png')

  return (
    <html lang="es-MX" className={rubik.variable}>
      <body>
        <Header logoUrl={logoLight} />
        <ScrollRevealProvider>
          <main>{children}</main>
        </ScrollRevealProvider>
        <Footer settings={settings} servicios={servicios} marcas={marcas} />
      </body>
    </html>
  )
}
