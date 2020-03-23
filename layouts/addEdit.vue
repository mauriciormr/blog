<template>
  <div>
    <Header />
    <div class="blog page container">
      <nuxt class="blog__view" />
    </div>
    <notifications group="foo" position="bottom left" />
  </div>
</template>
<script>
import _ from 'lodash'
import { mapState } from 'vuex'

import Header from '~/components/Header.vue'

export default {
  components: {
    Header
  },
  computed: {
    ...mapState({
      theme: state => state.themes.theme
    })
  },
  head() {
    return {
      bodyAttrs: {
        class: [_.get(this.theme, 'className', '')]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style/indexLayout';

.blog {
  @apply pb-16;
}

.blog__view {
  @apply w-full rounded;
  @apply pb-16 mt-5;
  @apply bg-secondary;
}

@screen desktop {
  .blog__view {
    @apply pb-20;
  }
}
</style>
<style lang="scss">
@import 'style/blogPreview';
</style>
