<template>
  <div class="toolbar">
    <span @click="insertText('title1')" class="icon-toolbar">
      <span class="icon-toolbar__img" alt="Text titles">
        Title1
      </span>
    </span>
    <span @click="insertText('title2')" class="icon-toolbar">
      <span class="icon-toolbar__img" alt="Text titles">
        Title2
      </span>
    </span>
    <span @click="insertText('title3')" class="icon-toolbar">
      <span class="icon-toolbar__img" alt="Text titles">
        Title3
      </span>
    </span>
    <span @click="insertText('title4')" class="icon-toolbar">
      <span class="icon-toolbar__img" alt="Text titles">
        Title4
      </span>
    </span>
    <span @click="insertText('title5')" class="icon-toolbar">
      <span class="icon-toolbar__img" alt="Text titles">
        Title5
      </span>
    </span>
    <span @click="insertText('bold')" class="icon-toolbar">
      <img
        src="/img/icons/format-text-size.svg"
        class="icon-toolbar__img"
        alt="Text titles"
      />
    </span>
    <span @click="insertText('bold')" class="icon-toolbar">
      <img
        src="/img/icons/format-bold.svg"
        class="icon-toolbar__img"
        alt="Bold"
      />
    </span>
    <span @click="insertText('italic')" class="icon-toolbar">
      <img
        src="/img/icons/format-italic.svg"
        class="icon-toolbar__img"
        alt="Cursive"
      />
    </span>
    <span @click="insertText('underline')" class="icon-toolbar">
      <img
        src="/img/icons/format-underline.svg"
        class="icon-toolbar__img"
        alt="Underline"
      />
    </span>
    <span @click="insertText('mark')" class="icon-toolbar">
      <img
        src="/img/icons/bookmark.svg"
        class="icon-toolbar__img"
        alt="Remark"
      />
    </span>
    <span @click="insertText('quotation')" class="icon-toolbar">
      <img
        src="/img/icons/indent-increase.svg"
        class="icon-toolbar__img"
        alt="Quote"
      />
    </span>
    <span @click="insertText('code')" class="icon-toolbar">
      <img src="/img/icons/code.svg" class="icon-toolbar__img" alt="Code" />
    </span>
    <span @click="insertText('link')" class="icon-toolbar">
      <img src="/img/icons/link.svg" class="icon-toolbar__img" alt="Link" />
    </span>
    <span @click="insertText('image')" class="icon-toolbar">
      <img src="/img/icons/photo.svg" class="icon-toolbar__img" alt="Image" />
    </span>
    <span @click="insertText('ul')" class="icon-toolbar">
      <img
        src="/img/icons/list-bullet.svg"
        class="icon-toolbar__img"
        alt="List"
      />
    </span>
    <span @click="insertText('ol')" class="icon-toolbar">
      <img
        src="/img/icons/view-list.svg"
        class="icon-toolbar__img"
        alt="Number list"
      />
    </span>
    <span @click="insertText('check')" class="icon-toolbar">
      <img
        src="/img/icons/checkmark.svg"
        class="icon-toolbar__img"
        alt="Check"
      />
    </span>
    <span @click="insertText('left')" class="icon-toolbar">
      <img
        src="/img/icons/align-left.svg"
        class="icon-toolbar__img"
        alt="Align left"
      />
    </span>
    <span @click="insertText('center')" class="icon-toolbar">
      <img
        src="/img/icons/align-center.svg"
        class="icon-toolbar__img"
        alt="Align center"
      />
    </span>
    <span @click="insertText('right')" class="icon-toolbar">
      <img
        src="/img/icons/align-right.svg"
        class="icon-toolbar__img"
        alt="Align right"
      />
    </span>
    <span @click="insertText('table')" class="icon-toolbar">
      <img
        src="/img/icons/border-all.svg"
        class="icon-toolbar__img"
        alt="Table"
      />
    </span>
    <div class="icon-toolbar emoji">
      <Emoji :dom="dom" @updateContentFromToolbar="updateContentFromToolbar" />
    </div>
  </div>
</template>

<script>
import { txtInsert } from './toolbar-utils'
import Emoji from '~/components/toolbar/emoji-picker/Emoji.vue'

export default {
  components: {
    Emoji
  },
  props: {
    dom: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    insertText(type) {
      txtInsert(this.dom, type, this)
    },
    updateContentFromToolbar(content) {
      this.$emit('updateContentFromToolbar', content)
    }
  }
}
</script>
<style>
.toolbar {
  display: flex;
}
.icon-toolbar__img {
  width: 20px;
}
.icon-toolbar.emoji {
  position: relative;
}
.hljs-center {
  text-align: center;
}
.hljs-right {
  text-align: right;
}
.hljs-left {
  text-align: left;
}
</style>
