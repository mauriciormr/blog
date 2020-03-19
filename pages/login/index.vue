<template>
  <div>
    <div class="login">
      <button @click="login" class="login__button">
        <i class="fa fa-github login__button__icon" aria-hidden="true" />
        {{ LABELS_PAGES.loginButtonIcon }}
      </button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'

import stringRandom from 'string-random'

export default {
  computed: {
    ...mapState({
      LABELS: state => state.lang.labels
    }),
    LABELS_PAGES() {
      return _.get(this.LABELS, 'pages.login', {})
    }
  },
  methods: {
    login() {
      const clientId = process.env.GITHUB_CLIENT_ID
      const redirectUri = process.env.GITHUB_REDIRECT_URI
      const scope = 'repo,user'
      const state = stringRandom(16, { numbers: false })
      window.location = `${process.env.GITHUB_AUTHORIZE_URL}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`
    }
  },
  head() {
    return {
      title: this.LABELS_PAGES.loginButtonIcon
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  @apply h-screen;
}

.login {
  @apply flex justify-center items-center;
  @apply h-full;

  &__button {
    @apply flex justify-center items-center;
    @apply bg-primary border border-divContainer shadow;
    @apply py-4 px-16;
    @apply text-secondary font-poppins font-medium text-baseSize;

    &:hover {
      @apply bg-primarySelected;
    }

    &__icon {
      @apply mr-2;
      @apply text-4xl;
    }
  }
}
</style>
