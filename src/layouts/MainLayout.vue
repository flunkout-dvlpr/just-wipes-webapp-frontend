<template>
  <q-layout view="lHh Lpr lFf" class="bg-primary">
    <q-header elevated>
      <q-toolbar class="row bg-grey-1">
        <q-toolbar-title class="text-grey-9">
          <div @click="goHome">
            <img
              src="~assets/justWipes.png"
              class="q-pt-xs"
            />
          </div>
        </q-toolbar-title>
        <q-btn
          size="lg"
          flat round dense
          color="grey-9"
          icon="shopping_cart"
          type="a"
          target="_blank"
          href="https://justwipes.co/"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  methods: {
    goHome () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
