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
            <label for="phone-number" class="label"
              >{{ $t('phone_number') }}<span>*</span></label
            >
            <Select
              v-model="instance.dialCode"
              :options="instance.countries"
              optionLabel="name"
              :autoOptionFocus="true"
              @change="changeDialCode"
              placeholder="Select a Country"
              class="w-[110px] h-[32px] mr-[5px]"
            >
              <template #value="slotProps">
                <div
                  v-if="slotProps.value"
                  class="flex items-center justify-center h-[32px] pl-[10px]"
                >
                  <img
                    :alt="slotProps.value.code"
                    :src="slotProps.value.icon"
                    style="width: 18px"
                  />
                  <div class="text-[14px] ml-[5px]">
                    {{ slotProps.value.code }}
                  </div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div
                  class="flex items-center justify-center pl-[10px] h-[32px]"
                >
                  <img
                    :alt="slotProps.option.code"
                    :src="slotProps.option.icon"
                    style="width: 18px"
                  />
                  <div class="text-[14px] ml-[5px]">
                    {{ slotProps.option.code }}
                  </div>
                </div>
              </template>
            </Select>
            <InputMask
              class="h-[32px] flex-1"
              autocomplete="off"
              id="phone-number"
              @value-change="changePhoneNumber"
              v-model="instance.phoneNumber"
              :mask="instance.phoneNumberPattern"
              :placeholder="instance.phoneNumberPlaceHolder"
              fluid
            />
          </div>

          <Message
            v-if="instance.phoneNumberError"
            severity="error"
            size="small"
            variant="simple"
            >{{ instance.phoneNumberError }}</Message
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
import type { UpdatePhoneNumberData } from '~/types/user/ProfileType'
import { ProfileValidate } from '~/validate/ProfileValidate'

import SingaporeFlag from '~/assets/flags/singapore.svg'
import VietNamFlag from '~/assets/flags/vietnam.svg'

/// Define
const toast = useToast()
const { t } = useI18n()
const emits = defineEmits(['click-close', 'click-save'])
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
})
const instance = ref<UpdatePhoneNumberData>({
  titleDialog: t('update_phone_number'),
  phoneNumberPattern: '999-999-999',
  // +65 XXXX XXXX
  phoneNumberPlaceHolder: '123-345-789',
  dialCode: {
    code: '(+84)',
    icon: VietNamFlag,
  },
  countries: [
    {
      code: '(+84)',
      icon: VietNamFlag,
    },
    {
      code: '(+65)',
      icon: SingaporeFlag,
    },
  ],
})

/// Method
const clickSave = async () => {
  const validate = ProfileValidate.phoneNumber(instance, t)
  if (!validate) {
    return
  }
  /// Show loading
  instance.value.loading = true
  /// Update full name
  let phoneNumberStr = `${instance.value.phoneNumber ?? ''}`
  const phoneNumber = `${
    instance.value.dialCode?.code ?? ''
  }${phoneNumberStr.replaceAll('-', '')}`

  const options: any = {
    method: Method.POST,
    body: {
      phoneNumber: phoneNumber,
    },
  }
  const { data, error, status } = await CallAPI(
    APIPathAccount.POST_UPDATE_PHONE_NUMBER_USER,
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
    detail: t('phone_number_updated_successful'),
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
/// Change phone number
const changePhoneNumber = async (evt: any) => {
  ProfileValidate.phoneNumber(instance, t)
}
/// Change dial code
const changeDialCode = async (evt: any) => {
  ProfileValidate.changeDialCode(evt, instance)
}

watch(
  () => props.visible,
  (value) => {
    /// Update show or hide from parent
    instance.value.visible = props.visible
  }
)
// watch(
//   () => props.nickName,
//   (value) => {
//     /// Update full name
//     instance.value.nickName = props.nickName
//   }
// )
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
    background-color: $border-color;
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
      border-radius: 5px;
      border-bottom: 1px dashed $border-color;
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
