<template>
  <div>
    <Header />
    <div class="blog page container">
      <div class="blog__content">
        <nuxt class="blog__view" />
      </div>
      <div class="blog__sidebar">
        <AuthorInformation />
      </div>
    </div>
    <notifications group="foo" position="bottom left" />
  </div>
</template>
<script>
import _ from 'lodash'
import { mapState } from 'vuex'

import Header from '~/components/Header.vue'
import AuthorInformation from '~/components/post/AuthorInformation.vue'

export default {
  components: {
    Header,
    AuthorInformation
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

.blog__sidebar {
  @apply p-0;
}

.blog__view {
  @apply rounded;
  @apply pb-16;
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
