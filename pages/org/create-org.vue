<template>
  <div class="page">
    <div class="card create-org">
      <div
        class="text-[25px] font-bold ml-[0px] mb-[20px] w-full flex items-center justify-center"
      >
        {{
          $t('create_name', { name: $t('organization').toLocaleLowerCase() })
        }}
      </div>
      <div class="input-group">
        <div class="info-branch-group">
          <div class="flex-1 information-group">
            <div class="w-full flex items-center justify-center mb-[20px]">
              <span class="text-[20px] font-[700] ml-[10px] mr-[10px]">{{
                $t('information_of_organization')
              }}</span>
            </div>
            <div class="w-full line h-[1px] mb-[20px]"></div>
            <div>
              <div class="flex mt-[20px] items-center justify-start">
                <div class="label">{{ $t('avatar') }}<span>*</span></div>
                <FileUpload
                  mode="basic"
                  @select="onFileSelectOrganization"
                  customUpload
                  :chooseLabel="$t('choose')"
                  auto
                  severity="secondary"
                  class="p-button-outlined h-[30px]"
                />
                <img
                  v-if="instance.avatarOfOrg"
                  :src="instance.avatarOfOrg"
                  alt="Image"
                  class="image"
                />
              </div>
              <div class="avatar-des">{{ $t('avatar_with_1_1_ratio') }}</div>
              <Message
                v-if="instance.avatarOfOrgError"
                severity="error"
                size="small"
                variant="simple"
                >{{ instance.avatarOfOrgError }}</Message
              >
            </div>
            <div class="mt-[10px]">
              <div class="flex items-center justify-start w-full">
                <label for="org-name" class="label"
                  >{{ $t('name') }}<span>*</span></label
                >
                <InputText
                  id="org-name"
                  autocomplete="off"
                  @blur="changeNameOfOrg"
                  class="flex-1"
                  v-model="instance.nameOfOrg"
                  :placeholder="
                    $t('please_enter_name', {
                      name: $t('name').toLocaleLowerCase(),
                    })
                  "
                  @value-change="changeNameOfOrg"
                />
              </div>
              <Message
                v-if="instance.nameOfOrgError"
                severity="error"
                size="small"
                variant="simple"
                >{{ instance.nameOfOrgError }}</Message
              >
            </div>
            <div class="mt-[10px]">
              <div class="flex items-center justify-start w-full">
                <label for="org-slogan" class="label"
                  >{{ $t('slogan') }}<span>*</span></label
                >
                <InputText
                  id="org-slogan"
                  autocomplete="off"
                  class="flex-1"
                  @blur="changeSloganOfOrg"
                  v-model="instance.sloganOfOrg"
                  :placeholder="
                    $t('please_enter_name', {
                      name: $t('slogan').toLocaleLowerCase(),
                    })
                  "
                  @value-change="changeSloganOfOrg"
                />
              </div>
              <Message
                v-if="instance.sloganOfOrgError"
                severity="error"
                size="small"
                variant="simple"
                >{{ instance.sloganOfOrgError }}</Message
              >
            </div>
            <div class="mt-[10px]">
              <div class="flex items-center justify-start w-full">
                <label for="org-fields" class="label"
                  >{{ $t('fields') }}<span>*</span></label
                >
                <InputText
                  id="org-fields"
                  class="flex-1"
                  v-model="instance.fieldsOfOrg"
                  :placeholder="
                    $t('please_enter_name', {
                      name: $t('name').toLocaleLowerCase(),
                    })
                  "
                  @blur="changeFieldsOfOrg"
                  @value-change="changeFieldsOfOrg"
                  autocomplete="off"
                />
              </div>
              <Message
                v-if="instance.fieldsOfOrgError"
                severity="error"
                size="small"
                variant="simple"
                >{{ instance.fieldsOfOrgError }}</Message
              >
            </div>
            <div class="mt-[10px]">
              <div class="flex items-center justify-start w-full">
                <label for="org-size" class="label"
                  >{{ $t('size') }}<span>*</span></label
                >
                <InputNumber
                  id="org-size"
                  class="flex-1"
                  v-model="instance.sizeOfOrg"
                  @value-change="changeSizeOfOrg"
                  @blur="changeSizeOfOrg"
                  :placeholder="
                    $t('please_enter_name', {
                      name: $t('size').toLocaleLowerCase(),
                    })
                  "
                  inputId="integeronly"
                  :locale="instance.locale"
                  :minFractionDigits="instance.minFractionDigits"
                  autocomplete="off"
                  fluid
                />
              </div>
              <Message
                v-if="instance.sizeOfOrgError"
                severity="error"
                size="small"
                variant="simple"
                >{{ instance.sizeOfOrgError }}</Message
              >
            </div>

            <div class="mt-[10px]">
              <div class="flex items-start justify-start w-full">
                <div class="label">{{ $t('description') }}</div>
                <Textarea
                  class="flex-1"
                  autocomplete="off"
                  rows="2"
                  v-model="instance.descriptionOfOrg"
                  :placeholder="
                    $t('please_enter_name', {
                      name: $t('description').toLocaleLowerCase(),
                    })
                  "
                />
              </div>
            </div>
          </div>
          <div class="flex-1 branch-group">
            <div class="w-full flex items-center justify-center">
              <span
                class="text-[20px] font-[700] ml-[10px] mb-[20px] mr-[10px]"
                >{{ $t('main_branch_of_organization') }}</span
              >
            </div>
            <div class="w-full line h-[1px] mb-[20px]"></div>
            <div>
              <div class="flex mt-[20px] items-center justify-start">
                <label class="label">{{ $t('avatar') }}<span>*</span></label>
                <FileUpload
                  mode="basic"
                  @select="onFileSelectBranch"
                  customUpload
                  auto
                  :chooseLabel="$t('choose')"
                  severity="secondary"
                  class="p-button-outlined h-[30px] flex-1"
                />
                <img
                  :src="instance.avatarOfBranch"
                  alt="Image"
                  class="w-full image"
                />
              </div>
              <div class="avatar-des">{{ $t('avatar_with_1_1_ratio') }}</div>
              <Message
                v-if="instance.avatarOfBranchError"
                severity="error"
                size="small"
                variant="simple"
                >{{ instance.avatarOfBranchError }}</Message
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
                  v-model="instance.nameOfBranch"
                  @blur="changeNameOfBranch"
                  @value-change="changeNameOfBranch"
                  :placeholder="
                    $t('please_enter_name', {
                      name: $t('name').toLocaleLowerCase(),
                    })
                  "
                />
              </div>
              <Message
                v-if="instance.nameOfBranchError"
                severity="error"
                size="small"
                variant="simple"
                >{{ instance.nameOfBranchError }}</Message
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
                  @value-change="changeEmailOfBranch"
                  @blur="changeEmailOfBranch"
                  class="flex-1"
                  v-model="instance.emailOfBranch"
                  :placeholder="
                    $t('please_enter_name', {
                      name: $t('email').toLocaleLowerCase(),
                    })
                  "
                />
              </div>
              <Message
                v-if="instance.emailOfBranchError"
                severity="error"
                size="small"
                variant="simple"
                >{{ instance.emailOfBranchError }}</Message
              >
            </div>
            <div class="mt-[10px]">
              <div class="flex items-center justify-start w-full">
                <label class="label" for="branch-phone-number"
                  >{{ $t('phone_number') }}<span>*</span></label
                >
                <!-- <Select
                  v-model="instance.dialCode"
                  :options="instance.countries"
                  optionLabel="name"
                  @change="changeDialCode"
                  placeholder="Select a Country"
                  class="w-[110px] h-[30px] mr-[5px]"
                >
                  <template #value="slotProps">
                    <div
                      v-if="slotProps.value"
                      class="flex items-center justify-center h-[30px] pl-[10px]"
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
                  @value-change="changePhoneNumberOfBranch"
                  @blur="changePhoneNumberOfBranch"
                  v-model="instance.phoneNumberOfBranch"
                  :mask="instance.phoneNumberOfBranchPattern"
                  :placeholder="instance.phoneNumberOBranchPlaceHolder"
                  fluid
                />
              </div> -->

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
                  @value-change="changePhoneNumberOfBranch"
                  @blur="changePhoneNumberOfBranch"
                  v-model="instance.phoneNumberOfBranch"
                  :mask="instance.phoneNumberOfBranchPattern"
                  :placeholder="instance.phoneNumberOBranchPlaceHolder"
                  fluid
                />
              </div>
              <Message
                v-if="instance.phoneNumberOfBranchError"
                severity="error"
                size="small"
                variant="simple"
                >{{ instance.phoneNumberOfBranchError }}</Message
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
                  @blur="changeAddressOfBranch"
                  @value-change="changeAddressOfBranch"
                  v-model="instance.addressOfBranch"
                  :placeholder="
                    $t('please_enter_name', {
                      name: $t('address').toLocaleLowerCase(),
                    })
                  "
                />
              </div>
              <Message
                v-if="instance.addressOfBranchError"
                severity="error"
                size="small"
                variant="simple"
                >{{ instance.addressOfBranchError }}</Message
              >
            </div>
            <div class="mt-[10px]">
              <div class="flex items-start justify-start w-full">
                <div class="label">{{ $t('description') }}</div>
                <Textarea
                  class="flex-1"
                  autocomplete="off"
                  rows="2"
                  v-model="instance.descriptionOfBranch"
                  :placeholder="
                    $t('please_enter_name', {
                      name: $t('description').toLocaleLowerCase(),
                    })
                  "
                />
              </div>
            </div>
          </div>
        </div>
        <div class="line2 h-[1px] mb-[20px]"></div>
        <div class="flex items-center justify-center term-group">
          <div class="flex items-start gap-2">
            <Checkbox
              v-model="instance.agree"
              inputId="ingredient1"
              name="pizza"
              value="Cheese"
              class="mt-[4px]"
            />
            <label for="ingredient1">
              {{ $t('agree_to') }}
              <Button
                :label="$t('terms_of_service')"
                variant="link"
                @click="clickMoveToTerm()"
                class="link"
              />
              {{ $t('and').toLocaleLowerCase() }}
              <Button
                :label="$t('privacy_policy')"
                variant="link"
                @click="clickMoveToPrivacy()"
                class="link"
              />
            </label>
          </div>
        </div>
        <div
          class="w-full flex items-center justify-center mb-[20px] mt-[20px] ml-[20px] mr-[20px]"
        >
          <Button :label="$t('start_now')" class="register" @click="clickSave">
            <template #icon> <img :src="Add" class="w-[18px] icon" /> </template
          ></Button>
        </div>
      </div>

      <div class="w-full about-group">
        <div
          class="text-[20px] font-[700] ml-[0px] mb-[20px] w-full flex items-center justify-center"
        >
          {{ $t('about_us') }}
        </div>
        <div class="line3 h-[1px] mb-[20px]"></div>
        <div class="contain">
          <div>
            <strong>IIBelife</strong>
            {{
              $t(
                'is_a_leading_provider_of_utility_software_for_organizational_management_making_it_easy_to_reach_the_public_and_significantly_boosting_your_business_performance'
              )
            }}
          </div>
          <div class="mt-[5px]">
            <strong>IIBelife</strong> {{ $t('focus_on_developing') }}
          </div>
          <div>
            -
            {{
              $t(
                'specializing_in_building_management_systems_for_organizations_to_help_optimize_management'
              )
            }}
          </div>
          <div>
            -
            {{
              $t(
                'easily_convey_your_organizations_information_through_our_system'
              )
            }}
          </div>
          <div>
            -
            {{
              $t('easily_source_quality_human_resources_for_the_organization')
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
/// Import
import { ref } from 'vue'
import type { CreateOrgType } from '~/types/org/CreateOrgType'
import SingaporeFlag from '~/assets/flags/singapore.svg'
import VietNamFlag from '~/assets/flags/vietnam.svg'
import Add from '~/assets/icons/add.svg'
import DefaultAvatar from '~/assets/images/default-avatar.png'
import { CreateOrgValidate } from '~/validate/org/CreateOrgValidate'
import { GlobalStore } from '~/store/Global'
import { useToast } from 'primevue/usetoast'
/// Define
const store = GlobalStore()
const toast = useToast()

const { t } = useI18n()
const instance = ref(<CreateOrgType>{
  avatarOfOrg: DefaultAvatar,
  avatarOfBranch: DefaultAvatar,
  phoneNumberOfBranchPattern: '999-999-999',
  // +65 XXXX XXXX
  phoneNumberOBranchPlaceHolder: '123-345-789',
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
  // nameAbortController: new AbortController(),
})
/// Function

const clickMoveToTerm = async () => {
  navigateTo({
    path: PathTermPrivacy.TERM,
  })
}
const clickMoveToPrivacy = async () => {
  navigateTo({
    path: PathTermPrivacy.PRIVACY,
  })
}
/// Change name of org
const changeNameOfOrg = async (evt: any) => {
  CreateOrgValidate.nameOfOrg(instance, t, toast)
}
/// Change name of org
const changeSloganOfOrg = async (evt: any) => {
  CreateOrgValidate.sloganOfOrg(instance, t)
}

/// Change size of org
const changeSizeOfOrg = async (evt: any) => {
  CreateOrgValidate.sizeOfOrg(instance, t)
}

/// Chnage fields of org
const changeFieldsOfOrg = async (evt: any) => {
  CreateOrgValidate.fieldsOfOrg(instance, t)
}
/// Change name of branch
const changeNameOfBranch = async (evt: any) => {
  CreateOrgValidate.nameOfBranch(instance, t)
}
/// Change email of branch
const changeEmailOfBranch = async (evt: any) => {
  CreateOrgValidate.emailOfBranch(instance, t, toast)
}

/// Change address of branch
const changeAddressOfBranch = async (evt: any) => {
  CreateOrgValidate.addressOfBranch(instance, t)
}

/// Change phone number of branch
const changePhoneNumberOfBranch = async (evt: any) => {
  // validatePhoneNumberWithExist(instance, t, abortController)
  CreateOrgValidate.phoneNumberOfBranch(instance, t, toast)
}
/// Change dial code
const changeDialCode = async (evt: any) => {
  CreateOrgValidate.changeDialCode(evt, instance)
}
/// Select logo
const onFileSelectOrganization = (event: any) => {
  const file = event.files[0]
  const reader = new FileReader()
  instance.value.avatarFileOfOrg = file
  reader.onload = async (e) => {
    //Initiate the JavaScript Image object.
    let image = new Image()
    //Set the Base64 string return from FileReader as source.
    image.src = `${e.target?.result ?? ''}`
    instance.value.avatarOfOrg = `${e.target?.result ?? ''}`
    image.onload = async () => {
      const height = image.height
      const width = image.width
      instance.value.widthAvatarOfOrg = width
      instance.value.heightAvatarOfOrg = height
      CreateOrgValidate.avatarOfOrg(instance, t)
    }
  }
  reader.readAsDataURL(file)
}
/// Select avatar
const onFileSelectBranch = (event: any) => {
  const file = event.files[0]
  instance.value.avatarFileOfBranch = file
  const reader = new FileReader()
  reader.onload = async (e) => {
    //Initiate the JavaScript Image object.
    let image = new Image()
    //Set the Base64 string return from FileReader as source.
    image.src = `${e.target?.result ?? ''}`
    instance.value.avatarOfBranch = `${e.target?.result ?? ''}`
    image.onload = async () => {
      const height = image.height
      const width = image.width
      instance.value.widthAvatarOfBranch = width
      instance.value.heightAvatarOfBranch = height
      CreateOrgValidate.avatarOfBranch(instance, t)
    }
  }
  reader.readAsDataURL(file)
}

/// Create org
const callAPICreateOrg = async (): Promise<boolean> => {
  /// Create org
  const nameOfOrg = instance.value.nameOfOrg ?? ''
  const sloganOfOrg = instance.value.sloganOfOrg ?? ''
  const fieldsOfOrg = instance.value.fieldsOfOrg ?? ''
  const sizeOfOrg = instance.value.sizeOfOrg ?? 0
  const descriptionOfOrg = instance.value.descriptionOfOrg ?? ''
  const nameOfBranch = instance.value.nameOfBranch ?? ''
  const emailOfBranch = instance.value.emailOfBranch ?? ''
  const addressOfBranch = instance.value.addressOfBranch ?? ''
  const phoneNumberOfBranch = `${instance.value.dialCode?.code ?? ''}${(
    instance.value.phoneNumberOfBranch ?? ''
  ).replaceAll('-', '')}`
  const descriptionOfBranch = instance.value.descriptionOfBranch ?? ''

  const formData = new FormData()
  formData.append('files', instance.value.avatarFileOfOrg)
  formData.append('files', instance.value.avatarFileOfBranch)
  formData.append('nameOfOrg', nameOfOrg)
  formData.append('sloganOfOrg', sloganOfOrg)
  formData.append('fieldsOfOrg', fieldsOfOrg)
  formData.append('sizeOfOrg', `${sizeOfOrg}`)
  formData.append('descriptionOfOrg', descriptionOfOrg)
  formData.append('nameOfBranch', nameOfBranch)
  formData.append('emailOfBranch', emailOfBranch)
  formData.append('addressOfBranch', addressOfBranch)
  formData.append('phoneNumberOfBranch', phoneNumberOfBranch)
  formData.append('descriptionOfBranch', descriptionOfBranch)

  const options: any = {
    method: Method.POST,
    body: formData,
  }
  const { data, error, status } = await CallAPI(
    APIPathOrg.POST_CREATE_ORG,
    options,
    toast,
    t,
    false,
    true
  )

  /// Check error
  if (status.value !== APIStatusCons.SUCCESS) {
    return false
  }
  const result: any = data.value
  instance.value.org = result.data.org
  /// Save auth
  // store.setOrgAuth(result.data.auth)
  return true
}

/// Get orgs of user
const callAPIOrgsOfUser = async () => {
  const options: any = {
    method: Method.GET,
  }
  const { data, error, status } = await CallAPI(
    APIPathAccount.GET_ORGANIZATION_OF_USER,
    options,
    toast,
    t,
    false
  )

  if (status.value !== APIStatusCons.SUCCESS) {
    return []
  }

  const result: any = data.value
  return result.data
}

/// Create save org
const clickSave = async (evt: any) => {
  const validate = await CreateOrgValidate.allValidate(instance, t, toast)
  if (!validate) {
    return
  }
  /// Create org
  const create = await callAPICreateOrg()
  if (!create) {
    return
  }

  const orgs = await callAPIOrgsOfUser()

  /// Set org to store
  // store.setListOrgs(orgs)
  /// Move to information of org
  /// Go to information of org
  await navigateTo({
    path: Path.INFORM_OF_ORG,
  })
}

const setFormatNumber = (lang: string) => {
  /// Set format number
  if (!lang || lang == 'en') {
    instance.value.locale = LocaleCons.EN_US
    instance.value.minFractionDigits = 0
  } else {
    instance.value.locale = LocaleCons.VI_VN
    instance.value.minFractionDigits = 0
  }
}

watch(
  () => store.getLanguage(),
  (value) => {
    setFormatNumber(value)
  }
)
onMounted(() => {
  /// Turn off auto complete
  const sizeElement = document.getElementById('org-size')
  let size: any = sizeElement?.firstChild
  size.setAttribute('autocomplete', 'off')

  /// Set format number
  setFormatNumber(store.getLanguage())
})
</script>

<style scoped lang="scss">
@import url('~/assets/scss/org/CreateOrg.scss');
</style>
