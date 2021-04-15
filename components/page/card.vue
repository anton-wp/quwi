<template>
  <nuxt-link :to="`/project/${project.id}`" class="card">
    <div class="card-company">
      <img
        class="card-company__logo"
        :src="project.logo_url ? project.logo_url : defImage"
        alt="logo"
      />
      <span class="card-company__name">{{ project.name }}</span>
    </div>
    <div class="card-active">
      <span v-if="project.is_active" class="card-active__active">Active</span>
      <span v-else class="card-active__inactive">Inactive</span>
    </div>
    <div class="card-time">
      <div v-if="project.dta_user_since">
        <span
          >time this week
          {{ new Date(project.dta_user_since).toLocaleTimeString() }}</span
        >
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: ['project'],
  data: () => ({
    defImage:
      'https://place-hold.it/60x60',
  }),
}
</script>

<style lang="scss">
.card {
  width: 600px;
  min-height: 100px;
  background-color: white;
  border-radius: 4px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  padding: 10px 20px;
  &-company {
    display: flex;
    align-items: center;
    width: 33%;
    font-weight: 600;
    font-size: 14px;
    &__logo {
      width: 60px;
      margin-left: 10px;
    }
    &__name {
      margin-left: 20px;
    }
  }
  &-active {
    display: flex;
    width: 33%;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
    &__active {
      color: #008855;
    }
    &__inactive {
      color: #ff3348;
    }
  }
  &-time {
    display: flex;
    width: 33%;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
  }
}
</style>
