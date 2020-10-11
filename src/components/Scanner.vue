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
    <q-dialog v-model="showCamera">
      <qrcode-stream
        :camera="camera"
        @decode="onDecode"
      />
    </q-dialog>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
export default {
  name: 'Scanner',
  components: { QrcodeStream },
  data () {
    return {
      camera: 'auto',
      result: null,
      showCamera: false
    }
  },
  methods: {
    async onDecode (content) {
      // Store/Update Vuex with new content (if successful scan occurs)
      var codeObject = JSON.parse(content)
      console.log(codeObject)
      console.log(codeObject.points)
      this.result = codeObject
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
