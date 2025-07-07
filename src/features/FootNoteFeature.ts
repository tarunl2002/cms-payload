import { createServerFeature } from '@payloadcms/richtext-lexical';
import { FootnoteNode } from './FootNoteNode';

export const FootnoteFeature = createServerFeature({
  key: 'footnote',
  feature: {
    nodes: [{ node: FootnoteNode }],
    ClientFeature: './FootnoteFeature.client#FootnoteFeatureClientFeature',
  },
});
