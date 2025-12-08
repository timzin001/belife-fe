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
                  @input="changeSizeOfOrg"
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
                ></Textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="line2 h-[1px] mb-[20px]"></div>
        <!-- <div class="flex items-center justify-center term-group">
          <div class="flex items-start gap-2"> -->
        <div
          class="flex flex-col mt-[10px] term-group items-center justify-center"
        >
          <div class="flex flex-col justify-start">
            <div class="flex">
              <Checkbox
                v-model="instance.termsPrivacy"
                inputId="term-privacy"
                @value-change="changeTermsPrivacy"
                name="term-privacy"
                class="term-privacy"
                value="agree"
              />
              <label for="term-privacy">
                {{ $t('agree_to') }}
                <Button
                  :label="$t('terms_of_service')"
                  variant="link"
                  @click="clickMoveToTerm()"
                ></Button>
                {{ $t('and').toLocaleLowerCase() }}
                <Button
                  :label="$t('privacy_policy')"
                  variant="link"
                  @click="clickMoveToPrivacy()"
                ></Button>
              </label>
            </div>
          </div>
          <Message
            v-if="instance.termsPrivacyError"
            severity="error"
            size="small"
            variant="simple"
            >{{ instance.termsPrivacyError }}</Message
          >
        </div>

        <div
          class="w-full flex items-center justify-center mb-[20px] mt-[20px]"
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
import type { CreateOrgType } from '~/types/org/create-org/CreateOrgType'
import SingaporeFlag from '~/assets/flags/singapore.svg'
import VietNamFlag from '~/assets/flags/vietnam.svg'
import Add from '~/assets/icons/add.svg'
import DefaultAvatar from '~/assets/images/default-avatar.png'
import { CreateOrgValidate } from '~/validate/org/CreateOrgValidate'
import { GlobalStore } from '~/store/Global'
import { useToast } from 'primevue/usetoast'
import { header } from '@primeuix/themes/aura/accordion'
import type { OrgType } from '~/types/org/org/OrgType'
import type { UserType } from '~/types/social/UserType'
/// Define
const store = GlobalStore()
const toast = useToast()
const { $orgAPI, $socialAPI } = useNuxtApp()

const { t, locale } = useI18n()
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
    path: PathOrgTermCons.TERM,
  })
}
const clickMoveToPrivacy = async () => {
  navigateTo({
    path: PathOrgPrivacyCons.PRIVACY,
  })
}
/// Change name of org
const changeNameOfOrg = async (evt: any) => {
  CreateOrgValidate.nameOfOrg(instance, t, $orgAPI)
}
/// Change name of org
const changeSloganOfOrg = async (evt: any) => {
  CreateOrgValidate.sloganOfOrg(instance, t)
}

/// Change size of org
const changeSizeOfOrg = async (evt: any) => {
  instance.value.sizeOfOrg = evt.value
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
  CreateOrgValidate.emailOfBranch(instance, t, $orgAPI)
}

/// Change address of branch
const changeAddressOfBranch = async (evt: any) => {
  CreateOrgValidate.addressOfBranch(instance, t)
}

/// Change phone number of branch
const changePhoneNumberOfBranch = async (evt: any) => {
  // validatePhoneNumberWithExist(instance, t, abortController)
  CreateOrgValidate.phoneNumberOfBranch(instance, t, $orgAPI)
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
const changeTermsPrivacy = (evt: any) => {
  CreateOrgValidate.termsAndPrivacy(instance, t)
}

/// Create save org
const clickSave = async (evt: any) => {
  const validate = await CreateOrgValidate.allValidate(instance, t, $orgAPI)
  if (!validate) {
    return
  }
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
  formData.append('avatarOfOrg', instance.value.avatarFileOfOrg)
  formData.append('avatarOfBranch', instance.value.avatarFileOfBranch)
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
    method: MethodCons.POST,
    body: formData,
    headers: { 'Content-Type': 'no-content-type' },
  }
  const response: any = await $orgAPI(APIOrgAuthCons.SIGN_UP, options)
  const data = response.data
  let employee = data.employee
  let org = employee.org
  org.employeeId = employee.id
  const parseOrg = parseOrgCookie(org)
  const parseEmployee = parseEmployeeCookie(employee)
  /// Save access token
  store.setAccessTokenEmployee(data.accessToken)
  store.setRefreshTokenEmployee(data.refreshToken)
  store.setEmployee(parseEmployee)
  store.setOrg(parseOrg)

  const optionsUser: any = {
    method: MethodCons.GET,
    query: {
      refresh: true,
    },
  }
  const resUser: any = await $socialAPI(APISocialAuthCons.VERIFY, optionsUser)
  let user = resUser.data
  const parseListOrgs: OrgType[] = parseListOrgCookie(user.orgs)
  const parseUser: UserType = parseUserCookie(user)
  store.setUser(parseUser)
  store.setListOrgs(parseListOrgs)

  toast.add({
    severity: ToastCons.SUCCESS,
    summary: t('success'),
    detail: t('organization_name_has_been_created_successfully', {
      name: instance.value.nameOfOrg,
    }),
    life: ToastCons.DURATION,
  })

  await navigateTo({
    path: PathSocialHomeCons.HOME,
    replace: true,
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

const transitionError = () => {
  if (instance.value.avatarOfOrgError) {
    CreateOrgValidate.avatarOfOrg(instance, t)
  }
  if (instance.value.nameOfOrgError) {
    CreateOrgValidate.nameOfOrg(instance, t, $orgAPI)
  }
  if (instance.value.sloganOfOrgError) {
    CreateOrgValidate.sloganOfOrg(instance, t)
  }
  if (instance.value.fieldsOfOrgError) {
    CreateOrgValidate.fieldsOfOrg(instance, t)
  }
  if (instance.value.sizeOfOrgError) {
    CreateOrgValidate.sizeOfOrg(instance, t)
  }
  if (instance.value.avatarOfBranchError) {
    CreateOrgValidate.avatarOfBranch(instance, t)
  }
  if (instance.value.nameOfBranchError) {
    CreateOrgValidate.nameOfBranch(instance, t)
  }
  if (instance.value.emailOfBranchError) {
    CreateOrgValidate.emailOfBranch(instance, t, $orgAPI)
  }
  if (instance.value.phoneNumberOfBranchError) {
    CreateOrgValidate.phoneNumberOfBranch(instance, t, $orgAPI)
  }
  if (instance.value.addressOfBranchError) {
    CreateOrgValidate.addressOfBranch(instance, t)
  }
  if (instance.value.termsPrivacyError) {
    CreateOrgValidate.termsAndPrivacy(instance, t)
  }
}

watch(
  () => store.getLanguage(),
  (value) => {
    setFormatNumber(value)
    /// Set language
    setTimeout(() => {
      transitionError()
    }, 100)
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
