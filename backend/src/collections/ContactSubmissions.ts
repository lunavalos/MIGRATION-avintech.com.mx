import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    hidden: true,
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'phone', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      label: 'Nombre Completo',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Teléfono',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Mensaje',
    },
    {
      name: 'interests',
      type: 'select',
      hasMany: true,
      label: 'Estoy Interesado en',
      options: [
        { label: 'Audio/Video', value: 'Audio/Video' },
        { label: 'Redes', value: 'Redes' },
        { label: 'Iluminación', value: 'Iluminación' },
        { label: 'Seguridad', value: 'Seguridad' },
        { label: 'Control', value: 'Control' },
      ],
    },
  ],
}
