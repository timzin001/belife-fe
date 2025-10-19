/// Call API validate phone number
const validatePhoneNumber = async (instance: any, toast: any, t: any) => {
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
    APIPathAccount.GET_EXIST_PHONE_NUMBER,
    options,
    toast,
    t,
    false
  )
  if (status.value !== APIStatus.SUCCESS) {
    const strError = error?.value?.message ?? ''
    if (!strError.includes(APIStatus.ABORT_API)) {
      instance.value.phoneNumberError = t('phone_number_is_exsit_in_system')
      return
    }
    /// Abort
    return
  }
  const valueCont: any = data.value
  const result: any = valueCont.data
  if (result) {
    instance.value.phoneNumberError = t('phone_number_is_exsit_in_system')
  } else {
    instance.value.phoneNumberError = ''
  }
}

/// Validate password
const validatePassword = (instance: any, t: any) => {
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

  instance.value.passwordError = ''
}

/// Validate full name
const validateFullName = (instance: any, t: any) => {
  if (!instance.value.fullName) {
    instance.value.fullNameError = t('please_enter_name', {
      name: t('full_name').toLocaleLowerCase(),
    })
    return
  }
  if (instance.value.fullName && instance.value.fullName.length < 7) {
    instance.value.fullNameError = t(
      'name1_must_be_greater_than_name2_characters',
      { name1: t('full_name'), name2: 6 }
    )
    return
  }
  instance.value.fullNameError = ''
}

/// Validate gender
const validateGender = (instance: any, t: any) => {
  if (!instance.value.gender) {
    instance.value.genderError = t('please_choose_gender')
    return
  }

  instance.value.genderError = ''
}

/// Validate date of birth
const validateDateOfBirth = (instance: any, t: any) => {
  if (!instance.value.dateOfBirth) {
    instance.value.dateOfBirthError = t('please_enter_name', {
      name: t('date_of_birth').toLocaleLowerCase(),
    })
    return
  }
  instance.value.dateOfBirthError = ''
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
const validateAll = (
  instance: any,
  toast: any,
  t: any,
  abortController: any
) => {
  const validate = Promise.all([
    SignUpValidate.phoneNumber(instance, Toast, t),
    SignUpValidate.password(instance, t),
    SignUpValidate.fullName(instance, t),
    SignUpValidate.gender(instance, t),
    SignUpValidate.dateOfBirth(instance, t),
  ])

  if (
    instance.value.phoneNumberError ||
    instance.value.passwordError ||
    instance.value.fullNameError ||
    instance.value.genderError ||
    instance.value.dateOfBirthError
  ) {
    return false
  }
  return true
}

export const SignUpValidate = {
  phoneNumber: validatePhoneNumber,
  password: validatePassword,
  fullName: validateFullName,
  dateOfBirth: validateDateOfBirth,
  changeDialCode: changeDialCode,
  gender: validateGender,
  all: validateAll,
}
