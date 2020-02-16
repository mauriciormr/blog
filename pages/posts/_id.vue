<template>
  <div>
    <Loading v-if="isDataPending" class="loading" />
    <ResourceNotFound
      v-else-if="!post && !isDataPending"
      :error="{ statusCode }"
    />
    <div v-else class="post">
      <div class="post__reactions">
        <span
          v-for="reaction in post.reactions"
          :key="reaction.content"
          :class="[
            'post-reaction',
            reaction.userLoggedHasReaction ? 'active-reaction' : ''
          ]"
          @click="handleReaction({ number: post.number, reaction: reaction })"
        >
          <img :src="`/img/reactions/${reaction.content}.png`" />
          <span v-if="reaction.count > 0">
            {{ reaction.count }}
          </span>
        </span>
      </div>
      <div v-html="post.post.titleHTML" class="post__title" />
      <div v-html="post.post.descriptionHTML" class="post__description" />
      <div v-html="post.post.contentHTML" class="post__content" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

import { mapState, mapActions } from 'vuex'
import { errorHandler } from '~/utils/validate-errors'
import ResourceNotFound from '~/components/ResourceNotFound.vue'
import Loading from '~/components/Loading.vue'

export default {
  layout: 'post',
  components: {
    ResourceNotFound,
    Loading
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
      posts: state => state.posts.publicList,
      isDataPending: state => state.posts.status.get.isPublicPending
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
  mounted() {
    this.getPostsList().then(() => {
      if (this.post) {
        this.titlePage = this.post
          ? this.post.post.title
          : errorHandler(new Error(this.statusCode)).message
        this.updateAuthorPostView(this.post.user)
      }
    })
  },
  methods: {
    ...mapActions({
      handleReaction: 'posts/handleReaction',
      updateAuthorPostView: 'posts/updateAuthorPostView',
      getPostsList: 'posts/getPostsList'
    })
  },
  head() {
    return {
      title: this.titlePage
    }
  }
}
</script>

<style lang="scss" scoped>
.post__reactions {
  display: flex;
}
.active-reaction {
  border: 1px solid red;
}
</style>
