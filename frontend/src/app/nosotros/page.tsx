import React from 'react'
import { VideoPlaylist } from '@/components/VideoPlaylist'
import { getNosotrosPageData } from '@/lib/cms'
import { resolveMediaUrl } from '@/lib/payload'

export const metadata = {
  title: 'Nosotros - Avintech',
}

export default async function NosotrosPage() {
  const data = await getNosotrosPageData()

  return (
    <div>
      <section className="av-section" style={{ paddingBottom: '40px' }}>
        <div className="av-container">
          <h1 className="av-page-title">{data.pageTitle}</h1>

          <VideoPlaylist playlistTitle={data.playlistTitle} videos={data.videos} />

          <div style={{ textAlign: 'center', margin: '30px auto 30px' }}>
            <h2
              style={{
                fontSize: '1.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                color: 'var(--color-purple)',
                marginBottom: '20px',
              }}
            >
              {data.valuesTitle}
            </h2>
            <p>{data.valuesLead1}</p>
            <p>{data.valuesLead2}</p>
          </div>

          <div className="av-why-grid" style={{ marginTop: '30px' }}>
            {data.values.map((val, idx) => (
              <div key={idx}>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '8px' }}>
                  {val.title}
                </h4>
                <p style={{ margin: 0 }}>{val.description}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '12px' }}>
              {data.goalTitle}
            </h2>
            <p>{data.goalParagraph1}</p>
            <p>{data.goalParagraph2}</p>
          </div>
        </div>
      </section>

      {data.processBlocks.map((block, idx) => {
        const isAlt = idx % 2 === 0
        const fallbackImgs = [
          '/imagenes/asesoria-en-proyectos.webp',
          '/imagenes/acustica.webp',
          '/imagenes/diseno-y-desarrollo-de-ingenierias.webp',
          '/imagenes/suministro-y-ejecucion-de-proyectos.webp',
          '/imagenes/capacitacion-de-usuario.webp',
          '/imagenes/servicio-post-venta.webp',
        ]
        const imgSrc = resolveMediaUrl(block.image, fallbackImgs[idx] || fallbackImgs[0])

        return (
          <section key={idx} className={`av-process-row ${isAlt ? 'alt' : ''}`}>
            <div className="av-process-inner">
              <div className="av-process-text">
                <h2 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '8px' }}>
                  {block.title}
                </h2>
                {block.subtitle && (
                  <h3
                    style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      color: 'var(--color-text)',
                      marginBottom: '12px',
                    }}
                  >
                    {block.subtitle}
                  </h3>
                )}
                <p>{block.paragraph1}</p>
                {block.paragraph2 && <p>{block.paragraph2}</p>}
              </div>
              <div className="av-process-img">
                <img src={imgSrc} alt={block.title} />
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
