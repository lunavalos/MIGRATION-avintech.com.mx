import React from 'react'
import { notFound } from 'next/navigation'
import { BrandCarousel } from '@/components/BrandCarousel'
import { getMarcaBySlug, getMarcas } from '@/lib/cms'
import { resolveMediaUrl } from '@/lib/payload'

export async function generateStaticParams() {
  const marcas = await getMarcas()
  return marcas.map((m) => ({ slug: m.slug }))
}

function ExternalLinkIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

export default async function MarcaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [marca, allMarcas] = await Promise.all([getMarcaBySlug(slug), getMarcas()])
  if (!marca) notFound()

  const logoUrl = resolveMediaUrl(
    marca.logo,
    `/imagenes/marcas/${marca.slug === 'bose' ? 'bose-pro' : marca.slug}.png`,
  )
  const otherMarcas = allMarcas.filter((m) => m.slug !== marca.slug)

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* 1. Banner superior beige con logo centrado */}
      <section
        style={{
          backgroundColor: 'var(--color-secondary)',
          minHeight: '400px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '80px 20px',
        }}
      >
        <img
          src={logoUrl}
          alt={marca.name}
          style={{
            maxHeight: '180px',
            maxWidth: '480px',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </section>

      {/* 2. Sección de contenido sobre fondo blanco */}
      <section style={{ backgroundColor: '#ffffff', padding: '60px 20px 30px' }}>
        <div className="av-container" style={{ maxWidth: '1120px' }}>
          <h1
            style={{
              fontSize: 'clamp(2.6rem, 5vw, 3.4rem)',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              marginBottom: '22px',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}
          >
            {marca.name}
          </h1>

          {marca.description && (
            <div
              style={{
                fontSize: '0.94rem',
                lineHeight: 1.75,
                color: '#222222',
                marginBottom: '28px',
              }}
            >
              {marca.description.split('\n\n').map((para, i) => (
                <p key={i} style={{ marginBottom: '16px' }}>
                  {para}
                </p>
              ))}
            </div>
          )}

          {marca.websiteUrl && (
            <a
              href={marca.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="av-marca-ext-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--color-orange-red)',
              }}
            >
              <span>Sitio Web</span>
              <ExternalLinkIcon />
            </a>
          )}
        </div>
      </section>

      {/* 3. Sección "Otras Marcas" sobre fondo blanco continuo */}
      <section
        className="av-brands-band"
        style={{
          backgroundColor: '#ffffff',
          padding: '30px 20px 80px',
          width: '100%',
        }}
      >
        <div className="av-container" style={{ textAlign: 'center', marginBottom: '35px' }}>
          <h2
            style={{
              fontSize: '1.65rem',
              fontWeight: 600,
              color: 'var(--color-primary)',
            }}
          >
            Otras Marcas
          </h2>
        </div>
        <div className="av-container" style={{ maxWidth: '1240px' }}>
          <BrandCarousel marcas={otherMarcas} />
        </div>
      </section>
    </div>
  )
}
