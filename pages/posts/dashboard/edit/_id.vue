<template>
  <AddEditPostEditor :typeAction="'edit'" :postNumber="postNumber" />
</template>

<script>
import AddEditPostEditor from '~/components/post/AddEditPostEditor.vue'

export default {
  layout: 'addEdit',
  components: {
    AddEditPostEditor
  },
  asyncData({ params }) {
    return {
      postNumber: params.id
    }
  }
}
</script>
<style></style>
