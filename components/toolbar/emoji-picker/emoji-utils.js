// https://github.com/li-xiaoqing/perfect-markdown/blob/master/src/utils/insert.js
const emojiInsert = (ref, emoji, $vue) => {
  const textArea = ref()
  textArea.focus()
  const emojiContent = `${emoji}`
  let content = textArea.value // current value
  if ('selectionStart' in textArea) {
    const start = textArea.selectionStart
    content =
      content.substring(0, start) +
      `${emojiContent} ` +
      content.substring(start, content.length)

    const end = start + emojiContent.length
    $vue.$emit('updateContentFromToolbar', content)
    // https://stackoverflow.com/questions/47634258/what-is-nexttick-or-what-does-it-do-in-vuejs
    $vue.$nextTick(() => {
      textArea.setSelectionRange(end, end)
      textArea.focus()
    })
  } else {
    return new Error('The browser version is too low')
  }
}

export { emojiInsert }
