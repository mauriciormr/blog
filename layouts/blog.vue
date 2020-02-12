<template>
  <div>
    <Header />
    <div class="blog page container">
      <div class="blog__content">
        <SearchBar class="blog__search" />
        <nuxt class="blog__list" />
      </div>
      <GeneralInformation class="blog__sidebar" />
    </div>
  </div>
</template>
<script>
import Header from '~/components/Header.vue'
import SearchBar from '~/components/post/SearchBar.vue'
import GeneralInformation from '~/components/post/GeneralInformation.vue'

export default {
  components: {
    Header,
    SearchBar,
    GeneralInformation
  }
}
</script>
<style lang="scss" scoped>
.blog {
  @apply flex flex-col;
  @apply mb-10;

  &__content,
  &__sidebar {
    @apply mt-5;
  }

  &__search {
    @apply mb-5;
  }

  &__content {
  }

  &__sidebar {
    @apply p-5;
    @apply bg-secondary rounded;
  }
}

@screen laptop {
  .blog {
    @apply flex-row;

    &__content {
      @apply flex-9;
      @apply mr-6;
    }

    &__sidebar {
      @apply flex-2;
    }
  }
}
</style>
