<template>
  <div>
    <Header />
    <div class="blog page container">
      <div class="blog__content">
        <SearchBar class="blog__search" />
        <nuxt class="blog__view" />
      </div>
      <div class="blog__sidebar">
        <AuthorInformation />
      </div>
    </div>
  </div>
</template>
<script>
import Header from '~/components/Header.vue'
import SearchBar from '~/components/post/SearchBar.vue'
import AuthorInformation from '~/components/post/AuthorInformation.vue'

export default {
  components: {
    Header,
    SearchBar,
    AuthorInformation
  }
}
</script>

<style lang="scss" scoped>
@import 'style/indexLayout';
.blog__sidebar {
  @apply p-0;
}

.blog__view {
  @apply rounded;
  @apply p-5;
  @apply bg-secondary;
}
</style>
<style lang="scss">
@import 'style/blogPreview';
</style>
