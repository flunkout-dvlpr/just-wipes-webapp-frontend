<template>
  <q-card class="row flex-center q-mx-md shadow-15 bg-grey-1">
    <q-banner rounded class="col-12 bg-secondary text-grey-9 q-mb-lg text-center">
      <span class="text-h5"> Sign-In </span>
    </q-banner>
    <q-form
     @submit="onSubmit"
    >
      <q-card-section class="col-12">
        <q-input
          filled
          bg-color="grey-4"
          class="col-12"
          v-model="phone"
          label="Phone Number"
          unmasked-value
          mask="+1 (###) - ### - ####"
          :rules="[val => !!val || 'Please enter a valid number',
                   val => /^[0-9]*$/.test(val) || 'Please enter numbers only',
                   val => val.length === 10 || 'Please enter a valid number']"
        />
      </q-card-section>

      <q-card-actions class="col-10">
        <q-btn
          class="col-12 bg-positive text-grey-1"
          label="Sign-In"
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
      phone: null
    }
  },
  methods: {
    onSubmit () {
      this.$q.notify({
        position: 'top',
        color: 'positive',
        textColor: 'white',
        icon: 'emoji_emotions',
        message: 'Welcome!'
      })
      this.$router.push({ name: 'profile' })
    }
  }
}
</script>

<style>

</style>
