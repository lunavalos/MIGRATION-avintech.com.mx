import React from 'react'
import Link from 'next/link'
import { ArrowCircleRightIcon } from '@/components/Icons'
import { resolveMediaUrl, type ServicioItem } from '@/lib/payload'

const FALLBACK_SERVICE_IMAGE: Record<string, string> = {
  'audio-video': '/imagenes/audio-video-hero-scaled.webp',
  control: '/imagenes/control-hero-scaled.webp',
  iluminacion: '/imagenes/iluminacion.webp',
  redes: '/imagenes/redes-hero-scaled.webp',
  seguridad: '/imagenes/seguridad.webp',
}

const FULL_EXCERPTS: Record<string, string> = {
  iluminacion:
    'Eficiencia y confort que iluminan cada momento Un sistema de iluminación inteligente transforma tus espacios, combinando ahorro energético, comodidad y diseño.Creamos ambientes adaptados a cada ocasión —desde la...',
  control:
    'El poder de tu hogar o negocio en la palma de tu mano Con nuestros sistemas de control inteligente, puedes supervisar, ajustar y automatizar todos los aspectos de...',
  seguridad:
    'Protege lo que más valoras con tecnología inteligente Diseñamos e instalamos sistemas integrales de seguridad que se adaptan a tu estilo de vida, brindando monitoreo en tiempo real...',
  'audio-video':
    'Vive una experiencia sensorial en cada rincón Creamos entornos audiovisuales que combinan tecnología, diseño y confort, permitiendo disfrutar de contenido en alta definición, 4K UHD o streaming en...',
  redes:
    'Tu red es el corazón de un espacio inteligente Diseñamos e implementamos infraestructuras de red de alto rendimiento, combinando internet de banda ancha con cableado estructurado profesional para...',
}

function getDisplayExcerpt(servicio: ServicioItem, variant: 'home' | 'full'): string {
  if (variant === 'home') return servicio.excerpt
  if (FULL_EXCERPTS[servicio.slug]) return FULL_EXCERPTS[servicio.slug]
  const full = `${servicio.subtitle} ${servicio.description} ${servicio.secondaryDescription || ''}`.trim()
  const words = full.split(/\s+/)
  return words.length > 28 ? `${words.slice(0, 28).join(' ')}...` : full
}

export function ServiceCard({
  servicio,
  variant = 'home',
}: {
  servicio: ServicioItem
  variant?: 'home' | 'full'
}) {
  const imageUrl = resolveMediaUrl(
    servicio.heroImage,
    FALLBACK_SERVICE_IMAGE[servicio.slug] || '/imagenes/audio-video-hero-scaled.webp',
  )
  const text = getDisplayExcerpt(servicio, variant)

  return (
    <Link
      href={`/servicios/${servicio.slug}`}
      className={`service-box ${variant === 'full' ? 'service-box--full' : 'service-box--home'}`}
    >
      <div className="service-image" style={{ backgroundImage: `url("${imageUrl}")` }} />
      <div className="service-content-bg" />
      <div className="service-box-inner">
        <div className="service-content">
          <h4>{servicio.title}</h4>
          <p>{text}</p>
          {variant === 'full' && (
            <span className="service-box-ver-btn">
              <ArrowCircleRightIcon size={16} />
              <span>Ver Servicio</span>
            </span>
          )}
        </div>
        <div className="service-box-spacer" aria-hidden="true" />
      </div>
    </Link>
  )
}
