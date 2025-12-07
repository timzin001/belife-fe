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

        <div class="mt-[20px]">
          <div class="flex items-center justify-start">
            <label for="old-password" class="label"
              >{{ $t('old_password') }}<span>*</span></label
            >
            <Password
              id="old-password"
              v-model="instance.oldPassword"
              class="flex-auto h-[32px]"
              @value-change="changeOldPassword"
              autocomplete="off"
              toggleMask
              :feedback="false"
              :placeholder="
                $t('please_enter_name', {
                  name: $t('old_password').toLocaleLowerCase(),
                })
              "
            />
          </div>

          <Message
            v-if="instance.oldPasswordError"
            severity="error"
            size="small"
            variant="simple"
            >{{ instance.oldPasswordError }}</Message
          >
        </div>

        <div class="mt-[10px] mb-[20px]">
          <div class="flex items-center justify-start">
            <label for="new-password" class="label"
              >{{ $t('new_password') }}<span>*</span></label
            >
            <Password
              id="new-password"
              v-model="instance.newPassword"
              class="flex-auto h-[32px]"
              @value-change="changeNewPassword"
              autocomplete="off"
              :placeholder="
                $t('please_enter_name', {
                  name: $t('old_password').toLocaleLowerCase(),
                })
              "
              toggleMask
              :feedback="false"
            />
          </div>

          <Message
            v-if="instance.newPasswordError"
            severity="error"
            size="small"
            variant="simple"
            >{{ instance.newPasswordError }}</Message
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
import type { UpdatePasswordData } from '~/types/social/ProfileType'
import { ProfileValidate } from '~/validate/ProfileValidate'
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
const instance = ref<UpdatePasswordData>({
  titleDialog: t('update_password'),
})

/// Method
const clickSave = async () => {
  const validateOldPassword = ProfileValidate.oldPassword(instance, t)
  const validateNewPassword = ProfileValidate.newPassword(instance, t)
  if (!validateOldPassword || !validateNewPassword) {
    return
  }

  /// Show loading
  instance.value.loading = true
  /// Update full name
  const options: any = {
    method: Method.POST,
    body: {
      oldPassword: instance.value.oldPassword,
      newPassword: instance.value.newPassword,
    },
  }
  const { data, error, status } = await CallAPI(
    APIPath.POST_UPDATE_PASSWORD_USER,
    options,
    toast,
    t,
    false
  )
  instance.value.loading = false
  /// Check error
  if (status.value !== APIStatusCons.SUCCESS) {
    return
  }
  const contain: any = data.value
  const result = contain.data
  toast.add({
    severity: Toast.SUCCESS,
    summary: t('success'),
    detail: t('password_updated_successful'),
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

/// Change old password
const changeOldPassword = (evt: any) => {
  ProfileValidate.oldPassword(instance, t)
}

/// Change new password
const changeNewPassword = (evt: any) => {
  ProfileValidate.newPassword(instance, t)
}

/// Set max length
const setMaxLength = () => {
  const oldPasswordElement = document.getElementById('old-password')
  const newPasswordElement = document.getElementById('new-password')

  if (!oldPasswordElement || !newPasswordElement) {
    return
  }

  let oldPassword: any = oldPasswordElement?.firstChild
  oldPassword.setAttribute('maxlength', 20)

  let newPassword: any = newPasswordElement?.firstChild
  newPassword.setAttribute('maxlength', 20)
}

watch(
  () => props.visible,
  (value) => {
    /// Update show or hide from parent
    instance.value.visible = props.visible
    setTimeout(() => {
      setMaxLength()
    }, 50)
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
