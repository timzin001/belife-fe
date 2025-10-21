<template>
  <div class="flex items-center justify-center w-full header card">
    <div
      class="flex items-center justify-center h-[35px] w-[35px] text-[20px] font-[400] rounded-full hover-button cursor-pointer menu-icon"
      @click="clickMenu"
    >
      <img :src="AlignLeft" />
    </div>

    <div class="flex-1"></div>
    <div class="relative h-[30px] search">
      <AutoComplete
        v-model="instance.searchValue"
        optionLabel="name"
        :placeholder="$t('searching_dot')"
        :suggestions="instance.searchResult"
        @complete="search"
      >
        <template #option="slotProps">
          <div class="flex align-options-center">
            <img
              :alt="slotProps.option.name"
              src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
              :class="`flag flag-${slotProps.option.code.toLowerCase()} mr-2`"
              style="width: 18px"
            />
            <div>{{ slotProps.option.name }}</div>
          </div>
        </template>
      </AutoComplete>
      <i
        class="pi pi-search absolute z-[1] left-[10px] top-[8px] search-icon"
      />
    </div>

    <div class="flex items-center justify-center w-[145px]">
      <Select
        v-model="instance.language"
        :options="instance.listLanguages"
        optionLabel="name"
        :autoOptionFocus="true"
        @value-change="onChangeLanguage"
        placeholder="Select a Country"
        class="w-[145px] h-[30px] mr-[5px]"
      >
        <template #value="slotProps">
          <div
            v-if="slotProps.value"
            class="flex items-center justify-start h-[100%] pl-[10px]"
          >
            <img
              :alt="slotProps.value.code"
              :src="slotProps.value.icon"
              style="width: 18px"
            />
            <div class="text-[14px] ml-[5px]">
              {{ slotProps.value.name }}
            </div>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <template #option="slotProps">
          <div class="flex items-center justify-center pl-[10px] h-[30px]">
            <img
              :alt="slotProps.option.code"
              :src="slotProps.option.icon"
              style="width: 18px"
            />
            <div class="text-[14px] ml-[5px]">
              {{ slotProps.option.name }}
            </div>
          </div>
        </template>
      </Select>
    </div>
  </div>
</template>
<script setup lang="ts">
/// Import
import { GlobalStore } from '~/store/Global'
import { ref } from 'vue'
import EnglishFlag from '~/assets/flags/united_kingdom.svg'
import VietNamFlag from '~/assets/flags/vietnam.svg'
import AlignLeft from '~/assets/icons/align-left.svg'
import type { HeaderType } from '~/types/common/HeaderType'

const value = ref(null)
const items = ref([])
// https://nucleoapp.com/svg-flag-icons
/// Define
const { setLocale, locale } = useI18n()
const store = GlobalStore()

const instance = ref(<HeaderType>{
  language: {
    name: 'English',
    code: 'en',
    icon: EnglishFlag,
  },
  listLanguages: [
    {
      name: 'English',
      code: 'en',
      icon: EnglishFlag,
    },
    {
      name: 'Tiếng việt',
      code: 'vi',
      icon: VietNamFlag,
    },
  ],
})

const emits = defineEmits(['clickMenu'])

/// Function
const clickMenu = () => {
  emits('clickMenu')
}

const search = (evt: any) => {
  instance.value.searchResult = [...Array(10).keys()].map(
    (item) => evt.query + '-' + item
  )
}

/// Change language
const onChangeLanguage = (evt: any) => {
  const code: any = instance.value.language?.code ?? 'en'
  setLocale(code)
  store.setLanguage(code)
}

/// Set lang
const setLang = (value: any) => {
  const listLanguages: any = instance.value.listLanguages
  if (!value || value === 'en') {
    instance.value.language = listLanguages[0]
  } else {
    instance.value.language = listLanguages[1]
  }
}

watch(
  () => store.getLanguage(),
  (value) => {
    /// Set language
    setLang(value)
  }
)

onMounted(() => {
  /// Set language
  setLang(store.getLanguage())
})
const initData = () => {
  if (locale.value === Locale.VI) {
    instance.value.language = instance.value.listLanguages[1]
  } else {
    instance.value.language = instance.value.listLanguages[0]
  }
}
initData()
</script>

<style scoped lang="scss">
@import url('~/assets/scss/components/Header.scss');
</style>
