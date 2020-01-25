<template>
  <div class="resource-not-found">
    <h1>{{ error.statusCode }}</h1>
    <h2>¡Oops!</h2>
    <p>{{ error.message }}</p>
  </div>
</template>

<script>
import { errorHandler } from '~/utils/validate-errors'

export default {
  props: {
    error: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  mounted() {
    this.error = errorHandler(new Error(this.error.statusCode))
  }
}
</script>
<style>
.resource-not-found {
  background: red;
}
</style>
