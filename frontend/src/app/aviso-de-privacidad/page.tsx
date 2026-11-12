import React from 'react'
import { getAvisoPrivacidadData } from '@/lib/cms'

export const metadata = {
  title: 'Aviso de Privacidad - Avintech',
}

export default async function AvisoPrivacidadPage() {
  const data = await getAvisoPrivacidadData()

  return (
    <section className="av-section">
      <div className="av-container" style={{ maxWidth: '900px' }}>
        <h1 className="av-page-title" style={{ fontSize: '2.6rem' }}>
          {data.pageTitle}
        </h1>
        <p style={{ lineHeight: 1.7, marginBottom: '24px' }}>{data.introText}</p>

        {data.sections.map((sec, idx) => (
          <div key={idx} style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '6px' }}>
              {sec.heading}
            </h2>
            {sec.body.split('\n').map((line, lIdx) => (
              <p key={lIdx} style={{ lineHeight: 1.7, marginBottom: '4px' }}>
                {line}
              </p>
            ))}
          </div>
        ))}

        <p style={{ fontWeight: 600, marginTop: '30px' }}>{data.closing}</p>
      </div>
    </section>
  )
}
