<template>
  <Dialog
    modal
    :dismissableMask="false"
    v-model:visible="instance.visible"
    @update:visible="updateVisible"
  >
    <template #container>
      <div class="create-branch">
        <div class="header w-full flex relative">
          <div
            class="text-[20px] w-full font-bold flex items-center justify-center"
          >
            {{ $t('create_name', { name: $t('branch').toLocaleLowerCase() }) }}
            <div class="flex-1 flex ml-[10px]">
              <div class="spinner-mini" v-if="instance.loading"></div>
            </div>
          </div>
          <img
            :src="Times"
            class="w-[20px] close absolute right-0"
            @click="clickClose"
          />
        </div>
        <div class="contain items-center justify-center">
          <div class="inner">
            <div>
              <div class="flex item2 items-center justify-start">
                <label class="label">{{ $t('avatar') }}<span>*</span></label>
                <div class="image-group flex items-center">
                  <FileUpload
                    mode="basic"
                    @select="onFileSelectAvatar"
                    customUpload
                    auto
                    :chooseLabel="$t('choose')"
                    severity="secondary"
                    class="p-button-outlined h-[32px] flex-1"
                  />
                  <div class="ml-[50px]">
                    <LoadingImg :src="instance.avatar" />
                  </div>
                </div>
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
            <div class="mt-[15px]">
              <div class="flex item1 items-center justify-start w-full">
                <label for="name" class="label"
                  >{{ $t('name') }}<span>*</span></label
                >
                <div class="group-input">
                  <InputText
                    id="name"
                    v-model="instance.name"
                    class="w-full"
                    @value-change="changeName"
                    autocomplete="off"
                    :placeholder="
                      $t('please_enter_name', {
                        name: $t('name').toLocaleLowerCase(),
                      })
                    "
                  />
                  <div class="clear" v-if="instance.name">
                    <img
                      :src="Times"
                      class="w-[14px] icon"
                      @click="clickClearName"
                    />
                  </div>
                </div>
              </div>

              <Message
                v-if="instance.nameError"
                severity="error"
                size="small"
                variant="simple"
                >{{ instance.nameError }}</Message
              >
            </div>
            <div class="mt-[15px]">
              <div class="flex item1 items-center justify-start w-full">
                <label for="email" class="label"
                  >{{ $t('email') }}<span>*</span></label
                >
                <div class="group-input">
                  <InputText
                    id="email"
                    v-model="instance.email"
                    class="w-full"
                    @value-change="changeEmail"
                    autocomplete="off"
                    :placeholder="
                      $t('please_enter_name', {
                        name: $t('email').toLocaleLowerCase(),
                      })
                    "
                  />
                  <div class="clear" v-if="instance.email">
                    <img
                      :src="Times"
                      class="w-[14px] icon"
                      @click="clickClearEmail"
                    />
                  </div>
                </div>
              </div>

              <Message
                v-if="instance.emailError"
                severity="error"
                size="small"
                variant="simple"
                >{{ instance.emailError }}</Message
              >
            </div>
            <div class="mt-[15px]">
              <div class="flex item1 items-center justify-start w-full">
                <label class="label" for="branch-phone-number"
                  >{{ $t('phone_number') }}<span>*</span></label
                >
                <div class="group-input">
                  <div class="flex">
                    <Select
                      v-model="instance.dialCode"
                      :options="instance.countries"
                      optionLabel="name"
                      :autoOptionFocus="true"
                      @change="changeDialCode"
                      class="w-[110px] h-[30px] mr-[5px]"
                    >
                      <template #value="slotProps">
                        <div
                          v-if="slotProps.value"
                          class="flex items-center justify-center h-[100%] pl-[10px]"
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
                          class="flex items-center justify-center pl-[10px] h-[30px]"
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
                      class="h-[30px] flex-1"
                      autocomplete="off"
                      id="branch-phone-number"
                      ref="inputMaskRef"
                      @value-change="changePhoneNumber"
                      @blur="changePhoneNumber"
                      v-model="instance.phoneNumber"
                      :mask="instance.phoneNumberPattern"
                      :placeholder="instance.phoneNumberPlaceHolder"
                      fluid
                    />
                  </div>
                  <div class="clear" v-if="instance.phoneNumber">
                    <img
                      :src="Times"
                      class="w-[14px] icon"
                      @click="clickClearPhoneNumber"
                    />
                  </div>
                </div>
              </div>
              <Message
                v-if="instance.phoneNumberError"
                severity="error"
                size="small"
                variant="simple"
                >{{ instance.phoneNumberError }}</Message
              >
            </div>
            <div class="mt-[15px]">
              <div class="flex item1 items-center justify-start w-full">
                <label for="address" class="label"
                  >{{ $t('address') }}<span>*</span></label
                >
                <div class="group-input">
                  <InputText
                    id="address"
                    class="w-full"
                    autocomplete="off"
                    @blur="changeAddress"
                    @value-change="changeAddress"
                    v-model="instance.address"
                    :placeholder="
                      $t('please_enter_name', {
                        name: $t('address').toLocaleLowerCase(),
                      })
                    "
                  />
                  <div class="clear" v-if="instance.address">
                    <img
                      :src="Times"
                      class="w-[14px] icon"
                      @click="clickClearAddress"
                    />
                  </div>
                </div>
              </div>
              <Message
                v-if="instance.addressError"
                severity="error"
                size="small"
                variant="simple"
                >{{ instance.addressError }}</Message
              >
            </div>
            <div class="mt-[15px]">
              <div class="flex item1 items-start justify-start w-full">
                <div class="label">{{ $t('description') }}</div>
                <div class="group-input">
                  <Textarea
                    class="w-full"
                    autocomplete="off"
                    rows="2"
                    v-model="instance.description"
                    :placeholder="
                      $t('please_enter_name', {
                        name: $t('description').toLocaleLowerCase(),
                      })
                    "
                  ></Textarea>
                  <div class="clear" v-if="instance.description">
                    <img
                      :src="Times"
                      class="w-[14px] icon"
                      @click="clickClearDescription"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-[15px] item3">
              <div class="flex items-center justify-start w-full">
                <label for="department-name" class="label"
                  >{{ $t('active') }}<span>*</span></label
                >
                <Checkbox v-model="instance.active" binary />
              </div>
            </div>
            <div class="w-full line h-[1px] mt-[20px]"></div>
            <div class="w-full flex items-center justify-center footer">
              <Button
                severity="success"
                :label="$t('save')"
                class="h-[32px] button"
                @click="clickSave"
              >
                <template #icon>
                  <img :src="Save" class="w-[14px] icon" />
                </template>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import SingaporeFlag from '~/assets/flags/singapore.svg'
import VietNamFlag from '~/assets/flags/vietnam.svg'
import DefaultAvatar from '~/assets/images/default-avatar.png'
import Times from '~/assets/icons/times.svg'
import Save from '~/assets/icons/save.svg'
import { CreateBranchValidate } from '~/validate/org/branches/CreateBranchValidate'
import type { CreateBranchType } from '~/types/org/branches/CreateBranchType'
const { t, locale } = useI18n()
const toast = useToast()
const { $orgAPI } = useNuxtApp()
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
const instance = ref<CreateBranchType>({
  visible: false,
  loading: false,
  name: '',
  nameError: null,
  email: '',
  emailError: null,
  description: '',
  active: true,
  avatar: DefaultAvatar,
  avatarFile: null,
  widthAvatar: null,
  heightAvatar: null,
  avatarError: null,
  branch: null,
  nameAbort: null,
  phoneNumberAbort: null,
  emailAbort: null,
  phoneNumberPattern: '999-999-999',
  // +65 XXXX XXXX
  phoneNumberPlaceHolder: '123-345-789',
  phoneNumberError: null,
  phoneNumber: '',
  addressError: null,
  address: '',
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
const emits = defineEmits(['click-close', 'click-ok'])
/// Update visible
const updateVisible = (value: any) => {
  if (!value) {
    /// Close dialog
    instance.value.visible = props.visible
    emits('click-close')
  }
}
/// Change phone number of branch
const changePhoneNumber = async (evt: any) => {
  CreateBranchValidate.phoneNumber(instance, t, $orgAPI)
}
/// Change dial code
const changeDialCode = async (evt: any) => {
  CreateBranchValidate.changeDialCode(evt, instance)
}

/// Change name
const changeName = (evt: any) => {
  CreateBranchValidate.name(instance, t, $orgAPI)
}
/// Change email
const changeEmail = (evt: any) => {
  CreateBranchValidate.email(instance, t, $orgAPI)
}

/// Change address
const changeAddress = async (evt: any) => {
  CreateBranchValidate.address(instance, t)
}

const clickClearName = () => {}
const clickClearEmail = () => {}
const clickClearAddress = () => {}
const clickClearDescription = () => {}
const clickClearPhoneNumber = () => {}

/// click close
const clickClose = () => {
  emits('click-close')
}

/// Select avatar
const onFileSelectAvatar = (event: any) => {
  const file = event.files[0]
  const reader = new FileReader()
  instance.value.avatarFile = file
  reader.onload = async (e) => {
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

/// Create save position
const clickSave = async (evt: any) => {
  const validate = await CreateBranchValidate.all(instance, t, $orgAPI)
  if (!validate) {
    return
  }
  instance.value.loading = true
  let formData = new FormData()

  const phoneNumber = `${instance.value.dialCode?.code ?? ''}${(
    instance.value.phoneNumber ?? ''
  ).replaceAll('-', '')}`

  formData.append('avatar', instance.value.avatarFile)
  formData.append('name', instance.value.name || '')
  formData.append('email', instance.value.email || '')
  formData.append('phoneNumber', phoneNumber)
  formData.append('address', instance.value.address || '')
  formData.append('description', instance.value.description || '')
  formData.append('active', JSON.stringify(instance.value.active))
  const options: any = {
    method: MethodCons.POST,
    body: formData,
    headers: { 'Content-Type': 'no-content-type' },
  }
  const response: any = await $orgAPI(APIOrgBranchCons.CREATE, options)
  instance.value.loading = false
  toast.add({
    severity: ToastCons.SUCCESS,
    summary: t('success'),
    detail: t('name_of_organization_has_been_created_successfully', {
      name: t('position'),
    }),
    life: ToastCons.DURATION,
  })
  emits('click-ok')
}
watch(
  () => props.visible,
  (value) => {
    /// Update show or hide from parent
    instance.value.visible = props.visible
    instance.value.name = null
    instance.value.description = null
    instance.value.email = null
    instance.value.address = null
    instance.value.phoneNumber = null
    instance.value.active = true
    instance.value.loading = false
    instance.value.dialCode = instance.value.countries[0]
    instance.value.avatar = DefaultAvatar
  }
)
</script>
<style scoped lang="scss">
@import url('~/assets/scss/org/branches/CreateBranch.scss');
</style>
