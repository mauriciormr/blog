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
        <ResourceNotFound :error="error" />
      </div>
      <div v-else>
        <div class="admin-posts-list__pagination-head">
          <div class="admin-posts-list__pagination-head__message">
            <span>~{{ countPosts }} elements found</span>
          </div>
          <PaginationHead
            :elementsPerPage="elementsPerPage"
            class="admin-posts-list__pagination-head__select"
          />
        </div>
        <PostCard
          v-for="post in posts"
          :key="post.id"
          :post="post"
          :isPostCardAdmin="true"
          :typeCard="'admin'"
          @openModalDeletePost="openModalDeletePost"
        />
        <PaginationBar :pages="pagesToPagination" class="pagination-bottom" />
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
import { errorHandler } from '~/utils/validate-errors'
import PostCard from '~/components/post/PostCard.vue'
import PaginationHead from '~/components/post/PaginationHead.vue'
import PaginationBar from '~/components/post/PaginationBar.vue'
import Loading from '~/components/Loading.vue'
import ResourceNotFound from '~/components/ResourceNotFound.vue'
import ModalDeletePost from '~/components/post/ModalDeletePost.vue'

export default {
  layout: 'blog',
  watchQuery: ['tags', 'page', 'items'],
  components: {
    PostCard,
    Loading,
    ResourceNotFound,
    ModalDeletePost,
    PaginationHead,
    PaginationBar
  },
  data() {
    return {
      error: {
        message: '404'
      },
      showModalDelete: false,
      postToDelete: null,
      queryTags: '',
      elementsPerPage: _.get(
        _.find(PAGINATION.optionsElementsPerPage, 'selected'),
        'number'
      )
    }
  },
  computed: {
    ...mapState({
      posts: state => state.posts.privateList,
      countPosts: state => state.posts.countPrivate,
      isDataPending: state => state.posts.status.get.isPrivatePending
    }),
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
      type: 'private',
      page,
      tags: queryTags
    })
  },
  methods: {
    ...mapActions({
      getPostsList: 'posts/getPostsList',
      deletePrivatePost: 'posts/deletePrivatePost'
    }),
    openModalDeletePost(post) {
      this.showModalDelete = !this.showModalDelete
      this.postToDelete = post
    },
    closeModalDeletePost() {
      this.showModalDelete = !this.showModalDelete
      this.postToDelete = null
    },
    deletePost(number) {
      const fn = this
      this.deletePrivatePost(number)
        .then(result => {
          fn.$notify({
            group: 'foo',
            title: 'Sucess',
            type: 'success',
            text: errorHandler({ message: `${result.status}` }).message
          })
          setTimeout(() => window.location.reload(true), 500)
        })
        .catch(error => {
          fn.$notify({
            group: 'foo',
            title: 'Error',
            type: 'error',
            text: errorHandler({ message: `${error}` }).message
          })
          fn.closeModalDeletePost()
        })
    }
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

@screen tablet {
  .admin-posts-list {
    &__pagination-head {
      &__select {
        @apply w-1/12;
      }
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
