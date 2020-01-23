<template>
  <div class="container-page">
    <div v-if="isDataPending" class="loading">
      <span>
        Loading...
      </span>
    </div>
    <div v-else-if="!post">
      Resource not found
    </div>
    <div v-else class="post">
      <div class="post__reactions">
        <span
          v-for="reaction in post.reactions"
          :key="reaction.content"
          :class="[
            'post-reaction',
            reaction.userLoggedHasReaction ? 'active-reaction' : ''
          ]"
        >
          <img :src="`/img/reactions/${reaction.content}.png`" />
          <span v-if="reaction.count > 0">
            {{ reaction.count }}
          </span>
        </span>
      </div>
      <div v-html="post.post.titleHTML" class="post-card__title" />
      <div v-html="post.post.descriptionHTML" class="post-card__description" />
      <div v-html="post.post.contentHTML" class="post-card__content" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

import { mapState } from 'vuex'

export default {
  data() {
    return {
      postNumber: null,
      titlePage: ''
    }
  },
  computed: {
    ...mapState({
      posts: state => state.posts.list,
      isDataPending: state => state.posts.status.get.isPending
    }),
    post() {
      return _.find(this.posts, { number: +this.postNumber })
    }
  },
  asyncData({ params }) {
    return {
      postNumber: params.id
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('posts/getPostsList')
  },
  mounted() {
    if (this.post) {
      this.titlePage = this.post.post.title
    } else {
      this.titlePage = 'Resource not found'
    }
  },
  head() {
    return {
      title: this.titlePage
    }
  }
}
</script>

<style>
.post__reactions {
  display: flex;
}
.active-reaction {
  border: 1px solid red;
}
</style>
