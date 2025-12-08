<template>
  <div class="page flex items-center justify-center">
    <div class="flex card rounded-[8px] sign-up-group">
      <div class="image-group relative">
        <img :src="HowlingWolves" alt="logo" class="image h-full" />
        <div
          class="absolute z-[1] bottom-[40px] left-[0px] right-[0px] logan pt-[10px] pb-[10px] h-[75px]"
        >
          <div class="ml-[20px] font-bold header">IIBelife</div>
          <div class="ml-[20px] font-bold description">
            {{ $t('support_news_and_mananges_of_organization') }}
          </div>
        </div>
      </div>

      <div class="contain-group pl-[20px]">
        <div class="text-[16px] font-bold ml-[0px] mb-[20px]">
          {{ $t('sign_up_your_account_with_information') }}
        </div>
        <!--- Phone number -->
        <div class="flex flex-col mt-[10px] item">
          <div class="flex items-center justify-center">
            <div class="label">{{ $t('phone_number') }}</div>
            <Select
              v-model="instance.dialCode"
              :options="instance.countries"
              optionLabel="name"
              :autoOptionFocus="true"
              @change="changeDialCode"
              placeholder="Select a Country"
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

        <!--- Password -->
        <div class="flex flex-col mt-[10px] item">
          <div class="flex items-center justify-center">
            <div class="label">{{ $t('password') }}</div>
            <Password
              @value-change="changePassword"
              id="password"
              v-model="instance.password"
              :placeholder="
                $t('please_enter_name', {
                  name: $t('password').toLocaleLowerCase(),
                })
              "
              toggleMask
              :feedback="false"
              @keyup.enter="clickSignUp"
              @blur="changePassword"
              class="h-[32px] flex-1"
            >
            </Password>
          </div>

          <Message
            v-if="instance.passwordError"
            severity="error"
            size="small"
            variant="simple"
            >{{ instance.passwordError }}</Message
          >
        </div>
        <!--- Fullname -->
        <div class="flex flex-col mt-[10px] item">
          <div class="flex items-center justify-center">
            <div class="label">{{ $t('full_name') }}</div>
            <InputText
              @value-change="changeFullName"
              v-model="instance.fullName"
              @keyup.enter="clickSignUp"
              :placeholder="
                $t('please_enter_name', {
                  name: $t('full_name').toLocaleLowerCase(),
                })
              "
              class="h-[32px] flex-1"
              @blur="changeFullName"
            />
          </div>
          <Message
            v-if="instance.fullNameError"
            severity="error"
            size="small"
            variant="simple"
            >{{ instance.fullNameError }}</Message
          >
        </div>
        <div class="flex flex-col mt-[10px] item">
          <div class="flex items-start justify-center">
            <div class="label">{{ $t('gender') }}</div>
            <div class="flex-1 flex flexflex-row">
              <div class="flex items-center gap-2">
                <RadioButton
                  size="small"
                  v-model="instance.gender"
                  inputId="male"
                  name="male"
                  @keyup.enter="clickSignUp"
                  value="male"
                  @value-change="changeGender"
                />
                <label for="male">{{ $t('male') }}</label>
              </div>
              <div class="flex items-center gap-2 ml-[10px]">
                <RadioButton
                  @value-change="changeGender"
                  size="small"
                  @keyup.enter="clickSignUp"
                  v-model="instance.gender"
                  inputId="female"
                  name="female"
                  value="female"
                />
                <label for="female">{{ $t('female') }}</label>
              </div>
              <div class="flex items-center gap-2 ml-[10px]">
                <RadioButton
                  @value-change="changeGender"
                  size="small"
                  @keyup.enter="clickSignUp"
                  v-model="instance.gender"
                  inputId="other"
                  name="other"
                  value="other"
                />
                <label for="other">{{ $t('other') }}</label>
              </div>
            </div>
          </div>

          <Message
            v-if="instance.genderError"
            severity="error"
            size="small"
            variant="simple"
            >{{ instance.genderError }}</Message
          >
        </div>
        <div class="flex flex-col mt-[10px] item">
          <div class="flex items-center justify-center">
            <div class="label">{{ $t('date_of_birth') }}</div>
            <DatePicker
              v-model="instance.dateOfBirth"
              :placeholder="
                $t('please_enter_name', {
                  name: $t('date_of_birth').toLocaleLowerCase(),
                })
              "
              class="h-[30px] flex-1"
              @value-change="changeDateOfBirth"
              @keyup.enter="clickSignUp"
              :minDate="instance.minDate"
              :maxDate="instance.maxDate"
              :dateFormat="instance.dateFormat"
              @blur="changeDateOfBirth"
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
        <div class="flex flex-col mt-[10px] item">
          <div class="flex items-start justify-start">
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
          <Message
            v-if="instance.termsPrivacyError"
            severity="error"
            size="small"
            variant="simple"
            >{{ instance.termsPrivacyError }}</Message
          >
        </div>
        <div class="flex flex-row item">
          <Button
            :label="$t('do_you_have_account_sign_in')"
            variant="link"
            @click="clickMoveToSignIn()"
            class="no-account"
          />
        </div>
        <div class="flex flex-row mt-[10px] item">
          <Button
            @click="clickSignUp()"
            :label="$t('sign_up')"
            class="register"
            icon="pi pi-user-plus"
          >
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// Authentication
definePageMeta({
  layout: 'no-auth',
})
/// Import
import SingaporeFlag from '~/assets/flags/singapore.svg'
import VietNamFlag from '~/assets/flags/vietnam.svg'
import HowlingWolves from '~/assets/images/howling-wolves.jpg'
import type { SignUpType } from '~/types/social/sign-up/SignUpType'
import { SignUpValidate } from '~/validate/social/SignUpValidate'
import { GlobalStore } from '~/store/Global'
import type { UserType } from '~/types/social/UserType'

const store = GlobalStore()
const { $socialAPI } = useNuxtApp()

/// Define
const { $auth } = useNuxtApp()
const toast = useToast()
const abortController = ref()
const { t, locale } = useI18n()
const instance = ref(<SignUpType>{
  phoneNumberPattern: '999-999-999',
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

/// Function
const clickSignUp = async () => {
  /// Validate all
  const validate = await SignUpValidate.all(instance, t, $socialAPI)
  if (!validate) {
    return
  }
  /// Get data
  const phoneNumber = `${instance.value.dialCode?.code ?? ''}${(
    instance.value.phoneNumber ?? ''
  ).replaceAll('-', '')}`
  const password = instance.value.password
  const fullName = instance.value.fullName
  const objDateOfBirth: any = instance.value.dateOfBirth

  const dateOfBirth = objDateOfBirth.toISOString() ?? ''
  const gender = instance.value.gender

  const options: any = {
    method: MethodCons.POST,
    body: {
      phoneNumber: phoneNumber,
      password: password,
      fullName: fullName,
      dateOfBirth: dateOfBirth,
      gender: gender,
    },
  }
  const response: any = await $socialAPI(APISocialAuthCons.SIGN_UP, options)
  const data = response.data
  const user = data.user
  const parseUser: UserType = parseUserCookie(user)
  /// Save access token
  store.setAccessTokenUser(data.accessToken)
  store.setRefreshTokenUser(data.refreshToken)
  store.setUser(parseUser)
  store.setOrg(null)

  await navigateTo({
    path: PathSocialHomeCons.HOME,
    replace: true,
  })
}
const clickMoveToSignIn = async () => {
  await navigateTo({ path: PathSocialSignInCons.SIGN_IN })
}
/// Change dial code
const changeDialCode = async (evt: any) => {
  SignUpValidate.changeDialCode(evt, instance)
}
/// Change phone number
const changePhoneNumber = async (evt: any) => {
  SignUpValidate.phoneNumber(instance, t, $socialAPI)
}
/// Enter on phone number
const enterPhoneNumber = (evt: any) => {
  let key = `${evt.key}`.toLowerCase()
  if (key != 'enter') {
    return
  }
  clickSignUp()
}
/// Change password
const changePassword = async (evt: any) => {
  SignUpValidate.password(instance, t)
}

/// Change date of birth
const changeDateOfBirth = async (evt: any) => {
  SignUpValidate.dateOfBirth(instance, t)
}

const changeTermsPrivacy = (evt: any) => {
  SignUpValidate.termsAndPrivacy(instance, t)
}

/// Change full name
const changeFullName = async (evt: any) => {
  SignUpValidate.fullName(instance, t)
}
/// Change gender
const changeGender = async (evt: any) => {
  SignUpValidate.gender(instance, t)
}
const clickMoveToTerm = async () => {
  navigateTo({
    path: PathSocialTermCons.TERM,
  })
}
const clickMoveToPrivacy = async () => {
  navigateTo({
    path: PathSocialPrivacyCons.PRIVACY,
  })
}
const transitionError = () => {
  if (instance.value.phoneNumberError) {
    SignUpValidate.phoneNumber(instance, t, $socialAPI)
  }
  if (instance.value.passwordError) {
    SignUpValidate.password(instance, t)
  }
  if (instance.value.fullNameError) {
    SignUpValidate.fullName(instance, t)
  }
  if (instance.value.genderError) {
    SignUpValidate.gender(instance, t)
  }
  if (instance.value.genderError) {
    SignUpValidate.gender(instance, t)
  }
  if (instance.value.dateOfBirthError) {
    SignUpValidate.dateOfBirth(instance, t)
  }
  if (instance.value.termsPrivacyError) {
    SignUpValidate.termsAndPrivacy(instance, t)
  }
}
watch(
  () => store.getLanguage(),
  (value) => {
    /// Set language
    setTimeout(() => {
      transitionError()
    }, 100)
  }
)

onMounted(() => {
  $auth()
  instance.value.maxDate = new Date()
  const passwordElement = document.getElementById('password')
  let password: any = passwordElement?.firstChild
  password.setAttribute('maxlength', 20)

  const phoneNumberElement = document.getElementById('phone-number')
  phoneNumberElement?.addEventListener('blur', changePhoneNumber)
  phoneNumberElement?.addEventListener('keydown', enterPhoneNumber)
  phoneNumberElement?.focus()
  instance.value.dateFormat = getDateFormatPicker(locale.value)
  instance.value.datePlaceHolder = getDateFormat(locale.value)
})
</script>

<style scoped lang="scss">
@import url('~/assets/scss/social/SignUp.scss');
</style>
