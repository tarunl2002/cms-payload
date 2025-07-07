'use client';
import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  createClientFeature,
  toolbarFeatureButtonsGroupWithItems,
} from '@payloadcms/richtext-lexical/client';
import { $insertNodes, $getSelection, $isRangeSelection } from 'lexical';
import { $createFootnoteNode, FootnoteNode } from './FootNoteNode';

let count = 1;

const InsertFootnoteButton: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  const handleClick = () => {
    const content = prompt('Enter footnote content:');
    if (!content) return;

    editor.update(() => {
      const node = $createFootnoteNode(String(count++), content);
      $insertNodes([node]);
    });
  };

  return (
    <button onClick={handleClick} className="toolbar-popup__button" title="Insert Footnote">
      ⓕ
    </button>
  );
};

export const FootnoteFeatureClientFeature = createClientFeature({
  nodes: [FootnoteNode],
  toolbarInline: {
    groups: [
      toolbarFeatureButtonsGroupWithItems([
        {
          key: 'footnote',
          label: 'Footnote',
          Component: InsertFootnoteButton,
        },
      ]),
    ],
  },
});
