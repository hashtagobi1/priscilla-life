export default {
  name: 'social',
  title: 'Social Media',
  type: 'document',
  fields: [
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Instagram', value: 'Instagram' },
          { title: 'TikTok', value: 'TikTok' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'handle',
      title: 'Handle/Username',
      type: 'string',
      description: 'e.g., @priscilladinatoko',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'url',
      title: 'Profile URL',
      type: 'url',
      description: 'Full URL to the social media profile',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'followers',
      title: 'Followers',
      type: 'number',
      description: 'Current follower count (update manually)',
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


