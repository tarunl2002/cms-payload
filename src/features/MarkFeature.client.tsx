'use client';
import React from 'react';
import {
  createClientFeature,
  toolbarFeatureButtonsGroupWithItems,
} from '@payloadcms/richtext-lexical/client';

import {
  $getSelection,
  $isRangeSelection,
} from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

// ✅ Use MarkNode utilities from @lexical/mark
import {
  MarkNode,
  $isMarkNode,
  $wrapSelectionInMarkNode,
} from '@lexical/mark';

const MarkButton: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  const onClick = () => {
  editor.update(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection) || selection.isCollapsed()) return;

    const nodes = selection.getNodes();

    const isAlreadyMarked = nodes.every((node) => {
      const parent = node.getParent();
      return parent && $isMarkNode(parent);
    });

    if (isAlreadyMarked) {
      nodes.forEach((node) => {
        const parent = node.getParent();
        if (parent && $isMarkNode(parent)) {
          const grandParent = parent.getParent();
          if (!grandParent) return;

          const markIndex = grandParent.getChildren().indexOf(parent);
          const markChildren = parent.getChildren();

          // Move children of <mark> into grandparent, replacing the <mark>
          grandParent.splice(markIndex, 1, markChildren);
        }
      });
    } else {
      const id = Math.random().toString(36).substring(2, 10);
      $wrapSelectionInMarkNode(selection, false, id);
    }
  });

  editor.focus();
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

// ✅ Register Lexical's built-in MarkNode
export const MarkFeatureClientFeature = createClientFeature({
  nodes: [MarkNode],
  toolbarInline: {
    groups: [
      toolbarFeatureButtonsGroupWithItems([
        {
          key: 'markButton',
          label: 'Highlight',
          Component: MarkButton,
        },
      ]),
    ],
  },
});
