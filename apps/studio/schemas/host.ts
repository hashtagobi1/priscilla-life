export default {
  name: 'host',
  title: 'Hosting & Events',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
    },
    {
      name: 'isShowreel',
      title: 'Use as Showreel (Hero Video)',
      type: 'boolean',
      description: 'Check this to display this video as the main showreel on the host page',
      initialValue: false,
    },
    {
      name: 'eventDate',
      title: 'Event Date',
      type: 'date',
    },
    {
      name: 'testimonial',
      title: 'Testimonial',
      type: 'text',
    },
    {
      name: 'media',
      title: 'Images & Videos',
      type: 'array',
      description: 'Additional images and videos for this event',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Media Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Image', value: 'image' },
                  { title: 'Video URL', value: 'video' },
                ],
              },
              initialValue: 'image',
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              hidden: ({ parent }: any) => parent?.type !== 'image',
            },
            {
              name: 'videoUrl',
              title: 'Video URL',
              type: 'url',
              hidden: ({ parent }: any) => parent?.type !== 'video',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
          preview: {
            select: {
              type: 'type',
              image: 'image',
              videoUrl: 'videoUrl',
              caption: 'caption',
            },
            prepare({ type, image, videoUrl, caption }: any) {
              return {
                title: caption || (type === 'image' ? 'Image' : 'Video'),
                subtitle: type === 'image' ? 'Image' : videoUrl || 'Video',
                media: type === 'image' ? image : undefined,
              }
            },
          },
        },
      ],
    },
  ],
}


