<template>
  <div class="container-page">
    <div v-if="isDataPending" class="loading">
      <span>
        Loading...
      </span>
    </div>
    <div v-else class="posts-list">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <nuxt-link :to="`/posts/${post.number}`">
          <p class="post-card__title">
            {{ post.post.title }}
          </p>
          <p class="post-card__description">
            {{ post.post.description }}
          </p>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      posts: state => state.posts.list,
      isDataPending: state => state.posts.status.get.isPending
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

<style>
.post-card {
  border: 1px solid red;
  margin: 15px 0px;
  background: #ebf8ff;
}
</style>
