<template>
  <div class="row flex-center q-col-gutter-lg items-stretch">
<!--     <div class="q-gutter-xl">
      <q-card style="height: auto; max-width: 40vh">
        <q-card-section>
          Some Text
        </q-card-section>
      </q-card>
    </div> -->
    <div v-for="product in products" :key="product.id">
      <q-card style="height: 42vh; width: 40vh">
        <q-img
          :src="product.image"
          style="height: 30vh; width: 40vh"
        />

        <q-card-actions>
          <div class="col-10" align="left">
            <div class="text-h6">{{ product.label }}</div>
            <div class="text-subtitle">{{ product.subtitle }}</div>
          </div>
          <div class="col-2">
            <q-btn
              flat
              class="col-12"
              :color="product.color"
              icon="shopping_basket"
              size="lg"
            />
            <div class="text-center col-12">{{ product.price }}</div>
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Shop',
  data () {
    return {
      products: [
        {
          label: 'Just Wipes',
          subtitle: '(70% Isopropyl, 30% Water and Aloe Extract)',
          image: 'https://s3.us-east-2.amazonaws.com/www.justwipes.com/just.png',
          color: 'brand-teal',
          price: '$0.00',
          link: ''
        },
        {
          label: 'Plane Wipes - 6 Pack',
          subtitle: '(70% Isopropyl Alcohol)',
          image: 'https://s3.us-east-2.amazonaws.com/www.justwipes.com/plane.png',
          color: 'brand-orange',
          price: '$0.00',
          link: ''
        },
        {
          label: 'Mat Wipes',
          subtitle: '',
          image: 'https://s3.us-east-2.amazonaws.com/www.justwipes.com/mat.png',
          color: 'brand-yellow',
          price: '$0.00',
          link: ''
        },
        {
          label: 'Industry Wipes',
          subtitle: '',
          image: 'https://s3.us-east-2.amazonaws.com/www.justwipes.com/industry.png',
          color: 'brand-orange',
          price: '$0.00',
          link: ''
        },
        {
          label: 'Sex Wipes',
          subtitle: '',
          image: 'https://s3.us-east-2.amazonaws.com/www.justwipes.com/sex.png',
          color: 'brand-purple',
          price: '$0.00',
          link: ''
        }
      ]
    }
  }
}
</script>

<style>
</style>
