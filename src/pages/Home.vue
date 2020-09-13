<template>
  <q-page class="flex flex-center">
    <SignIn></SignIn>
  </q-page>
</template>

<script>
import SignIn from 'components/SignIn'
export default {
  name: 'PageIndex',
  components: {
    SignIn
  }
}
</script>

<style>
/*.q-page {
  min-height: 656px !important;
}*/
</style>
