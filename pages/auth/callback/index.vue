<template>
  <div class="container-page">
    <div>
      Wait... Authentication in process
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      userData: {},
      logged: false
    }
  },
  async asyncData({ query, $axios, redirect }) {
    try {
      const github = await $axios.$post(
        `${process.env.GITHUB_ACCESS_TOKEN_URL}`,
        {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code: query.code,
          redirect_uri: process.env.GITHUB_REDIRECT_URI,
          state: query.state
        },
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      const user = await $axios.$get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${github.access_token}`
        }
      })
      return {
        userData: {
          ...user,
          token: github.access_token
        },
        logged: true
      }
    } catch (error) {
      redirect('/error')
    }
  },
  mounted() {
    const fn = this
    if (this.logged) {
      setTimeout(() => {
        fn.loginUser(fn.userData).then(() => fn.$router.push('/'))
      }, 500)
    }
  },
  methods: {
    ...mapActions({
      loginUser: 'users/loginUser'
    })
  },
  head() {
    return {
      title: 'Authentification'
    }
  }
}
</script>

<style></style>
