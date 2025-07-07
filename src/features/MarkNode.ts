// src/features/highlight/MarkNode.ts
import {
  ElementNode,
  LexicalEditor,
  NodeKey,
  Spread,
  SerializedElementNode,
} from 'lexical';

export type SerializedMarkNode = Spread<
  {
    type: 'mark';
    version: 1;
  },
  SerializedElementNode
>;

export class MarkNode extends ElementNode {
  static getType(): string {
    return 'mark';
  }

  static clone(node: MarkNode): MarkNode {
    return new MarkNode(node.__key);
  }

  createDOM(): HTMLElement {
    return document.createElement('mark');
  }

  updateDOM(): false {
    return false;
  }

  static importJSON(serializedNode: SerializedMarkNode): MarkNode {
    const node = new MarkNode();
    node.setFormat(serializedNode.format);
    return node;
  }

  exportJSON(): SerializedMarkNode {
    return {
      ...super.exportJSON(),
      type: 'mark',
      version: 1,
    };
  }

  static importDOM(): null {
    return null; // optional: define if you want to support pasting HTML with <mark>
  }

  decorate(): null {
    return null;
  }
}

export function $createMarkNode(): MarkNode {
  return new MarkNode();
}

export function $isMarkNode(node: unknown): node is MarkNode {
  return node instanceof MarkNode;
}
