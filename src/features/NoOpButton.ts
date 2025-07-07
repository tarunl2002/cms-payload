import { createServerFeature } from '@payloadcms/richtext-lexical';

export const NoOpButtonFeature = createServerFeature({
  key: 'noOpButton',
  feature: {
    ClientFeature: './NoOpButton.client#NoOpButtonClientFeature',
  },
});