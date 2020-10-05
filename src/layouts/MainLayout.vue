<template>
  <q-layout view="lHh Lpr lFf" class="bg-brand-teal">
    <q-header elevated>
      <q-toolbar class="row bg-grey-1">
        <q-toolbar-title class="text-grey-9">
          <div>
            <router-link to="/">
              <img
                src="~assets/justWipes.png"
                class="q-pt-xs"
                style="width:20vh;height:auto;"
              />
            </router-link>
          </div>
        </q-toolbar-title>
        <q-btn
          no-caps
          size="md"
          label="Sign Out"
          flat dense
          color="grey-9"
          icon="exit_to_app"
          type="a"
          to="/"
        />
<!--         <q-btn
          size="md"
          flat round dense
          color="grey-9"
          icon="shopping_cart"
          type="a"
          target="_blank"
          href="https://justwipes.co/"
        /> -->
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout'
}
</script>
