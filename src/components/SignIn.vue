<template>
  <q-card class="col-xs-11 col-sm-6 col-md-3 col-lg-3 col-xl-3 q-ma-xl shadow-15 bg-grey-1">
    <q-banner rounded class="col-11 bg-brand-orange text-grey-1 q-mb-md text-center">
      <span class="text-h5"> Sign In </span>
    </q-banner>
    <q-form
     @submit.prevent="onSubmit"
    >
      <q-card-section class="row flex-center">
        <q-input
          filled
          class="col-9"
          bg-color="grey-4"
          v-model="phone"
          label="Phone Number"
          fill-mask
          type="tel"
          unmasked-value
          mask="+1 (###) - ### - ####"
          :rules="[val => !!val || 'Please enter a valid number',
                   val => /^[0-9]*$/.test(val) || 'Please enter numbers only',
                   val => val.length === 10 || 'Please enter a valid number']"
        />
      </q-card-section>

      <q-card-actions  class="row flex-center q-pt-none q-mb-sm">
        <q-btn
          no-caps
          class="col-4 bg-brand-blue text-grey-1"
          label="Sign Up!"
          to="/sign-up"
        />
        <q-btn
          no-caps
          class="col-4 bg-brand-teal text-grey-1"
          label="Sign In"
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
  name: 'SignIn',
  data () {
    return {
      phone: null,
      loading: false
    }
  },
  methods: {
    ...mapActions('user', ['signIn']),
    onSubmit () {
      this.loading = true
      this.signIn(this.phone).then((response) => {
        if (response.challengeName === 'CUSTOM_CHALLENGE') {
          this.loading = false
          this.$router.push({ name: 'Verify', params: { cognitoUser: response } })
        } else {
          this.loading = false
          console.log('Error:', response)
        }
      })
    }
  }
}
</script>

<style>

</style>
