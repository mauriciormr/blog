<template>
  <div class="modal-preview">
    <button @click="closeModal">
      X
    </button>
    <div class="facebook modal-preview__container">
      <div class="preview__cover">
        <img :src="`${cover}`" alt="Facebook preview" />
      </div>
      <div class="preview__information">
        <span class="preview__information__url">localhost.com</span>
        <h4 class="preview__information__title">
          Title publication
        </h4>
        <span class="preview__information__description">Description</span>
      </div>
    </div>
    <div class="twitter modal-preview__container">
      <div class="preview__cover">
        <img :src="`${cover}`" alt="Facebook preview" />
      </div>
      <div class="preview__information">
        <h4 class="preview__information__title">
          Title publication
        </h4>
        <span class="preview__information__description">Description</span>
        <span class="preview__information__url">localhost.com</span>
      </div>
    </div>
  </div>
</template>

<script>
import { POSTS_DATA } from '~/data/default-data'

export default {
  props: {
    coverCEO: {
      type: String,
      required: true,
      default: POSTS_DATA.coverCEO
    }
  },
  data() {
    return {
      cover: ''
    }
  },
  mounted() {
    this.cover = !this.coverCEO ? POSTS_DATA.coverCEO : this.coverCEO
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-preview {
  @apply p-4;
  @apply border border-divContainer rounded shadow bg-secondary;
}

.modal-preview__container {
  @apply border border-divContainer rounded;

  img {
    height: 200px;
  }

  .preview__information {
    background: #f2f3f5;
    @apply border-t border-divContainer;
    @apply flex flex-col;

    &__title {
      @apply text-primary font-semibold;
    }

    &__url,
    &__description {
      @apply text-secondary;
    }

    &__description {
    }
  }
}
</style>
