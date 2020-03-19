<template>
  <div class="modal-delete">
    <div class="modal-delete__content">
      <button @click="closeModal" class="modal-delete__close">
        <i class="fa fa-times-circle" aria-hidden="true" />
      </button>
      <Loading v-if="isDataPending || isDataFulfilled" class="loading" />
      <div v-else>
        <div class="modal-delete__post">
          <div class="modal-delete__post__message">
            <span>
              {{ LABELS_COMPONENTS.modalDeletePostMessage }}
            </span>
          </div>
          <div v-html="post.post.titleHTML" class="modal-delete__post__title" />
          <div
            v-html="post.post.descriptionHTML"
            class="modal-delete__post__description"
          />
        </div>
        <div class="modal-delete__actions">
          <button @click="closeModal" class="button-secondary --big">
            {{ LABELS_COMPONENTS.modalDeleteActionsCancel }}
          </button>
          <button @click="deletePost(post.number)" class="button-primary --big">
            {{ LABELS_COMPONENTS.modalDeleteActionsDelete }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'

import Loading from '~/components/Loading.vue'

export default {
  components: {
    Loading
  },
  props: {
    post: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  computed: {
    ...mapState({
      isDataPending: state => state.posts.status.delete.isPending,
      isDataFulfilled: state => state.posts.status.delete.isFulfilled,
      LABELS: state => state.lang.labels
    }),
    LABELS_COMPONENTS() {
      return _.get(this.LABELS, 'components.modalDeletePost', {})
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    deletePost(number) {
      this.$emit('deletePost', number)
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  @apply py-4;
}

.modal-delete {
  @apply fixed;
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
    top: 20%;
    left: 50%;
    transform: translate(-50%, -20%);
  }

  &__close {
    @apply w-full text-right text-2xl;
  }

  &__post {
    &__message {
      @apply text-secondary;
      @apply mb-4;
    }

    &__title,
    &__description {
      @apply font-poppins truncate text-sm;
    }

    &__title {
      @apply text-primary font-medium pb-1;
    }

    &__description {
      @apply text-secondary;
    }
  }

  &__actions {
    @apply flex justify-end;
    @apply mt-12;

    [class^='button-'] {
      @apply ml-2;
    }
  }
}

@screen laptop {
  .modal-delete {
    &__content {
      @apply w-5/12;
    }
  }
}
</style>
