<template lang="pug">
  SmartDialog(
    class="video-warp"
    v-model="isVideo"
    title="视频",
    size="md")
    .dialogdetail
      video(
        :src="videoURL"
        autoplay
        controls="controls"
        width="500"
        height="700") 当前浏览器不支持视频
</template>

<script>
  import SmartDialog from '@/components/SmartDialog'

  export default {
    components: {
      SmartDialog
    },
    props: {
      videoURL: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        isVideo: false
      }
    },
    methods: {
      showVideo () {
        this.isVideo = true
      }
    }
  }
</script>

<style scoped lang="sass">
.video-warp
  text-align: center
.dialogdetail
  padding: 16px
</style>
