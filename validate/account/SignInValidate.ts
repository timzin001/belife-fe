import type { ToastServiceMethods } from 'primevue'
import { type Ref } from 'vue'
import type { SignInType } from '~/types/account/SignInType'
/// Call API validate phone number
export const phoneNumber = async (
  instance: Ref<SignInType>,
  t: any,
  toast: ToastServiceMethods
) => {
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
  const phoneNumber = `${instance.value.dialCode.code}${value}`
  if (instance.value.phoneNumberAbort) {
    instance.value.phoneNumberAbort.abort(APIStatus.ABORT_API)
  }
  instance.value.phoneNumberAbort = new AbortController()
  const signal = instance.value.phoneNumberAbort.signal

  const options: any = {
    method: 'get',
    signal: signal,
    query: {
      phoneNumber: phoneNumber,
    },
  }
  const { data, error, status } = await CallAPI(
    APIPathAccount.GET_EXIST_PHONE_NUMBER,
    options,
    toast,
    t,
    false
  )
  instance.value.phoneNumberAbort = null
  if (status.value !== APIStatus.SUCCESS) {
    const strError = error?.value?.message ?? ''
    if (!strError.includes(APIStatus.ABORT_API)) {
      instance.value.phoneNumberError = t('name_is_not_exist_in_system', {
        name: t('phone_number'),
      })
      return
    }
    /// Abort
    return
  }
  const valueCont: any = data.value
  const result: any = valueCont.data
  if (!result) {
    instance.value.phoneNumberError = t('name_is_not_exist_in_system', {
      name: t('phone_number'),
    })
  } else {
    instance.value.phoneNumberError = ''
  }
}

/// Validate password
const password = async (instance: Ref<SignInType>, t: any, toast: any) => {
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
    instance.value.passwordError = t('password_must_have_a_lowercase_letter')
    return
  }
  if (!/[A-Z]/.test(instance.value.password)) {
    instance.value.passwordError = t('password_must_have_a_uppercase_letter')
    return
  }

  if (!/\d/.test(instance.value.password)) {
    instance.value.passwordError = t('password_must_have_a_number')
    return
  }
  if (!instance.value.phoneNumber || instance.value.phoneNumberError) {
    instance.value.passwordError = ''
    return
  }
  if (
    instance.value.passwordError !=
    t('name_is_not_correct', { name: t('password') })
  ) {
    instance.value.passwordError = ''
  }
  /// Get data
  const phoneNumber = `${instance.value.dialCode?.code ?? ''}${(
    instance.value.phoneNumber ?? ''
  ).replaceAll('-', '')}`
  console.log('4')
  const password = instance.value.password
  if (instance.value.passwordAbort) {
    instance.value.passwordAbort.abort(APIStatus.ABORT_API)
  }
  instance.value.passwordAbort = new AbortController()
  const signal = instance.value.passwordAbort.signal
  /// Check user exist
  const options: any = {
    method: 'get',
    signal: signal,
    query: {
      phoneNumber: phoneNumber,
      password: password,
    },
  }
  const { data, error, status } = await CallAPI(
    APIPathAccount.GET_EXIST_ACCOUNT,
    options,
    toast,
    t,
    false
  )
  instance.value.passwordAbort = null
  if (status.value !== APIStatus.SUCCESS) {
    const strError = error?.value?.message ?? ''
    if (!strError.includes(APIStatus.ABORT_API)) {
      instance.value.passwordError = t('name_is_not_correct', {
        name: t('password'),
      })
      return
    }
    /// Abort
    return
  }
  const valueCont: any = data.value
  const result: any = valueCont.data
  if (!result) {
    instance.value.passwordError = t('name_is_not_correct', {
      name: t('password'),
    })
  } else {
    instance.value.passwordError = ''
  }
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

const allValidate = async (
  instance: Ref<SignInType>,
  t: any,
  toast: ToastServiceMethods
) => {
  const validate = await Promise.all([
    SignInValidate.phoneNumber(instance, t, toast),
    SignInValidate.password(instance, t, toast),
  ])
  if (instance.value.phoneNumberError || instance.value.passwordError) {
    return false
  }
  return true
}

export const SignInValidate = {
  phoneNumber: phoneNumber,
  password: password,
  changeDialCode: changeDialCode,
  allValidate: allValidate,
}
