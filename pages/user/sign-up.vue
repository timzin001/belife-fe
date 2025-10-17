<template>
  <div class="page flex items-center justify-center">
    <div class="flex card rounded-[8px] group-sign-up">
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

      <div class="group-content pl-[20px]">
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
              @change="changeDialCode"
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
                  name: $t('passowrd').toLocaleLowerCase(),
                })
              "
              toggleMask
              :feedback="false"
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
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <RadioButton
                  size="small"
                  v-model="instance.gender"
                  inputId="male"
                  name="male"
                  value="male"
                  @value-change="changeGender"
                />
                <label for="male">{{ $t('male') }}</label>
              </div>
              <div class="flex items-center gap-2">
                <RadioButton
                  @value-change="changeGender"
                  size="small"
                  v-model="instance.gender"
                  inputId="female"
                  name="female"
                  value="female"
                />
                <label for="female">{{ $t('female') }}</label>
              </div>
              <div class="flex items-center gap-2">
                <RadioButton
                  @value-change="changeGender"
                  size="small"
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
              class="h-[32px] flex-1"
              @value-change="changeDateOfBirth"
              :minDate="instance.minDate"
              :maxDate="instance.maxDate"
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
        <div class="flex flex-row mt-[10px] item">
          <Button
            :label="$t('do_you_have_account_sign_in')"
            variant="link"
            @click="clickMoveToSignIn()"
            class="h-[32px] link"
          />
        </div>
        <div class="flex flex-row mt-[10px] item">
          <Button
            @click="clickSignUp()"
            :label="$t('sign_up')"
            class="w-[130px] h-[32px] register"
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
import type { SignUpType } from '~/types/user/SignUpType'
import { SignUpValidate } from '~/validate/user/SignUpValidate'

/// Define
const { $auth } = useNuxtApp()
const { t } = useI18n()
const toast = useToast()
const abortController = ref()
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
  const validate = SignUpValidate.all(instance, toast, t, abortController)
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
  /// Save tem_sign_up
  const obj = {
    phoneNumber: phoneNumber,
    password: password,
    fullName: fullName,
    dateOfBirth: dateOfBirth,
    gender: gender,
  }
  setItem(LocalStorage.TEM_SIGN_UP, JSON.stringify(obj))
  /// Move to verification code
  await navigateTo({
    path: PathUser.VERIFICATION_CODE,
    query: {
      previous: PathUser.SIGN_UP,
    },
  })
}
const clickMoveToSignIn = async () => {
  await navigateTo({ path: PathUser.SIGN_IN })
}
/// Change dial code
const changeDialCode = async (evt: any) => {
  SignUpValidate.changeDialCode(evt, instance)
}
/// Change phone number
const changePhoneNumber = async (evt: any) => {
  SignUpValidate.phoneNumber(instance, toast, t)
}
/// Change password
const changePassword = async (evt: any) => {
  SignUpValidate.password(instance, t)
}

/// Change date of birth
const changeDateOfBirth = async (evt: any) => {
  SignUpValidate.dateOfBirth(instance, t)
}

/// Change full name
const changeFullName = async (evt: any) => {
  SignUpValidate.fullName(instance, t)
}
/// Change gender
const changeGender = async (evt: any) => {
  SignUpValidate.gender(instance, t)
}
onMounted(() => {
  $auth()
  instance.value.maxDate = new Date()
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

.group-sign-up {
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
  .group-sign-up {
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
  .group-sign-up {
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
