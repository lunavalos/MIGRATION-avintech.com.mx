import React from 'react'
import { notFound } from 'next/navigation'
import { getProyectoBySlug, getProyectos } from '@/lib/cms'
import { resolveMediaUrl } from '@/lib/payload'

export async function generateStaticParams() {
  const proyectos = await getProyectos()
  return proyectos.map((p) => ({ slug: p.slug }))
}

export default async function ProyectoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const proyecto = await getProyectoBySlug(slug)
  if (!proyecto) notFound()

  const imgUrl = resolveMediaUrl(proyecto.featuredImage, '/imagenes/explanada-ilmercato.jpg')
  const logoUrl = resolveMediaUrl(proyecto.logo, '/imagenes/logo-il-mercato.png')

  return (
    <article className="av-section">
      <div className="av-container" style={{ maxWidth: '960px' }}>
        <div
          className="av-post-banner"
          style={{ backgroundImage: `url("${imgUrl}")` }}
          role="img"
          aria-label={proyecto.title}
        />

        {logoUrl && (
          <div style={{ marginBottom: '20px' }}>
            <img
              src={logoUrl}
              alt={proyecto.title}
              style={{ maxHeight: '60px', width: 'auto' }}
            />
          </div>
        )}

        <h1 className="av-post-title">{proyecto.title}</h1>

        <div style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
          {proyecto.description.split('\n\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </div>
    </article>
  )
}
