<template>
  <div class="img-group">
    <img
      :src="instance.image"
      @load="handleLoad"
      @error="handleError"
      alt="Image"
      class="w-full image"
    />
    <div class="loading-group" v-if="instance.loading">
      <div class="spinner-mini"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { ImageType } from '~/types/common/ImageType'
import DefaultAvatar from '~/assets/images/default-avatar.png'
const props = defineProps({
  src: {
    type: String,
  },
})

const instance = ref<ImageType>({
  loading: true,
  image: null,
})
const handleLoad = () => {
  instance.value.loading = false
}
const handleError = () => {
  instance.value.loading = false
  instance.value.image = DefaultAvatar
}
const initData = () => {
  if (!props.src) {
    props.src == DefaultAvatar
    instance.value.loading = false
  } else {
    instance.value.image = props.src
    instance.value.loading = true
  }
}
watch(
  () => props.src,
  (value) => {
    initData()
  }
)
initData()
</script>
<style scoped lang="scss">
@import url('~/assets/scss/components/LoadingImg.scss');
</style>
