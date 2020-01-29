import iconConfig from './toolbar-options'

// https://github.com/li-xiaoqing/perfect-markdown/blob/master/src/utils/insert.js
const txtInsert = (ref, type, $vue) => {
  const textArea = ref()
  textArea.focus()
  let content = textArea.value // current value
  if ('selectionStart' in textArea) {
    const start = textArea.selectionStart
    const end = textArea.selectionEnd
    const prefix = iconConfig[type].prefix
    const subfix = iconConfig[type].subfix
    const prefixLen = iconConfig[type].prefix.length
    const subfixLen = iconConfig[type].subfix.length
    let newStart = 0
    let newEnd = 0
    if (start === end) {
      content =
        content.substring(0, start) +
        `${prefix}${iconConfig[type].txt}${subfix}` +
        content.substring(end, content.length)
      newStart = start + prefixLen
      newEnd = newStart + iconConfig[type].txt.length
    } else if (
      content.substring(start - prefixLen, start) === prefix &&
      content.substring(end, end + subfixLen) === subfix
    ) {
      // cancel
      content =
        content.substring(0, start - prefixLen) +
        content.substring(start, end) +
        content.substring(end + subfixLen, content.length)
      newStart = start - prefixLen
      newEnd = end - prefixLen
    } else {
      content =
        content.substring(0, start) +
        prefix +
        content.substring(start, end) +
        subfix +
        content.substring(end + subfixLen, content.length)
      newStart = start + prefixLen
      newEnd = start + (end - start + prefixLen)
    }
    $vue.$emit('updateContentFromToolbar', content)
    // https://stackoverflow.com/questions/47634258/what-is-nexttick-or-what-does-it-do-in-vuejs
    $vue.$nextTick(() => {
      textArea.setSelectionRange(newStart, newEnd)
      textArea.focus()
    })
  } else {
    return new Error('The browser version is too low')
  }
}

export { txtInsert }
