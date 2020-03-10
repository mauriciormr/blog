<template>
  <div>
    <Header />
    <div class="blog page container">
      <div class="blog__content">
        <SearchBar class="blog__search" />
        <nuxt class="blog__list" />
      </div>
      <GeneralInformation :tagsToFilter="tagsToFilter" class="blog__sidebar" />
    </div>
    <notifications group="foo" position="bottom left" />
  </div>
</template>
<script>
import _ from 'lodash'

import Header from '~/components/Header.vue'
import SearchBar from '~/components/post/SearchBar.vue'
import GeneralInformation from '~/components/post/GeneralInformation.vue'

export default {
  components: {
    Header,
    SearchBar,
    GeneralInformation
  },
  computed: {
    tagsToFilter() {
      const q = _.get(this.$route.query, 'tags', '')
      return !q ? [] : q.split(',')
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style/indexLayout';
</style>
