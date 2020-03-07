<template>
  <div>
    <Loading v-if="isDataPending" class="loading" />
    <div v-else class="posts-list">
      <div v-if="postsToShow.length === 0">
        <ResourceNotFound :error="{ statusCode }" />
      </div>
      <div v-else>
        <PostCard v-for="post in postsToShow" :key="post.id" :post="post" />
        <PaginationBar :pages="pagesToPagination" class="pagination" />
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'

import { PAGINATION } from '~/data/default-data'
import PostCard from '~/components/post/PostCard.vue'
import PaginationBar from '~/components/post/PaginationBar.vue'
import Loading from '~/components/Loading.vue'
import ResourceNotFound from '~/components/ResourceNotFound.vue'

export default {
  layout: 'blog',
  watchQuery: ['tags', 'page'],
  components: {
    PostCard,
    Loading,
    ResourceNotFound,
    PaginationBar
  },
  data() {
    return {
      statusCode: 404,
      queryTags: '',
      elementsPerPage: PAGINATION.elementsPerPage
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
    return {
      queryTags: (!q ? '' : q).split(','),
      page: !p ? 1 : p
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

<style></style>
