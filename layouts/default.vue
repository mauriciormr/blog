<template>
  <div>
    <Header />
    <nuxt class="page" />
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
<style></style>
