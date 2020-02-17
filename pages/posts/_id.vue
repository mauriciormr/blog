<template>
  <div>
    <Loading v-if="isDataPending" class="loading" />
    <ResourceNotFound
      v-else-if="!post && !isDataPending"
      :error="{ statusCode }"
    />
    <div v-else class="post">
      <div class="post__reactions">
        <span
          v-for="reaction in post.reactions"
          :key="reaction.content"
          :class="[
            'post__reactions__reaction',
            reaction.userLoggedHasReaction ? '--active' : ''
          ]"
          @click="handleReaction({ number: post.number, reaction: reaction })"
        >
          <img
            :src="`/img/reactions/${reaction.content}.png`"
            class="post__reactions__reaction__icon"
          />
          <span
            v-if="reaction.count > 0"
            class="post__reactions__reaction__count"
          >
            {{ reaction.count }}
          </span>
        </span>
      </div>
      <div v-html="post.post.titleHTML" class="post__title" />
      <div v-html="post.post.descriptionHTML" class="post__description" />
      <div v-html="post.post.contentHTML" class="post__content" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

import { mapState, mapActions } from 'vuex'
import { errorHandler } from '~/utils/validate-errors'
import ResourceNotFound from '~/components/ResourceNotFound.vue'
import Loading from '~/components/Loading.vue'

export default {
  layout: 'post',
  components: {
    ResourceNotFound,
    Loading
  },
  data() {
    return {
      postNumber: null,
      titlePage: '',
      statusCode: 404
    }
  },
  computed: {
    ...mapState({
      posts: state => state.posts.publicList,
      isDataPending: state => state.posts.status.get.isPublicPending
    }),
    post() {
      return _.find(this.posts, { number: +this.postNumber })
    }
  },
  asyncData({ params }) {
    return {
      postNumber: params.id
    }
  },
  mounted() {
    this.getPostsList().then(() => {
      if (this.post) {
        this.titlePage = this.post
          ? this.post.post.title
          : errorHandler(new Error(this.statusCode)).message
        this.updateAuthorPostView(this.post.user)
      }
    })
  },
  methods: {
    ...mapActions({
      handleReaction: 'posts/handleReaction',
      updateAuthorPostView: 'posts/updateAuthorPostView',
      getPostsList: 'posts/getPostsList'
    })
  },
  head() {
    return {
      title: this.titlePage
    }
  }
}
</script>

<style lang="scss" scoped>
.post {
  &__reactions {
    @apply flex w-full justify-center;
    @apply pt-2 pb-4;
    @apply fixed left-0 bottom-0;
    @apply bg-base;

    &__reaction {
      @apply relative;
      @apply mx-1 p-1;
      @apply rounded-full;
      @apply border-2 border-divContainer cursor-pointer;

      &.--active {
        @apply border-2 border-inputFocus;
      }

      &__icon {
        @apply w-6;
      }

      &__count {
        @apply absolute;
        bottom: 0px;
        right: -5px;
        @apply rounded-full border border-divContainer;
        @apply w-4;
        @apply text-center text-sm leading-none text-primary;
        @apply bg-primary;
      }
    }
  }
}

@screen tablet {
  .post {
    &__reactions {
      &__reaction {
        @apply mx-3;

        &__icon {
          @apply w-8;
        }

        &__count {
          @apply w-5;
        }
      }
    }
  }
}

@screen laptop {
  .post {
    @apply relative;

    &__reactions {
      @apply absolute w-auto;
      bottom: auto;
      left: -6.2rem;
      @apply flex-col;
      @apply bg-transparent;

      &__reaction {
        @apply mr-2 my-2;
      }
    }
  }
}

@screen desktop {
  .post {
    &__reactions {
      left: -7.2rem;
    }
  }
}
</style>
