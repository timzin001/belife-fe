/// Call API validate phone number
export const validatePhoneNumber = async (
  instance: any,
  toast: any,
  t: any
) => {
  let phoneNumberStr = `${instance.value.phoneNumber ?? ''}`
  let value = phoneNumberStr.replaceAll('_', '')
  value = value.replaceAll('-', '')
  let pattern = instance.value.phoneNumberPattern.replaceAll('-', '')

  if (!value) {
    instance.value.phoneNumberError = t('please_enter_name', {
      nam: t('phone_number').toLocaleLowerCase,
    })
    return
  }
  if (pattern.length !== value.length) {
    return
  }

  const phoneNumber = `${
    instance.value.dialCode.code
  }${phoneNumberStr.replaceAll('-', '')}`

  const options: any = {
    method: 'get',
    query: {
      phoneNumber: phoneNumber,
    },
  }
  const { data, error, status } = await CallAPI(
    APIPathUser.GET_EXIST_PHONE_NUMBER_USER,
    options,
    toast,
    t,
    false
  )
  if (status.value !== APIStatus.SUCCESS) {
    const strError = error?.value?.message ?? ''
    if (!strError.includes(APIStatus.ABORT_API)) {
      instance.value.phoneNumberError = t('phone_number_is_not_exsit_in_system')
      return
    }
    /// Abort
    return
  }
  const valueCont: any = data.value
  const result: any = valueCont.data
  if (!result) {
    instance.value.phoneNumberError = t('phone_number_is_not_exsit_in_system')
    return
  }
  instance.value.phoneNumberError = ''
}

/// Validate password
const validatePassword = async (instance: any, toast: any, t: any) => {
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
  /// Check user exist
  const options: any = {
    method: 'get',
    query: {
      phoneNumber: phoneNumber,
      password: password,
    },
  }
  const { data, error, status } = await CallAPI(
    APIPathUser.GET_EXIST_USER,
    options,
    toast,
    t,
    false
  )
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
    return
  }
  instance.value.passwordError = ''
}
/// Change dial code
const changeDialCode = async (evt: any, instance: any) => {
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

/// Validate code from
const validateCodeFrom = (instance: any, t: any) => {
  if (!instance.value.codeFrom) {
    instance.value.codeFromError = t('please_choose_get_code_from')
    return
  }
  instance.value.codeFromError = ''
}

const validateAll = async (
  instance: any,
  toast: any,
  t: any,
  phoneNumberController: any,
  passwordController: any
) => {
  const validate = await Promise.all([
    SignInValidate.phoneNumber(instance, toast, t),
    SignInValidate.password(instance, toast, t),
    SignInValidate.codeFrom(instance, t),
  ])
  if (
    instance.value.phoneNumberError ||
    instance.value.passwordError ||
    instance.value.codeFromError
  ) {
    return false
  }
  return true
}

export const SignInValidate = {
  phoneNumber: validatePhoneNumber,
  password: validatePassword,
  changeDialCode: changeDialCode,
  codeFrom: validateCodeFrom,
  validateAll: validateAll,
}
