<template>
  <div>
    <Loading v-if="isDataPending" class="loading" />
    <div v-else class="posts-list">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PostCard from '~/components/post/PostCard.vue'
import Loading from '~/components/Loading.vue'

export default {
  layout: 'blog',
  components: {
    PostCard,
    Loading
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
