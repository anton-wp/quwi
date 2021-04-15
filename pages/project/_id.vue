<template>
  <div>
    <div class="project-header">
      <div class="btn-back__wrapper">
        <nuxt-link class="btn-back" to="/">Back</nuxt-link>
      </div>
    </div>
    <div class="project-content">
      <div class="edit-card">
        <label for="">Name</label>
        <div>
          <input
            v-model="project.name"
            :class="error && 'input-error'"
            type="text"
          />
          <button @click="save">Ok</button>
          <span class="message primary-error">{{ error.name }}</span>
          <span class="message success-message">{{ success }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data: () => ({
    project: {},
    error: '',
    success: '',
  }),
  async asyncData({ $axios, params, redirect }) {
    const data = await $axios.$get(`projects-manage/${params.id}`)
    return { project: data.project }
  },
  methods: {
    save() {
      let formData = new FormData()
      formData.append('name', this.project.name)
      this.$axios
        .$post(`projects-manage/update`, formData, {
          params: {
            id: this.project.id,
          },
        })
        .then((res) => {
          this.success = 'Project name updated'
          setTimeout(() => {
            this.success = ''
          }, 10000)
        })
        .catch((error) => (this.error = error.response.data.first_errors))
    },
  },
}
</script>

<style lang="scss">
.project-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c1c8d2;
  .btn-back {
    text-decoration: none;
    color: black;
    text-transform: uppercase;
    padding: 10px;
    background-color: #cecece;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    &__wrapper {
      width: 500px;
    }
  }
}
.project-content {
  display: flex;
  justify-content: center;
  padding: 20px 0;
  .edit-card {
    width: 500px;
    height: 80px;
    background-color: white;
    align-items: center;
    display: flex;
    border-radius: 6px;
    border: 1px solid grey;
    label {
      margin: 0 40px 0 20px;
    }
    input {
      padding: 8px;
    }
    button {
      background-color: #395378;
      padding: 10px 20px;
      color: white;
      text-transform: uppercase;
      border-radius: 4px;
      border: none;
      margin-left: 5px;
    }
  }
  .message {
    width: 100%;
    display: block;
  }
}
</style>
