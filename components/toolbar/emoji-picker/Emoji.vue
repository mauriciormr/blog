<!-- https://github.com/DCzajkowski/vue-emoji-picker -->
<template>
  <emoji-picker :search="search" @emoji="insertEmoji">
    <span
      slot="emoji-invoker"
      slot-scope="{ events: { click: clickEvent } }"
      @click.stop="clickEvent"
      class="emoji-invoker"
    >
      <img
        src="/img/icons/mood-happy-outline.svg"
        class="icon-toolbar__img"
        alt="Emojis"
      />
    </span>
    <div slot="emoji-picker" slot-scope="{ emojis, insert }">
      <div class="emoji-picker">
        <div class="emoji-picker__search">
          <input v-model="search" type="text" />
        </div>
        <div>
          <div v-for="(emojiGroup, category) in emojis" :key="category">
            <h5>{{ category }}</h5>
            <div class="emojis">
              <span
                v-for="(emoji, emojiName) in emojiGroup"
                :key="emojiName"
                :title="emojiName"
                @click="insert(emoji)"
              >
                {{ emoji }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </emoji-picker>
</template>

<script>
import EmojiPicker from 'vue-emoji-picker'
import { emojiInsert } from './emoji-utils'

export default {
  components: {
    EmojiPicker
  },
  props: {
    dom: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      input: '',
      search: ''
    }
  },
  methods: {
    insertEmoji(emoji) {
      emojiInsert(this.dom, emoji, this)
    }
  }
}
</script>
<style>
.regular-input {
  border-radius: 3px;
  border: 1px solid #ccc;
}
.regular-input:focus {
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}
.emoji-invoker {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}
.emoji-invoker:hover {
  transform: scale(1.1);
}
.emoji-invoker > svg {
  fill: #b1c6d0;
}
.emoji-picker {
  position: absolute;
  z-index: 1;
  font-family: Montserrat;
  border: 1px solid #ccc;
  width: 15rem;
  height: 20rem;
  overflow: scroll;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 1px 1px 8px #c7dbe6;
}
.emoji-picker__search {
  display: flex;
}
.emoji-picker__search > input {
  flex: 1;
  border-radius: 10rem;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  outline: none;
}
.emoji-picker h5 {
  margin-bottom: 0;
  color: #b1b1b1;
  text-transform: uppercase;
  font-size: 0.8rem;
  cursor: default;
}
.emoji-picker .emojis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.emoji-picker .emojis:after {
  content: '';
  flex: auto;
}
.emoji-picker .emojis span {
  padding: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
}
.emoji-picker .emojis span:hover {
  background: #ececec;
  cursor: pointer;
}
</style>
