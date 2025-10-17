<template>
  <Dialog
    modal
    :dismissableMask="true"
    v-model:visible="instance.visible"
    @update:visible="updateVisible"
  >
    <template #container>
      <div class="header flex">
        <span class="font-bold text-[16px] flex-1">{{ props.title }}</span>
      </div>

      <div class="body w-full flex flex-col">
        <div class="line h-[2px] rouned-[5px] mb-[15px]"></div>
        <div>{{ props.message }}</div>
        <div class="line h-[2px] rouned-[5px] mt-[15px]"></div>
      </div>
      <div class="footer flex item-center justify-end">
        <Button
          class="h-[32px] w-[90px]"
          type="button"
          :label="$t('cancel')"
          severity="warn"
          @click="clickClose"
        >
          <template #icon>
            <img :src="Times" class="w-[16px] icon" />
          </template>
        </Button>

        <Button
          class="ml-[20px] h-[32px] w-[90px]"
          type="button"
          severity="success"
          :label="$t('select')"
          @click="clickOk"
        >
          <template #icon> <img :src="Check" class="w-[16px] icon" /> </template
        ></Button>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
/// Import
import type { InformDialogType } from '~/types/common/InformType'
import Check from '~/assets/icons/check.svg'
import Times from '~/assets/icons/times.svg'
/// Define
const toast = useToast()
const { t, locale } = useI18n()
const emits = defineEmits(['click-close', 'click-ok'])
const props = defineProps({
  title: {
    type: String,
  },
  message: {
    type: String,
  },
  data: {
    type: Object as PropType<any>,
  },
  visible: {
    type: Boolean,
    required: false,
  },
})
const instance = ref<InformDialogType>({
  visible: false,
})

/// Update visible
const updateVisible = (value: any) => {
  if (!value) {
    /// Close dialog
    instance.value.visible = props.visible
    emits('click-close')
  }
}

/// Click close dialog
const clickClose = () => {
  emits('click-close')
}

/// Click close dialog
const clickOk = () => {
  emits('click-ok')
}
watch(
  () => props.visible,
  (value) => {
    /// Update show or hide from parent
    instance.value.visible = props.visible
  }
)
</script>
<style scoped lang="scss">
@import url('~/assets/scss/components/InformDialog.scss');
</style>
