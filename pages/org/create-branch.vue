<template>
  <div class="page">
    <div class="card rounded-[8px] create-branch">
      <div
        class="text-[25px] font-bold ml-[0px] mb-[20px] w-full flex items-center justify-center"
      >
        {{ $t('create_name', { name: $t('branch').toLocaleLowerCase() }) }}
      </div>

      <div class="contain items-center justify-center">
        <div class="inner">
          <div>
            <div class="flex items-center justify-start">
              <label class="label">{{ $t('avatar') }}<span>*</span></label>
              <FileUpload
                mode="basic"
                @select="onFileSelectBranch"
                customUpload
                auto
                :chooseLabel="$t('choose')"
                severity="secondary"
                class="p-button-outlined h-[32px] flex-1"
              />
              <img :src="instance.avatar" alt="Image" class="w-full image" />
            </div>
            <div class="avatar-des">{{ $t('avatar_with_1_1_ratio') }}</div>
            <Message
              v-if="instance.avatarError"
              severity="error"
              size="small"
              variant="simple"
              >{{ instance.avatarError }}</Message
            >
          </div>
          <div class="mt-[10px]">
            <div class="flex items-center justify-start w-full">
              <label id="branch-name" class="label"
                >{{ $t('name') }}<span>*</span></label
              >
              <InputText
                id="branch-name"
                autocomplete="off"
                class="flex-1"
                v-model="instance.name[locale]"
                @blur="changeName"
                @value-change="changeName"
                :placeholder="
                  $t('please_enter_name', {
                    name: $t('name').toLocaleLowerCase(),
                  })
                "
              />
            </div>
            <Message
              v-if="instance.nameError"
              severity="error"
              size="small"
              variant="simple"
              >{{ instance.nameError }}</Message
            >
          </div>
          <div class="mt-[10px]">
            <div class="flex items-center justify-start w-full">
              <label for="branch-email" class="label"
                >{{ $t('email') }}<span>*</span></label
              >
              <InputText
                id="branch-email"
                autocomplete="off"
                @value-change="changeEmail"
                @blur="changeEmail"
                class="flex-1"
                v-model="instance.email"
                :placeholder="
                  $t('please_enter_name', {
                    name: $t('email').toLocaleLowerCase(),
                  })
                "
              />
            </div>
            <Message
              v-if="instance.emailError"
              severity="error"
              size="small"
              variant="simple"
              >{{ instance.emailError }}</Message
            >
          </div>
          <div class="mt-[10px]">
            <div class="flex items-center justify-start w-full">
              <label class="label" for="branch-phone-number"
                >{{ $t('phone_number') }}<span>*</span></label
              >
              <Select
                v-model="instance.dialCode"
                :options="instance.countries"
                optionLabel="name"
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
                id="branch-phone-number"
                @value-change="changePhoneNumber"
                @blur="changePhoneNumber"
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
          <div class="mt-[10px]">
            <div class="flex items-center justify-start w-full">
              <label for="branch-address" class="label"
                >{{ $t('address') }}<span>*</span></label
              >
              <InputText
                id="branch-address"
                class="flex-1"
                autocomplete="off"
                @blur="changeAddress"
                @value-change="changeAddress"
                v-model="instance.address[locale]"
                :placeholder="
                  $t('please_enter_name', {
                    name: $t('address').toLocaleLowerCase(),
                  })
                "
              />
            </div>
            <Message
              v-if="instance.addressError"
              severity="error"
              size="small"
              variant="simple"
              >{{ instance.addressError }}</Message
            >
          </div>
          <div class="mt-[10px]">
            <div class="flex items-start justify-start w-full">
              <div class="label">{{ $t('description') }}</div>
              <Textarea
                class="flex-1"
                autocomplete="off"
                rows="2"
                v-model="instance.description[locale]"
                :placeholder="
                  $t('please_enter_name', {
                    name: $t('description').toLocaleLowerCase(),
                  })
                "
              />
            </div>
          </div>
          <div class="mt-[10px]">
            <div class="flex items-start justify-start w-full">
              <div class="label">{{ $t('managers') }}</div>
              <div class="flex-1">
                <Chip label="Amy Elsner" removable>
                  <template #removeicon="{ removeCallback, keydownCallback }">
                    <img :src="Times" class="w-[12px] rounded-[50px]" />
                  </template>
                  <template #icon>
                    <img :src="DefaultAvatar" class="w-[20px] rounded-[50px]" />
                  </template>
                </Chip>
              </div>
              <img class="w-[15px] h-[15px] pencil" :src="Pencil" />
            </div>
          </div>
          <div class="mt-[10px]">
            <div class="flex items-start justify-start w-full">
              <div class="label">{{ $t('employees') }}</div>
              <div class="flex-1">
                <Chip label="Amy Elsner" removable>
                  <template #removeicon="{ removeCallback, keydownCallback }">
                    <img :src="Times" class="w-[12px] rounded-[50px]" />
                  </template>
                  <template #icon>
                    <img :src="DefaultAvatar" class="w-[20px] rounded-[50px]" />
                  </template>
                </Chip>
              </div>
              <img class="w-[15px] h-[15px] pencil" :src="Pencil" />
            </div>
          </div>
          <div class="w-full line h-[1px] mt-[20px]"></div>
          <div class="w-full flex items-center justify-end mt-[30px]">
            <Button
              :label="$t('back')"
              severity="warn"
              class="w-[110px] h-[32px] button"
              @click="clickBack"
            >
              <template #icon>
                <img :src="ArrowLeft" class="w-[14px] icon" />
              </template>
            </Button>
            <div class="expand flex-1"></div>
            <Button
              :label="$t('save')"
              class="w-[130px] h-[32px] register"
              icon="pi pi-save"
              @click="clickSave"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
/// Import
import { ref } from 'vue'
import type { CreateBranchType } from '~/types/staff/CreateBranchType'
import SingaporeFlag from '~/assets/flags/singapore.svg'
import VietNamFlag from '~/assets/flags/vietnam.svg'
import DefaultAvatar from '~/assets/images/default-avatar.png'
import Times from '~/assets/icons/times.svg'
import { CreateBranchValidate } from '~/validate/staff/CreateBranchValidate'
import { GlobalStore } from '~/store/Global'
import { useToast } from 'primevue/usetoast'
import Pencil from '~/assets/icons/pencil.svg'
import ArrowLeft from '~/assets/icons/arrow-left.svg'
/// Define
const store = GlobalStore()
const toast = useToast()
const router = useRouter()
const { t, locale } = useI18n()
const instance = ref(<CreateBranchType>{
  avatar: DefaultAvatar,
  phoneNumberPattern: '999-999-999',
  phoneNumberPlaceHolder: '123-345-789',

  name: {
    vi: '',
    en: '',
  },
  description: {
    vi: '',
    en: '',
  },
  address: {
    vi: '',
    en: '',
  },

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
/// Function

/// Change name of branch
const changeName = async (evt: any) => {
  CreateBranchValidate.name(instance, toast, t, locale.value)
}
/// Change email of branch
const changeEmail = async (evt: any) => {
  CreateBranchValidate.email(instance, toast, t)
}

/// Change address of branch
const changeAddress = async (evt: any) => {
  CreateBranchValidate.address(instance, toast, t, locale.value)
}

/// Change phone number of branch
const changePhoneNumber = async (evt: any) => {
  // validatePhoneNumberWithExist(instance, t, abortController)
  CreateBranchValidate.phoneNumber(instance, toast, t)
}
/// Change dial code
const changeDialCode = async (evt: any) => {
  CreateBranchValidate.changeDialCode(evt, instance)
}

/// Select avatar
const onFileSelectBranch = (event: any) => {
  const file = event.files[0]
  instance.value.avatarFile = file
  const reader = new FileReader()
  reader.onload = async (e) => {
    //Initiate the JavaScript Image object.
    let image = new Image()
    //Set the Base64 string return from FileReader as source.
    image.src = `${e.target?.result ?? ''}`
    instance.value.avatar = `${e.target?.result ?? ''}`
    image.onload = async () => {
      const height = image.height
      const width = image.width
      instance.value.widthAvatar = width
      instance.value.heightAvatar = height
      CreateBranchValidate.avatar(instance, t)
    }
  }
  reader.readAsDataURL(file)
}
/// Create save branch
const clickSave = async (evt: any) => {
  const validate = await CreateBranchValidate.all(
    instance,
    toast,
    t,
    locale.value
  )
  if (!validate) {
    return
  }

  const name = instance.value?.name ?? {}
  const email = instance.value?.email || ''
  const description = instance.value.description ?? {}
  const address = instance.value.address ?? {}
  const phoneNumber = `${instance.value.dialCode?.code ?? ''}${(
    instance.value.phoneNumber ?? ''
  ).replaceAll('-', '')}`

  let formData = new FormData()
  formData.append('file', instance.value.avatarFile)
  formData.append('name', JSON.stringify(name))
  formData.append('email', email)
  formData.append('description', JSON.stringify(description))
  formData.append('address', JSON.stringify(address))
  formData.append('phoneNumber', phoneNumber)
  const options: any = {
    method: Method.POST,
    body: formData,
  }
  const { data, error, status } = await CallAPI(
    APIPathBranch.POST_CREATE,
    options,
    toast,
    t,
    true,
    true
  )
  /// Check error
  if (status.value !== APIStatusCons.SUCCESS) {
    return
  }
  toast.add({
    severity: Toast.SUCCESS,
    summary: t('success'),
    detail: t('name_created_successfully', { name: t('branch') }),
    life: Toast.DURATION,
  })
  const result: any = data.value
  return result.data
}

/// Click back
const clickBack = () => {
  router.back()
}

onMounted(() => {})
</script>

<style scoped lang="scss">
:deep(.p-textarea) {
  font-size: 14px;
}

:deep(.p-message-text) {
  padding-left: 110px;
}
:deep(.p-chip) {
  padding-block: 5px !important;
}
.page {
  display: flex;
  padding: 10px;
}
.create-branch {
  flex: 1;
  padding: 30px;
  .contain {
    display: flex;
    flex-direction: column;

    .inner {
      width: 100%;
      max-width: 700px;
      border: 1px solid $border-color;
      border-top-right-radius: 15px;
      border-bottom-left-radius: 15px;
      padding: 30px;
    }
  }

  .label {
    width: 110px;
    span {
      margin-left: 2px;
      color: red;
    }
  }
  .avatar-des {
    margin-left: 110px;
  }
  .line {
    border-radius: 5px;
    border-bottom: 1px dashed $border-color;
  }
  .image {
    margin-left: 50px;
    width: 50px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  .pencil {
    margin-left: 5px;
    filter: invert(60%) sepia(75%) saturate(440%) hue-rotate(89deg)
      brightness(87%) contrast(99%);
    &:hover {
      cursor: pointer;
      filter: invert(52%) sepia(41%) saturate(3616%) hue-rotate(166deg)
        brightness(100%) contrast(89%);
    }
  }
  .icon {
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg)
      brightness(102%) contrast(102%);
  }
}

/// Tablet
@media screen and (min-width: $tablet-min) and (max-width: $tablet-max) {
}

/// Tablet mini
@media screen and (min-width: $tablet-mini-min) and (max-width: $tablet-mini-max) {
  :deep(.p-message-text) {
    padding-left: 100px;
  }
  .page {
    display: flex;
    padding: 8px;
  }
  .create-branch {
    flex: 1;
    padding: 10px;
    padding-top: 20px;
    .contain {
      display: flex;
      flex-direction: column;
    }
  }
  .avatar-des {
    margin-left: 100px !important;
  }
  .label {
    width: 100px !important;
  }
}

/// Mobile
@media screen and (min-width: $mobile-min) and (max-width: $mobile-max) {
  :deep(.p-message-text) {
    padding-left: 100px;
  }
  .page {
    display: flex;
    padding: 8px;
  }
  .create-branch {
    flex: 1;
    padding: 10px;
    padding-top: 20px;
    .contain {
      display: flex;
      flex-direction: column;
    }
  }
  .avatar-des {
    margin-left: 100px !important;
  }
  .label {
    width: 100px !important;
  }
}
</style>
