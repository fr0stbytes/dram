<template>
  <div class="container">
    <b-row align-v="center">
      <form @submit.prevent="sendMessage">
        <b-form-group id="exampleInputGroup1"
                  label="Email:" label-for="exampleInput1" >
          <b-form-input id="exampleInput1" type="email" required v-model="email"
                        placeholder="Your email" class="form-control"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="exampleInputGroup2"
                  label="Subject:" label-for="exampleInput2" >
          <b-form-input id="exampleInput1" type="text" required v-model="subject"
                        placeholder="Message Subject" class="form-control"
          ></b-form-input>
        </b-form-group>
        <b-form-textarea id="textarea1"
                     v-model="text"
                     placeholder="Enter something"
                     :rows="3"
                     :max-rows="6"
                     v-mode="message">
        </b-form-textarea>
        <b-button type="submit" variant="primary" class="has-margin-2">Submit</b-button>
      </form>
    </b-row>
  </div>

</template>

<script>
// import * as mailgun from 'mailgun-js'
export default {
  data () {
    return {
      email: '',
      subject: '',
      message: ''
    }
  }
}
</script>

<style lang="scss">
  .login-box {
    margin: 0 auto;
  }
</style>
