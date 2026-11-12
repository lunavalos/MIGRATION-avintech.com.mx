import React from 'react'
import { notFound } from 'next/navigation'
import { CalendarIcon, ClockOutlineIcon, UserCircleIcon } from '@/components/Icons'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { DynamicBlocks, RichText, type LexicalDocument } from '@/components/RichText'
import { getPostBySlug } from '@/lib/cms'
import { resolveMediaUrl } from '@/lib/payload'

export const dynamic = 'force-dynamic'

function formatPostDateTime(dateStr?: string) {
  if (!dateStr) return { date: '', time: '' }
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return { date: '', time: '' }

  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()

  let hours = d.getHours()
  const mins = String(d.getMinutes()).padStart(2, '0')
  const ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12 || 12

  return {
    date: `${day}/${month}/${year}`,
    time: `${hours}:${mins} ${ampm}`,
  }
}

export default async function BlogPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ preview?: string }>
}) {
  const { slug } = await params
  const { preview } = await searchParams
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const bannerUrl = resolveMediaUrl(post.featuredImage, '/imagenes/avintech-servicios.webp')
  const { date, time } = formatPostDateTime(post.publishedDate)
  const author = (post.authorName || 'avintech').toLowerCase()
  const hasLexical = Boolean(post.content?.root?.children?.length)

  return (
    <article className="av-section">
      {preview === 'true' && <LivePreviewListener />}
      <div className="av-container">
        <div
          className="av-post-banner"
          style={{ backgroundImage: `url("${bannerUrl}")` }}
          role="img"
          aria-label={post.title}
        />

        <h1 className="av-post-title">{post.title}</h1>

        <ul className="av-post-meta">
          <li className="av-post-meta-item">
            <UserCircleIcon size={13} />
            <span>{author}</span>
          </li>
          {date && (
            <li className="av-post-meta-item">
              <CalendarIcon size={13} />
              <time>{date}</time>
            </li>
          )}
          {time && (
            <li className="av-post-meta-item">
              <ClockOutlineIcon size={13} />
              <time>{time}</time>
            </li>
          )}
        </ul>

        <hr className="av-post-divider" />

        {hasLexical ? (
          <RichText data={post.content as LexicalDocument} />
        ) : (
          <div
            className="av-post-content"
            dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
          />
        )}

        <DynamicBlocks blocks={post.dynamicBlocks} />
      </div>
    </article>
  )
}
