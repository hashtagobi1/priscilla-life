export default {
  name: 'food',
  title: 'Food Portfolio',
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
      name: 'media',
      title: 'Images & Videos',
      type: 'array',
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
    {
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
    },
  ],
}


