import React from 'react'
import Link from 'next/link'
import { getMarcas } from '@/lib/cms'
import { resolveMediaUrl } from '@/lib/payload'

export const metadata = {
  title: 'Marcas - Avintech',
}

export default async function MarcasPage() {
  const marcas = await getMarcas()

  return (
    <section className="av-section">
      <div className="av-container">
        <h1 className="av-page-title">Marcas</h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {marcas.map((marca) => {
            const logoUrl = resolveMediaUrl(
              marca.logo,
              `/imagenes/marcas/${marca.slug === 'bose' ? 'bose-pro' : marca.slug}.png`,
            )
            return (
              <Link
                key={marca.slug}
                href={`/marcas/${marca.slug}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  padding: '24px',
                  borderRadius: '14px',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-white)',
                  boxShadow: '0 3px 5px -2px rgba(0,0,0,0.12)',
                }}
              >
                <div
                  style={{
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <img
                    src={logoUrl}
                    alt={marca.name}
                    style={{ maxHeight: '70px', width: 'auto', objectFit: 'contain' }}
                  />
                </div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 600 }}>{marca.name}</h2>
                {marca.description && (
                  <p style={{ fontSize: '0.92rem', color: 'var(--color-text)', margin: 0 }}>
                    {marca.description.slice(0, 180)}
                    {marca.description.length > 180 ? '...' : ''}
                  </p>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
