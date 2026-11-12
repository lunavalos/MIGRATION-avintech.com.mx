import React from 'react'
import Link from 'next/link'
import { CaretRightIcon } from '@/components/Icons'
import type { MarcaItem, ServicioItem, SiteSettingsData } from '@/lib/payload'
import { resolveMediaUrl } from '@/lib/payload'

export function Footer({
  settings,
  servicios,
  marcas,
}: {
  settings: SiteSettingsData
  servicios: ServicioItem[]
  marcas: MarcaItem[]
}) {
  const logoDark = resolveMediaUrl(settings.logoDark, '/imagenes/avintech-logo.png')
  const creditsLogo = resolveMediaUrl(settings.creditsLogo, '/imagenes/credits-logo-gray.png')
  const footerServicios = [...servicios].sort((a, b) => (a.order || 0) - (b.order || 0)).slice(0, 5)
  const footerMarcas = marcas.filter((m) => m.showInFooter !== false).slice(0, 6)

  return (
    <footer className="av-footer">
      <div className="av-footer-top">
        <div className="av-footer-brand">
          <Link href="/" aria-label="Avintech">
            <img src={logoDark} alt="Avintech" className="av-footer-logo" />
          </Link>
          <p className="av-footer-copy">{settings.copyrightText}</p>
        </div>

        <div className="av-footer-right">
          <div className="av-footer-cols">
            <div>
              <h4 className="av-footer-col-title">Servicios</h4>
              <ul className="av-footer-links">
                {footerServicios.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/servicios/${s.slug}`}>
                      <CaretRightIcon size={13} />
                      <span>{s.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="av-footer-col-title">Marcas</h4>
              <ul className="av-footer-links">
                {footerMarcas.map((m) => (
                  <li key={m.slug}>
                    <Link href={`/marcas/${m.slug}`}>
                      <CaretRightIcon size={13} />
                      <span>{m.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="av-footer-col-title">Sobre Avintech</h4>
              <ul className="av-footer-links">
                <li>
                  <Link href="/nosotros">
                    <CaretRightIcon size={13} />
                    <span>Nosotros</span>
                  </Link>
                </li>
                <li>
                  <Link href="/contacto">
                    <CaretRightIcon size={13} />
                    <span>Contacto</span>
                  </Link>
                </li>
                <li>
                  <Link href="/aviso-de-privacidad">
                    <CaretRightIcon size={13} />
                    <span>Aviso de Privacidad</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <hr className="av-footer-divider" />

          <div className="av-footer-credits">
            <span>Powered by</span>
            <a
              href="https://lunavalos.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lunavalos"
            >
              <img src={creditsLogo} alt="Lunavalos" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
