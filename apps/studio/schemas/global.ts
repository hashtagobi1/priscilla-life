export default {
  name: 'global',
  title: 'Global Settings',
  type: 'document',
  fields: [
    {
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
    },
    {
      name: 'bio',
      title: 'Bio (Homepage)',
      type: 'text',
      description: 'A short paragraph about Priscilla that appears on the homepage',
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Instagram', value: 'Instagram' },
                  { title: 'TikTok', value: 'TikTok' },
                ],
              },
            },
            { name: 'url', type: 'url' },
          ],
        },
      ],
    },
  ],
}


