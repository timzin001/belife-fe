import { type Ref } from 'vue'
import type { CreateBranchType } from '~/types/org/branches/CreateBranchType'
/// Validate avatar
const validateAvatar = (instance: Ref<CreateBranchType>, t: any) => {
  const avatar = instance.value.avatar || ''
  if (avatar.endsWith(DEFAULT_AVATAR)) {
    instance.value.avatarError = t('please_select_name', {
      name: t('avatar').toLocaleLowerCase(),
    })
    return
  }
  if (instance.value.widthAvatar !== instance.value.heightAvatar) {
    instance.value.avatarError = t('ratio_of_avatar_is_not_1x1')
    return
  }

  instance.value.avatarError = ''
}

/// Validate name
const validateName = async (
  instance: Ref<CreateBranchType>,
  t: any,
  $orgAPI: any
) => {
  if (!instance.value.name) {
    instance.value.nameError = t('please_enter_name', {
      name: t('name').toLocaleLowerCase(),
    })
    return
  }

  if (instance.value.name.length < 3) {
    instance.value.nameError = instance.value.nameError = t(
      'name1_must_be_greater_than_name2_characters',
      { name1: t('name'), name2: 2 }
    )
    return
  }

  if (instance.value.nameAbort) {
    instance.value.nameAbort.abort(APIStatusCons.ABORT_API)
  }
  instance.value.nameAbort = new AbortController()
  const signal = instance.value.nameAbort.signal

  const options: any = {
    method: MethodCons.GET,
    signal: signal,
    query: {
      name: instance.value.name,
    },
  }
  const result = await $orgAPI(APIOrgBranchCons.EXIST_NAME, options)
  if (result.data) {
    instance.value.nameError = t(
      'name1_is_already_in_use_by_another_name2_in_organization',
      {
        name1: t('name'),
        name2: t('position').toLocaleLowerCase(),
      }
    )
  } else {
    instance.value.nameError = ''
  }
}

/// Validate email of branch
const validateEmail = async (
  instance: Ref<CreateBranchType>,
  t: any,
  $orgAPI: any
) => {
  const email = instance.value.email
  if (!email) {
    instance.value.emailError = t('please_enter_name', {
      name: t('email').toLocaleLowerCase(),
    })
    return
  }
  if (!isEmail(email)) {
    instance.value.emailError = t('name_is_not_correct_format', {
      name: t('email'),
    })
    return
  }

  if (instance.value.emailAbort) {
    instance.value.emailAbort.abort(APIStatusCons.ABORT_API)
  }
  instance.value.emailAbort = new AbortController()
  const signal = instance.value.emailAbort.signal
  const options = {
    method: MethodCons.GET,
    signal: signal,
    query: {
      email: email,
    },
  }
  const response = await $orgAPI(APIOrgBranchCons.EXIST_EMAIL, options)
  if (response.data) {
    instance.value.emailError = t('name_is_exist_in_organization', {
      name: t('email'),
    })
  } else {
    instance.value.emailError = ''
  }
}

/// Change dial code
const changeDialCode = async (evt: any, instance: Ref<CreateBranchType>) => {
  let data = getDialCodePattern(evt.value.code)
  /// change pattern
  instance.value.phoneNumberPattern = data.pattern
  instance.value.phoneNumberPlaceHolder = data.placeHolder
  instance.value.phoneNumber = ''
}

/// Validate phone number
const validatePhoneNumber = async (
  instance: Ref<CreateBranchType>,
  t: any,
  $orgAPI: any
) => {
  let phoneNumberStr = `${instance.value.phoneNumber ?? ''}`
  let value = phoneNumberStr.replaceAll('_', '')
  value = value.replaceAll('-', '')
  let pattern = (instance.value.phoneNumberPattern || '').replaceAll('-', '')

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
    instance.value.phoneNumberAbort.abort(APIStatusCons.ABORT_API)
  }
  instance.value.phoneNumberAbort = new AbortController()
  const signal = instance.value.phoneNumberAbort.signal
  const options = {
    method: MethodCons.GET,
    signal: signal,
    query: {
      phoneNumber: phoneNumber,
    },
  }

  const response = await $orgAPI(APIOrgBranchCons.EXIST_PHONE_NUMBER, options)

  if (response.data) {
    instance.value.phoneNumberError = t('name_is_exist_in_system', {
      name: t('phone_number'),
    })
  } else {
    instance.value.phoneNumberError = ''
  }
}

/// Validate address
const validateAddress = (instance: Ref<CreateBranchType>, t: any) => {
  const address = instance.value.address
  if (!address) {
    instance.value.addressError = t('please_enter_name', {
      name: t('address').toLocaleLowerCase(),
    })
    return
  }
  instance.value.addressError = ''
}

/// Validate all
const validateAll = async (
  instance: Ref<CreateBranchType>,
  t: any,
  $orgAPI: any
) => {
  await Promise.all([
    validateAvatar(instance, t),
    validateName(instance, t, $orgAPI),
    validateEmail(instance, t, $orgAPI),
    validatePhoneNumber(instance, t, $orgAPI),
    validateAddress(instance, t),
  ])

  if (
    instance.value.avatarError ||
    instance.value.nameError ||
    instance.value.emailError ||
    instance.value.phoneNumberError ||
    instance.value.addressError
  ) {
    return false
  }
  return true
}

export const CreateBranchValidate = {
  avatar: validateAvatar,
  name: validateName,
  email: validateEmail,
  phoneNumber: validatePhoneNumber,
  changeDialCode: changeDialCode,
  address: validateAddress,
  all: validateAll,
}
