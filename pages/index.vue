<template>
  <div>
    <div class="cover">
      <div class="cover__letters container">
        <div class="cover__letters__fullname">
          <h1 class="cover__letters__fullname__name">
            {{ USER.name }}
          </h1>
          <h1 class="cover__letters__fullname__lastname">
            {{ USER.lastname }}
          </h1>
        </div>
        <div class="cover__letters__role">
          <h2>{{ USER.role[`${langVuex}`] }}</h2>
        </div>
        <div
          v-html="USER.quote[`${langVuex}`]"
          class="cover__letters__quote container"
        />
        <div class="cover__social__icons-abs-container container">
          <SocialIcon
            v-for="social in USER.social"
            :key="social.link"
            :social="social"
            class="cover__social__icons-abs-container__icon"
          />
        </div>
      </div>
      <Wave class="cover__wave-svg" />
      <SocialMediaContainer class="cover__social" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'

import Wave from '~/components/landing/Wave.vue'
import SocialMediaContainer from '~/components/landing/SocialMediaContainer.vue'
import SocialIcon from '~/components/landing/SocialIcon.vue'
import { USER_INFORMATION } from '~/data/config'

export default {
  components: {
    Wave,
    SocialMediaContainer,
    SocialIcon
  },
  data() {
    return {
      USER: {
        ...USER_INFORMATION,
        social: _.filter(
          USER_INFORMATION.social,
          s => _.get(s, 'link', false) && _.get(s, 'icon', false)
        )
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.users.user,
      langVuex: state => state.lang.lang
    })
  },
  methods: {
    ...mapActions({
      logoutUser: 'users/logoutUser'
    })
  }
}
</script>

<style lang="scss" scoped>
.page {
  @apply pt-0;
}

.cover {
  position: relative;
  height: 100vh;
  @apply bg-cover bg-primary;

  &__letters {
    position: relative;
    color: white;
    height: 100%;
    z-index: 3;
    @apply flex flex-col justify-center;
    @apply font-poppins text-center text-primary text-6xl;

    &__fullname {
      @apply leading-none;
    }

    &__fullname__name {
      @apply font-light;
    }

    &__fullname__lastname {
      @apply font-semibold;
    }

    &__quote {
      position: absolute;
      right: 0px;
      bottom: 7rem;
      @apply font-light text-sm text-right;
    }

    &__role {
      margin-top: 10px;
      @apply font-light text-baseSize;
    }
  }

  &__wave-svg {
    position: absolute;
    bottom: 0px;
    @apply w-full h-64;
  }

  &__social,
  &__social__icons-abs-container {
    position: absolute;
    bottom: 0px;
    right: 0px;
    @apply w-11/12 h-10;
  }

  &__social__icons-abs-container {
    z-index: 4;
    @apply flex justify-end items-end;

    &__icon {
      height: 100%;
      @apply flex items-center;
      @apply ml-8;
    }
  }
}

@screen tablet {
  .cover {
    &__letters {
      @apply text-8xl;

      &__quote {
        @apply text-baseSize;
      }
    }

    &__wave-svg {
      @apply h-64;
    }

    &__social,
    &__social__icons-abs-container {
      @apply w-5/6 h-12;
    }

    &__social__icons-abs-container {
      &__icon {
        @apply ml-16;
      }
    }
  }
}

@screen laptop {
  .page {
    @apply pt-0;
  }

  .cover {
    &__letters {
      @apply text-left;
    }

    &__social,
    &__social__icons-abs-container {
      @apply w-1/2;
    }

    &__social__icons-abs-container {
      &__icon {
        @apply ml-8;
      }
    }
  }
}

@screen desktop {
  .cover {
    &__social__icons-abs-container {
      &__icon {
        @apply ml-16;
      }
    }
  }
}
</style>
