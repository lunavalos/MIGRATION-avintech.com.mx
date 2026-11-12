'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { getTranslation } from '@payloadcms/translations'
import { Link, useAuth, useConfig, useNav, useTranslation } from '@payloadcms/ui'
import { formatAdminURL } from 'payload/shared'

const baseClass = 'nav'

function CollectionIcon({ slug }: { slug: string }) {
  switch (slug) {
    case 'posts':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      )
    case 'categories':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
          <circle cx="7.5" cy="7.5" r="1" fill="currentColor" />
        </svg>
      )
    case 'media':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
      )
    case 'contact-submissions':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M8 13h8" />
          <path d="M8 17h5" />
        </svg>
      )
    case 'users':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9 9h6" />
          <path d="M9 13h6" />
        </svg>
      )
  }
}

export const AdminNav: React.FC = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { hydrated, navOpen, navRef, shouldAnimate } = useNav()
  const { logOut, permissions, user } = useAuth()
  const { config } = useConfig()
  const { i18n } = useTranslation()

  const adminRoute = config.routes?.admin || '/admin'
  const loginRoute = formatAdminURL({ adminRoute, path: '/login' })

  const allowedOrder = ['posts', 'categories', 'media', 'users']

  const visibleCollections = (config.collections || [])
    .filter((collection) => {
      if (!allowedOrder.includes(collection.slug)) return false
      const adminConfig = collection.admin as { hidden?: boolean } | undefined
      if (adminConfig?.hidden === true) return false
      const collectionPermissions = permissions?.collections?.[collection.slug] as
        | { read?: { permission?: boolean } | boolean }
        | undefined
      if (collectionPermissions) {
        if (typeof collectionPermissions.read === 'boolean') {
          return collectionPermissions.read
        }
        if (
          collectionPermissions.read &&
          typeof collectionPermissions.read === 'object' &&
          'permission' in collectionPermissions.read
        ) {
          return collectionPermissions.read.permission !== false
        }
      }
      return true
    })
    .sort((a, b) => allowedOrder.indexOf(a.slug) - allowedOrder.indexOf(b.slug))

  const handleLogout = async () => {
    try {
      await logOut()
    } finally {
      router.push(loginRoute)
    }
  }

  const userEmail = typeof user?.email === 'string' ? user.email : 'admin@avintech.com.mx'
  const userInitial = userEmail.charAt(0).toUpperCase() || 'A'

  const asideClasses = [
    baseClass,
    navOpen && `${baseClass}--nav-open`,
    shouldAnimate && `${baseClass}--nav-animate`,
    hydrated && `${baseClass}--nav-hydrated`,
    'av-sidebar',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <aside className={asideClasses} inert={!navOpen ? true : undefined}>
      <div className={`${baseClass}__scroll av-sidebar__scroll`} ref={navRef}>
        <nav className={`${baseClass}__wrap av-sidebar__wrap`} aria-label="Navegación principal">
          <div className="av-sidebar__top">
            <div className="av-sidebar__section-title">GESTIÓN DE CONTENIDO</div>

            <div className="av-sidebar__list">
              {visibleCollections.map((collection) => {
                const href = formatAdminURL({
                  adminRoute,
                  path: `/collections/${collection.slug}`,
                })
                const isActive =
                  pathname === href ||
                  (pathname.startsWith(href) && ['/', undefined].includes(pathname[href.length]))
                const label = getTranslation(
                  collection.labels?.plural || collection.slug,
                  i18n,
                )

                return (
                  <Link
                    key={collection.slug}
                    id={`nav-${collection.slug}`}
                    href={href}
                    className={`av-sidebar__card${isActive ? ' av-sidebar__card--active' : ''}`}
                  >
                    <span className="av-sidebar__card-icon" aria-hidden="true">
                      <CollectionIcon slug={collection.slug} />
                    </span>
                    <span className="av-sidebar__card-label">{label}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="av-sidebar__footer">
            <button
              type="button"
              onClick={handleLogout}
              className="av-sidebar__logout-btn"
            >
              <svg
                className="av-sidebar__logout-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Cerrar Sesión</span>
            </button>

            <Link
              href={formatAdminURL({ adminRoute, path: '/account' })}
              className="av-sidebar__user"
            >
              <span className="av-sidebar__avatar">{userInitial}</span>
              <span className="av-sidebar__email" title={userEmail}>
                {userEmail}
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  )
}

export default AdminNav
