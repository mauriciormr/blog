<template>
  <div class="post-card">
    <nuxt-link :to="`/posts/${post.number}`" class="post-card__wrapper">
      <div
        :style="`background-image: url('${cover}')`"
        class="post-card__cover"
      />
      <div :class="`--${type}`" class="post-card__content">
        <div v-if="isPostCardAdmin" class="post-card__actions">
          <nuxt-link :to="`/posts/dashboard/edit/${post.number}`">
            <span>
              <i class="fa fa-edit" aria-hidden="true" />
            </span>
          </nuxt-link>
        </div>
        <div v-html="post.post.titleHTML" class="post-card__title" />
        <div
          v-html="post.post.descriptionHTML"
          class="post-card__description"
        />
        <div class="post-card__tags">
          <span
            v-for="label in labels"
            :style="`backgroundColor: #${label.color}`"
            class="post-card__tags__tag"
          >
            #{{ label.name }}
          </span>
        </div>
        <div class="post-card__user">
          <img :src="post.user.avatar_url" class="post-card__user__photo" />
          <span class="post-card__user__username">@{{ post.user.login }}</span>
        </div>
        <div class="post-card__reactions">
          <div class="post-card__reactions__publish-date">
            <span>{{ date }}</span>
            <span>&#183;</span>
            <span>{{ year }}</span>
          </div>
          <div v-if="reationsCount > 0" class="post-card__reactions__counter">
            <span class="post-card__reactions__counter__count">
              {{ reationsCount }}
            </span>
            <span class="post-card__reactions__counter__icon">
              <i class="fa fa-heart" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </nuxt-link>
    <div v-if="isPostCardAdmin" class="post-card__delete">
      <span>
        <i
          @click="openModalDeletePost(post)"
          class="fa fa-trash"
          aria-hidden="true"
        />
      </span>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import _ from 'lodash'
import { fnFilterPostLabels } from '~/utils/utils'
import {
  POSTS_DATA,
  OMITTED_LABELS,
  POSTS_LABELS_CONFIG
} from '~/data/default-data'

export default {
  props: {
    post: {
      type: Object,
      required: true,
      default: () => ({})
    },
    isPostCardAdmin: {
      type: Boolean,
      required: false,
      default: false
    },
    typeCard: {
      type: String,
      required: false,
      default: 'public'
    }
  },
  data() {
    return {
      labels: [],
      date: '',
      year: '',
      reactionsCount: 0,
      cover: POSTS_DATA.coverList,
      type: ''
    }
  },
  created() {
    this.date = moment(this.post.created_at).format('MMM DD')
    this.year = moment(this.post.created_at).format('YYYY')
    const reactionsWithUsers = _.filter(
      this.post.reactions,
      r => r.users.length > 0
    )
    this.reationsCount = _.reduce(
      reactionsWithUsers,
      (acc, reaction) => acc + reaction.users.length,
      0
    )
  },
  mounted() {
    const backupLabels = [...this.post.labels]
    this.type = _.get(
      _.find(this.post.labels, { name: POSTS_LABELS_CONFIG.hidden }),
      'name',
      ''
    )

    this.labels = fnFilterPostLabels(
      OMITTED_LABELS[`${this.typeCard}`],
      backupLabels
    )

    const postCover = _.get(this.post.post, 'coverBlog', '').trim()
    this.cover = !postCover ? this.cover : postCover
  },
  methods: {
    openModalDeletePost(post) {
      this.$emit('openModalDeletePost', post)
    }
  }
}
</script>
<style lang="scss" scoped>
.post-card {
  border-width: 1px;
  border-style: solid;
  @apply relative border-input rounded bg-secondary;
  @apply mb-5;
  @apply font-poppins text-secondary text-sm;

  &__wrapper {
    @apply flex flex-col;
  }

  &__content {
    @apply relative;
    @apply p-4;
  }

  &__content.--hidden {
    @apply bg-base;
  }

  &__actions {
    @apply text-3xl text-secondary;
    @apply rounded-full bg-primary shadow-xl;
    @apply absolute right-0 w-12 h-12;
    @apply flex justify-center items-center;
    @apply mr-4;
    bottom: 4rem;
  }

  &__title {
    @apply text-baseSize text-primary font-medium;
  }

  &__description {
    @apply truncate;
    @apply pt-1 pb-2;
  }

  &__tags {
    @apply my-1;
    @apply flex flex-wrap;

    &__tag {
      @apply text-center text-xs;
      @apply mr-1 mt-1 p-1;
      @apply rounded;
    }
  }

  &__user {
    @apply my-3;
    @apply flex items-center;

    &__photo {
      @apply w-12;
      @apply rounded-full;
    }

    &__username {
      @apply pl-3;
    }
  }

  &__reactions {
    @apply flex items-center justify-between;
    @apply pt-3;
    @apply border-t border-input;

    &__publish-date {
      @apply flex-6;
    }

    &__counter {
      @apply flex-6;
      @apply text-right;

      &__count {
      }

      &__icon {
        @apply ml-1;
        @apply text-sm;
      }
    }
  }

  &__delete {
    @apply text-baseSize text-secondary;
    @apply rounded-full shadow-xl border border-divContainer;
    @apply absolute right-0 w-8 h-8 cursor-pointer;
    @apply flex justify-center items-center;
    @apply mr-6;
    bottom: 7.5rem;

    &:hover {
      @apply bg-base;
    }

    &__icon i {
      @apply p-2;
    }
  }
}

@screen tablet {
  .post-card {
    &__description {
      text-overflow: initial;
      white-space: initial;
      @apply break-words;
    }

    &__cover {
      @apply bg-local bg-center bg-no-repeat bg-cover;
      height: 250px;
    }

    &__user {
      &__username {
        @apply flex-12;
      }
    }
  }
}

@screen laptop {
  .post-card {
    &__cover {
      height: 200px;
    }
  }
}

@screen desktop {
  .post-card {
    &__wrapper {
      @apply flex-row;
    }

    &__cover {
      width: 300px;
      height: auto;
      @apply flex-1;
    }

    &__content {
      @apply flex-4;
    }
  }
}
</style>
