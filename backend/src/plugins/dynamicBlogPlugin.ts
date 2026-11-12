import type { Block, CollectionConfig, Config, Field, Plugin } from 'payload'
import {
  BlockquoteFeature,
  BlocksFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  StrikethroughFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  labels: {
    singular: 'Imagen / Banner',
    plural: 'Imágenes / Banners',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Imagen',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Pie de foto (opcional)',
    },
    {
      name: 'width',
      type: 'select',
      defaultValue: 'normal',
      label: 'Ancho',
      options: [
        { label: 'Normal', value: 'normal' },
        { label: 'Ancho completo', value: 'wide' },
      ],
    },
  ],
}

export const VideoBlock: Block = {
  slug: 'videoBlock',
  labels: {
    singular: 'Video (YouTube o Archivo)',
    plural: 'Videos (YouTube o Archivo)',
  },
  fields: [
    {
      name: 'youtubeUrl',
      type: 'text',
      label: 'URL o ID de YouTube (o URL directa .mp4/.webm)',
    },
    {
      name: 'videoFile',
      type: 'upload',
      relationTo: 'media',
      label: 'O subir archivo de video (opcional)',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Título / Descripción (opcional)',
    },
  ],
}

export const CalloutBlock: Block = {
  slug: 'calloutBlock',
  labels: {
    singular: 'Bloque Destacado',
    plural: 'Bloques Destacados',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título destacado',
    },
    {
      name: 'text',
      type: 'textarea',
      required: true,
      label: 'Texto',
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'info',
      label: 'Estilo',
      options: [
        { label: 'Claro (Arena)', value: 'info' },
        { label: 'Acento (Azul Avintech)', value: 'accent' },
        { label: 'Oscuro (Carbón)', value: 'dark' },
      ],
    },
  ],
}

function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function extractPlainTextFromLexical(node: unknown): string {
  if (!node || typeof node !== 'object') return ''
  const record = node as Record<string, unknown>
  if (typeof record.text === 'string') return record.text
  if (Array.isArray(record.children)) {
    return record.children.map(extractPlainTextFromLexical).filter(Boolean).join(' ')
  }
  if (record.root) {
    return extractPlainTextFromLexical(record.root)
  }
  return ''
}

export interface DynamicBlogPluginOptions {
  collectionSlug?: string
  frontendUrl?: string
}

export const dynamicBlogPlugin =
  (options: DynamicBlogPluginOptions = {}): Plugin =>
  (incomingConfig: Config): Config => {
    const collectionSlug = options.collectionSlug || 'posts'
    const frontendUrl =
      options.frontendUrl || process.env.FRONTEND_URL || 'http://localhost:3000'

    const collections = (incomingConfig.collections || []).map((col): CollectionConfig => {
      if (col.slug !== collectionSlug) return col

      const richContentField = {
        name: 'content',
        type: 'richText' as const,
        label: 'Contenido dinámico del artículo',
        editor: lexicalEditor({
          features: () => [
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            BoldFeature(),
            ItalicFeature(),
            UnderlineFeature(),
            StrikethroughFeature(),
            UnorderedListFeature(),
            OrderedListFeature(),
            BlockquoteFeature(),
            LinkFeature(),
            UploadFeature({
              collections: {
                media: {
                  fields: [
                    {
                      name: 'caption',
                      type: 'text',
                      label: 'Pie de imagen',
                    },
                  ],
                },
              },
            }),
            BlocksFeature({
              blocks: [MediaBlock, VideoBlock, CalloutBlock],
            }),
          ],
        }),
      }

      const dynamicBlocksField: Field = {
        name: 'dynamicBlocks',
        type: 'blocks',
        label: 'Bloques dinámicos (Imagen, Video de YouTube, Bloque destacado)',
        labels: {
          singular: 'Bloque',
          plural: 'Bloques',
        },
        blocks: [MediaBlock, VideoBlock, CalloutBlock],
      }

      const existingFields = (col.fields || []).filter(
        (f) => !('name' in f && (f.name === 'content' || f.name === 'dynamicBlocks')),
      )

      // Insert richText 'content' + 'dynamicBlocks' right before 'contentHtml'
      const updatedFields: Field[] = existingFields.flatMap((f): Field[] => {
        if (f.type === 'textarea' && f.name === 'contentHtml') {
          return [
            richContentField,
            dynamicBlocksField,
            {
              ...f,
              required: false,
              admin: {
                ...(f.admin || {}),
                description: 'Respaldo HTML heredado (opcional si usas el editor visual arriba).',
                condition: (data: Record<string, unknown>) =>
                  Boolean(data?.contentHtml && !data?.content),
              },
            },
          ]
        }
        if (f.type === 'text' && f.name === 'slug') {
          return [
            {
              ...f,
              required: false,
              admin: {
                ...(f.admin || {}),
                description: 'Se genera automáticamente del título si se deja vacío.',
              },
            },
          ]
        }
        if (f.type === 'textarea' && f.name === 'excerpt') {
          return [
            {
              ...f,
              required: false,
              admin: {
                ...(f.admin || {}),
                description: 'Resumen breve (si se deja vacío se genera automáticamente).',
              },
            },
          ]
        }
        return [f]
      })

      return {
        ...col,
        admin: {
          ...col.admin,
          livePreview: {
            url: ({ data }) => {
              const slug = typeof data?.slug === 'string' ? data.slug : ''
              return slug ? `${frontendUrl}/blog/${slug}?preview=true` : `${frontendUrl}/blog`
            },
          },
          preview: (doc) => {
            const slug = typeof doc?.slug === 'string' ? doc.slug : ''
            return slug ? `${frontendUrl}/blog/${slug}?preview=true` : `${frontendUrl}/blog`
          },
        },
        hooks: {
          ...col.hooks,
          beforeValidate: [
            ...(col.hooks?.beforeValidate || []),
            ({ data }) => {
              if (!data) return data

              if ((!data.slug || String(data.slug).trim() === '') && data.title) {
                data.slug = slugify(String(data.title))
              } else if (data.slug) {
                data.slug = slugify(String(data.slug))
              }

              if (!data.publishedDate) {
                data.publishedDate = new Date().toISOString()
              }

              if ((!data.excerpt || String(data.excerpt).trim() === '') && data.content) {
                const plain = extractPlainTextFromLexical(data.content).replace(/\s+/g, ' ').trim()
                if (plain) {
                  const words = plain.split(' ')
                  data.excerpt =
                    words.length > 15 ? `${words.slice(0, 15).join(' ')}...` : plain
                }
              }

              return data
            },
          ],
        },
        fields: updatedFields,
      }
    })

    return {
      ...incomingConfig,
      admin: {
        ...incomingConfig.admin,
        livePreview: {
          ...incomingConfig.admin?.livePreview,
          breakpoints: [
            { label: 'Móvil', name: 'mobile', width: 390, height: 844 },
            { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
            { label: 'Escritorio', name: 'desktop', width: 1440, height: 900 },
          ],
        },
      },
      collections,
    }
  }
