<template>
  <div>
    <Loading v-if="isDataPending && !postProcessed" class="loading" />
    <ResourceNotFound
      v-else-if="Object.keys(post).length === 0 && !isDataPending"
      :error="error"
    />
    <div v-else-if="!isDataPending && postProcessed">
      <PostPublicPreview
        :post="customObjectPost"
        @handleReaction="handleReaction"
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'

import { mapState, mapActions } from 'vuex'
import { errorHandler } from '~/utils/validate-errors'
import { fnFilterPostLabels } from '~/utils/utils'
import { OMITTED_LABELS } from '~/data/default-data'

import ResourceNotFound from '~/components/ResourceNotFound.vue'
import Loading from '~/components/Loading.vue'
import PostPublicPreview from '~/components/post/PostPublicPreview.vue'

export default {
  layout: 'post',
  components: {
    ResourceNotFound,
    Loading,
    PostPublicPreview
  },
  data() {
    return {
      postNumber: null,
      error: {
        message: '404'
      },
      typePost: 'public',
      titlePage: ''
    }
  },
  computed: {
    ...mapState({
      posts: state => state.posts.publicList,
      isDataPending: state => state.posts.status.get.isPublicPending,
      author: state => state.posts.postView.author,
      post: state => state.posts.postView.post
    }),
    customObjectPost() {
      if (Object.keys(this.post).length > 0) {
        const formatDate = moment(this.post.created_at).format('MMM DD')
        const formatYear = moment(this.post.created_at).format('YYYY')

        const formatLabels = fnFilterPostLabels(
          OMITTED_LABELS[`${this.typePost}`],
          this.post.labels
        )

        const postCover = _.get(this.post.post, 'coverBlog', '').trim()
        const cover = !postCover ? '' : postCover

        return {
          ...this.post,
          titleHTML: this.post.post.titleHTML,
          descriptionHTML: this.post.post.descriptionHTML,
          contentHTML: this.post.post.contentHTML,
          cover,
          formatDate,
          formatYear,
          formatLabels
        }
      }
      return {}
    },
    postProcessed() {
      return Object.keys(this.post).length > 0
    }
  },
  asyncData({ params }) {
    return {
      postNumber: params.id
    }
  },
  mounted() {
    this.resetAuthorPostView()
    this.getPost(this.postNumber)
      .then(() => {
        this.updateAuthorPostView(this.post.user)
        this.titlePage = this.post.post.title
      })
      .catch(error => {
        this.error = { message: `${error}` }
        this.titlePage = errorHandler(this.error).message
      })
  },
  methods: {
    ...mapActions({
      handleReaction: 'posts/handleReaction',
      updateAuthorPostView: 'posts/updateAuthorPostView',
      resetAuthorPostView: 'posts/setAuthorPostViewPending',
      getPost: 'posts/getPost'
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
.loading {
  @apply pt-8;
}
</style>
