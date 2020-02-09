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
            v-for="link in links"
            @click="openClose()"
            class="nav__list__item"
          >
            <nuxt-link :to="link.route">
              {{ link.name }}
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import _ from 'lodash'
import { HEADER_LINKS } from '~/data/config'

export default {
  data() {
    return {
      isOpen: false,
      links: _.filter(HEADER_LINKS, link => _.get(link, 'show', false))
    }
  },
  methods: {
    openClose() {
      setTimeout(() => {
        this.isOpen = !this.isOpen
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-header {
  position: absolute;
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
      }
    }
  }
}
</style>
