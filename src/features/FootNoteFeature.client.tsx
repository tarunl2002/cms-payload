// src/features/footnote/FootnoteFeature.client.tsx
'use client';
import React from 'react';
import {
  createClientFeature,
  toolbarFeatureButtonsGroupWithItems,
} from '@payloadcms/richtext-lexical/client';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection } from 'lexical';
import { $createFootnoteNode, FootnoteNode } from './FootNoteNode';

const FootnoteButton: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  const onClick = () => {
    const id = Math.floor(Math.random() * 1000).toString();
    const content = window.prompt('Enter footnote content') || '';

    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const footnoteNode = $createFootnoteNode(id, content);
        console.log("Inserting footnote");
        selection.insertNodes([footnoteNode]);
      }
    });

    editor.focus();
  };

  return (
    <button
      type="button"
      className="toolbar-popup__button"
      title="Insert Footnote"
      onClick={onClick}
    >
      [Fn]
    </button>
  );
};

export const FootnoteFeatureClientFeature = createClientFeature({
  nodes: [FootnoteNode],
  toolbarInline: {
    groups: [
      toolbarFeatureButtonsGroupWithItems([
        {
          key: 'footnote-button',
          label: 'Footnote',
          Component: FootnoteButton,
        },
      ]),
    ],
  },
});
