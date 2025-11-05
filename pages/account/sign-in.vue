<template>
  <div class="page flex items-center justify-center">
    <div class="flex card sign-in-group" id="sign-in-group">
      <div class="group-image relative">
        <img :src="HowlingWolves" alt="Flag" class="image h-full" />
        <div
          class="absolute z-[1] bottom-[40px] left-[0px] right-[0px] logan pt-[10px] pb-[10px] h-[75px]"
        >
          <div class="ml-[20px] font-bold header">IIBelife</div>
          <div class="ml-[20px] font-bold description">
            {{ $t('support_news_and_mananges_of_organization') }}
          </div>
        </div>
      </div>
      <div class="group-content pl-[20px]">
        <div class="text-[16px] font-bold ml-[0px] mb-[20px]">
          {{ $t('sign_in_with_your_account') }}
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
              class="h-[30px] flex-1"
              autocomplete="off"
              id="phone-number"
              ref="inputMaskRef"
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

        <div class="flex flex-col mt-[10px] item">
          <div class="flex items-center justify-center">
            <div class="label">{{ $t('password') }}</div>
            <Password
              @value-change="changePassword"
              id="password"
              v-model="instance.password"
              @keyup.enter="clickSignIn"
              :placeholder="
                $t('please_enter_name', {
                  name: $t('password').toLocaleLowerCase(),
                })
              "
              toggleMask
              @blur="changePassword"
              :feedback="false"
              class="h-[30px] flex-1"
            />
          </div>

          <Message
            v-if="instance.passwordError"
            severity="error"
            size="small"
            variant="simple"
            >{{ instance.passwordError }}</Message
          >
        </div>

        <div class="flex flex-row mt-[10px] item">
          <Button
            @click="clickMoveToSignUp()"
            :label="$t('do_you_have_not_account_sign_up')"
            variant="link"
            class="h-[30px] link"
          ></Button>
        </div>

        <div class="flex flex-row mt-[10px] item">
          <Button
            @click="clickSignIn()"
            :label="$t('sign_in')"
            class="w-[130px] h-[30px] register"
            icon="pi pi-sign-in"
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
import type { SignInType } from '~/types/account/SignInType'
import { SignInValidate } from '~/validate/account/SignInValidate'
import { GlobalStore } from '~/store/Global'
const store = GlobalStore()

/// Define
const { $auth } = useNuxtApp()
const toast = useToast()
const { t } = useI18n()
const instance = ref(<SignInType>{
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

/// Function

/// Click sign in
const clickSignIn = async () => {
  console.log('clickSignIn')
  const validate = await SignInValidate.allValidate(instance, t, toast)
  if (!validate) {
    return
  }
  /// Get data
  const phoneNumber = `${instance.value.dialCode?.code ?? ''}${(
    instance.value.phoneNumber ?? ''
  ).replaceAll('-', '')}`
  const password = instance.value.password

  const options: any = {
    method: Method.POST,
    body: {
      phoneNumber: phoneNumber,
      password: password,
    },
  }
  const { data, error, status } = await CallAPI(
    APIPathAccount.POST_SIGN_IN,
    options,
    toast,
    t,
    false
  )

  /// Check error
  if (status.value !== APIStatus.SUCCESS) {
    toast.add({
      severity: Toast.ERROR,
      summary: t('error'),
      detail: getErrorMessages(error, t),
      life: Toast.DURATION,
    })
    return
  }
  const result: any = data.value
  console.log(result)

  /// Save user
  store.setAccount(result.data)

  await navigateTo({
    path: Path.HOME,
    replace: true,
  })
}

/// Move to sign up
const clickMoveToSignUp = async () => {
  await navigateTo({ path: PathAccount.SIGN_UP })
}

/// Enter on phone number
const enterPhoneNumber = (evt: any) => {
  let key = `${evt.key}`.toLowerCase()
  if (key != 'enter') {
    return
  }
  clickSignIn()
}
/// Change phone number
const changePhoneNumber = async (evt: any) => {
  SignInValidate.phoneNumber(instance, t, toast)
}
/// Change dial code
const changeDialCode = async (evt: any) => {
  SignInValidate.changeDialCode(evt, instance)
}
/// Change password
const changePassword = async (evt: any) => {
  SignInValidate.password(instance, t, toast)
}

onMounted(() => {
  $auth()
  // Update max min
  const passwordElement = document.getElementById('password')
  let password: any = passwordElement?.firstChild
  password.setAttribute('maxlength', 20)
  const phoneNumberElement = document.getElementById('phone-number')
  phoneNumberElement?.addEventListener('blur', changePhoneNumber)
  phoneNumberElement?.addEventListener('keydown', enterPhoneNumber)
  phoneNumberElement?.focus()
})
</script>

<style scoped lang="scss">
@import url('~/assets/scss/account/SignIn.scss');
</style>
