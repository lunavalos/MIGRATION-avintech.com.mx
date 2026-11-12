'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { resolveMediaUrl, type CategoryItem, type PostItem } from '@/lib/payload'

function trimWords(text: string, maxWords = 15): string {
  const clean = text.replace(/\s*\.\.\.\s*$/, '').trim()
  const words = clean.split(/\s+/)
  if (words.length <= maxWords) return `${clean}...`
  return `${words.slice(0, maxWords).join(' ')}...`
}

export function BlogGrid({
  posts,
  categories,
}: {
  posts: PostItem[]
  categories: CategoryItem[]
}) {
  const [selectedSlug, setSelectedSlug] = useState<string>('all')

  const filteredPosts =
    selectedSlug === 'all'
      ? posts
      : posts.filter((p) => {
          if (typeof p.category === 'object' && p.category !== null) {
            return p.category.slug === selectedSlug
          }
          return false
        })

  const toggleCategory = (slug: string) => {
    setSelectedSlug((prev) => (prev === slug ? 'all' : slug))
  }

  return (
    <div>
      <div className="av-blog-filters">
        {categories.map((cat) => {
          const active = selectedSlug === cat.slug
          return (
            <button
              key={cat.slug}
              type="button"
              className={`av-filter-btn ${active ? 'active' : ''}`}
              aria-pressed={active}
              onClick={() => toggleCategory(cat.slug)}
            >
              {cat.name}
            </button>
          )
        })}
      </div>

      <div className="av-blog-grid">
        {filteredPosts.map((post) => {
          const imgUrl = resolveMediaUrl(post.featuredImage, '/imagenes/avintech-servicios.webp')
          return (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="av-blog-card">
              <img src={imgUrl} alt={post.title} />
              <div className="av-blog-card-body">
                <h4 className="av-blog-card-title">{post.title}</h4>
                <p className="av-blog-card-excerpt">{trimWords(post.excerpt, 15)}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
