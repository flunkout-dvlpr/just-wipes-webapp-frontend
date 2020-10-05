<template>
  <q-card class="col-xs-11 col-sm-6 col-md-3 col-lg-3 col-xl-3 shadow-15 bg-grey-1">
    <q-banner rounded class="col-11 bg-brand-orange text-grey-1 q-mb-md text-center">
      <span class="text-h5"> Sign Up </span>
    </q-banner>
    <q-form
     @submit.prevent="onSubmit"
    >
      <q-card-section class="flex-center col-10">
        <q-input
          filled
          bg-color="grey-4"
          class="q-pb-lg"
          v-model="name"
          label="Name"
          type="text"
          mask="SSSSSSSSSSSSSSSSSSSS"
          :rules="[val => !!val || 'Please enter a name',
                   val => /^[A-Za-z]+$/.test(val) || 'Please enter text only']"
        />
        <q-input
          filled
          bg-color="grey-4"
          class="q-pb-md"
          v-model="phone"
          label="Phone Number"
          unmasked-value
          mask="+1 (###) - ### - ####"
          :rules="[val => !!val || 'Please enter a valid number',
                   val => /^[0-9]*$/.test(val) || 'Please enter numbers only',
                   val => val.length === 10 || 'Please enter a valid number']"
        />
      </q-card-section>

      <q-card-actions class="flex-center col-10 q-pt-none q-pb-md">
        <q-btn
          no-caps
          class="col-10 bg-positive text-grey-1"
          label="Sign Up"
          type="submit"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
export default {
  name: 'SignIn',
  data () {
    return {
      phone: null,
      name: null
    }
  },
  methods: {
    onSubmit () {
      this.$q.notify({
        position: 'top',
        color: 'positive',
        textColor: 'white',
        icon: 'check_circle_outline',
        message: 'Account Created, Sign-In!'
      })
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style>

</style>
