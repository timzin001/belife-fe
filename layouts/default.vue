<template>
  <div class="w-full h-full app">
    <Toast />
    <div
      @click="clickMenu"
      ref="cover"
      class="cover absolute z-[9] h-full hide-cover"
    ></div>
    <div
      ref="leftMenu"
      class="absolute left-menu-contain z-[10] w-[300px] top-0 bottom-0 transition hide-menu"
    >
      <LeftMenu @click-close="clickMenu" />
    </div>

    <div ref="contain" class="flex flex-1 flex-col transition full-contain">
      <Header @click-menu="clickMenu" />
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
import { ref } from 'vue'
import { GlobalStore } from '~/store/Global'
import NotSupport from '~/assets/images/background_not_support.jpeg'
import en from '../i18n/primevue_en.json'
import vi from '../i18n/primevue_vi.json'

/// Define
const primevue = usePrimeVue()
const store = GlobalStore()
const leftMenu = ref()
const contain = ref()
const cover = ref()
const { t } = useI18n()

/// Function
/**
 * Click show or hide menu
 */
const clickMenu = () => {
  const className = leftMenu.value.className

  if (className.includes(Layout.SHOW_MENU)) {
    leftMenu.value.classList.remove(Layout.SHOW_MENU)
    contain.value.classList.remove(Layout.NO_FULL_CONTAIN)

    leftMenu.value.classList.add(Layout.HIDE_MENU)
    contain.value.classList.add(Layout.FULL_CONTAIN)

    cover.value.classList.remove(Layout.SHOW_COVER)
    cover.value.classList.add(Layout.HIDE_COVER)
  } else {
    leftMenu.value.classList.remove(Layout.HIDE_MENU)
    contain.value.classList.remove(Layout.FULL_CONTAIN)

    leftMenu.value.classList.add(Layout.SHOW_MENU)
    contain.value.classList.add(Layout.NO_FULL_CONTAIN)

    cover.value.classList.remove(Layout.HIDE_COVER)
    cover.value.classList.add(Layout.SHOW_COVER)
  }
}

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

onMounted(() => {
  /// Add header
  const script = document.createElement('script')
  script.src = '/tinymce/tinymce.min.js'
  script.onload = () => {
    store.setLoadEditor(true)
  }
  script.onerror = () => {
    console.error('Failed to load external script.')
  }
  document.head.appendChild(script)

  // store.setUser('Con ga con')
  // store.setUserAuth('con111')
  // store.setOrganizationAuth('org')
  // store.setOrganization('orgas')
  // store.setListOrganizations('lisOr')

  // const user = useCookie('user', CookieStorage.OPTION)
  // user.value = 'con ga'
  // const user2 = useCookie(CookieStorage.USER, CookieStorage.OPTION)

  // const counter = useCookie('counter', { default: Number })
  // counter.value = counter.value || Math.round(Math.random() * 1000)
})
</script>
