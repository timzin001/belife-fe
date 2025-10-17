<template>
  <div class="page flex items-center justify-center">
    <div class="flex card rounded-[8px] group-sign-in">
      <div class="group-image relative">
        <img
          :src="HowlingWolves"
          alt="Flag"
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
              @blur="changePhoneNumber"
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
              :placeholder="
                $t('please_enter_name', {
                  name: $t('password').toLocaleLowerCase(),
                })
              "
              toggleMask
              @blur="changePassword"
              :feedback="false"
              class="h-[32px] flex-1"
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
        <div class="flex flex-col mt-[10px] item">
          <div class="flex items-start justify-center">
            <div class="label">{{ $t('get_code_from') }}</div>
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <RadioButton
                  size="small"
                  v-model="instance.codeFrom"
                  inputId="google-authenticator"
                  name="google-authenticator"
                  value="google-authenticator"
                  @value-change="changeCodeFrom"
                />
                <label for="google-authenticator">{{
                  $t('google_authenticator')
                }}</label>
              </div>
              <div class="flex items-center gap-2">
                <RadioButton
                  @value-change="changeCodeFrom"
                  size="small"
                  v-model="instance.codeFrom"
                  inputId="sms"
                  name="sms"
                  value="sms"
                />
                <label for="sms">{{ $t('short_message_service_sms') }}</label>
              </div>
            </div>
          </div>

          <Message
            v-if="instance.codeFromError"
            severity="error"
            size="small"
            variant="simple"
            >{{ instance.codeFromError }}</Message
          >
        </div>
        <div class="flex flex-row mt-[10px] item">
          <Button
            @click="clickMoveToSignUp()"
            :label="$t('do_you_have_not_account_sign_up')"
            variant="link"
            class="h-[32px] link"
          />
        </div>

        <div class="flex flex-row mt-[10px] item">
          <Button
            @click="clickSignIn()"
            :label="$t('sign_in')"
            class="w-[130px] h-[32px] register"
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
import type { SignInData } from '~/types/user/SignInType'
import { SignInValidate } from '~/validate/user/SignInValidate'

/// Define
const { $auth } = useNuxtApp()
const toast = useToast()
const { t } = useI18n()
const instance = ref(<SignInData>{
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
  /// Validate all
  const validate = Promise.all([
    SignInValidate.phoneNumber(instance, toast, t),
    SignInValidate.password(instance, toast, t),
    SignInValidate.codeFrom(instance, t),
  ])
  if (
    instance.value.phoneNumberError ||
    instance.value.passwordError ||
    instance.value.codeFromError
  ) {
    return
  }

  /// Get data
  const phoneNumber = `${instance.value.dialCode?.code ?? ''}${(
    instance.value.phoneNumber ?? ''
  ).replaceAll('-', '')}`
  const password = instance.value.password
  const codeFrom = instance.value.codeFrom

  /// Save tem_sign_in
  const obj = {
    phoneNumber: phoneNumber,
    password: password,
    codeFrom: codeFrom,
  }
  setItem(LocalStorage.TEM_SIGN_IN, JSON.stringify(obj))
  /// Move to verification code
  await navigateTo({
    path: PathUser.VERIFICATION_CODE,
    query: {
      previous: PathUser.SIGN_IN,
    },
  })
}

/// Move to sign up
const clickMoveToSignUp = async () => {
  await navigateTo({ path: PathUser.SIGN_UP })
}
/// Change phone number
const changePhoneNumber = async (evt: any) => {
  SignInValidate.phoneNumber(instance, toast, t)
}
/// Change dial code
const changeDialCode = async (evt: any) => {
  SignInValidate.changeDialCode(evt, instance)
}
/// Change password
const changePassword = async (evt: any) => {
  SignInValidate.password(instance, toast, t)
}
/// Change code from
const changeCodeFrom = async (evt: any) => {
  SignInValidate.codeFrom(instance, t)
}

onMounted(() => {
  $auth()
  // Update max min
  const passwordElement = document.getElementById('password')
  let password: any = passwordElement?.firstChild
  password.setAttribute('maxlength', 20)
})
</script>

<style scoped lang="scss">
:deep(.p-message-text) {
  padding-left: 110px;
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

.group-sign-in {
  padding: 30px;
  width: 1000px;
  flex-direction: row;
}
.group-image {
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
  margin-top: unset;
  padding-left: 20px;
  .item {
    width: 450px;
    .label {
      width: 110px;
    }
    .link {
      margin-left: 110px;
    }
    .register {
      margin-left: 110px;
    }
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
  .group-sign-in {
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
      .label {
        width: 100px;
      }
      .link {
        margin-left: 100px;
      }
      .register {
        margin-left: 100px;
      }
    }
  }
}

/// Mobile
@media screen and (min-width: $mobile-min) and (max-width: $mobile-max) {
  :deep(.p-message-text) {
    padding-left: 100px;
  }
  .group-sign-in {
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
      .label {
        width: 100px;
      }
      .link {
        margin-left: 100px;
      }
      .register {
        margin-left: 100px;
      }
    }
  }
}
</style>
