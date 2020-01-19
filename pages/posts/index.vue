<template>
  <div class="container-page">
    <div class="posts-list">
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
import _ from 'lodash'

export default {
  data() {
    return {
      posts: []
    }
  },
  async mounted() {
    const publications = _.values(await this.getPosts())
    const formattedPosts = publications.map(p => ({
      ...p,
      post: {
        ...JSON.parse(p.title),
        content: p.body
      }
    }))
    this.posts = formattedPosts
  },
  methods: {
    getPosts() {
      return this.$axios.$get('issues')
    }
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
