<template>
  <div>
    <Header />
    <div class="blog page container">
      <nuxt class="blog__view" />
    </div>
  </div>
</template>
<script>
import Header from '~/components/Header.vue'

export default {
  components: {
    Header
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
