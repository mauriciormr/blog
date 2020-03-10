<template>
  <div>
    <Header />
    <nuxt class="page" />
    <notifications group="foo" position="bottom left" />
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
<style></style>
