import {
  fetchPayload,
  type AvisoPrivacidadPageData,
  type CategoryItem,
  type ContactoPageData,
  type HomePageData,
  type MarcaItem,
  type MediaItem,
  type NosotrosPageData,
  type PostItem,
  type ProyectoItem,
  type ServicioItem,
  type ServiciosPageData,
  type SiteSettingsData,
} from '@/lib/payload'
import {
  FALLBACK_AVISO_PAGE,
  FALLBACK_CATEGORIES,
  FALLBACK_CONTACTO_PAGE,
  FALLBACK_HOME_PAGE,
  FALLBACK_MARCAS,
  FALLBACK_NOSOTROS_PAGE,
  FALLBACK_POSTS,
  FALLBACK_PROYECTOS,
  FALLBACK_SERVICIOS,
  FALLBACK_SERVICIOS_PAGE,
  FALLBACK_SITE_SETTINGS,
} from '@/data/fallback'

interface DocsResponse<T> {
  docs: T[]
}

// Contenido fijo (estático) — solo el Blog es dinámico desde Payload CMS
export async function getSiteSettings(): Promise<SiteSettingsData> {
  return FALLBACK_SITE_SETTINGS
}

export async function getHomePageData(): Promise<HomePageData> {
  return FALLBACK_HOME_PAGE
}

export async function getNosotrosPageData(): Promise<NosotrosPageData> {
  return FALLBACK_NOSOTROS_PAGE
}

export async function getServiciosPageData(): Promise<ServiciosPageData> {
  return FALLBACK_SERVICIOS_PAGE
}

export async function getContactoPageData(): Promise<ContactoPageData> {
  return FALLBACK_CONTACTO_PAGE
}

export async function getAvisoPrivacidadData(): Promise<AvisoPrivacidadPageData> {
  return FALLBACK_AVISO_PAGE
}

export async function getServicios(): Promise<ServicioItem[]> {
  return FALLBACK_SERVICIOS
}

export async function getServicioBySlug(slug: string): Promise<ServicioItem | undefined> {
  return FALLBACK_SERVICIOS.find((s) => s.slug === slug)
}

export async function getMarcas(): Promise<MarcaItem[]> {
  return FALLBACK_MARCAS
}

export async function getMarcaBySlug(slug: string): Promise<MarcaItem | undefined> {
  return FALLBACK_MARCAS.find((m) => m.slug === slug)
}

export async function getProyectos(): Promise<ProyectoItem[]> {
  return FALLBACK_PROYECTOS
}

export async function getProyectoBySlug(slug: string): Promise<ProyectoItem | undefined> {
  return FALLBACK_PROYECTOS.find((p) => p.slug === slug)
}

async function resolveMediaRef(ref: unknown, cache: Map<string, MediaItem | null>): Promise<MediaItem | null> {
  if (!ref) return null
  if (typeof ref === 'object' && ref !== null && 'url' in ref) {
    return ref as MediaItem
  }
  const id = typeof ref === 'number' || typeof ref === 'string' ? String(ref) : ''
  if (!id || id.startsWith('/') || id.startsWith('http')) return null
  if (cache.has(id)) return cache.get(id) || null
  const media = await fetchPayload<MediaItem>(`media/${encodeURIComponent(id)}`)
  cache.set(id, media)
  return media
}

async function hydrateLexicalMedia(post: PostItem): Promise<PostItem> {
  const cache = new Map<string, MediaItem | null>()

  const children = post.content?.root?.children
  if (Array.isArray(children) && children.length > 0) {
    for (const node of children) {
      const rec = node as Record<string, unknown>
      if (rec.type === 'upload' && rec.value != null) {
        const populated = await resolveMediaRef(rec.value, cache)
        if (populated) rec.value = populated
      }
      if ((rec.type === 'block' || rec.type === 'inlineBlock') && typeof rec.fields === 'object' && rec.fields !== null) {
        const fields = rec.fields as Record<string, unknown>
        if (fields.image != null) {
          const populated = await resolveMediaRef(fields.image, cache)
          if (populated) fields.image = populated
        }
        if (fields.videoFile != null) {
          const populated = await resolveMediaRef(fields.videoFile, cache)
          if (populated) fields.videoFile = populated
        }
      }
    }
  }

  if (Array.isArray(post.dynamicBlocks) && post.dynamicBlocks.length > 0) {
    for (const block of post.dynamicBlocks) {
      if (block.image != null) {
        const populated = await resolveMediaRef(block.image, cache)
        if (populated) block.image = populated
      }
      if (block.videoFile != null) {
        const populated = await resolveMediaRef(block.videoFile, cache)
        if (populated) block.videoFile = populated
      }
    }
  }

  return post
}

// Blog: 5 entradas iniciales fijas (en orden exacto) + nuevas entradas dinámicas desde Payload CMS después
export async function getCategories(): Promise<CategoryItem[]> {
  const res = await fetchPayload<DocsResponse<CategoryItem>>('categories?limit=50')
  if (!res?.docs?.length) return FALLBACK_CATEGORIES
  const fixedSlugs = new Set(FALLBACK_CATEGORIES.map((c) => c.slug))
  const extra = res.docs.filter((c) => !fixedSlugs.has(c.slug))
  return [...FALLBACK_CATEGORIES, ...extra]
}

export async function getPosts(): Promise<PostItem[]> {
  const fixedSlugs = new Set(FALLBACK_POSTS.map((p) => p.slug))
  const res = await fetchPayload<DocsResponse<PostItem>>(
    'posts?where[status][equals]=published&sort=-publishedDate,-createdAt&limit=50&depth=2',
  )
  const dynamicPosts = (res?.docs || []).filter((p) => !fixedSlugs.has(p.slug))
  return [...dynamicPosts, ...FALLBACK_POSTS]
}

export async function getPostBySlug(slug: string): Promise<PostItem | undefined> {
  const fixed = FALLBACK_POSTS.find((p) => p.slug === slug)
  if (fixed) return fixed

  const res = await fetchPayload<DocsResponse<PostItem>>(
    `posts?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=2`,
  )
  if (res?.docs?.length) {
    return hydrateLexicalMedia(res.docs[0])
  }
  return undefined
}
