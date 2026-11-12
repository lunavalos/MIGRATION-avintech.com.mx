import React from 'react'
import { resolveMediaUrl, type DynamicBlockItem, type MediaItem } from '@/lib/payload'

export interface LexicalNode {
  type: string
  tag?: string
  listType?: 'bullet' | 'number' | 'check'
  text?: string
  format?: number | string
  url?: string
  fields?: {
    url?: string
    newTab?: boolean
    blockType?: string
    image?: MediaItem | string | number
    videoFile?: MediaItem | string | number
    caption?: string
    width?: 'normal' | 'wide'
    youtubeUrl?: string
    title?: string
    text?: string
    style?: 'info' | 'accent' | 'dark'
  }
  value?: MediaItem | string | number
  children?: LexicalNode[]
}

export interface LexicalDocument {
  root?: {
    children?: LexicalNode[]
  }
}

function extractYoutubeId(urlOrId: string): string {
  const trimmed = urlOrId.trim()
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed
  const m =
    trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/) ||
    trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/) ||
    trimmed.match(/youtube\.com\/(?:embed|shorts|live)\/([a-zA-Z0-9_-]{11})/)
  return m?.[1] || ''
}

function isDirectVideoUrl(url: string): boolean {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url.trim())
}

function renderInline(nodes: LexicalNode[] = [], keyPrefix = 'n'): React.ReactNode[] {
  return nodes.map((node, idx) => {
    const key = `${keyPrefix}-${idx}`

    if (node.type === 'linebreak') {
      return <br key={key} />
    }

    if (node.type === 'text') {
      let content: React.ReactNode = node.text || ''
      const fmt = typeof node.format === 'number' ? node.format : 0
      if (fmt & 16) content = <code key={`${key}-c`}>{content}</code>
      if (fmt & 4) content = <s key={`${key}-s`}>{content}</s>
      if (fmt & 8) content = <u key={`${key}-u`}>{content}</u>
      if (fmt & 2) content = <em key={`${key}-i`}>{content}</em>
      if (fmt & 1) content = <strong key={`${key}-b`}>{content}</strong>
      return <React.Fragment key={key}>{content}</React.Fragment>
    }

    if (node.type === 'link' || node.type === 'autolink') {
      const href = node.fields?.url || node.url || '#'
      const newTab = Boolean(node.fields?.newTab)
      return (
        <a
          key={key}
          href={href}
          target={newTab ? '_blank' : undefined}
          rel={newTab ? 'noreferrer noopener' : undefined}
        >
          {renderInline(node.children, key)}
        </a>
      )
    }

    if (node.children) {
      return <React.Fragment key={key}>{renderInline(node.children, key)}</React.Fragment>
    }

    return null
  })
}

function renderBlock(node: LexicalNode, key: string): React.ReactNode {
  const fields = node.fields || {}
  const blockType = fields.blockType

  if (blockType === 'mediaBlock') {
    const imgObj = typeof fields.image === 'object' ? fields.image : undefined
    const imgUrl = resolveMediaUrl(imgObj, typeof fields.image === 'string' ? fields.image : '')
    if (!imgUrl) return null
    return (
      <figure
        key={key}
        className={`av-rt-media ${fields.width === 'wide' ? 'av-rt-media--wide' : ''}`}
      >
        <img src={imgUrl} alt={fields.caption || imgObj?.alt || 'Avintech'} />
        {fields.caption && <figcaption>{fields.caption}</figcaption>}
      </figure>
    )
  }

  if (blockType === 'videoBlock') {
    const videoObj = typeof fields.videoFile === 'object' ? fields.videoFile : undefined
    const uploadedVideoUrl = videoObj ? resolveMediaUrl(videoObj, '') : ''
    if (uploadedVideoUrl) {
      return (
        <figure key={key} className="av-rt-video">
          <div className="av-rt-video-frame">
            <video src={uploadedVideoUrl} controls playsInline style={{ width: '100%', height: '100%' }} />
          </div>
          {fields.caption && <figcaption>{fields.caption}</figcaption>}
        </figure>
      )
    }

    const rawUrl = fields.youtubeUrl || ''
    if (!rawUrl) return null

    if (isDirectVideoUrl(rawUrl)) {
      return (
        <figure key={key} className="av-rt-video">
          <div className="av-rt-video-frame">
            <video src={rawUrl} controls playsInline style={{ width: '100%', height: '100%' }} />
          </div>
          {fields.caption && <figcaption>{fields.caption}</figcaption>}
        </figure>
      )
    }

    const ytId = extractYoutubeId(rawUrl)
    if (!ytId) return null
    return (
      <figure key={key} className="av-rt-video">
        <div className="av-rt-video-frame">
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?rel=0`}
            title={fields.caption || 'Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {fields.caption && <figcaption>{fields.caption}</figcaption>}
      </figure>
    )
  }

  if (blockType === 'calloutBlock') {
    const variant = fields.style || 'info'
    return (
      <aside key={key} className={`av-rt-callout av-rt-callout--${variant}`}>
        {fields.title && <h4>{fields.title}</h4>}
        {fields.text && <p>{fields.text}</p>}
      </aside>
    )
  }

  return null
}

function renderNode(node: LexicalNode, idx: number): React.ReactNode {
  const key = `block-${idx}`

  switch (node.type) {
    case 'paragraph': {
      const inner = renderInline(node.children, key)
      if (!inner || inner.length === 0) return null
      return <p key={key}>{inner}</p>
    }

    case 'heading': {
      const inner = renderInline(node.children, key)
      if (node.tag === 'h2') return <h2 key={key}>{inner}</h2>
      if (node.tag === 'h4') return <h4 key={key}>{inner}</h4>
      return <h3 key={key}>{inner}</h3>
    }

    case 'list': {
      const items = (node.children || []).map((li, liIdx) => (
        <li key={`${key}-li-${liIdx}`}>{renderInline(li.children, `${key}-li-${liIdx}`)}</li>
      ))
      if (node.listType === 'number') return <ol key={key}>{items}</ol>
      return <ul key={key}>{items}</ul>
    }

    case 'quote':
      return (
        <blockquote key={key} className="av-rt-quote">
          {renderInline(node.children, key)}
        </blockquote>
      )

    case 'upload': {
      const media = typeof node.value === 'object' ? node.value : undefined
      const url = resolveMediaUrl(media, '')
      if (!url) return null
      const caption = fieldsCaption(node)
      if (media?.mimeType?.startsWith('video/') || isDirectVideoUrl(url)) {
        return (
          <figure key={key} className="av-rt-video">
            <div className="av-rt-video-frame">
              <video src={url} controls playsInline style={{ width: '100%', height: '100%' }} />
            </div>
            {caption && <figcaption>{caption}</figcaption>}
          </figure>
        )
      }
      return (
        <figure key={key} className="av-rt-media">
          <img src={url} alt={caption || media?.alt || 'Avintech'} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      )
    }

    case 'block':
    case 'inlineBlock':
      return renderBlock(node, key)

    default:
      if (node.children) {
        return <div key={key}>{node.children.map((c, ci) => renderNode(c, ci))}</div>
      }
      return null
  }
}

function fieldsCaption(node: LexicalNode): string {
  const rec = node as unknown as { fields?: { caption?: string } }
  return rec.fields?.caption || ''
}

export function RichText({ data }: { data?: LexicalDocument | null }) {
  const children = data?.root?.children
  if (!children || children.length === 0) return null

  return <div className="av-post-content">{children.map((node, idx) => renderNode(node, idx))}</div>
}

export function DynamicBlocks({ blocks }: { blocks?: DynamicBlockItem[] | null }) {
  if (!blocks || blocks.length === 0) return null

  return (
    <div className="av-post-content">
      {blocks.map((b, idx) =>
        renderBlock(
          {
            type: 'block',
            fields: {
              blockType: b.blockType,
              image: b.image,
              videoFile: b.videoFile,
              caption: b.caption,
              width: b.width,
              youtubeUrl: b.youtubeUrl,
              title: b.title,
              text: b.text,
              style: b.style,
            },
          },
          `dyn-${b.id || idx}`,
        ),
      )}
    </div>
  )
}
