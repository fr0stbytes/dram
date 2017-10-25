<template>
  <div class="container">
    <b-row align-v="center">
        <b-col sm="10" class="login-box">
          <div class="logo-box">
            <img src="../../static/logo-icon-blue.png" alt="">
          </div>
          <b-card header="Register"
                header-tag="header"
                header-bg-variant="primary"
                border-variant="primary"
                class="shadow-1 has-margin-5">
          <b-form @submit.prevent="register">
            <b-form-group id="exampleInputGroup1"
                          label="Email:" label-for="exampleInput1" >
              <b-form-input id="exampleInput1" type="email" required
                            placeholder="me@example.com" class="form-control"
                            v-model="email">
              </b-form-input>
            </b-form-group>
            <b-form-group id="exampleInputGroup3"
                          label="Username:" label-for="exampleInput3" >
              <b-form-input id="exampleInput3" type="text" required
                            placeholder="The name you want to display" class="form-control"
                            v-model="username">
              </b-form-input>
            </b-form-group>
            <b-form-group id="exampleInputGroup1"
                          label="Password:" label-for="exampleInput1" >
              <b-form-input id="exampleInput1" type="password" required
                            placeholder="******" class="form-control"
                            v-model="password">
              </b-form-input>
            </b-form-group>
            <b-button variant="primary" block class="has-margin-2" type="submit">Register user</b-button>
          </b-form>
        </b-card>
        </b-col>
    </b-row>
  </div>

</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      username: ''
    }
  },
  methods: {
    register () {
      const loginData = {
        email: this.email,
        password: this.password,
        username: this.username
      }
      // console.log(this.email, this.password)
      this.$store.dispatch('register', loginData)
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        // this.$router.push('/dashboard')
        // console.log('yay')
      }
    }
  }
}
</script>

<style lang="scss">
  .login-box {
    margin: 0 auto;
  }
</style>
