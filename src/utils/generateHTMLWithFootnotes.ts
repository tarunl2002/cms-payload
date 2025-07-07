import {
  $getRoot,
  EditorState,
  LexicalEditor,
  LexicalNode,
} from 'lexical'
import { $generateHtmlFromNodes } from '@lexical/html'
import { $isElementNode, ElementNode } from 'lexical'
import { FootnoteNode, $isFootnoteNode } from '../features/FootNoteNode'

// ✅ Collect all footnote nodes from the editor state
function collectFootnotes(): { id: string; content: string }[] {
  const footnotes: { id: string; content: string }[] = []
  const visited = new Set<string>()

  const root = $getRoot()
  const descendants = root.getChildren() as LexicalNode[]

  function walk(node: LexicalNode) {
  if ($isFootnoteNode(node)) {
    const id = node.getId()
    if (!visited.has(id)) {
      visited.add(id)
      footnotes.push({ id, content: node.getContent() })
    }
  }

  if ($isElementNode(node)) {
    const children = node.getChildren()
    for (const child of children) {
      walk(child)
    }
  }
}

  descendants.forEach(walk)
  return footnotes
}

// ✅ Convert footnotes to <footer> HTML
function renderFootnotesFooter(footnotes: { id: string; content: string }[]): string {
  if (footnotes.length === 0) return ''

  const items = footnotes
    .map(
      (fn, index) => `
<li id="footnote-${index + 1}">
  ${fn.content} <a href="#ref-${index + 1}">↩</a>
</li>`
    )
    .join('\n')

  return `
<footer>
  <ul>
    ${items}
  </ul>
</footer>`
}

// ✅ Final export function: HTML body + footnote <footer>
export function generateHTMLWithFootnotes(
  editor: LexicalEditor,
  editorState: EditorState
): string {
  let html = ''
  let footnotes: { id: string; content: string }[] = []

  editorState.read(() => {
    html = $generateHtmlFromNodes(editor, null)
    footnotes = collectFootnotes()
  })

  const footerHTML = renderFootnotesFooter(footnotes)
  return html + footerHTML
}
