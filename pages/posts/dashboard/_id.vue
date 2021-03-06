<template>
  <div class="container-page">
    <div v-if="isDataPending" class="loading">
      <span>
        Loading...
      </span>
    </div>
    <ResourceNotFound v-else-if="!post" :error="{ statusCode }" />
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

import { mapState, mapActions } from 'vuex'
import { responseCodesHandler } from '~/utils/validate-errors'
import ResourceNotFound from '~/components/ResourceNotFound.vue'

export default {
  components: {
    ResourceNotFound
  },
  data() {
    return {
      postNumber: null,
      titlePage: '',
      statusCode: 404
    }
  },
  computed: {
    ...mapState({
      posts: state => state.posts.privateList,
      isDataPending: state => state.posts.status.get.isPrivatePending,
      lang: state => state.lang.lang
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
    await store.dispatch('posts/getPostsList', { type: 'private' })
  },
  mounted() {
    this.titlePage = this.post
      ? this.post.post.title
      : responseCodesHandler(new Error(this.statusCode), this.lang).message
  },
  methods: {
    ...mapActions({
      handleReaction: 'posts/handleReaction'
    })
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
