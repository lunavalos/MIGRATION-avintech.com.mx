import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from './payload.config'
import { htmlToLexicalState } from './utils/htmlToLexical'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const rootDir = path.resolve(dirname, '../..')

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase()
  switch (ext) {
    case '.png':
      return 'image/png'
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.webp':
      return 'image/webp'
    default:
      return 'application/octet-stream'
  }
}

async function seed() {
  const payload = await getPayload({ config })

  // 1. Admin user
  const existingUsers = await payload.find({
    collection: 'users',
    where: { email: { equals: 'admin@avintech.com.mx' } },
  })
  if (existingUsers.docs.length === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@avintech.com.mx',
        password: 'Avintech2026!',
        name: 'Administrador Avintech',
      },
    })
    console.log('Created admin user: admin@avintech.com.mx')
  }

  // 2. Upload helper for blog media
  const mediaCache = new Map<string, number>()
  async function ensureMedia(relativeFromRoot: string, alt: string) {
    const absPath = path.join(rootDir, relativeFromRoot)
    const fileName = path.basename(absPath)
    if (mediaCache.has(fileName)) return mediaCache.get(fileName)!

    const found = await payload.find({
      collection: 'media',
      where: { filename: { equals: fileName } },
      limit: 1,
    })
    if (found.docs.length > 0) {
      mediaCache.set(fileName, found.docs[0].id)
      return found.docs[0].id
    }

    if (!fs.existsSync(absPath)) {
      console.warn('Missing asset file:', absPath)
      return undefined
    }

    const data = fs.readFileSync(absPath)
    const created = await payload.create({
      collection: 'media',
      data: { alt },
      file: {
        data,
        mimetype: getMimeType(absPath),
        name: fileName,
        size: data.byteLength,
      },
    })
    mediaCache.set(fileName, created.id)
    console.log('Uploaded blog media:', fileName)
    return created.id
  }

  // 3. Seed Blog Categories
  const categoriesData = [
    { name: 'Comercial', slug: 'comercial' },
    { name: 'Corporativo', slug: 'corporativo' },
    { name: 'Industrial', slug: 'industrial' },
    { name: 'Residencial', slug: 'residencial' },
    { name: 'Servicios Especializados', slug: 'servicios-especializados' },
  ]
  const catIdBySlug: Record<string, number> = {}
  for (const c of categoriesData) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: c.slug } },
      limit: 1,
    })
    if (existing.docs.length === 0) {
      const created = await payload.create({ collection: 'categories', data: c })
      catIdBySlug[c.slug] = created.id
    } else {
      catIdBySlug[c.slug] = existing.docs[0].id
    }
  }

  // 4. Seed Blog Posts with Lexical RichText content
  const postsJsonPath = path.join(rootDir, 'backend', 'src', 'seed-posts.json')
  if (fs.existsSync(postsJsonPath)) {
    const postsList = JSON.parse(fs.readFileSync(postsJsonPath, 'utf8'))
    for (const p of postsList) {
      const imgId = p.featuredImage
        ? await ensureMedia(`imagenes/${p.featuredImage}`, p.title)
        : undefined
      const existing = await payload.find({
        collection: 'posts',
        where: { slug: { equals: p.slug } },
        limit: 1,
      })
      const lexicalContent = htmlToLexicalState(p.contentHtml)
      const docData = {
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        content: lexicalContent as never,
        contentHtml: p.contentHtml,
        featuredImage: imgId,
        category: catIdBySlug[p.category.slug],
        authorName: 'Avintech',
        publishedDate: p.date,
        status: 'published' as const,
      }
      if (existing.docs.length === 0) {
        await payload.create({ collection: 'posts', data: docData })
      } else {
        await payload.update({ collection: 'posts', id: existing.docs[0].id, data: docData })
      }
    }
    console.log('Seeded 5 blog posts with Lexical richText')
  }

  console.log('Blog-only Payload CMS data seeded successfully!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
