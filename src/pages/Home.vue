<template>
  <q-page class="row flex flex-center">
    <q-card class="col-xs-11 col-sm-11 col-md-6 col-lg-6 col-xl-6 bg-grey-1 shadow-15">
      <q-banner rounded class="bg-brand-orange text-grey-9 text-center">
        <span class="text-h4 text-grey-1"> Wipe Companion </span>
      </q-banner>
        <q-tabs
          v-model="tab"
          dense
          spread
          class="bg-grey-1 text-grey-9"
          indicator-color="grey-9"
          align="justify"
        >
          <q-tab name="points" label="Points" @click="handleUser" />
          <q-tab name="timer" label="Timer" />
          <q-tab name="shop" label="Shop" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="points">
            <Points v-if="token" />
            <router-view v-else />
          </q-tab-panel>

          <q-tab-panel name="timer">
            <Timer />
          </q-tab-panel>

          <q-tab-panel name="shop">
            <Shop />
          </q-tab-panel>
        </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import Points from 'components/Points'
import Timer from 'components/Timer'
import Shop from 'components/Shop'
import { mapGetters } from 'vuex'
export default {
  name: 'Profile',
  components: { Points, Timer, Shop },
  data () {
    return {
      tab: 'timer'
    }
  },
  computed: {
    ...mapGetters('user', ['token'])
  },
  methods: {
    handleUser () {
      if (!this.token) {
        console.log('no user')
        this.$router.push({ name: 'SignIn' })
      }
    }
  }
}
</script>

<style>

</style>
