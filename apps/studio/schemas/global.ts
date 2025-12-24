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
      name: 'backgroundVideo',
      title: 'Background Video (Homepage)',
      type: 'object',
      description: 'Video that plays in the background of the homepage',
      fields: [
        {
          name: 'videoUrl',
          title: 'Video URL',
          type: 'url',
          description: 'URL to the video (YouTube, Vimeo, or direct video file)',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'posterImage',
          title: 'Poster Image (Optional)',
          type: 'image',
          description: 'Image shown before video loads',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'opacity',
          title: 'Video Opacity',
          type: 'number',
          description: 'Opacity level (0-100). Lower values make the video more subtle.',
          validation: (Rule: any) => Rule.min(0).max(100),
          initialValue: 30,
        },
      ],
    },
    {
      name: 'backgroundImages',
      title: 'Background Images',
      type: 'array',
      description: 'Images that float in the background of pages',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'layer',
              title: 'Layer',
              type: 'string',
              options: {
                list: [
                  { title: 'Background', value: 'background' },
                  { title: 'Foreground', value: 'foreground' },
                ],
              },
              initialValue: 'background',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'position',
              title: 'Position',
              type: 'string',
              options: {
                list: [
                  { title: 'Top Left', value: 'top-left' },
                  { title: 'Top Right', value: 'top-right' },
                  { title: 'Bottom Left', value: 'bottom-left' },
                  { title: 'Bottom Right', value: 'bottom-right' },
                  { title: 'Center', value: 'center' },
                ],
              },
              initialValue: 'center',
            },
            {
              name: 'opacity',
              title: 'Opacity',
              type: 'number',
              description: 'Opacity level (0-100)',
              validation: (Rule: any) => Rule.min(0).max(100),
              initialValue: 20,
            },
            {
              name: 'size',
              title: 'Size',
              type: 'string',
              options: {
                list: [
                  { title: 'Small', value: 'small' },
                  { title: 'Medium', value: 'medium' },
                  { title: 'Large', value: 'large' },
                ],
              },
              initialValue: 'medium',
            },
          ],
          preview: {
            select: {
              title: 'layer',
              media: 'image',
              position: 'position',
            },
            prepare({ title, media, position }: any) {
              return {
                title: `${title} - ${position || 'center'}`,
                media,
              }
            },
          },
        },
      ],
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


