import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Gracias - Avintech',
}

export default function GraciasPage() {
  return (
    <section className="av-section" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center' }}>
      <div className="av-container" style={{ textAlign: 'center', maxWidth: '700px' }}>
        <h1 style={{ fontSize: '2.6rem', fontWeight: 600, marginBottom: '16px' }}>
          Gracias por tu mensaje!
        </h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
          En breve nos pondremos en contacto contigo para dar seguimiento a tu solicitud.
        </p>
        <Link href="/" className="av-btn-pill-purple">
          Volver al Inicio
        </Link>
      </div>
    </section>
  )
}
