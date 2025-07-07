'use client';

import React from 'react';
import {
  createClientFeature,
  toolbarFeatureButtonsGroupWithItems,
} from '@payloadcms/richtext-lexical/client';

import {
  $getSelection,
  $isRangeSelection,
  $createTextNode,
  $isTextNode,
} from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

const NoOpButton: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  const onClick = () => {
    editor.update(() => {
      const sel = $getSelection();
      if (!$isRangeSelection(sel)) return;

      const nodes = sel.getNodes().filter($isTextNode);
      if (nodes.length === 0) return;

      // Insert a new text node with <mark> raw HTML around the selection
      const text = sel.getTextContent();
      sel.insertRawText(`<mark>${text}</mark>`);
    });

    editor.focus();  // 1. keeps selection active
  };

  return (
    <button
      type="button"
      className="toolbar-popup__button"
      title="Highlight"
      onClick={onClick}
    >
      H
    </button>
  );
};

export const NoOpButtonClientFeature = createClientFeature({
  toolbarInline: {
    groups: [
      toolbarFeatureButtonsGroupWithItems([
        {
          key: 'noOpButton',
          label: 'Highlight',
          Component: NoOpButton,
        },
      ]),
    ],
  },
});
