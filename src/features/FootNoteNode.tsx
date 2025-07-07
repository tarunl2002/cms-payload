import {
  DecoratorNode,
  LexicalNode,
  SerializedLexicalNode,
  DOMExportOutput,
} from 'lexical';

type SerializedFootnoteNode = SerializedLexicalNode & {
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

  static getType() {
    return 'footnote';
  }

  static clone(node: FootnoteNode) {
    return new FootnoteNode(node.__id, node.__content, node.__key);
  }

  static importJSON(node: SerializedLexicalNode): LexicalNode {
    const { id, content } = node as SerializedFootnoteNode;
    return new FootnoteNode(id, content);
  }

  exportJSON(): SerializedFootnoteNode {
    return {
      type: 'footnote',
      version: 1,
      id: this.__id,
      content: this.__content,
    };
  }

  createDOM() {
    const sup = document.createElement('sup');
    sup.textContent = `[${this.__id}]`;
    sup.onclick = () => alert(this.__content);
    return sup;
  }

  updateDOM(): false {
    return false;
  }

  getId(): string {
    return this.__id
  }


  getContent(): string {
    return this.__content
  }


  // ✅ For live editor rendering
  decorate(): JSX.Element {
    return (
      <sup style={{ cursor: 'pointer' }} onClick={() => alert(this.__content)}>
        [{this.__id}]
      </sup>
    );
  }

  // ✅ For static HTML output (used by Payload CMS)
  exportDOM(): DOMExportOutput {
    const sup = document.createElement('sup');
    sup.innerHTML = `<a href="#footnote-${this.__id}" id="ref-${this.__id}">[${this.__id}]</a>`;
    return { element: sup };
  }
}
export function $createFootnoteNode(id: string, content: string) {
  return new FootnoteNode(id, content);
}

export function $isFootnoteNode(node: LexicalNode | null | undefined): node is FootnoteNode {
  return node instanceof FootnoteNode;
}

