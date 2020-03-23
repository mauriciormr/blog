<template>
  <a :href="social.link" target="_blank">
    <!-- https://css-tricks.com/scale-svg/ -->
    <!-- https://alligator.io/vuejs/raw-html-binding/ -->
    <svg
      v-html="social.icon"
      class="svg-icon"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      preserveAspectRatio="none"
      viewBox="0 0 25 25"
    />
  </a>
</template>
<script>
export default {
  props: {
    social: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss">
.svg-icon {
  height: 60%;
}

.svg-icon path {
  @apply fill-primary;
}
</style>
