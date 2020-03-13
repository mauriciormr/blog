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
import { OMITTED_LABELS, POSTS_DATA } from '~/data/default-data'

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
    objectPostMetadata() {
      let host = ''

      // https://nuxtjs.org/faq/window-document-undefined/
      if (process.client) {
        host = window.location.hostname
      }

      if (Object.keys(this.post).length > 0) {
        const postCover = _.get(this.post.post, 'coverBlog', '').trim()
        return {
          title: this.post.post.title,
          description: this.post.post.description,
          coverMeta: !postCover ? POSTS_DATA.coverList : postCover,
          url: host
        }
      }

      return {
        title: '',
        description: '',
        coverMeta: POSTS_DATA.coverList,
        url: host
      }
    },
    postProcessed() {
      return Object.keys(this.post).length > 0
    }
  },
  asyncData({ params }) {
    const issue = /i(\d+)/.exec(params.id)[1]
    return {
      postNumber: issue
    }
  },
  mounted() {
    this.resetAuthorPostView()
    this.getPost({ type: 'public', postNumber: this.postNumber })
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
      title: this.titlePage,
      meta: [
        { hid: 'title', name: 'title', content: this.objectPostMetadata.title },
        {
          hid: 'description',
          name: 'description',
          content: this.objectPostMetadata.description
        },
        // Open Graph / Facebook
        { hid: 'og:url', name: 'og:url', content: this.objectPostMetadata.url },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.objectPostMetadata.title
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.objectPostMetadata.description
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.objectPostMetadata.coverMeta
        },
        // Twitter
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: this.objectPostMetadata.url
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.objectPostMetadata.title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.objectPostMetadata.description
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.objectPostMetadata.coverMeta
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  @apply pt-8;
}
</style>
