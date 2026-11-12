import React from 'react'
import { ContactForm } from '@/components/ContactForm'
import {
  ClockIcon,
  EnvelopeIcon,
  FacebookIcon,
  InstagramIcon,
  MapPinIcon,
  PhoneHandsetIcon,
  TikTokIcon,
  YouTubeIcon,
} from '@/components/Icons'
import { getContactoPageData, getSiteSettings } from '@/lib/cms'

export const metadata = {
  title: 'Contacto - Avintech',
}

export default async function ContactoPage() {
  const [pageData, settings] = await Promise.all([
    getContactoPageData(),
    getSiteSettings(),
  ])

  return (
    <section className="av-section">
      <div className="av-container">
        <h1 className="av-page-title">{pageData.pageTitle}</h1>
        <p style={{ fontSize: '1.2rem', fontWeight: 400, marginBottom: '36px' }}>
          {pageData.subtitle}
        </p>

        <div className="av-contact-split">
          <div>
            <h2 className="av-heading-lg">Búscanos en:</h2>
            <ul className="av-icon-list">
              <li>
                <div>
                  <MapPinIcon size={15} />
                  <span>{settings.address}</span>
                </div>
              </li>
              <li>
                <div>
                  <ClockIcon size={15} />
                  <span>{settings.schedule}</span>
                </div>
              </li>
            </ul>

            <h4 className="av-heading-sm" style={{ marginTop: '20px', marginBottom: '12px' }}>
              Redes Sociales
            </h4>
            <div className="av-social-circles">
              <a
                href={settings.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="av-social-circle"
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href={settings.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="av-social-circle"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={settings.socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tiktok"
                className="av-social-circle"
              >
                <TikTokIcon size={18} />
              </a>
              <a
                href={settings.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Youtube"
                className="av-social-circle"
              >
                <YouTubeIcon size={18} />
              </a>
            </div>

            <div className="av-map-box av-map-box--tall">
              <iframe
                loading="lazy"
                src={pageData.mapEmbedUrl || settings.googleMapsEmbedUrl}
                title={settings.address}
                aria-label={settings.address}
              />
            </div>
          </div>

          <div>
            <h2 className="av-heading-lg">Métodos de contacto</h2>
            <ul className="av-icon-list" style={{ marginBottom: '20px' }}>
              {settings.phones.map((p) => (
                <li key={p.number}>
                  <a href={`tel:${p.number.replace(/[^0-9+]/g, '')}`}>
                    <PhoneHandsetIcon size={15} />
                    <span>{p.number}</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${settings.email}`}>
                  <EnvelopeIcon size={15} />
                  <span>{settings.email}</span>
                </a>
              </li>
            </ul>

            <h4 className="av-heading-sm" style={{ marginBottom: '16px' }}>
              Envíanos un mensaje ahora
            </h4>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
