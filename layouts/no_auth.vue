<template>
  <div class="w-full h-full app">
    <Toast />
    <div class="flex flex-1 flex-col transition">
      <NoAuthHeader />
      <div class="page-contain">
        <slot />
        <Footer />
      </div>
    </div>
  </div>
  <div
    class="not-support flex-col items-center justify-center font-bold text-[20px] relative"
  >
    <img :src="NotSupport" alt="logo" class="h-full w-full" />
    <div
      class="not-support-text absolute z-[1] flex items-center justify-center"
    >
      {{ $t('application_is_not_support_for_this_screen') }}
    </div>
  </div>
</template>

<script setup lang="ts">
/// Imports
import '@/assets/scss/Layout.scss'
import { GlobalStore } from '~/store/Global'
import NotSupport from '~/assets/images/background_not_support.jpeg'

/// Define
const store = GlobalStore()
const { t } = useI18n()

onMounted(() => {})
</script>
