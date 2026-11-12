import React from 'react'
import { BlogGrid } from '@/components/BlogGrid'
import { getCategories, getPosts } from '@/lib/cms'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Blog - Avintech',
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()])

  return (
    <section className="av-section">
      <div className="av-container">
        <h1 className="av-page-title">Blog</h1>
        <BlogGrid posts={posts} categories={categories} />
      </div>
    </section>
  )
}
