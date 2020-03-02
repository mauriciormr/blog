<template>
  <div class="modal-delete">
    <button @click="closeModal" class="modal-delete__close">
      <i class="fa fa-times-circle" aria-hidden="true" />
    </button>
    <div class="modal-delete__post">
      {{ post.number }}
    </div>
    <div class="modal-delete__actions">
      <button @click="deletePost(post.number)">
        Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  mounted() {},
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
.modal-delete {
  @apply p-4;
  @apply border border-divContainer rounded shadow bg-secondary;
  @apply w-11/12;

  &__close {
    @apply w-full text-right text-2xl;
  }
}

@screen laptop {
  .modal-delete {
    @apply w-5/12;
  }
}
</style>
