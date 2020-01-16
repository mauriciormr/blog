<template>
  <div class="container-page">
    <div>
      <button @click="login">
        Login
      </button>
    </div>
  </div>
</template>

<script>
import stringRandom from 'string-random'

export default {
  methods: {
    login() {
      const clientId = process.env.GITHUB_CLIENT_ID
      const redirectUri = process.env.GITHUB_REDIRECT_URI
      const scope = 'repo,user'
      const state = stringRandom(16, { numbers: false })
      window.location = `${process.env.GITHUB_AUTHORIZE_URL}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`
    }
  },
  head() {
    return {
      title: 'Login'
    }
  }
}
</script>

<style></style>
