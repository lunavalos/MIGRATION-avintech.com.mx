'use client'

import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollRevealProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // 1. Elementos de texto a los que se aplica la animación de máscara tipo Lircle
    const textSelector = [
      'main h1:not(.hero-masked)',
      'main h2',
      'main h3',
      'main h4',
      'main h5',
      'main h6',
      'main .av-page-title',
      'main .av-intro-title',
      'main .av-heading-sm',
      'main .av-subheading-regular',
      'main p:not(.av-banner-text *)',
      'main .av-icon-list li',
    ].join(', ')

    // 2. Tarjetas, contenedores y botones
    const cardSelector = [
      'main .av-service-card',
      'main .av-blog-card',
      'main .av-project-card',
      'main .av-icon-box',
      'main .av-banner-box',
      'main .av-playlist-wrap',
      'main .av-why-grid > *',
      'main .av-contact-split > div',
      'main .av-btn-pill-purple',
      'main .av-btn-pill-cyan',
    ].join(', ')

    const textElements = Array.from(document.querySelectorAll<HTMLElement>(textSelector))
    const cardElements = Array.from(document.querySelectorAll<HTMLElement>(cardSelector))

    // Prepara el texto envolviéndolo en máscara si aún no se ha hecho
    textElements.forEach((el) => {
      // Si ya está preparado o es el hero que ya tiene estructura propia, omitir
      if (el.classList.contains('av-masked-done') || el.closest('.hero-masked')) return

      el.classList.add('av-masked-done', 'av-mask-wrap')
      const inner = document.createElement('span')
      inner.className = 'av-mask-inner'

      while (el.firstChild) {
        inner.appendChild(el.firstChild)
      }
      el.appendChild(inner)
    })

    cardElements.forEach((el) => {
      if (!el.classList.contains('av-card-reveal')) {
        el.classList.add('av-card-reveal')
      }
    })

    const allTargets = [...textElements, ...cardElements]
    if (!allTargets.length) return

    const revealTarget = (target: HTMLElement, delay = 0) => {
      if (target.classList.contains('is-in-view')) return

      const inner = target.querySelector<HTMLElement>(':scope > .av-mask-inner')
      if (inner && delay > 0) {
        inner.style.transitionDelay = `${delay}ms`
      } else if (!inner && delay > 0) {
        target.style.transitionDelay = `${delay}ms`
      }

      target.classList.add('is-in-view')
    }

    // Observer para animar conforme se hace scroll
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            let delay = 0
            const parent = target.parentElement
            if (parent && parent.children.length > 1) {
              const idx = Array.from(parent.children).indexOf(target)
              if (idx > 0) {
                delay = Math.min(idx * 75, 400)
              }
            }
            revealTarget(target, delay)
            obs.unobserve(target)
          }
        })
      },
      {
        threshold: 0.05,
        rootMargin: '100px 0px 40px 0px',
      },
    )

    const windowHeight = window.innerHeight

    allTargets.forEach((el, index) => {
      if (el.classList.contains('is-in-view')) return

      const rect = el.getBoundingClientRect()
      const isInitial = rect.top < windowHeight && rect.bottom > 0

      if (isInitial) {
        // Pantalla inicial: animación en cascada suave inmediata
        const initialDelay = Math.min(index * 40, 360)
        setTimeout(() => {
          revealTarget(el, initialDelay)
        }, 30)
      } else {
        observer.observe(el)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [pathname])

  return <>{children}</>
}
