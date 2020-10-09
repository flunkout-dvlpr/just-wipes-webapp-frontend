<template>
  <div class="row flex-center">
    <q-btn
      color="brand-blue"
      rounded
      icon="camera_alt"
      no-caps
      label="Read QR Code"
      class="col-xs-8 col-sm-4 col-md-4 col-lg-4 col-xl-2"
      @click="turnCameraOn()"
      v-show="!showCamera"
    />
    <p
      class="text-subtitle1"
      v-if="result"
    >
      Result: <b>{{ result }}</b>
    </p>
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
export default {
  name: 'Scanner',
  components: { QrcodeStream },
  data () {
    return {
      isValid: undefined,
      camera: 'auto',
      result: null,
      showCamera: false
    }
  },
  methods: {
    async onDecode (content) {
      this.result = content
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
