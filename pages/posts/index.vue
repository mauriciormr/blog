<template>
  <div>
    <Loading v-if="isDataPending" class="loading" />
    <div v-else class="posts-list">
      <div v-if="postsToShow.length === 0">
        <ResourceNotFound :error="{ statusCode }" />
      </div>
      <PostCard
        v-else
        v-for="post in postsToShow"
        :key="post.id"
        :post="post"
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'

import PostCard from '~/components/post/PostCard.vue'
import Loading from '~/components/Loading.vue'
import ResourceNotFound from '~/components/ResourceNotFound.vue'

export default {
  layout: 'blog',
  watchQuery: ['tags'],
  components: {
    PostCard,
    Loading,
    ResourceNotFound
  },
  data() {
    return {
      statusCode: 404,
      queryTags: ''
    }
  },
  computed: {
    ...mapState({
      posts: state => state.posts.publicList,
      isDataPending: state => state.posts.status.get.isPublicPending
    }),
    postsToShow() {
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
    }
  },
  asyncData({ query }) {
    return {
      queryTags: _.get(query, 'tags', '').split(',')
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
