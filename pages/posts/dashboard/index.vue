<template>
  <div>
    <Loading v-if="isDataPending" class="loading" />
    <div v-else class="admin-posts-list">
      <button class="admin-posts-list__add-btn">
        <nuxt-link
          to="/posts/dashboard/add"
          class="admin-posts-list__add-btn__link"
        >
          <i class="fa fa-plus" aria-hidden="true" />
        </nuxt-link>
      </button>
      <div v-if="posts.length === 0">
        <ResourceNotFound :error="{ statusCode }" />
      </div>
      <PostCard
        v-else
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

<style lang="scss" scoped>
.admin-posts-list {
  &__add-btn {
    @apply rounded-full bg-primary shadow w-12 h-12;
    @apply text-secondary text-2xl text-center;
    @apply fixed cursor-pointer;
    z-index: 10;
    left: 50%;
    transform: translate(-50%, 0%);
    bottom: 1rem;

    &__link {
      @apply p-3;
    }
  }
}

@screen laptop {
  .admin-posts-list {
    &__add-btn {
      left: auto;
      right: 2rem;
      bottom: 2rem;
    }
  }
}
</style>
