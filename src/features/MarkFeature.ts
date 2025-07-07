// src/features/highlight/MarkFeature.ts
import { createServerFeature } from '@payloadcms/richtext-lexical';
import { MarkNode } from './MarkNode';
console.log('MarkNode server:', MarkNode);
export const MarkFeature = createServerFeature({
  key: 'mark',
  feature: {
    nodes: [{ node: MarkNode }],
    ClientFeature: './MarkFeature.client#MarkFeatureClientFeature',
  },
});
