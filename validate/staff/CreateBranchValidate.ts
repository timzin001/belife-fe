import type { CreateBranchType } from '~/types/staff/CreateBranchType'
import { type Ref } from 'vue'
import type { ToastServiceMethods } from 'primevue'
/// Validate avatar of branch
const validateAvatar = (instance: Ref<CreateBranchType>, t: any) => {
  if ((instance.value.avatar || '').endsWith(DEFAULT_AVATAR)) {
    instance.value.avatarError = t('please_choose_avatar')
    return
  }
  if (instance.value.widthAvatar !== instance.value.heightAvatar) {
    instance.value.avatarError = t('ratio_of_avatar_is_not_1x1')
    return
  }

  instance.value.avatarError = ''
}

/// Validate name of branch
const validateName = async (
  instance: Ref<CreateBranchType>,
  toast: ToastServiceMethods,
  t: any,
  locale: string
) => {
  const nameObj: any = instance.value.name
  if (!nameObj) {
    instance.value.nameError = t('please_enter_name', {
      name: t('name').toLocaleLowerCase(),
    })
    return
  }
  let name = nameObj[locale] || ''
  if (name.length < 3) {
    instance.value.nameError = t(
      'name1_must_be_greater_than_name2_characters',
      { name1: t('name'), name2: 2 }
    )
    return
  }

  const options: any = {
    method: 'get',
    query: {
      name: name,
    },
  }
  const { data, error, status } = await CallAPI(
    APIPathBranch.GET_EXIST_NAME,
    options,
    toast,
    t
  )
  if (status.value !== APIStatus.SUCCESS) {
    instance.value.nameError = t(
      'name1_is_already_in_use_by_anthor_name2_in_organization',
      { name1: t('name'), name2: t('branch') }
    )
    return
  }
  const valueCont: any = data.value
  const result: any = valueCont.data
  if (result) {
    instance.value.nameError = t(
      'name1_is_already_in_use_by_anthor_name2_in_organization',
      { name1: t('name'), name2: t('branch') }
    )
  } else {
    instance.value.nameError = ''
  }
}

/// Validate  email
const validateEmail = async (
  instance: Ref<CreateBranchType>,
  toast: ToastServiceMethods,
  t: any
) => {
  const email = instance.value.email
  if (!email) {
    instance.value.emailError = t('please_enter_name', {
      name: t('name').toLocaleLowerCase(),
    })
    return
  }
  if (!isEmail(email)) {
    instance.value.emailError = t('name_is_not_correct_format', {
      name: t('email'),
    })
    return
  }

  const options: any = {
    method: 'get',
    query: {
      email: email,
    },
  }

  const { data, error, status } = await CallAPI(
    APIPathBranch.GET_EXIST_EMAIL,
    options,
    toast,
    t
  )
  if (status.value !== APIStatus.SUCCESS) {
    instance.value.emailError = t(
      'name1_is_already_in_use_by_anthor_name2_in_organization',
      { name1: t('email'), name2: t('branch').toLocaleLowerCase() }
    )
    return
  }
  const valueCont: any = data.value
  const result: any = valueCont.data
  if (result) {
    instance.value.emailError = t(
      'name1_is_already_in_use_by_anthor_name2_in_organization',
      { name1: t('email'), name2: t('branch').toLocaleLowerCase() }
    )
  } else {
    instance.value.emailError = ''
  }
}
/// Validate address
const validateAddress = async (
  instance: Ref<CreateBranchType>,
  toast: ToastServiceMethods,
  t: any,
  locale: string
) => {
  const addressObj: any = instance.value.address
  if (!addressObj) {
    instance.value.addressError = t('please_enter_name', {
      name: t('address').toLocaleLowerCase(),
    })
    return
  }
  let address = addressObj[locale] || ''
  if (!address) {
    instance.value.addressError = t('please_enter_name', {
      name: t('address').toLocaleLowerCase(),
    })
    return
  }
  const options: any = {
    method: 'get',
    query: {
      address: address,
    },
  }
  const { data, error, status } = await CallAPI(
    APIPathBranch.GET_EXIST_ADDRESS,
    options,
    toast,
    t
  )
  if (status.value !== APIStatus.SUCCESS) {
    instance.value.nameError = t(
      'name1_is_already_in_use_by_anthor_name2_in_organization',
      { name1: t('address'), name2: t('branch').toLocaleLowerCase() }
    )
    return
  }
  const valueCont: any = data.value
  const result: any = valueCont.data
  if (result) {
    instance.value.nameError = t(
      'name1_is_already_in_use_by_anthor_name2_in_organization',
      { name1: t('address'), name2: t('branch').toLocaleLowerCase() }
    )
  } else {
    instance.value.addressError = ''
  }
}
/// Validate all
const validateAll = async (
  instance: Ref<CreateBranchType>,
  toast: ToastServiceMethods,
  t: any,
  locale: string
) => {
  await Promise.all([
    validateAvatar(instance, t),
    validateName(instance, toast, t, locale),
    validateEmail(instance, toast, t),
    validateAddress(instance, toast, t, locale),
    validatePhoneNumber(instance, toast, t),
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

/// Validate phone number
const validatePhoneNumber = async (
  instance: Ref<CreateBranchType>,
  toast: ToastServiceMethods,
  t: any
) => {
  let phoneNumberStr = `${instance.value.phoneNumber ?? ''}`
  let value = phoneNumberStr.replaceAll('_', '')
  value = value.replaceAll('-', '')
  let pattern = (instance.value.phoneNumberPattern || '').replaceAll('-', '')

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
    instance.value.dialCode?.code || ''
  }${phoneNumberStr.replaceAll('-', '')}`

  const options: any = {
    method: 'get',
    query: {
      phoneNumber: phoneNumber,
    },
  }
  const { data, error, status } = await CallAPI(
    APIPathBranch.GET_EXIST_PHONE_NUMBER,
    options,
    toast,
    t
  )
  if (status.value !== APIStatus.SUCCESS) {
    instance.value.phoneNumberError = t(
      'name1_is_already_in_use_by_anthor_name2_in_organization',
      { name1: t('phone_number'), name2: t('branch').toLocaleLowerCase() }
    )
    return
  } else {
    instance.value.phoneNumberError = ''
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
export const CreateBranchValidate = {
  avatar: validateAvatar,
  all: validateAll,
  name: validateName,
  email: validateEmail,
  address: validateAddress,
  changeDialCode: changeDialCode,
  phoneNumber: validatePhoneNumber,
}
