<template>
  <div class="wrapper-card">
    <Loading v-if="isDataPending" class="loading" />
    <div v-else class="author-card">
      <span class="author-card__title">AUTHOR</span>
      <img
        :src="author.avatar_url"
        :alt="author.name"
        class="author-card__photo"
      />
      <span v-if="author.bio" class="author-card__bio">
        "{{ author.bio }}"
      </span>
      <span class="author-card__name">{{ author.name }}</span>
      <span class="author-card__username">@{{ author.login }}</span>
      <div class="author-card__list">
        <span v-if="author.location" class="author-card__list__item location">
          <i
            class="fa fa-map-marker author-card__list__item__icon"
            aria-hidden="true"
          />
          <span class="author-card__list__item__text">
            {{ author.location }}
          </span>
        </span>
        <span v-if="author.company" class="author-card__list__item company">
          <i
            class="fa fa-briefcase author-card__list__item__icon"
            aria-hidden="true"
          />
          <span class="author-card__list__item__text">
            {{ author.company }}
          </span>
        </span>
        <span v-if="author.blog" class="author-card__list__item site">
          <i
            class="fa fa-globe author-card__list__item__icon"
            aria-hidden="true"
          />
          <a
            :href="`http://${author.blog}`"
            class="author-card__list__item__text"
            target="_blank"
          >
            {{ author.blog }}
          </a>
        </span>
      </div>
      <a
        :href="author.html_url"
        class="author-card__button-profile"
        target="_blank"
      >
        <i
          class="fa fa-github author-card__button-profile__icon"
          aria-hidden="true"
        />
        <span>View Profile</span>
      </a>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Loading from '~/components/Loading.vue'

export default {
  components: { Loading },
  computed: {
    ...mapState({
      author: state => state.posts.postView.author,
      isDataPending: state => state.posts.status.getAuthorPostView.isPending
    })
  }
}
</script>
<style lang="scss" scoped>
.loading {
  @apply text-center;
}

.wrapper-card {
  border-width: 1px;
  border-style: solid;
  @apply border-input rounded;
  @apply p-5;
}

.author-card {
  @apply flex flex-col;
  @apply font-poppins font-medium text-secondary text-baseSize;

  &__title {
    @apply font-poppins font-medium text-center text-primary;
  }

  &__photo {
    border-width: 5px;
    border-style: solid;
    @apply border-input rounded-full;
    @apply w-2/6 self-center;
    @apply mt-3 mb-4;
  }

  &__bio,
  &__name,
  &__username {
    @apply text-center;
  }

  &__bio {
    @apply mb-4;
    @apply italic;
  }

  &__username {
    @apply underline;
  }

  &__list {
    @apply mt-5 mb-8;

    &__item {
      @apply flex items-center;

      &__icon {
        @apply text-center;
        @apply mr-2;
        @apply w-1/12;
      }

      &__text {
        @apply w-11/12;
      }

      &.location &__icon {
        @apply text-xl;
      }

      &.site &__text {
        @apply underline;
      }
    }
  }

  &__button-profile {
    @apply w-full h-10 py-1;
    @apply bg-ternary;
    @apply text-center font-normal;
    @apply flex justify-center items-center;

    &__icon {
      @apply mr-1;
      @apply text-2xl;
    }
  }
}

@screen tablet {
  .author-card {
    &__photo {
      @apply w-32;
    }

    &__list {
      @apply flex justify-around items-center;
    }
  }
}

@screen laptop {
  .author-card {
    @apply text-xs;

    &__photo {
      @apply w-20;
    }

    &__list {
      @apply flex-col items-stretch;

      &__item {
        @apply mb-1;

        &__icon {
          @apply w-2/12;
        }
      }
    }
  }
}

@screen desktop {
  .author-card {
    @apply text-sm;

    &__photo {
      @apply w-24;
    }
  }
}
</style>
