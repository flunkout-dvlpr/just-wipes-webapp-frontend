<template>
  <q-page>
    <q-card ref="myWipes" class="row flex-center q-mx-sm q-mt-xl shadow-15">
      <q-banner rounded class="col-12 bg-secondary text-grey-9 text-center">
        <span class="text-h5"> My Wipes </span>
      </q-banner>
        <q-tabs
          v-model="tab"
          dense
          spread
          class="full-width bg-grey-1 text-grey-9"
          indicator-color="grey-9"
          align="justify"
        >
          <q-tab name="points" label="Points" />
          <q-tab name="timer" label="Timer" />
          <q-tab name="info" label="Info" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="points">
            <div class="text-h6">Points</div>
            Display previously scanned wipes QR/UUID code, each pack is equal to X points.
            Display Total points earned under number
            <div class="q-pa-none">
              <q-table
                title="Purchases"
                :data="data"
                :columns="columns"
                row-key="name"
              />
            </div>
          </q-tab-panel>

          <q-tab-panel name="timer" class="row">
            <div align="center" class="col-12 text-h6">Timer</div>
            <div align="center" class="col-12 text-h2">
              {{ progress | msToMin }}
            </div>
            <q-select
              class="q-px-sm q-pt-sm col-12 text-grey-9"
              label-color="primary"
              standout="bg-primary text-grey-9"
              bg-color="grey-3"
              dense
              v-model="brand"
              :options="brandOptions"
              label="Wipe Brand"
            />
            <q-select
              class="q-pa-sm col-12"
              label-color="primary"
              standout="bg-primary text-grey-9"
              bg-color="grey-3"
              dense
              v-model="product"
              :options="productOptions"
              label="Wipe Product"
            />
            <div align="center" class="col-12 text-center text-h6">
              <q-chip
                square
                align="center"
                color="primary"
                text-color="grey-1"
                icon="timer"
              >
                Dry Time: {{ productDryTime | msToMin }}
              </q-chip>
            </div>
            <div class="col-12 justify-around q-py-xs">
              <q-btn
                icon="timer"
                label="Start Timer"
                class="q-mx-xs col-5"
                @click="countDownTimer()"
              />
              <q-btn
                icon="timer_off"
                label="Reset Timer"
                class="q-mx-xs col-5"
                @click="resetCountDown()"
              />
            </div>

            Display timer for wipe countdown, drop down buttons to select brand/product.
            Each completed countdown equals X points
          </q-tab-panel>

          <q-tab-panel name="info">
            <div class="text-h6">Info</div>
            Educate the user on the ingredients used in wipes and tips on properly disinfecting
          </q-tab-panel>
        </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      duration: 30000,
      progress: 0,
      tab: 'timer',
      running: false,
      brand: null,
      brandOptions: [
        {
          label: 'Just Wipes',
          value: 1
        },
        {
          label: 'Clorox',
          value: 2
        },
        {
          label: 'Lysol',
          value: 3
        },
        {
          label: 'Honest',
          value: 4
        }
      ],
      products: [
        {
          id: 1,
          options: [{ label: 'Just Wipes', value: 1, dryTime: 30000 }, { label: 'Plane Wipes', value: 2, dryTime: 10000 }]
        },
        {
          id: 2,
          options: [{ label: 'Fresh Scent', value: 1, dryTime: 120000 }, { label: 'Fresh Scent - On The Go', value: 2, dryTime: 30000 }]
        },
        {
          id: 3,
          options: [{ label: 'Lemon & Lime Blossom', value: 1, dryTime: 45000 }, { label: 'Brighter Horizon - Flatpacks', value: 2, dryTime: 30000 }]
        },
        {
          id: 4,
          options: [{ label: 'Wipes with Aloe', value: 1, dryTime: 60000 }]
        }
      ],
      product: null,
      data: [
        {
          name: 'Just Wipes',
          date: '10/09/2020',
          points: 25
        },
        {
          name: 'Plane Wipes',
          date: '09/25/2020',
          points: 35
        },
        {
          name: 'Just Wipes',
          date: '08/12/2020',
          points: 25
        }
      ],
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
        { name: 'points', label: 'Points', field: 'points', sortable: true }
      ]
    }
  },
  filters: {
    msToMin: function (milliseconds) {
      const minutes = Math.floor(milliseconds / 60000)
      const seconds = ((milliseconds % 60000) / 1000).toFixed(0)
      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    }
  },
  computed: {
    productOptions () {
      if (this.brand) {
        var selectedProduct = this.products.find(product => product.id === this.brand.value)
        console.log(selectedProduct)
        return selectedProduct.options
      }
      return []
    },
    productDryTime () {
      if (this.product) {
        console.log(this.product)
        return this.product.dryTime
      }
      return 0
    }
  },
  methods: {
    resetCountDown () {
      this.progress = 0
      this.running = false
      clearInterval(this.secondInterval)
    },
    countDownTimer () {
      if (!this.running) {
        this.running = true
        this.secondInterval = setInterval(() => {
          this.progress += 1000
          if (this.progress >= this.productDryTime) {
            clearInterval(this.secondInterval)
            this.progress = 0
            this.running = false
            console.log('Timer Is Done')
            this.$q.notify({
              position: 'top',
              color: 'positive',
              textColor: 'white',
              icon: 'new_releases',
              message: 'Timer Done!'
            })
          }
        }, 1000)
      }
    }
  }
}
</script>

<style>

</style>
