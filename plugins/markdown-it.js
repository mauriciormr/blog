import markdownIt from 'markdown-it'
import hljs from 'highlight.js'
import emoji from 'markdown-it-emoji'
import hlHtml from 'highlight.js/lib/languages/xml.js'
import hlCss from 'highlight.js/lib/languages/css.js'
import hlPhp from 'highlight.js/lib/languages/php.js'
import hlJavascript from 'highlight.js/lib/languages/javascript.js'
import hlJson from 'highlight.js/lib/languages/json.js'
import hlBash from 'highlight.js/lib/languages/bash.js'
import container from 'markdown-it-container'
import marked from 'markdown-it-mark'
import checkbox from 'markdown-it-task-checkbox'
import ins from 'markdown-it-ins'
import tableContents from 'markdown-it-table-of-contents'
import anchor from 'markdown-it-anchor'
import stringPackage from 'string'
import 'highlight.js/styles/rainbow.css'

hljs.registerLanguage('html', hlHtml)
hljs.registerLanguage('css', hlCss)
hljs.registerLanguage('javascript', hlJavascript)
hljs.registerLanguage('json', hlJson)
hljs.registerLanguage('bash', hlBash)
hljs.registerLanguage('php', hlPhp)

export default ({ app }, inject) => {
  const mark = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    highlight(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre class='hljs'><code>${
            hljs.highlight(lang, str, true).value
          }</code></pre>`
        } catch (error) {
          return error
        }
      }
      return `<pre class='hljs'><code>${mark.utils.escapeHtml(
        str
      )}</code></pre>`
    }
  })

  // https://www.npmjs.com/package/markdown-it-anchor#user-friendly-urls
  const slugify = s =>
    stringPackage(s)
      .slugify()
      .toString()

  mark.use(emoji)
  mark.use(marked)
  mark.use(ins)
  mark.use(anchor, { slugify })
  // https://www.npmjs.com/package/markdown-it-table-of-contents#options
  mark.use(tableContents, { slugify })
  mark.use(container, 'hljs-left')
  mark.use(container, 'hljs-center')
  mark.use(container, 'hljs-right')
  mark.use(checkbox, {
    disabled: true,
    divWrap: false,
    divClass: 'checkbox',
    idPrefix: 'cbx_',
    ulClass: 'task-list',
    liClass: 'task-list-item'
  })

  inject('markdownit', mark)
}
