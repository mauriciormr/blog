<template>
  <div>
    <Loading v-if="isDataPending" class="loading" />
    <div v-else class="admin-posts-list">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
        :isPostCardAdmin="true"
        :typeCard="'admin'"
      />
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
      posts: state => state.posts.privateList,
      isDataPending: state => state.posts.status.get.isPrivatePending
    })
  },
  mounted() {
    this.getPostsList({ type: 'private' })
  },
  methods: {
    ...mapActions({
      getPostsList: 'posts/getPostsList'
    })
  },
  head() {
    return {
      title: 'Dashboard'
    }
  }
}
</script>

<style></style>
