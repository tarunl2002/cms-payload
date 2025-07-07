// src/features/highlight/MarkNode.ts
import {
  ElementNode,
  NodeKey,
  SerializedElementNode,
  Spread,
  EditorConfig,
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

  constructor(key?: NodeKey) {
    super(key);
  }

  createDOM(_config: EditorConfig): HTMLElement {
    return document.createElement('mark');
  }

  updateDOM(): false {
    return false;
  }

  exportJSON(): SerializedMarkNode {
    return {
      ...super.exportJSON(),
      type: 'mark',
      version: 1,
    };
  }

  static importJSON(): MarkNode {
    return new MarkNode();
  }

  decorate(): null {
    return null;
  }
}

// Export helper functions
export function $createMarkNode(): MarkNode {
  return new MarkNode();
}

export function $isMarkNode(node: unknown): node is MarkNode {
  return node instanceof MarkNode;
}
