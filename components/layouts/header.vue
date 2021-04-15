<template>
  <div class="header">
    <nuxt-link to="/" tag="span"
      ><img
        class="logo-img"
        src="https://quwi.com/img/quwi-logo.png"
        alt="logo"
    /></nuxt-link>
    <div v-if="auth.loggedIn" class="button-block">
      <nuxt-link to="/" class="btn">Projects</nuxt-link>
      <span @click="logout" class="btn">Logout</span>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['auth']),
  },
  methods: {
    logout() {
      this.$auth.logout()
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="scss">
.header {
  background-color: #fafafa;
  display: flex;
  position: sticky;
  top: 0;
  border-bottom: 1px solid #bcbcbc;
  .logo-img {
    width: 30px;
    margin: 10px 30px;
    cursor: pointer;
  }
  .button-block {
    width: 250px;
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .btn {
      text-decoration: none;
      color: black;
      cursor: pointer;
    }
  }
}
</style>
