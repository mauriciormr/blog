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
      <div :style="`background-image: url('${unplash}')`" class="post__cover" />
      <div class="post__group">
        <div v-html="post.post.titleHTML" class="post__title" />
        <div class="post__information">
          <span class="post__information__author-name">{{ author.name }}</span>
          <span class="post__information__separator">&#183;</span>
          <div class="post__information__post-date">
            <span>{{ date }}</span>
            <span>&#183;</span>
            <span>{{ year }}</span>
          </div>
        </div>
        <div class="post__tags">
          <span
            v-for="label in labels"
            :style="`backgroundColor: #${label.color}`"
            class="post__tags__tag"
          >
            #{{ label.name }}
          </span>
        </div>

        <div v-html="post.post.descriptionHTML" class="post__description" />
        <div v-html="post.post.contentHTML" class="post__content" />
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'

import { mapState, mapActions } from 'vuex'
import { errorHandler } from '~/utils/validate-errors'
import ResourceNotFound from '~/components/ResourceNotFound.vue'
import Loading from '~/components/Loading.vue'
import { filterPostLabels } from '~/utils/utils'

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
      statusCode: 404,
      unplash: 'https://source.unsplash.com/random/1280x720',
      labels: [],
      date: '',
      year: ''
    }
  },
  computed: {
    ...mapState({
      posts: state => state.posts.publicList,
      isDataPending: state => state.posts.status.get.isPublicPending,
      author: state => state.posts.postView.author
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

        this.date = moment(this.post.created_at).format('MMM DD')
        this.year = moment(this.post.created_at).format('YYYY')

        const labelsOmitted = ['hidden']
        this.labels = filterPostLabels(labelsOmitted, this.post.labels)
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
.loading {
  @apply pt-8;
}
.post {
  &__cover {
    @apply rounded-t;
    @apply bg-local bg-center bg-no-repeat bg-cover;
    @apply h-40;
  }

  &__information {
    @apply flex;
    @apply font-poppins text-secondary text-sm;

    &__separator {
      @apply mx-3;
    }
  }

  &__group {
    @apply pt-4 px-6;
  }

  &__tags {
    @apply mt-0 mb-4;
    @apply font-poppins text-secondary;

    &__tag {
      @apply text-center text-xs;
      @apply mr-1 p-1;
      @apply rounded;
    }
  }

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
    &__cover {
      @apply h-56;
    }

    &__group {
      @apply px-8;
    }

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

    &__group {
      @apply px-8;
    }

    &__reactions {
      @apply absolute w-auto;
      bottom: auto;
      left: -4.2rem;
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
    &__group {
      @apply px-12;
    }
  }
}
</style>
