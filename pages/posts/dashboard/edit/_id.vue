<template>
  <div class="container-page">
    <AddEditPostEditor :typeAction="'edit'" :postNumber="postNumber" />
  </div>
</template>

<script>
import AddEditPostEditor from '~/components/post/AddEditPostEditor.vue'

export default {
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
