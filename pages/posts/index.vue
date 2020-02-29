<template>
  <div>
    <Loading v-if="isDataPending" class="loading" />
    <div v-else class="posts-list">
      <div v-if="posts.length === 0">
        <ResourceNotFound :error="{ statusCode }" />
      </div>
      <PostCard v-else v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PostCard from '~/components/post/PostCard.vue'
import Loading from '~/components/Loading.vue'
import ResourceNotFound from '~/components/ResourceNotFound.vue'

export default {
  layout: 'blog',
  components: {
    PostCard,
    Loading,
    ResourceNotFound
  },
  data() {
    return {
      statusCode: 404
    }
  },
  computed: {
    ...mapState({
      posts: state => state.posts.publicList,
      isDataPending: state => state.posts.status.get.isPublicPending
    })
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
