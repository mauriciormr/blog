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
@import 'style/indexLayout';
</style>
