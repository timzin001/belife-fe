<template>
  <div class="flex items-center justify-center w-full header card">
    <div class="flex flex-col justify-center">
      <div class="header-text font-bold text-[12px]">SOI-VIP</div>
      <div class="tex-[12px]">
        {{ $t('news_and_mananges') }}
      </div>
    </div>

    <div class="flex-1"></div>

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
import type { NoAuthHeaderType } from '~/types/common/NoAuthHeaderType'
import { GlobalStore } from '~/store/Global'
import { ref } from 'vue'
import EnglishFlag from '~/assets/flags/united_kingdom.svg'
import VietNamFlag from '~/assets/flags/vietnam.svg'

// https://nucleoapp.com/svg-flag-icons
/// Define
const { setLocale } = useI18n()
const store = GlobalStore()
const instance = ref(<NoAuthHeaderType>{
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

/// Change language
const onChangeLanguage = (evt: any) => {
  const code: any = instance.value.language?.code ?? 'en'
  setLocale(code)
  store.setLanguage(code)
}
</script>

<style scoped lang="scss">
.header {
  padding-left: 16px;
  padding-right: 16px;
  height: 50px;
  .header-text {
    font-size: 18px;
  }
}

@media screen and (min-width: $mobile-min) and (max-width: $mobile-max) {
  .header {
    padding-left: 8px;
    padding-right: 8px;
    height: 60px;

    .header-text {
      font-size: 16px;
    }
  }
}
</style>
