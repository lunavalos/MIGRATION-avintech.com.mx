import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
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
    'http://127.0.0.1:3000',
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001',
    'http://127.0.0.1:3001',
  ],
  csrf: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://127.0.0.1:3000',
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001',
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
