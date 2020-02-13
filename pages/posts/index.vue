<template>
  <div>
    <div v-if="isDataPending" class="loading">
      <span>
        Loading...
      </span>
    </div>
    <div v-else class="posts-list">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PostCard from '~/components/post/PostCard.vue'

export default {
  layout: 'blog',
  components: { PostCard },
  computed: {
    ...mapState({
      posts: state => state.posts.publicList,
      isDataPending: state => state.posts.status.get.isPublicPending
    })
  },
  async fetch({ store }) {
    await store.dispatch('posts/getPostsList')
  },
  head() {
    return {
      title: 'Publications'
    }
  }
}
</script>

<style></style>
