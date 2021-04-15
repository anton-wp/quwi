<template>
  <div class="container">
    <Card v-for="project in projects" :project="project" :key="project.id" />
  </div>
</template>

<script>
import Card from '~/components/page/card'
import { mapState } from 'vuex'
export default {
  middleware: 'auth',
  components: {
    Card,
  },
  computed: {
    ...mapState(['projects']),
  },
  async asyncData({ $axios, store }) {
    const data = await $axios.$get(`projects-manage/index`)
    store.commit('SET_PROJECTS', data.projects)

    return {}
  },
}
</script>

