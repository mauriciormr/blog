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
      <div v-if="postsToShow.length === 0">
        <ResourceNotFound :error="{ statusCode }" />
      </div>
      <div v-else>
        <PostCard
          v-for="post in postsToShow"
          :key="post.id"
          :post="post"
          :isPostCardAdmin="true"
          :typeCard="'admin'"
          @openModalDeletePost="openModalDeletePost"
        />
        <PaginationBar :pages="pagesToPagination" class="pagination" />
      </div>
      <ModalDeletePost
        v-if="showModalDelete"
        @deletePost="deletePost"
        @closeModal="closeModalDeletePost"
        :post="postToDelete"
        class="modal"
      />
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
import ModalDeletePost from '~/components/post/ModalDeletePost.vue'

export default {
  layout: 'blog',
  watchQuery: ['tags', 'page'],
  components: {
    PostCard,
    Loading,
    ResourceNotFound,
    ModalDeletePost,
    PaginationBar
  },
  data() {
    return {
      statusCode: 404,
      showModalDelete: false,
      postToDelete: null,
      queryTags: '',
      elementsPerPage: PAGINATION.elementsPerPage
    }
  },
  computed: {
    ...mapState({
      posts: state => state.posts.privateList,
      isDataPending: state => state.posts.status.get.isPrivatePending
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
    this.getPostsList({ type: 'private' })
  },
  methods: {
    openModalDeletePost(post) {
      this.showModalDelete = !this.showModalDelete
      this.postToDelete = post
    },
    closeModalDeletePost() {
      this.showModalDelete = !this.showModalDelete
      this.postToDelete = null
    },
    deletePost(number) {
      this.deletePrivatePost(number).then(() => window.location.reload(true))
    },
    ...mapActions({
      getPostsList: 'posts/getPostsList',
      deletePrivatePost: 'posts/deletePrivatePost'
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

.modal {
  @apply fixed;
  left: 50%;
  top: 20%;
  transform: translate(-50%, -20%);
}
</style>
