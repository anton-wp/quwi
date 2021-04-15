<template>
  <div class="container">
    <div class="form">
      <h6 class="form-title">Login</h6>
      <div class="form-group">
        <input
          :class="$v.email.$error && 'input-error'"
          v-model="$v.email.$model"
          placeholder="Email"
          @change="clearErrApi"
        />
        <template v-if="$v.email.$error">
          <span v-if="!$v.email.required" class="primary-error"
            >Email can not be blank</span
          >
          <span v-if="!$v.email.email" class="primary-error"
            >Invalid email</span
          >
        </template>
        <span v-else-if="errorApi" class="primary-error">{{ errorApi }}</span>
        <input
          :class="$v.password.$error && 'input-error'"
          v-model.trim="$v.password.$model"
          type="password"
          placeholder="Password"
          @change="clearErrApi"
        />
        <span
          v-if="$v.password.$error && !$v.password.required"
          class="primary-error"
          >Password can not be blank</span
        >
      </div>
      <button class="button-login" @click="login">LOGIN</button>
    </div>
  </div>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators'

export default {
  layout: 'login',
  data() {
    return {
      email: '',
      password: '',
      errorApi: '',
    }
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  methods: {
    clearErrApi() {
      this.errorApi = ''
    },
    login() {
      this.$v.$touch()
      if (this.$v.$error) return
      this.$auth
        .loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        .then((resp) => {
          this.$router.push('/')
        })
        .catch((error) => {
          if (error.response.status === 417)
            this.errorApi = error.response.data.first_errors.email
        })
    },
  },
}
</script>

<style lang="scss">
.form {
  h6 {
    font-size: 20px;
    margin: 15px 0 0 0;
    text-transform: uppercase;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    input {
      padding: 5px;
      margin: 5px 0;
      width: 250px;
    }
  }
  .button-login {
    font-size: 12px;
    font-weight: 600;
    border-radius: 2px;
    background-color: #395378;
    border: none;
    box-shadow: none;
    color: white;
    text-transform: uppercase;
    padding: 10px 30px;
    cursor: pointer;
  }
}
</style>
