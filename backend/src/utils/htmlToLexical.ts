interface LexicalTextNode {
  type: 'text'
  text: string
  format: number
  mode: 'normal'
  style: string
  detail: number
  version: 1
}

interface LexicalLinebreakNode {
  type: 'linebreak'
  version: 1
}

interface LexicalLinkNode {
  type: 'link'
  fields: {
    linkType: 'custom'
    url: string
    newTab: boolean
  }
  format: ''
  indent: 0
  version: 3
  direction: 'ltr'
  children: Array<LexicalTextNode | LexicalLinebreakNode>
}

type InlineNode = LexicalTextNode | LexicalLinebreakNode | LexicalLinkNode

function decodeEntities(str: string): string {
  return str
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8217;/g, "'")
    .replace(/&#038;/g, '&')
}

function parseInlineHtml(html: string, baseFormat = 0): InlineNode[] {
  const nodes: InlineNode[] = []
  const tokenRegex = /(<strong[^>]*>|<\/strong>|<b[^>]*>|<\/b>|<em[^>]*>|<\/em>|<i[^>]*>|<\/i>|<br\s*\/?>|<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>)/gi

  let lastIndex = 0
  let bold = (baseFormat & 1) !== 0
  let italic = (baseFormat & 2) !== 0

  let match: RegExpExecArray | null
  while ((match = tokenRegex.exec(html)) !== null) {
    if (match.index > lastIndex) {
      const text = decodeEntities(html.slice(lastIndex, match.index).replace(/<[^>]+>/g, ''))
      if (text) {
        nodes.push({
          type: 'text',
          text,
          format: (bold ? 1 : 0) | (italic ? 2 : 0),
          mode: 'normal',
          style: '',
          detail: 0,
          version: 1,
        })
      }
    }

    const token = match[1].toLowerCase()
    if (token.startsWith('<strong') || token.startsWith('<b')) {
      bold = true
    } else if (token === '</strong>' || token === '</b>') {
      bold = false
    } else if (token.startsWith('<em') || token.startsWith('<i')) {
      italic = true
    } else if (token === '</em>' || token === '</i>') {
      italic = false
    } else if (token.startsWith('<br')) {
      nodes.push({ type: 'linebreak', version: 1 })
    } else if (token.startsWith('<a')) {
      const url = match[2] || '#'
      const innerHtml = match[3] || ''
      const newTab = /target=["']_blank["']/i.test(match[1])
      const linkChildren = parseInlineHtml(innerHtml, (bold ? 1 : 0) | (italic ? 2 : 0)).filter(
        (n): n is LexicalTextNode | LexicalLinebreakNode => n.type !== 'link',
      )
      if (linkChildren.length > 0) {
        nodes.push({
          type: 'link',
          fields: {
            linkType: 'custom',
            url,
            newTab,
          },
          format: '',
          indent: 0,
          version: 3,
          direction: 'ltr',
          children: linkChildren,
        })
      }
    }

    lastIndex = tokenRegex.lastIndex
  }

  if (lastIndex < html.length) {
    const tail = decodeEntities(html.slice(lastIndex).replace(/<[^>]+>/g, ''))
    if (tail) {
      nodes.push({
        type: 'text',
        text: tail,
        format: (bold ? 1 : 0) | (italic ? 2 : 0),
        mode: 'normal',
        style: '',
        detail: 0,
        version: 1,
      })
    }
  }

  return nodes
}

export function htmlToLexicalState(html: string) {
  const children: Record<string, unknown>[] = []
  const blockRegex = /<(p|h2|h3|h4|ul)[^>]*>([\s\S]*?)<\/\1>/gi

  let match: RegExpExecArray | null
  while ((match = blockRegex.exec(html)) !== null) {
    const tag = match[1].toLowerCase()
    const inner = match[2].trim()

    if (tag === 'p') {
      const inline = parseInlineHtml(inner)
      if (inline.length === 0) continue
      children.push({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        textFormat: 0,
        textStyle: '',
        children: inline,
      })
    } else if (tag === 'h2' || tag === 'h3' || tag === 'h4') {
      const inline = parseInlineHtml(inner)
      if (inline.length === 0) continue
      children.push({
        type: 'heading',
        tag,
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        children: inline,
      })
    } else if (tag === 'ul') {
      const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi
      const listItems: Record<string, unknown>[] = []
      let liMatch: RegExpExecArray | null
      let idx = 1
      while ((liMatch = liRegex.exec(inner)) !== null) {
        const inline = parseInlineHtml(liMatch[1].trim())
        if (inline.length > 0) {
          listItems.push({
            type: 'listitem',
            value: idx++,
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: inline,
          })
        }
      }
      if (listItems.length > 0) {
        children.push({
          type: 'list',
          listType: 'bullet',
          tag: 'ul',
          start: 1,
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          children: listItems,
        })
      }
    }
  }

  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children,
    },
  }
}
