import React from 'react'
import Link from 'next/link'
import { BrandCarousel } from '@/components/BrandCarousel'
import { ServiceCard } from '@/components/ServiceCard'
import { ContactForm } from '@/components/ContactForm'
import {
  EnvelopeIcon,
  HandshakeIcon,
  LightbulbIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldIcon,
  TrophyIcon,
} from '@/components/Icons'
import { getHomePageData, getMarcas, getServicios, getSiteSettings } from '@/lib/cms'
import { resolveMediaUrl } from '@/lib/payload'

function renderWhyUsIcon(iconName: string) {
  switch (iconName) {
    case 'handshake':
      return <HandshakeIcon />
    case 'shield':
      return <ShieldIcon />
    case 'lightbulb':
      return <LightbulbIcon />
    default:
      return <TrophyIcon />
  }
}

export default async function HomePage() {
  const [home, settings, servicios, marcas] = await Promise.all([
    getHomePageData(),
    getSiteSettings(),
    getServicios(),
    getMarcas(),
  ])

  const heroVideoUrl = resolveMediaUrl(home.heroVideo, '/video/hero-banner-finale.webm')
  const bannerVideoUrl = resolveMediaUrl(home.bannerVideo, '/video/blog-video-sample.webm')
  const homeServices = servicios.filter((s) => s.showOnHome !== false).slice(0, 4)

  return (
    <>
      {/* 1. Hero Section */}
      <div className="av-hero-wrap">
        <section className="av-hero">
          <video
            className="av-hero-video"
            autoPlay
            muted
            playsInline
            loop
            src={heroVideoUrl}
          />
          <div className="av-hero-overlay" />
          <div className="av-hero-content">
            <h1 className="av-hero-title hero-masked">
              <span className="hl">
                <span className="hero-text-primary">{home.heroTitlePrimary}</span>
              </span>
              <span className="hl">
                <span>{home.heroTitleSecondary}</span>
              </span>
            </h1>
            <a href={home.heroCtaHref || '#soluciones-inteligentes'} className="av-btn-pill-outline">
              {home.heroCtaLabel}
            </a>
          </div>
        </section>
      </div>

      {/* 2. Brands Carousel */}
      <section className="av-brands-band" aria-label="Marcas">
        <BrandCarousel marcas={marcas} />
      </section>

      {/* 3. Soluciones Inteligentes */}
      <section id="soluciones-inteligentes" className="av-intro-section">
        <div className="av-intro-container">
          <h2 className="av-intro-title">
            {home.introEyebrow}
            <em className="av-intro-subtitle">{home.introHeading}</em>
          </h2>
          <div className="av-intro-text">
            <p>{home.introParagraph1}</p>
            <p>{home.introParagraph2}</p>
          </div>
        </div>
      </section>

      {/* 4. Especialidades */}
      <section className="av-section" style={{ paddingTop: '20px' }}>
        <div className="av-container" style={{ maxWidth: '1600px' }}>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              textAlign: 'center',
              marginBottom: '30px',
            }}
          >
            {home.specialtiesTitle}
          </h2>

          <div className="av-services-grid-home">
            {homeServices.map((servicio) => (
              <ServiceCard key={servicio.slug} servicio={servicio} variant="home" />
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/servicios" className="av-btn-pill-purple">
              {home.specialtiesCtaLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* 5. ¿Por qué elegirnos? */}
      <section className="av-section">
        <div className="av-container">
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 600,
              textAlign: 'center',
              margin: '40px 0 30px',
            }}
          >
            {home.whyUsTitle}
          </h2>

          <div className="av-why-grid">
            {home.whyUsItems.map((item, idx) => (
              <div key={idx} className="av-icon-box">
                <div className="av-icon-box-icon">{renderWhyUsIcon(item.icon)}</div>
                <div>
                  <h3 className="av-icon-box-title">{item.title}</h3>
                  <p className="av-icon-box-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Second Video Banner */}
      <div className="av-banner-wrap">
        <section className="av-banner-box">
          <video
            className="av-hero-video"
            autoPlay
            muted
            playsInline
            loop
            src={bannerVideoUrl}
          />
          <div className="av-banner-content">
            <h2 className="av-banner-title">{home.bannerTitle}</h2>
            <p
              className="av-banner-text"
              dangerouslySetInnerHTML={{ __html: home.bannerText }}
            />
          </div>
        </section>
      </div>

      {/* 7. Contáctanos y Formulario */}
      <section className="av-section">
        <div className="av-container av-contact-split">
          <div>
            <h2 className="av-heading-sm">{home.contactTitle}</h2>
            <p className="av-subheading-regular">{home.contactSubtitle}</p>

            <ul className="av-icon-list">
              {settings.phones.map((p) => (
                <li key={p.number}>
                  <a href={`tel:${p.number.replace(/[^0-9+]/g, '')}`}>
                    <PhoneIcon size={16} />
                    <span>{p.number}</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${settings.email}`}>
                  <EnvelopeIcon size={16} />
                  <span>{settings.email}</span>
                </a>
              </li>
              <li>
                <div>
                  <MapPinIcon size={16} />
                  <span>{settings.address}</span>
                </div>
              </li>
            </ul>

            <div className="av-map-box">
              <iframe
                loading="lazy"
                src={settings.googleMapsEmbedUrl}
                title={settings.address}
                aria-label={settings.address}
              />
            </div>
          </div>

          <div>
            <h2 className="av-heading-sm">{home.formTitle}</h2>
            <p className="av-subheading-regular">{home.formSubtitle}</p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
