import { DecoratorNode, LexicalNode } from 'lexical';

export type SerializedFootnoteNode = {
  id: string;
  content: string;
  type: 'footnote';
  version: 1;
};

export class FootnoteNode extends DecoratorNode<JSX.Element> {
  __id: string;
  __content: string;

  constructor(id: string, content: string, key?: string) {
    super(key);
    this.__id = id;
    this.__content = content;
  }

  static getType(): string {
    return 'footnote';
  }

  static clone(node: FootnoteNode): FootnoteNode {
    return new FootnoteNode(node.__id, node.__content, node.__key);
  }

  static importJSON(node: SerializedFootnoteNode): FootnoteNode {
    return new FootnoteNode(node.id, node.content);
  }

  exportJSON(): SerializedFootnoteNode {
    return {
      id: this.__id,
      content: this.__content,
      type: 'footnote',
      version: 1,
    };
  }

  createDOM(): HTMLElement {
    const sup = document.createElement('sup');
    sup.textContent = `[${this.__id}]`;
    sup.onclick = () => alert(this.__content);
    return sup;
  }

  updateDOM(): false {
    return false;
  }

  decorate(): JSX.Element {
    return (
      <sup style={{ cursor: 'pointer' }} onClick={() => alert(this.__content)}>
        [{this.__id}]
      </sup>
    );
  }
}

export function $createFootnoteNode(id: string, content: string): FootnoteNode {
  return new FootnoteNode(id, content);
}
