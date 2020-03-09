<template>
  <div class="modal-preview">
    <div class="modal-preview__content">
      <button @click="closeModal" class="modal-preview__close">
        <i class="fa fa-times-circle" aria-hidden="true" />
      </button>
      <div class="cards">
        <div class="facebook modal-preview__container">
          <div
            :style="`background-image: url('${cover}')`"
            class="modal-preview__container__cover"
          />
          <div class="modal-preview__container__information">
            <span class="modal-preview__container__information__url">
              exampleurl.io
            </span>
            <span class="modal-preview__container__information__title">
              {{ title }}
            </span>
            <span class="modal-preview__container__information__description">
              {{ description }}
            </span>
          </div>
        </div>
        <div class="twitter modal-preview__container">
          <div
            :style="`background-image: url('${cover}')`"
            class="modal-preview__container__cover"
          />
          <div class="modal-preview__container__information">
            <span class="modal-preview__container__information__title">
              {{ title }}
            </span>
            <span class="modal-preview__container__information__description">
              {{ description }}
            </span>
            <span class="modal-preview__container__information__url">
              exampleurl.io
            </span>
          </div>
        </div>
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
    },
    title: {
      type: String,
      required: true,
      default: 'Example title'
    },
    description: {
      type: String,
      required: true,
      default: 'Example description'
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
  @apply fixed overflow-auto;
  @apply bg-ternary;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);

  &__content {
    @apply p-4;
    @apply border border-divContainer rounded shadow bg-secondary;
    @apply w-11/12;
    @apply absolute;
    left: 50%;
    top: 15%;
    transform: translate(-50%, 0%);
  }

  &__close {
    @apply w-full text-right text-2xl;
  }

  &__container {
    @apply border border-divContainer rounded;
    @apply mb-4;
    font-family: Helvetica, Arial, sans-serif;

    &__cover {
      @apply bg-local bg-center bg-no-repeat bg-cover;
      @apply h-40;
    }

    &__information {
      @apply border-t border-divContainer bg-base;
      @apply flex flex-col;
      @apply px-4 py-2 text-sm leading-normal;

      &__url {
        @apply uppercase text-xs;
      }

      &__title {
        @apply text-primary font-semibold truncate;
        @apply m-0;
      }

      &__url,
      &__description {
        @apply text-secondary truncate;
      }
    }
  }

  &__container[class*='twitter'] {
    [class$='information'] {
      @apply bg-secondary;
    }

    [class$='title'] {
      @apply font-normal;
    }

    [class$='url'] {
      @apply hidden lowercase;
    }
  }
}

@screen laptop {
  .modal-preview {
    &__content {
      @apply w-5/12;
    }
  }

  .modal-preview {
    &__container {
      &__cover {
        @apply h-64;
      }

      &__information {
        @apply text-baseSize;
      }
    }

    &__container[class*='twitter'] {
      [class$='url'] {
        @apply block;
      }

      [class$='title'] {
        @apply font-semibold;
      }
    }
  }
}
</style>
