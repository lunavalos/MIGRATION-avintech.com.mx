import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import fs from 'fs'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Posts } from './collections/Posts'
import { ContactSubmissions } from './collections/ContactSubmissions'
import {
  CalloutBlock,
  MediaBlock,
  VideoBlock,
  dynamicBlogPlugin,
} from './plugins/dynamicBlogPlugin'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Auto-inicializar la BD y media en el volumen persistente si no existen
const databaseUri = process.env.DATABASE_URI || 'file:./avintech-blog.db'
if (databaseUri.startsWith('file:')) {
  const targetDbPath = path.resolve(databaseUri.replace(/^file:/, ''))
  const stats = fs.existsSync(targetDbPath) ? fs.statSync(targetDbPath) : null
  // Si no existe o tiene 0 bytes
  if (!stats || stats.size === 0) {
    const candidatePaths = [
      path.resolve(process.cwd(), 'avintech-blog.db'),
      path.resolve(process.cwd(), 'backend/avintech-blog.db'),
      path.resolve(dirname, '../avintech-blog.db'),
      path.resolve(dirname, '../../avintech-blog.db'),
      '/app/avintech-blog.db',
      '/app/backend/avintech-blog.db',
    ]
    const foundSource = candidatePaths.find((p) => fs.existsSync(p) && fs.statSync(p).size > 0)
    if (foundSource) {
      try {
        fs.mkdirSync(path.dirname(targetDbPath), { recursive: true })
        fs.copyFileSync(foundSource, targetDbPath)
        console.log(`[Payload Auto-Init] Base de datos inicial copiada de ${foundSource} a ${targetDbPath}`)
      } catch (e) {
        console.warn('[Payload Auto-Init] No se pudo copiar la base de datos inicial:', e)
      }
    }
  }
}

const mediaTarget = process.env.MEDIA_DIR
  ? path.resolve(process.env.MEDIA_DIR)
  : path.resolve(dirname, '../../media')
if (!fs.existsSync(mediaTarget)) {
  try {
    fs.mkdirSync(mediaTarget, { recursive: true })
    const defaultMedia = path.resolve(dirname, '../../media')
    if (fs.existsSync(defaultMedia) && defaultMedia !== mediaTarget) {
      fs.cpSync(defaultMedia, mediaTarget, { recursive: true, errorOnExist: false })
      console.log(`[Payload Auto-Init] Medios iniciales copiados a ${mediaTarget}`)
    }
  } catch (e) {
    console.warn('[Payload Auto-Init] No se pudo copiar la carpeta de medios inicial:', e)
  }
}

export default buildConfig({
  admin: {
    user: Users.slug,
    components: {
      Nav: './components/AdminNav',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  cors: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://new.avintech.com.mx',
    'https://avintech.com.mx',
    'https://www.avintech.com.mx',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001',
    'https://admin.avintech.com.mx',
    'http://127.0.0.1:3001',
  ],
  csrf: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://new.avintech.com.mx',
    'https://avintech.com.mx',
    'https://www.avintech.com.mx',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001',
    'https://admin.avintech.com.mx',
    'http://127.0.0.1:3001',
  ],
  collections: [
    Posts,
    Categories,
    Media,
    ContactSubmissions,
    Users,
  ],
  blocks: [MediaBlock, VideoBlock, CalloutBlock],
  plugins: [
    dynamicBlogPlugin({
      collectionSlug: 'posts',
      frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    }),
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'avintech-payload-secret-key-2026',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./avintech-blog.db',
    },
  }),
  sharp,
})
