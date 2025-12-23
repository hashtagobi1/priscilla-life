export default {
  name: 'social',
  title: 'Social Media',
  type: 'document',
  fields: [
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
    },
    {
      name: 'followers',
      title: 'Followers',
      type: 'number',
    },
    {
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'recentPosts',
      title: 'Recent Posts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', type: 'image' },
            { name: 'caption', type: 'text' },
            { name: 'url', type: 'url' },
          ],
        },
      ],
    },
  ],
}


