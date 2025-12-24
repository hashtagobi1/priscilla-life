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
  ],
}


