<template>
  <q-card class="col-xs-11 col-sm-6 col-md-6 col-lg-4 col-xl-3 q-ma-xl shadow-15 bg-grey-1">
    <q-banner rounded class="col-11 bg-brand-orange text-grey-1 q-mb-md text-center">
      <span class="text-h5"> Enter Code </span>
    </q-banner>
    <q-form
     @submit.prevent="onSubmit"
    >
      <q-card-section class="row flex-center">
        <q-input
          filled
          input-class="input"
          class="text-h4 col-xs-8 col-sm-6 col-md-6 col-lg-6 col-xl-6"
          v-model="code"
          type="tel"
          unmasked-value
          fill-mask="#"
          mask="# - # - # - #"
          lazy-rules
          :rules="[val => !!val || 'Please enter a valid code',
                   val => /^[0-9]*$/.test(val) || 'Please enter a valid code',
                   val => val.length === 4 || 'Please enter a valid code']"
        />
      </q-card-section>

      <q-card-actions class="row flex-center q-pt-none q-mb-sm">
        <q-btn
          no-caps
          class="col-4 bg-brand-blue text-grey-1"
          label="Go Back"
          to="/"
        />
        <q-btn
          no-caps
          class="col-4 bg-brand-teal text-grey-1"
          label="Verify"
          type="submit"
          :loading="loading"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'verifyOTP',
  data () {
    return {
      code: null,
      loading: false
    }
  },
  methods: {
    ...mapActions('user', ['confirmSignIn']),
    onSubmit () {
      this.loading = true
      this.confirmSignIn({ otp: this.code, cognitoUser: this.$route.params.cognitoUser })
    }
  }
}
</script>

<style>
.input {
  text-align: center;
}
</style>
