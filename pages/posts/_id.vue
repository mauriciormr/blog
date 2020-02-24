<template>
  <div>
    <Loading v-if="isDataPending && !postProcessed" class="loading" />
    <ResourceNotFound
      v-else-if="!post && !isDataPending"
      :error="{ statusCode }"
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
import ResourceNotFound from '~/components/ResourceNotFound.vue'
import Loading from '~/components/Loading.vue'
import PostPublicPreview from '~/components/post/PostPublicPreview.vue'
import { filterPostLabels } from '~/utils/utils'

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
      titlePage: '',
      statusCode: 404,
      customObjectPost: {},
      postProcessed: false
    }
  },
  computed: {
    ...mapState({
      posts: state => state.posts.publicList,
      isDataPending: state => state.posts.status.get.isPublicPending,
      author: state => state.posts.postView.author
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

        const formatDate = moment(this.post.created_at).format('MMM DD')
        const formatYear = moment(this.post.created_at).format('YYYY')

        const labelsOmitted = ['hidden']
        const formatLabels = filterPostLabels(labelsOmitted, this.post.labels)

        const postCover = _.get(this.post.post, 'coverBlog', '').trim()
        const cover = !postCover ? '' : postCover

        this.updateAuthorPostView(this.post.user)

        this.customObjectPost = {
          ...this.post,
          titleHTML: this.post.post.titleHTML,
          descriptionHTML: this.post.post.descriptionHTML,
          contentHTML: this.post.post.contentHTML,
          cover,
          formatDate,
          formatYear,
          formatLabels
        }
        this.postProcessed = true
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
.loading {
  @apply pt-8;
}
</style>
