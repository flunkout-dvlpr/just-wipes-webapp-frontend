<template>
<div>
    <div align="center">
      <div class="text-h6">Timer</div>
      <div class="text-h2">
        {{ progress | msToMin }}
      </div>
    </div>
    <div class="row flex-center">
     <q-select
       dense
       class="q-ma-xs col-xs-10 col-lg-3 text-grey-9"
       v-model="brand"
       :options="brandOptions"
       label="Wipe Brand"
     />
     <q-select
       dense
       class="q-ma-xs col-xs-10 col-lg-3 text-grey-9"
       v-model="product"
       :options="productOptions"
       label="Wipe Product"
     />
    </div>
    <div class="row flex-center">
      <q-btn
        size="sm"
        icon="timer"
        label="Start Timer"
        class="q-ma-xs"
        @click="countDownTimer()"
      />
      <q-btn
        size="sm"
        icon="timer_off"
        label="Reset Timer"
        class="q-ma-xs"
        @click="resetCountDown()"
      />
    </div>
    <div class="row flex-center">
      <q-chip
        square
        color="brand-orange"
        text-color="grey-1"
        icon="timer"
      >
        Dry Time: {{ productDryTime | msToMin }}
      </q-chip>
    </div>
    <hr>
    <div>
      <div class="text-h4" v-if="product">{{ product.label }}</div>
      <div class="text-h4" v-else>Product Info</div>
        Dynamically display information about selected product
    </div>
</div>
</template>

<script>
export default {
  name: 'Timer',
  data () {
    return {
      duration: 30000,
      progress: 0,
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
          options: [
            { label: 'Just Wipes', value: 1, dryTime: 30000 },
            { label: 'Plane Wipes', value: 2, dryTime: 10000 },
            { label: 'Mat Wipes', value: 3, dryTime: 15000 },
            { label: 'Sex Wipes', value: 4, dryTime: 35000 }
          ]
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
      product: null
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
