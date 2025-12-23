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
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
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


