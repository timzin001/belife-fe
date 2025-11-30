<template>
  <div class="w-full h-full app">
    <Toast />
    <div class="flex flex-1 flex-col transition">
      <NoAuthHeader />
      <div class="page-contain">
        <slot></slot>
        <Footer></Footer>
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
import en from '../i18n/primevue_en.json'
import vi from '../i18n/primevue_vi.json'
const primevue = usePrimeVue()
/// Define
const { locale } = useI18n()
watch(
  locale,
  (newLocale) => {
    if (newLocale === 'vi') {
      primevue.config.locale = vi
    } else {
      primevue.config.locale = en
    }
  },
  { immediate: true }
)
onMounted(() => {})
</script>
