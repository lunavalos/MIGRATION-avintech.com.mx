import React from 'react'
import { ServiceCard } from '@/components/ServiceCard'
import { getServicios, getServiciosPageData } from '@/lib/cms'

export const metadata = {
  title: 'Servicios - Avintech',
}

export default async function ServiciosPage() {
  const [pageData, servicios] = await Promise.all([
    getServiciosPageData(),
    getServicios(),
  ])

  const ordered = [...servicios].sort((a, b) => (a.order || 0) - (b.order || 0))
  // Match live archive order: Iluminación, Control, Seguridad, Audio / Video, Redes
  const liveOrder = ['iluminacion', 'control', 'seguridad', 'audio-video', 'redes']
  const sorted = ordered.sort(
    (a, b) => liveOrder.indexOf(a.slug) - liveOrder.indexOf(b.slug),
  )

  return (
    <section className="av-section">
      <div className="av-container" style={{ maxWidth: '1920px' }}>
        <div className="av-container" style={{ marginBottom: '40px' }}>
          <h1 className="av-page-title">{pageData.pageTitle}</h1>
          {pageData.introParagraphs.map((p, idx) => (
            <p key={idx} style={{ maxWidth: '1000px', lineHeight: 1.65 }}>
              {p.text}
            </p>
          ))}
        </div>

        <div className="av-services-grid-full">
          {sorted.map((s) => (
            <ServiceCard key={s.slug} servicio={s} variant="full" />
          ))}
        </div>
      </div>
    </section>
  )
}
