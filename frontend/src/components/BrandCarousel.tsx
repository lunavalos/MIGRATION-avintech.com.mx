'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronArrow } from '@/components/Icons'
import { resolveMediaUrl, type MarcaItem } from '@/lib/payload'

export function BrandCarousel({ marcas }: { marcas: MarcaItem[] }) {
  const [index, setIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(4)
  const [paused, setPaused] = useState(false)
  const total = marcas.length
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth <= 768) setVisibleCount(2)
      else if (window.innerWidth <= 1024) setVisibleCount(3)
      else setVisibleCount(4)
    }
    updateCols()
    window.addEventListener('resize', updateCols)
    return () => window.removeEventListener('resize', updateCols)
  }, [])

  const maxIndex = Math.max(0, total - visibleCount)

  const next = () => {
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prev = () => {
    setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  useEffect(() => {
    if (paused || total <= visibleCount) return
    timerRef.current = setInterval(() => {
      setIndex((prevIdx) => (prevIdx >= maxIndex ? 0 : prevIdx + 1))
    }, 5000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [paused, maxIndex, total, visibleCount])

  if (total === 0) return null

  return (
    <div
      className="av-carousel-wrap"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <button
        type="button"
        className="av-carousel-arrow prev"
        aria-label="Anterior"
        onClick={prev}
      >
        <ChevronArrow direction="prev" />
      </button>

      <div className="av-carousel-viewport">
        <div
          className="av-carousel-track"
          style={{
            transform: `translateX(-${(index * 100) / visibleCount}%)`,
          }}
        >
          {marcas.map((marca) => {
            const logoSrc = resolveMediaUrl(
              marca.logo,
              `/imagenes/marcas/${marca.slug === 'bose' ? 'bose-pro' : marca.slug}.png`,
            )
            return (
              <div key={marca.slug} className="av-carousel-slide">
                <Link href={`/marcas/${marca.slug}`} title={marca.name}>
                  <img src={logoSrc} alt={marca.name} />
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      <button
        type="button"
        className="av-carousel-arrow next"
        aria-label="Siguiente"
        onClick={next}
      >
        <ChevronArrow direction="next" />
      </button>
    </div>
  )
}
