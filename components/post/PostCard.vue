<template>
  <div class="post-card">
    <nuxt-link :to="`/posts/${post.number}`" class="post-card__wrapper">
      <div class="post-card__cover" />
      <div class="post-card__content">
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
  </div>
</template>
<script>
import moment from 'moment'
import _ from 'lodash'

export default {
  props: {
    post: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data() {
    return {
      labels: [],
      date: '',
      year: '',
      reactionsCount: 0
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
    const labelsOmitted = ['post', 'hidden']
    const labelsBackup = this.post.labels
    _.remove(labelsBackup, l => _.includes(labelsOmitted, l.name))
    this.labels = labelsBackup
  }
}
</script>
<style lang="scss" scoped>
.post-card {
  border-width: 1px;
  border-style: solid;
  @apply border-input rounded bg-secondary;
  @apply mb-5;
  @apply font-poppins text-secondary text-sm;

  &__wrapper {
    @apply flex flex-col;
  }

  &__content {
    @apply p-4;
  }

  &__title {
    @apply text-baseSize text-primary font-medium;
  }

  &__description {
    @apply truncate;
    @apply pt-1 pb-2;
  }

  &__tags {
    @apply my-2;

    &__tag {
      @apply text-center text-xs;
      @apply mr-1 p-1;
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
}

@screen tablet {
  .post-card {
    &__description {
      text-overflow: initial;
      white-space: initial;
      @apply break-words;
    }

    &__cover {
      background-image: url('/img/meta/post_banner_default.jpg');
      background-position-x: center;
      background-position-y: center;
      background-repeat: no-repeat;
      background-size: cover;
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
