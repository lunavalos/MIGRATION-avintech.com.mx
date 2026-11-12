import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedDate', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      label: 'Extracto',
    },
    {
      name: 'contentHtml',
      type: 'textarea',
      required: true,
      label: 'Contenido (HTML)',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen destacada',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Categoría',
    },
    {
      name: 'authorName',
      type: 'text',
      defaultValue: 'Avintech',
      label: 'Autor',
    },
    {
      name: 'publishedDate',
      type: 'date',
      label: 'Fecha de publicación',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Publicado', value: 'published' },
        { label: 'Borrador', value: 'draft' },
      ],
    },
  ],
}
