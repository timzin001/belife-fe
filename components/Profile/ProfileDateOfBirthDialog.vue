<template>
  <Dialog
    modal
    :dismissableMask="true"
    v-model:visible="instance.visible"
    @update:visible="updateVisible"
  >
    <template #container>
      <div class="header flex">
        <span class="font-bold text-[16px] flex-1">{{
          instance.titleDialog
        }}</span>
        <div class="flex loading" v-if="instance.loading">
          <div class="spinner-mini"></div>
        </div>
      </div>
      <div class="body">
        <div class="line h-[2px] rouned-[5px]"></div>

        <div class="mt-[20px] mb-[20px]">
          <div class="flex items-center justify-start">
            <DatePicker
              ref="datePicker"
              v-model="instance.dateOfBirth"
              inline
              class="w-full"
              @value-change="changeDate"
            />
          </div>

          <Message
            v-if="instance.dateOfBirthError"
            severity="error"
            size="small"
            variant="simple"
            >{{ instance.dateOfBirthError }}</Message
          >
        </div>

        <div class="line h-[2px] rouned-[5px]"></div>
      </div>
      <div class="footer flex item-center justify-end">
        <Button
          class="h-[32px] w-[90px]"
          type="button"
          :label="$t('cancel')"
          severity="warn"
          icon="pi pi-times"
          @click="clickClose"
        ></Button>

        <Button
          class="ml-[20px] h-[32px] w-[90px]"
          type="button"
          severity="success"
          :label="$t('save')"
          icon="pi pi-save"
          @click="clickSave"
        ></Button>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
/// Import
import type { UpdateDateOfBirthData } from '~/types/user/ProfileType'
import { ProfileValidate } from '~/validate/ProfileValidate'
/// Define
const datePicker = ref()
const toast = useToast()
const { t } = useI18n()
const emits = defineEmits(['click-close', 'click-save'])
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },

  date: {
    type: [Date, null],
    required: true,
  },
})
const instance = ref<UpdateDateOfBirthData>({
  titleDialog: t('update_date_of_birth'),
  dateOfBirth: props.date,
})

/// Method
const clickSave = async () => {
  const validate = ProfileValidate.dateOfBirth(instance, t)
  if (!validate) {
    return
  }
  /// Show loading
  instance.value.loading = true
  /// Update full name
  const options: any = {
    method: Method.POST,
    body: {
      dateOfBirth: instance.value.dateOfBirth?.toISOString(),
    },
  }
  const { data, error, status } = await CallAPI(
    APIPath.POST_UPDATE_DATE_OF_BIRTH_USER,
    options,
    toast,
    t,
    false
  )
  instance.value.loading = false
  /// Check error
  if (status.value !== APIStatus.SUCCESS) {
    return
  }
  const contain: any = data.value
  const result = contain.data
  toast.add({
    severity: Toast.SUCCESS,
    summary: t('success'),
    detail: t('date_of_birth_updated_successful'),
    life: Toast.DURATION,
  })
  emits('click-save', result)
}

/// Click close dialog
const clickClose = () => {
  emits('click-close')
}
/// Update visible
const updateVisible = (value: any) => {
  if (!value) {
    /// Close dialog
    instance.value.visible = props.visible
    emits('click-close')
  }
}

/// Change date
const changeDate = (evt: any) => {
  ProfileValidate.dateOfBirth(instance, t)
}

watch(
  () => props.visible,
  (value) => {
    /// Update show or hide from parent
    instance.value.visible = props.visible
  }
)
watch(
  () => props.date,
  (value) => {
    /// Update date
    instance.value.dateOfBirth = props.date
  }
)
onMounted(() => {})
</script>

<style></style>
<style scoped lang="scss">
:deep(.p-message-text) {
  padding-left: 110px !important;
}
.header,
.body,
.footer {
  width: 500px;
  padding-left: 30px;
  padding-right: 30px;
  font-size: 14px;
}
.header {
  padding-top: 30px;
  padding-bottom: 20px;
}
.footer {
  padding-top: 20px;
  padding-bottom: 30px;
}
.body {
  padding-bottom: unset;
  padding-top: unset;
  .line {
    border-radius: 5px;
    border-bottom: 1px dashed $border-color;
  }
  .label {
    width: 110px;
    span {
      color: red;
      margin-left: 2px;
    }
  }
  .image {
    width: 50px;
  }
  .avatar-des {
    margin-left: 110px;
  }
}
/// Mobile
@media screen and (min-width: $mobile-min) and (max-width: $mobile-max) {
  :deep(.p-message-text) {
    padding-left: 100px !important;
  }
  .header,
  .body,
  .footer {
    width: 100%;
    padding: 10px;
  }
  .header {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .footer {
    padding-top: 20px;
  }
  .body {
    padding-bottom: unset;
    padding-top: unset;
    .avatar-des {
      margin-left: 100px;
    }
    .line {
      background-color: $border-color;
    }
    .label {
      width: 100px;
    }
    .image {
      width: 50px;
    }
  }
}
</style>
