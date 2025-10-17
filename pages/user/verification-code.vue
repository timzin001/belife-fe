<template>
  <div class="page flex items-center justify-center">
    <div class="flex card rounded-[8px] group-verify-code">
      <div class="group-image relative">
        <img
          :src="HowlingWolves"
          alt="logo"
          class="image rounded-[8px] h-full"
        />
        <div
          class="absolute z-[1] bottom-[40px] left-[0px] right-[0px] logan pt-[10px] pb-[10px] h-[75px]"
        >
          <div class="ml-[20px] font-bold header">SOI-VIP</div>
          <div class="ml-[20px] font-bold description">
            {{ $t('support_news_and_mananges_of_organization') }}
          </div>
        </div>
      </div>

      <div
        class="group-content pl-[20px] relative"
        :class="instance.invalid ? '' : 'hidden'"
      >
        <div class="text-[16px] font-bold ml-[0px] mb-[20px]">
          {{ $t('verification_code') }}
        </div>
        <div class="text-[14px] ml-[0px] font-[500] mb-[20px]">
          <!-- {{ $t('verification_code') }} -->
          Dữ liệu không đúng vui lòng thử lại đăng nhập or đăng ký
        </div>
      </div>

      <div
        class="group-content pl-[20px] relative"
        :class="instance.invalid ? 'hidden' : ''"
      >
        <div class="text-[16px] font-bold ml-[0px] mb-[20px]">
          {{ $t('verification_code') }}
        </div>

        <div class="flex items-center justify-center">
          {{ $t('please_check_your_phone_to_get_code') }}
        </div>

        <!--- Password -->
        <div class="flex flex-col mt-[10px] item items-center justify-center">
          <InputOtp
            v-model="instance.otp"
            :length="6"
            @change="changeOtp"
            class="h-[32px] w-[280px]"
          />

          <Message
            v-if="instance.otpError"
            class="w-[280px]"
            severity="error"
            size="small"
            variant="simple"
            >{{ instance.otpError }}</Message
          >
        </div>

        <div
          class="flex flex-row mt-[10px] item mb-[50px] items-center justify-center"
        >
          <Button
            :label="$t('do_you_have_not_code_resend')"
            variant="link"
            class="h-[32px] link w-[280px]"
            @click="clickResendCode()"
          />
        </div>
        <div id="recaptcha-container"></div>
        <div class="flex flex-row mt-[10px] absolute z-[1] bottom-[0px]">
          <Button
            class="h-[28px] w-[50px] back"
            icon="pi pi-arrow-left"
            @click="clickBack()"
          />
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
import HowlingWolves from '~/assets/images/howling-wolves.jpg'
import { GlobalStore } from '~/store/Global'
import { useToast } from 'primevue/usetoast'
import type { VerificationCodeType } from '~/types/user/VerificationCodeType'
const { $auth } = useNuxtApp()

/// Define
const router = useRouter()
const route = useRoute()
const store = GlobalStore()
const toast = useToast()
const instance = ref(<VerificationCodeType>{ invalid: false })
const { t } = useI18n()

/// Function
const clickBack = () => {
  router.back()
}
/// Click resend code
const clickResendCode = () => {
  requestSendCode()
}
/// Change otp
const changeOtp = async (evt: any) => {
  if (
    instance.value.otp &&
    instance.value.otp.length == 6 &&
    instance.value.otp === '123456'
  ) {
    if (instance.value.previous === PathUser.SIGN_UP) {
      callSignUp()
    } else if (instance.value.previous === PathUser.SIGN_IN) {
      callSignIn()
    }
  }
}

/// Call sign in api
const callSignIn = async () => {
  const phoneNumber = instance.value.data?.phoneNumber ?? ''
  const password = instance.value.data?.password ?? ''

  const options: any = {
    method: Method.POST,
    body: {
      phoneNumber: phoneNumber,
      password: password,
    },
  }
  const { data, error, status } = await CallAPI(
    APIPathAuth.POST_SIGN_IN_AUTH,
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
  /// Remove data
  removeItem(LocalStorage.TEM_SIGN_UP)
  /// Save auth
  store.setUserAuth(result.data.auth)
  /// Save user
  store.setUser(result.data.user)
  /// Save orgs
  store.setListOrgs(result.data.orgs)

  await navigateTo({
    path: Path.HOME,
  })
}

/// Call sign up
const callSignUp = async () => {
  const phoneNumber = instance.value.data?.phoneNumber ?? ''
  const password = instance.value.data?.password ?? ''
  const fullName = instance.value.data?.fullName ?? ''
  const dateOfBirth = instance.value.data?.dateOfBirth ?? ''
  const gender = instance.value.data?.gender ?? ''
  const options: any = {
    method: Method.POST,
    body: {
      phoneNumber: phoneNumber,
      password: password,
      fullName: fullName,
      dateOfBirth: dateOfBirth,
      gender: gender,
    },
  }

  const { data, error, status } = await CallAPI(
    APIPathAuth.POST_SIGN_UP_AUTH,
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
  /// Remove data
  removeItem(LocalStorage.TEM_SIGN_UP)
  /// Save auth
  store.setUserAuth(result.data.auth)
  /// Save user
  store.setUser(result.data.user)
  /// Save organizations
  store.setListOrgs(result.data.organizations)
  /// Get user info
  await navigateTo({
    path: Path.HOME,
  })
}

/// Request send code to phone of user
const requestSendCode = () => {
  let phoneNumber = instance.value.data.phoneNumber ?? ''
  phoneNumber = phoneNumber.replaceAll('(', '')
  phoneNumber = phoneNumber.replaceAll(')', '')
  phoneNumber = phoneNumber.replaceAll(' ', '')
  toast.add({
    severity: Toast.SUCCESS,
    summary: t('success'),
    detail: t('a_verification_code_has_been_sent_to_your_phone'),
    life: Toast.DURATION,
  })
}

/// Init data
const initData = () => {
  /// Get data
  const { previous } = route.query
  if (previous !== PathUser.SIGN_IN && previous !== PathUser.SIGN_UP) {
    /// Access invalid
    instance.value.invalid = true
    return
  }
  instance.value.previous = `${previous}`
  let strValue

  if (previous === PathUser.SIGN_IN) {
    strValue = getItem(LocalStorage.TEM_SIGN_IN)
  } else if (previous === PathUser.SIGN_UP) {
    strValue = getItem(LocalStorage.TEM_SIGN_UP)
  }
  if (!strValue) {
    instance.value.invalid = true
    return
  }
  instance.value.data = JSON.parse(strValue)

  /// Get data
  requestSendCode()
}

onMounted(() => {
  $auth()
  initData()
})
</script>

<style scoped lang="scss">
:deep(.grecaptcha-badge) {
  display: none !important;
}

.link {
  padding: 0px;
  color: $text-color;
  text-decoration: underline;
}
.logan {
  background-color: rgba(100, 100, 100, 0.2);
  // background-color: red;
}

.page {
  padding: 8px;
}

.group-verify-code {
  padding: 30px;
  width: 1000px;
  flex-direction: row;
}
.group-image {
  flex: 1;
  .image {
    width: 100%;
  }
  .header {
    font-size: 20px;
  }
  .description {
    font-size: 16px;
  }
}
.group-content {
  flex: 1;
  margin-top: unset;
  padding-left: 20px;
  .item {
    width: 450px;
  }
}

.back {
  background-color: $second-color;
  border: 1px solid $second-color;
  color: black;
  &:hover {
    background-color: #e2e8f0;
    border: 1px solid #e2e8f0;
    color: black;
  }
}

/// Tablet
@media screen and (min-width: $tablet-min) and (max-width: $tablet-max) {
}

/// Tablet mini
@media screen and (min-width: $tablet-mini-min) and (max-width: $tablet-mini-max) {
  .group-verify-code {
    padding: 10px;
    width: 100%;
    flex-direction: column;
  }
  .group-image {
    max-height: 300px;
    .image {
      width: 100%;
      max-height: 300px;
    }
    .header {
      font-size: 18px;
    }
    .description {
      font-size: 13px;
    }
  }
  .group-content {
    margin-top: 20px;
    padding-left: unset;
    .item {
      width: 100%;
    }
  }
}

/// Mobile
@media screen and (min-width: $mobile-min) and (max-width: $mobile-max) {
  .group-verify-code {
    padding: 10px;
    width: 100%;
    flex-direction: column;
  }
  .group-image {
    max-height: 300px;
    .image {
      width: 100%;
      max-height: 300px;
    }
    .header {
      font-size: 18px;
    }
    .description {
      font-size: 13px;
    }
  }
  .group-content {
    margin-top: 20px;
    padding-left: unset;
    .item {
      width: 100%;
    }
  }
}
</style>
