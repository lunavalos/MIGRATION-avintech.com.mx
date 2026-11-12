import React from 'react'
import Link from 'next/link'
import { getProyectos } from '@/lib/cms'
import { resolveMediaUrl } from '@/lib/payload'

export const metadata = {
  title: 'Proyectos - Avintech',
}

export default async function ProyectosPage() {
  const proyectos = await getProyectos()

  return (
    <section className="av-section">
      <div className="av-container">
        <h1 className="av-page-title">Proyectos</h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {proyectos.map((proj) => {
            const imgUrl = resolveMediaUrl(proj.featuredImage, '/imagenes/explanada-ilmercato.jpg')
            return (
              <Link key={proj.slug} href={`/proyectos/${proj.slug}`} className="av-blog-card">
                <img src={imgUrl} alt={proj.title} />
                <div className="av-blog-card-body">
                  <h2 className="av-blog-card-title">{proj.title}</h2>
                  <p className="av-blog-card-excerpt">
                    {proj.description.slice(0, 160)}...
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
