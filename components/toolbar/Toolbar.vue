<template>
  <div class="toolbar">
    <span @click="insertText('title1')" class="toolbar__option h1">
      <i class="fa fa-text-height toolbar__option__icon" aria-hidden="true" />
    </span>
    <span @click="insertText('title2')" class="toolbar__option h2">
      <i class="fa fa-text-height toolbar__option__icon" aria-hidden="true" />
    </span>
    <span @click="insertText('title3')" class="toolbar__option h3">
      <i class="fa fa-text-height toolbar__option__icon" aria-hidden="true" />
    </span>
    <span @click="insertText('title4')" class="toolbar__option h4">
      <i class=" fa fa-text-height toolbar__option__icon" aria-hidden="true" />
    </span>
    <span @click="insertText('title5')" class="toolbar__option h5">
      <i class="fa fa-text-height toolbar__option__icon" aria-hidden="true" />
    </span>
    <span @click="insertText('bold')" class="toolbar__option">
      <i class="fa fa-bold toolbar__option__icon" aria-hidden="true" />
    </span>
    <span @click="insertText('italic')" class="toolbar__option">
      <i class="fa fa-italic toolbar__option__icon" aria-hidden="true" />
    </span>
    <span @click="insertText('underline')" class="toolbar__option">
      <i class="fa fa-underline toolbar__option__icon" aria-hidden="true" />
    </span>
    <span @click="insertText('mark')" class="toolbar__option">
      <i class="fa fa-paint-brush toolbar__option__icon" aria-hidden="true" />
    </span>
    <span @click="insertText('quotation')" class="toolbar__option">
      <i class="fa fa-quote-left toolbar__option__icon" aria-hidden="true" />
    </span>
    <span @click="insertText('code')" class="toolbar__option">
      <i class="fa fa-code toolbar__option__icon" aria-hidden="true" />
    </span>
    <span @click="insertText('link')" class="toolbar__option">
      <i class="fa fa-link toolbar__option__icon" aria-hidden="true" />
    </span>
    <span @click="insertText('image')" class="toolbar__option">
      <i class="fa fa-picture-o toolbar__option__icon" aria-hidden="true" />
    </span>
    <span @click="insertText('ul')" class="toolbar__option">
      <i class="fa fa-list toolbar__option__icon" aria-hidden="true" />
    </span>
    <span @click="insertText('ol')" class="toolbar__option">
      <i class="fa fa-list-ol toolbar__option__icon" aria-hidden="true" />
    </span>
    <span @click="insertText('check')" class="toolbar__option">
      <i
        class="fa fa-check-square-o toolbar__option__icon"
        aria-hidden="true"
      />
    </span>
    <span @click="insertText('left')" class="toolbar__option">
      <i class="fa fa-align-left toolbar__option__icon" aria-hidden="true" />
    </span>
    <span @click="insertText('center')" class="toolbar__option">
      <i class="fa fa-align-center toolbar__option__icon" aria-hidden="true" />
    </span>
    <span @click="insertText('right')" class="toolbar__option">
      <i class="fa fa-align-right toolbar__option__icon" aria-hidden="true" />
    </span>
    <span @click="insertText('table')" class="toolbar__option">
      <i class="fa fa-table toolbar__option__icon" aria-hidden="true" />
    </span>
    <span class="toolbar__option">
      <Emoji
        :dom="dom"
        @updateContentFromToolbar="updateContentFromToolbar"
        class="toolbar__option__icon"
      />
    </span>
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
<style lang="scss" scoped>
.toolbar {
  @apply flex flex-wrap justify-end;

  &__option {
    @apply px-1 mr-1;
    @apply cursor-pointer;

    &:hover {
      @apply bg-base;
    }

    &__icon {
      @apply relative;
    }

    &.h1,
    &.h2,
    &.h3,
    &.h4,
    &.h5 {
      @apply flex flex-col justify-center;
    }

    &.h1 {
      font-size: 18px;
    }

    &.h2 {
      font-size: 16px;
    }

    &.h3 {
      font-size: 14px;
    }

    &.h4 {
      font-size: 12px;
    }

    &.h5 {
      font-size: 10px;
    }
  }
}
</style>
