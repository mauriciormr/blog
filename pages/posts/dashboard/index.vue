<template>
  <div class="container-page">
    <div v-if="isDataPending" class="loading">
      <span>
        Loading...
      </span>
    </div>
    <div v-else class="posts-list">
      <nuxt-link to="/posts/dashboard/add">
        <span>Agregar</span>
      </nuxt-link>
      <div v-for="post in posts" :key="post.id" class="post-card">
        <nuxt-link :to="`/posts/dashboard/${post.number}`">
          <div v-html="post.post.titleHTML" class="post-card__title" />
          <div
            v-html="post.post.descriptionHTML"
            class="post-card__description"
          />
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
      posts: state => state.posts.privateList,
      isDataPending: state => state.posts.status.get.isPrivatePending
    })
  },
  async fetch({ store }) {
    await store.dispatch('posts/getPostsList', { type: 'private' })
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
