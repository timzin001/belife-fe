/// Validate full name
const validateFullName = (instance: any, t: any): boolean => {
  if (!instance.value.fullName) {
    instance.value.fullNameError = t('please_enter_name', {
      name: t('full_name').toLocaleLowerCase(),
    })
    return false
  }
  if (instance.value.fullName && instance.value.fullName.length < 7) {
    instance.value.fullNameError = t(
      'name1_must_be_greater_than_name2_characters',
      { name1: t('full_name'), name2: 6 }
    )
    return false
  }
  instance.value.fullNameError = ''
  return true
}

/// Validate address
const validateAddress = (instance: any, t: any): boolean => {
  if (!instance.value.address) {
    instance.value.addressError = t('please_enter_name', {
      name: t('address').toLocaleLowerCase(),
    })
    return false
  }

  instance.value.addressError = ''
  return true
}
/// Validate date of birth
const validateDateOfBirth = (instance: any, toast: any, t: any) => {
  if (!instance.value.dateOfBirth) {
    instance.value.dateOfBirthError = t('please_enter_name', {
      name: t('date_of_birth').toLocaleLowerCase(),
    })
    return false
  }
  instance.value.dateOfBirthError = ''
  return true
}
/// Validate nickname
const validateNickName = async (
  instance: any,
  toast: any,
  t: any,
  abortController: any
) => {
  if (!instance.value.nickName) {
    instance.value.nickNameError = t('please_enter_name', {
      name: t('nick_name').toLocaleLowerCase(),
    })
    return false
  }

  if (!isNickName(instance.value.nickName)) {
    instance.value.nickNameError = t(
      'nick_name_only_contain_letters_numbers_and_underscores'
    )
    return false
  }

  if (abortController.value) {
    abortController.value.abort(APIStatus.ABORT_API)
  }
  abortController.value = new AbortController()
  const options: any = {
    method: Method.GET,
    signal: abortController.value.signal,
    query: {
      nickName: instance.value.nickName,
    },
  }

  const { data, error, status } = await CallAPI(
    APIPathAccount.GET_EXIST_NICK_NAME_USER,
    options,
    toast,
    t,
    true
  )
  if (status.value !== APIStatus.SUCCESS) {
    const strError = error?.value?.message ?? ''
    if (!strError.includes(APIStatus.ABORT_API)) {
      instance.value.nickNameError = t('name_is_exist_in_system', {
        name: t('nick_name').toLocaleLowerCase(),
      })
      return false
    }
    /// Abort
    return false
  }
  const valueCont: any = data.value
  const result: any = valueCont.data
  if (result) {
    instance.value.nickNameError = t('name_is_exist_in_system', {
      name: t('nick_name').toLocaleLowerCase(),
    })
    return false
  }

  instance.value.nickNameError = ''
  return true
}

/// Validate old password
const validateOldPassword = (instance: any, t: any) => {
  if (!instance.value.oldPassword) {
    instance.value.oldPasswordError = t('please_enter_name', {
      name: t('old_password').toLocaleLowerCase(),
    })
    return false
  }

  if (instance.value.oldPassword.length < 9) {
    instance.value.oldPasswordError = t(
      'name1_must_be_greater_than_name2_characters',
      { name1: t('old_password'), name2: 8 }
    )
    return false
  }

  if (!/[a-z]/.test(instance.value.oldPassword)) {
    instance.value.oldPasswordError = t(
      'old_password_must_have_a_lowercase_letter'
    )
    return false
  }
  if (!/[A-Z]/.test(instance.value.oldPassword)) {
    instance.value.oldPasswordError = t(
      'old_password_must_have_a_uppercase_letter'
    )
    return false
  }

  if (!/\d/.test(instance.value.oldPassword)) {
    instance.value.oldPasswordError = t('old_password_must_have_a_number')
    return false
  }

  if (
    instance.value.oldPassword &&
    instance.value.newPassword &&
    instance.value.oldPassword === instance.value.newPassword
  ) {
    instance.value.oldPasswordError = t(
      'old_password_and_new_password_are_the_same'
    )
    return false
  }

  instance.value.oldPasswordError = ''
  return true
}
/// Validate new password
const validateNewPassword = (instance: any, t: any) => {
  if (!instance.value.newPassword) {
    instance.value.newPasswordError = t('please_enter_name', {
      name: t('new_password').toLocaleLowerCase(),
    })
    return false
  }

  if (instance.value.newPassword.length < 9) {
    instance.value.newPasswordError = t(
      'name1_must_be_greater_than_name2_characters',
      { name1: t('new_password'), name2: 8 }
    )
    return false
  }

  if (!/[a-z]/.test(instance.value.newPassword)) {
    instance.value.newPasswordError = t(
      'new_password_must_have_a_lowercase_letter'
    )
    return false
  }
  if (!/[A-Z]/.test(instance.value.newPassword)) {
    instance.value.newPasswordError = t(
      'new_password_must_have_a_uppercase_letter'
    )
    return false
  }

  if (!/\d/.test(instance.value.newPassword)) {
    instance.value.newPasswordError = t('new_password_must_have_a_number')
    return false
  }
  if (
    instance.value.oldPassword &&
    instance.value.newPassword &&
    instance.value.oldPassword === instance.value.newPassword
  ) {
    instance.value.newPasswordError = t(
      'old_password_and_new_password_are_the_same'
    )
    return false
  }

  instance.value.newPasswordError = ''
  return true
}
/// Validate description
const validateDescription = (
  instance: any,
  description: any,
  t: any
): boolean => {
  if (!description) {
    instance.value.descriptionError = t('please_enter_name', {
      name: t('description').toLocaleLowerCase(),
    })
    return false
  }

  instance.value.descriptionError = ''
  return true
}
/// Validate gender
const validateGender = (instance: any, t: any) => {
  if (!instance.value.gender) {
    instance.value.genderError = t('please_choose_gender')
    return false
  }

  instance.value.genderError = ''
  return true
}

/// Call API validate phone number
const validatePhoneNumber = async (instance: any, toast: any, t: any) => {
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

export const ProfileValidate = {
  fullName: validateFullName,
  address: validateAddress,
  dateOfBirth: validateDateOfBirth,
  nickName: validateNickName,
  oldPassword: validateOldPassword,
  newPassword: validateNewPassword,
  description: validateDescription,
  gender: validateGender,
  phoneNumber: validatePhoneNumber,
  changeDialCode: changeDialCode,
}
