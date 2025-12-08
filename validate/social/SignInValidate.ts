import type { ToastServiceMethods } from 'primevue'
import { type Ref } from 'vue'
import type { SignInType } from '~/types/social/sign-in/SignInType'
/// Call API validate phone number
export const phoneNumber = async (instance: Ref<SignInType>, t: any) => {
  let phoneNumberStr = `${instance.value.phoneNumber ?? ''}`
  let value = phoneNumberStr.replaceAll('_', '')
  value = value.replaceAll('-', '')
  let pattern = instance.value.phoneNumberPattern.replaceAll('-', '')

  if (!value) {
    instance.value.phoneNumberError = t('please_enter_name', {
      name: t('phone_number').toLocaleLowerCase(),
    })
    return
  }
  if (pattern.length !== value.length) {
    return
  }
  instance.value.phoneNumberError = ''
}

/// Validate password
const password = async (instance: Ref<SignInType>, t: any) => {
  if (!instance.value.password) {
    instance.value.passwordError = t('please_enter_name', {
      name: t('password').toLocaleLowerCase(),
    })
    return
  }

  if (instance.value.password.length < 9) {
    instance.value.passwordError = t(
      'name1_must_be_greater_than_name2_characters',
      { name1: t('password'), name2: 8 }
    )
    return
  }

  if (!/[a-z]/.test(instance.value.password)) {
    instance.value.passwordError = t(
      'name_must_contain_at_least_one_lowercase_letter',
      {
        name: t('password'),
      }
    )
    return
  }
  if (!/[A-Z]/.test(instance.value.password)) {
    instance.value.passwordError = t(
      'name_must_contain_at_least_one_uppercase_letter',
      {
        name: t('password'),
      }
    )

    return
  }

  if (!/\d/.test(instance.value.password)) {
    instance.value.passwordError = t('name_must_contain_at_least_one_number', {
      name: t('password'),
    })
    return
  }
  if (!/[^a-zA-Z0-9\s]/.test(instance.value.password)) {
    instance.value.passwordError = t(
      'name_must_contain_at_least_one_special_character',
      { name: t('password') }
    )
    return
  }
  instance.value.passwordError = ''
}
/// Change dial code
const changeDialCode = async (evt: any, instance: Ref<SignInType>) => {
  if (evt.value.code === '(+84)') {
    /// change pattern
    instance.value.phoneNumberPattern = '999-999-999'
    instance.value.phoneNumberPlaceHolder = '123-345-789'
  }
  if (evt.value.code == '(+65)') {
    instance.value.phoneNumberPattern = '9999-9999'
    instance.value.phoneNumberPlaceHolder = '1234-4567'
  }
  /// Clear data
  instance.value.phoneNumber = ''
}

const allValidate = async (instance: Ref<SignInType>, t: any) => {
  const validate = await Promise.all([
    SignInValidate.phoneNumber(instance, t),
    SignInValidate.password(instance, t),
  ])
  console.log(instance.value.phoneNumberError)
  console.log(instance.value.passwordError)
  if (instance.value.phoneNumberError || instance.value.passwordError) {
    return false
  }
  return true
}

export const SignInValidate = {
  phoneNumber: phoneNumber,
  password: password,
  changeDialCode: changeDialCode,
  all: allValidate,
}
