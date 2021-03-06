<template>
  <div>
    <Loading v-if="isDataPending" class="loading" />
    <div v-else class="posts-list">
      <div v-if="posts.length === 0">
        <ResourceNotFound :error="error" />
      </div>
      <div v-else>
        <div class="admin-posts-list__pagination-head">
          <PaginationHead
            :elementsPerPage="elementsPerPage"
            class="admin-posts-list__pagination-head__select"
          />
        </div>
        <PostCard v-for="post in posts" :key="post.id" :post="post" />
        <PaginationBar :pages="pagesToPagination" class="pagination-bottom" />
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'

import { PAGINATION } from '~/data/default-data'
import { responseCodes } from '~/utils/validate-errors'
import PostCard from '~/components/post/PostCard.vue'
import PaginationHead from '~/components/post/PaginationHead.vue'
import PaginationBar from '~/components/post/PaginationBar.vue'
import Loading from '~/components/Loading.vue'
import ResourceNotFound from '~/components/ResourceNotFound.vue'

export default {
  layout: 'blog',
  watchQuery: ['tags', 'page', 'items'],
  components: {
    PostCard,
    Loading,
    ResourceNotFound,
    PaginationHead,
    PaginationBar
  },
  data() {
    return {
      error: {
        message: responseCodes.noContent.code
      },
      queryTags: '',
      elementsPerPage: _.get(
        _.find(PAGINATION.optionsElementsPerPage, 'selected'),
        'number'
      )
    }
  },
  computed: {
    ...mapState({
      posts: state => state.posts.publicList,
      countPosts: state => state.posts.countPublic,
      isDataPending: state => state.posts.status.get.isPublicPending,
      LABELS: state => state.lang.labels
    }),
    LABELS_PAGES() {
      return _.get(this.LABELS, 'pages.publicPublicationsList', {})
    },
    pagesToPagination() {
      const numberOfPages = Math.ceil(this.countPosts / this.elementsPerPage)
      let pages = []
      for (let i = 1; i <= numberOfPages; i++) {
        pages = [
          ...pages,
          {
            number: i,
            selected: i === +this.page
          }
        ]
      }
      return pages
    }
  },
  asyncData({ query }) {
    const q = _.get(query, 'tags', '')
    const p = _.get(query, 'page', 1)

    return {
      queryTags: (!q ? '' : q).split(','),
      page: !p ? 1 : p
    }
  },
  // https://nuxtjs.org/api/pages-fetch/#vuex
  async fetch({ query, store }) {
    const q = _.get(query, 'tags', '')
    const p = _.get(query, 'page', 1)

    const queryTags = (!q ? '' : q).split(',')
    const page = !p ? 1 : p

    await store.dispatch('posts/getPostsList', {
      type: 'public',
      page,
      tags: queryTags
    })
  },
  methods: {
    ...mapActions({
      getPostsList: 'posts/getPostsList'
    })
  },
  head() {
    return {
      title: _.get(this.LABELS_PAGES, 'titlePage', '')
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-posts-list {
  &__pagination-head {
    @apply flex justify-end items-center;
    @apply text-baseSize font-raleway text-secondary;
    @apply mb-4;

    &__select {
      @apply w-3/12;
    }
  }
}

@screen tablet {
  .admin-posts-list {
    &__pagination-head {
      &__select {
        @apply w-1/12;
      }
    }
  }
}
</style>
