<template>
  <header class="wrapper-header">
    <div class="header container">
      <span class="header__logo">Logo</span>
      <div class="header__icon-mobile">
        <button @click="openClose()" type="button">
          <svg class="header__icon-mobile__svg" viewBox="0 0 24 24">
            <path
              v-if="isOpen"
              fill-rule="evenodd"
              d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
            />
            <path
              v-if="!isOpen"
              fill-rule="evenodd"
              d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
            />
          </svg>
        </button>
      </div>
      <nav :class="isOpen ? 'block' : 'hidden'" class="header__nav">
        <ul class="nav__list">
          <li
            v-for="link in linksWhenUserIsLogged"
            @click="openClose()"
            class="nav__list__item"
          >
            <nuxt-link :to="link.route">
              {{ link.name }}
            </nuxt-link>
          </li>
          <li
            v-for="link in linksWhenUserIsNotLogged"
            v-if="!user.logged"
            @click="openClose()"
            class="nav__list__item"
          >
            <nuxt-link :to="link.route">
              {{ link.name }}
            </nuxt-link>
          </li>
          <li
            v-if="user.logged"
            @click="openCloseDropdown()"
            class="nav__list__item nav__list__item-dropdown"
          >
            <img
              :src="user.avatar_url"
              alt="user.login"
              class="nav__list__item-dropdown__user-photo"
            />
            <i
              class="fa fa-angle-down nav__list__item-dropdown__arrow"
              aria-hidden="true"
            />
            <span class="nav__list__item-dropdown__user-name">
              @{{ user.login }}
            </span>
            <ul
              :class="isOpenDropdown ? '--block' : '--hidden'"
              class="nav__list__item-dropdown__list"
            >
              <li
                v-for="link in adminLinks"
                @click="link.action ? executeAction(link.action) : openClose()"
                class="nav__list__item-dropdown__list__item"
              >
                <nuxt-link :to="link.route" v-if="link.route">
                  <span>{{ link.name }}</span>
                </nuxt-link>
                <span v-else>
                  {{ link.name }}
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import { HEADER_LINKS, ADMIN_HEADER_LINKS } from '~/data/config'

export default {
  data() {
    return {
      isOpen: false,
      isOpenDropdown: false,
      linksWhenUserIsLogged: _.filter(
        HEADER_LINKS,
        link =>
          _.get(link, 'show', false) &&
          _.get(link, 'showWhenUserIsLogged', false)
      ),
      linksWhenUserIsNotLogged: _.filter(
        HEADER_LINKS,
        link =>
          _.get(link, 'show', false) &&
          !_.get(link, 'showWhenUserIsLogged', false)
      ),
      adminLinks: _.filter(ADMIN_HEADER_LINKS, link =>
        _.get(link, 'show', false)
      )
    }
  },
  computed: {
    ...mapState({
      user: state => state.users.user
    })
  },
  methods: {
    openClose() {
      this.isOpen = !this.isOpen
    },
    openCloseDropdown() {
      this.isOpenDropdown = !this.isOpenDropdown
    },
    executeAction(action) {
      switch (typeof action) {
        case 'string':
          this.$store.dispatch(action)
          break
        default:
          action()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-header {
  position: fixed;
  z-index: 100;
  @apply w-full;
  @apply bg-primary;
  @apply shadow-lg;
}

.header {
  @apply w-full;
  @apply py-3;
  @apply flex flex-row justify-between;
  @apply bg-primary text-primary;

  &__logo {
    @apply flex items-center;
  }

  &__icon-mobile {
    z-index: 200;
    @apply flex;

    &__svg {
      @apply w-8;
      @apply fill-ternary;
    }
  }

  &__nav {
    position: absolute;
    left: 0px;
    @apply w-full;
    @apply bg-primary text-primary;
    @apply shadow-lg;
  }

  .nav__list {
    @apply flex flex-col items-center;
    @apply pb-10;

    &__item {
      position: relative;
      @apply pt-3;
    }

    &__item::after {
      content: ' ';
      position: absolute;
      height: 2px;
      bottom: 0px;
      left: 0px;
      @apply w-full;
      @apply bg-ternary;
    }

    &__item:last-child::after {
      height: 0px;
    }

    &__item-dropdown {
      @apply flex flex-col justify-center items-center;
      @apply pt-0;

      &__list {
        @apply flex flex-col items-center justify-center;

        &__item {
          @apply relative;
          @apply pt-3;
          @apply cursor-pointer;
        }

        &__item::after {
          content: ' ';
          position: absolute;
          height: 2px;
          bottom: 0px;
          left: 0px;
          @apply w-full;
          @apply bg-ternary;
        }
      }

      &__user-photo {
        @apply rounded-full w-16 order-11;
        @apply mt-10;
      }

      &__arrow {
        @apply hidden;
      }

      &__user-name {
        @apply order-12;
      }
    }
  }
}

@screen laptop {
  .header {
    @apply py-5;

    &__icon-mobile {
      @apply hidden;
    }

    &__nav {
      position: relative;
      @apply flex w-auto;
      @apply shadow-none;
    }

    .nav__list {
      @apply flex-row;
      @apply pb-0;

      &__item {
        @apply pt-0 ml-10;

        &:last-child::after {
          height: 2px;
        }
      }

      &__item[class*='dropdown']::after {
        height: 0px;
      }

      &__item-dropdown {
        @apply pt-0;
        @apply relative;
        @apply flex-row;
        @apply cursor-pointer;

        &__list {
          @apply hidden;
          @apply absolute right-0 w-48;
          top: 2rem;
          @apply mt-1 pt-0 pb-4 px-6 items-end;
          @apply text-right;
          @apply rounded shadow-lg bg-secondary border border-divContainer;
        }

        &__list.--hidden {
          @apply hidden;
        }

        &__list.--block {
          @apply flex;
        }

        &__user-photo {
          @apply order-1;
          @apply mt-0;
          width: 1.5rem;
        }

        &__arrow {
          @apply ml-1;
          @apply block order-2;
        }

        &__user-name {
          @apply hidden;
        }
      }

      &__item-dropdown::after {
        height: 0px;
      }
    }
  }
}
</style>
