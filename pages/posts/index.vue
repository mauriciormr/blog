<template>
  <div>
    <Loading v-if="isDataPending" class="loading" />
    <div v-else class="posts-list">
      <div v-if="postsToShow.length === 0">
        <ResourceNotFound :error="{ statusCode }" />
      </div>
      <div v-else>
        <div class="admin-posts-list__pagination-head">
          <div class="admin-posts-list__pagination-head__message">
            <span>{{ postsFiltered.length }} elements found</span>
          </div>
          <PaginationHead
            :elementsPerPage="elementsPerPage"
            class="admin-posts-list__pagination-head__select"
          />
        </div>
        <PostCard v-for="post in postsToShow" :key="post.id" :post="post" />
        <PaginationBar :pages="pagesToPagination" class="pagination-bottom" />
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'

import { PAGINATION } from '~/data/default-data'
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
      statusCode: 404,
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
      isDataPending: state => state.posts.status.get.isPublicPending
    }),
    postsFiltered() {
      let filters = []
      if (this.queryTags[0]) {
        const found = _.filter(this.posts, p => {
          const labelsJoined = _.map(p.labels, l => l.name.split(' ').join()) // ['', '']
          return _.find(this.queryTags, q => _.includes(labelsJoined, q))
        })
        filters = [...found]
      } else {
        filters = [...this.posts]
      }
      return filters
    },
    postsToShow() {
      const start = this.page * this.elementsPerPage - this.elementsPerPage
      const end = start + this.elementsPerPage

      return _.slice(this.postsFiltered, Math.max(start, 0), end)
    },
    pagesToPagination() {
      const numberOfPages = Math.ceil(
        this.postsFiltered.length / this.elementsPerPage
      )

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
    const i = _.get(query, 'items')

    const defaultItems = _.get(
      _.find(PAGINATION.optionsElementsPerPage, 'selected'),
      'number'
    )

    return {
      queryTags: (!q ? '' : q).split(','),
      page: !p ? 1 : p,
      elementsPerPage: !i ? defaultItems : +i
    }
  },
  mounted() {
    this.getPostsList()
  },
  methods: {
    ...mapActions({
      getPostsList: 'posts/getPostsList'
    })
  },
  head() {
    return {
      title: 'Publications'
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

    &__message {
      @apply mr-4;
    }

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
