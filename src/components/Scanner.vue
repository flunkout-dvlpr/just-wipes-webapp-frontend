<template>
  <div>
    <q-btn
      color="brand-blue"
      rounded
      icon="camera_alt"
      no-caps
      label="Add Points!"
      size="md"
      @click="turnCameraOn()"
      v-show="!showCamera"
    />
    <div v-if="showCamera">
      <qrcode-stream
        :camera="camera"
        @decode="onDecode"
      />
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import { mapActions } from 'vuex'
export default {
  name: 'Scanner',
  components: { QrcodeStream },
  data () {
    return {
      camera: 'auto',
      showCamera: false
    }
  },
  computed: {
    todaysDate () {
      var today = new Date()
      var dd = String(today.getDate()).padStart(2, '0')
      var mm = String(today.getMonth() + 1).padStart(2, '0')
      var yyyy = today.getFullYear()
      return mm + '/' + dd + '/' + yyyy
    }
  },
  methods: {
    ...mapActions('user', ['addPurchase']),
    async onDecode (content) {
      // Store/Update Vuex with new content (if successful scan occurs)
      var codeObject = JSON.parse(content)
      codeObject.date = this.todaysDate
      console.log(codeObject)
      this.addPurchase(codeObject)
      this.turnCameraOff()
    },
    turnCameraOn () {
      this.camera = 'auto'
      this.showCamera = true
    },
    turnCameraOff () {
      this.camera = 'off'
      this.showCamera = false
    }
  }
}
</script>

<style>
</style>
