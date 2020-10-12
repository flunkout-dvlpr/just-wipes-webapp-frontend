<template>
  <div>
    <div class="text-h4">Welcome {{userName}}!</div>
    <div class="row flex-center">
      <Scanner class="q-pa-md">
      </Scanner>
    </div>

    <div class="q-pa-none">
      <q-table
        title="Purchase Reward Points"
        :data="purchases || []"
        :columns="columns"
        row-key="name"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Scanner from 'components/Scanner'
export default {
  name: 'Points',
  components: {
    Scanner
  },
  data () {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Product',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'date', align: 'center', label: 'Date Purchased', field: 'date', sortable: true },
        { name: 'points', align: 'center', label: 'Points', field: 'points', sortable: true }
      ]
    }
  },
  computed: {
    ...mapGetters('user', ['user', 'data']),
    purchases () {
      return this.data.purchases
    },
    userName () {
      console.log(this.user.attributes.name)
      return this.user.attributes.name
    }
  }
}
</script>

<style>
</style>
