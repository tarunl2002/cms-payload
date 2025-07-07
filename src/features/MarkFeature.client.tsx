'use client';

import React from 'react';
import {
  createClientFeature,
  toolbarFeatureButtonsGroupWithItems,
} from '@payloadcms/richtext-lexical/client';
import { $getSelection, $isRangeSelection } from 'lexical';
import { $wrapSelectionInMarkNode } from '@lexical/mark';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createMarkNode, MarkNode } from './MarkNode';

const MarkButton: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  const onClick = () => {
  editor.update(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection) || selection.isCollapsed()) return;

    const isBackward = selection.isBackward();
    const id = crypto.randomUUID(); // or any unique string identifier

    $wrapSelectionInMarkNode(selection, isBackward, id, (ids) => $createMarkNode(ids));
  });

  editor.focus();
};

  return (
    <button type="button" className="toolbar-popup__button" onClick={onClick} title="Highlight">
      H
    </button>
  );
};

export const MarkFeatureClientFeature = createClientFeature({
  nodes: [MarkNode],
  toolbarInline: {
    groups: [
      toolbarFeatureButtonsGroupWithItems([
        { key: 'markButton', label: 'Highlight', Component: MarkButton },
      ]),
    ],
  },
});
