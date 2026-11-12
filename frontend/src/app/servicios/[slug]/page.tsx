import React from 'react'
import { notFound } from 'next/navigation'
import { getServicioBySlug, getServicios } from '@/lib/cms'
import { resolveMediaUrl } from '@/lib/payload'

const FALLBACK_HERO: Record<string, string> = {
  'audio-video': '/imagenes/audio-video-hero-scaled.webp',
  control: '/imagenes/control-hero-scaled.webp',
  iluminacion: '/imagenes/iluminacion.webp',
  redes: '/imagenes/redes-hero-scaled.webp',
  seguridad: '/imagenes/seguridad.webp',
}

export async function generateStaticParams() {
  const servicios = await getServicios()
  return servicios.map((s) => ({ slug: s.slug }))
}

export default async function ServicioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const servicio = await getServicioBySlug(slug)
  if (!servicio) notFound()

  const heroImg = resolveMediaUrl(
    servicio.heroImage,
    FALLBACK_HERO[servicio.slug] || '/imagenes/audio-video-hero-scaled.webp',
  )

  return (
    <>
      <div className="av-service-hero-wrap">
        <section
          className="av-service-hero"
          style={{ backgroundImage: `url("${heroImg}")` }}
        >
          <h1>{servicio.title}</h1>
        </section>
      </div>

      <section className="av-section">
        <div className="av-container" style={{ maxWidth: '960px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '18px' }}>
            {servicio.subtitle}
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>{servicio.description}</p>
          {servicio.secondaryDescription && (
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>{servicio.secondaryDescription}</p>
          )}

          {servicio.features && servicio.features.length > 0 && (
            <div style={{ marginTop: '30px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '12px' }}>
                Incluye:
              </h3>
              <ul style={{ margin: '0 0 24px 1.25rem', lineHeight: 1.8 }}>
                {servicio.features.map((f, idx) => (
                  <li key={idx}>{f.text}</li>
                ))}
              </ul>
            </div>
          )}

          {servicio.gallery && servicio.gallery.length > 0 && (
            <div style={{ marginTop: '40px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '16px' }}>
                Galería
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '16px',
                }}
              >
                {servicio.gallery.map((g, idx) => {
                  const gUrl = resolveMediaUrl(
                    g.image,
                    `/imagenes/iluminacion-galeria-${idx === 0 ? 2 : 1}.png`,
                  )
                  return (
                    <div
                      key={idx}
                      style={{
                        borderRadius: '14px',
                        overflow: 'hidden',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <img
                        src={gUrl}
                        alt={`${servicio.title} ${idx + 1}`}
                        style={{ width: '100%', height: '260px', objectFit: 'cover' }}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
