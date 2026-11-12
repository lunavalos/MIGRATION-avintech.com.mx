export interface MediaItem {
  id?: string | number
  url?: string
  filename?: string
  alt?: string
  mimeType?: string
}

export interface ServicioItem {
  id: string | number
  title: string
  slug: string
  subtitle: string
  excerpt: string
  description: string
  secondaryDescription?: string
  features?: { text: string }[]
  heroImage?: MediaItem | string
  gallery?: { image: MediaItem | string }[]
  order?: number
  showOnHome?: boolean
}

export interface MarcaItem {
  id: string | number
  name: string
  slug: string
  description?: string
  logo?: MediaItem | string
  websiteUrl?: string
  order?: number
  showInFooter?: boolean
}

export interface CategoryItem {
  id?: string | number
  name: string
  slug: string
}

export interface DynamicBlockItem {
  id?: string
  blockType: 'mediaBlock' | 'videoBlock' | 'calloutBlock' | string
  image?: MediaItem | string | number
  videoFile?: MediaItem | string | number
  caption?: string
  width?: 'normal' | 'wide'
  youtubeUrl?: string
  title?: string
  text?: string
  style?: 'info' | 'accent' | 'dark'
}

export interface PostItem {
  id: string | number
  title: string
  slug: string
  excerpt: string
  content?: {
    root?: {
      children?: Array<Record<string, unknown>>
    }
  } | null
  dynamicBlocks?: DynamicBlockItem[]
  contentHtml?: string
  featuredImage?: MediaItem | string
  category?: CategoryItem | string
  authorName?: string
  publishedDate?: string
}

export interface ProyectoItem {
  id: string | number
  title: string
  slug: string
  year?: string
  description: string
  featuredImage?: MediaItem | string
  logo?: MediaItem | string
}

export interface SiteSettingsData {
  siteName: string
  logoLight?: MediaItem | string
  logoDark?: MediaItem | string
  creditsLogo?: MediaItem | string
  phones: { number: string }[]
  email: string
  address: string
  schedule: string
  copyrightText: string
  googleMapsEmbedUrl: string
  socialLinks: {
    facebook: string
    instagram: string
    tiktok: string
    youtube: string
  }
}

export interface HomePageData {
  heroTitlePrimary: string
  heroTitleSecondary: string
  heroCtaLabel: string
  heroCtaHref: string
  heroVideo?: MediaItem | string
  introEyebrow: string
  introHeading: string
  introParagraph1: string
  introParagraph2: string
  specialtiesTitle: string
  specialtiesCtaLabel: string
  whyUsTitle: string
  whyUsItems: { title: string; description: string; icon: string }[]
  bannerTitle: string
  bannerText: string
  bannerVideo?: MediaItem | string
  contactTitle: string
  contactSubtitle: string
  formTitle: string
  formSubtitle: string
}

export interface NosotrosPageData {
  pageTitle: string
  playlistTitle: string
  videos: { title: string; youtubeId: string; duration: string }[]
  valuesTitle: string
  valuesLead1: string
  valuesLead2: string
  values: { title: string; description: string }[]
  goalTitle: string
  goalParagraph1: string
  goalParagraph2: string
  processBlocks: {
    title: string
    subtitle?: string
    paragraph1: string
    paragraph2?: string
    image?: MediaItem | string
  }[]
}

export interface ServiciosPageData {
  pageTitle: string
  introParagraphs: { text: string }[]
}

export interface ContactoPageData {
  pageTitle: string
  subtitle: string
  mapEmbedUrl: string
}

export interface AvisoPrivacidadPageData {
  pageTitle: string
  introText: string
  sections: { heading: string; body: string }[]
  closing: string
}

const PAYLOAD_INTERNAL = process.env.PAYLOAD_INTERNAL_URL || process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://127.0.0.1:3001'
export const PAYLOAD_PUBLIC = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001'

export async function fetchPayload<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await fetch(`${PAYLOAD_INTERNAL}/api/${endpoint}`, {
      cache: 'no-store',
    })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

export function resolveMediaUrl(
  media: MediaItem | string | undefined | null,
  fallbackLocalPath: string,
): string {
  if (!media) return fallbackLocalPath
  if (typeof media === 'string') {
    if (media.startsWith('http') || media.startsWith('/')) return media
    return fallbackLocalPath
  }
  if (media.url) {
    if (media.url.startsWith('http')) return media.url
    if (media.url.startsWith('/api/media')) return `${PAYLOAD_PUBLIC}${media.url}`
    return media.url
  }
  return fallbackLocalPath
}
