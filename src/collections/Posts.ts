import { generateHTMLWithFootnotes } from '@/utils/generateHTMLWithFootnotes';
import type { CollectionConfig } from 'payload';

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
};

export default Posts;
