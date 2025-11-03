import type { ToastServiceMethods } from 'primevue'
import { type Ref } from 'vue'
import type { CreateOrgType } from '~/types/org/CreateOrgType'
/// Validate name of org
const validateNameOfOrg = async (
  instance: Ref<CreateOrgType>,
  t: any,
  toast: ToastServiceMethods
) => {
  let nameOfOrg = instance.value.nameOfOrg

  if (!nameOfOrg) {
    instance.value.nameOfOrgError = t('please_enter_name', {
      name: t('name').toLocaleLowerCase(),
    })
    return
  }

  if (nameOfOrg.length < 3) {
    instance.value.nameOfOrgError = t(
      'name1_must_be_greater_than_name2_characters',
      { name: t('name'), name2: 2 }
    )
    return
  }

  if (
    instance.value.nameOfOrgError !==
    t('name_is_exist_in_system', { name: t('name') })
  ) {
    instance.value.nameOfOrgError = ''
  }
  if (instance.value.nameOfOrgAbortController) {
    instance.value.nameOfOrgAbortController.abort(APIStatus.ABORT_API)
  }
  instance.value.nameOfOrgAbortController = new AbortController()
  const signal = instance.value.nameOfOrgAbortController.signal
  const options = {
    method: 'get',
    signal: signal,
    query: {
      name: nameOfOrg,
    },
  }

  const { data, error, status } = await CallAPI(
    APIPathOrg.GET_EXIST_NAME_ORG,
    options,
    toast,
    t,
    false
  )
  instance.value.nameOfOrgAbortController = null
  if (status.value !== APIStatus.SUCCESS) {
    const strError = error?.value?.message || ''
    if (!strError.includes(APIStatus.ABORT_API)) {
      instance.value.nameOfOrgError = t('name_is_exist_in_system', {
        name: t('name'),
      })
      return
    }
    /// Abort
    return
  }
  const valueCont: any = data.value
  const result: any = valueCont.data
  if (result) {
    instance.value.nameOfOrgError = t('name_is_exist_in_system', {
      name: t('name'),
    })
  } else {
    instance.value.nameOfOrgError = ''
  }
}

/// Change dial code
const changeDialCode = async (evt: any, instance: Ref<CreateOrgType>) => {
  let data = getDialCodePattern(evt.value.code)
  /// change pattern
  instance.value.phoneNumberOfBranchPattern = data.pattern
  instance.value.phoneNumberOBranchPlaceHolder = data.placeHolder
  instance.value.phoneNumberOfBranch = ''
}

/// Validate fields of organzation
const validateFieldsOfOrganization = (instance: Ref<CreateOrgType>, t: any) => {
  let fieldsOfOrganization = instance.value.fieldsOfOrg

  if (!fieldsOfOrganization) {
    instance.value.fieldsOfOrgError = t('please_enter_name', {
      name: t('fields').toLocaleLowerCase(),
    })
    return
  }
  instance.value.fieldsOfOrgError = ''
}

/// Validate slogan of organzation
const validateSloganOfOrganization = (instance: any, t: any) => {
  let sloganOfOrganization = instance.value.sloganOfOrganization

  if (!sloganOfOrganization) {
    instance.value.sloganOfOrganizationError = t('please_enter_name', {
      name: t('slogan').toLocaleLowerCase(),
    })
    return
  }
  instance.value.sloganOfOrganizationError = ''
}

/// Validate size of organzation
const validateSizeOfOrganization = (instance: Ref<CreateOrgType>, t: any) => {
  let sizeOfOrganization = instance.value.sizeOfOrg

  if (!sizeOfOrganization) {
    instance.value.sizeOfOrganizationError = t('please_enter_name', {
      name: t('size'),
    })
    return
  }
  instance.value.sizeOfOrganizationError = ''
}

/// Validate phone number of branch
const validatePhoneNumberOfBranch = async (
  instance: Ref<CreateOrgType>,
  t: any,
  toast: ToastServiceMethods
) => {
  let phoneNumberStr = `${instance.value.phoneNumberOfBranch ?? ''}`
  let value = phoneNumberStr.replaceAll('_', '')
  value = value.replaceAll('-', '')
  let pattern = (instance.value.phoneNumberOfBranchPattern || '').replaceAll(
    '-',
    ''
  )

  if (!value) {
    instance.value.phoneNumberOfBranchError = t('please_enter_name', {
      name: t('phone_number').toLocaleLowerCase(),
    })
    return
  }

  if (pattern.length !== value.length) {
    return
  }
  const phoneNumber = `${instance.value.dialCode.code}${value}`

  if (instance.value.phoneNumberOfBranchAbortController) {
    instance.value.phoneNumberOfBranchAbortController.abort(APIStatus.ABORT_API)
  }
  instance.value.phoneNumberOfBranchAbortController = new AbortController()
  const signal = instance.value.phoneNumberOfBranchAbortController.signal
  const options = {
    method: 'get',
    signal: signal,
    query: {
      phoneNumber: phoneNumber,
    },
  }

  const { data, error, status } = await CallAPI(
    APIPathOrg.GET_EXIST_NAME_ORG,
    options,
    toast,
    t,
    false
  )
  instance.value.nameOfOrgAbortController = null
  if (status.value !== APIStatus.SUCCESS) {
    const strError = error?.value?.message || ''
    if (!strError.includes(APIStatus.ABORT_API)) {
      instance.value.nameOfOrgError = t('name_is_exist_in_system', {
        name: t('name'),
      })
      return
    }
    /// Abort
    return
  }
  const valueCont: any = data.value
  const result: any = valueCont.data
  if (result) {
    instance.value.nameOfOrgError = t('name_is_exist_in_system', {
      name: t('name'),
    })
  } else {
    instance.value.nameOfOrgError = ''
  }

  instance.value.phoneNumberOfBranchError = ''
}
/// Validate email of branch
const validateEmailOfBranch = async (instance: Ref<CreateOrgType>, t: any) => {
  const emailOfBranch = instance.value.emailOfBranch
  if (!emailOfBranch) {
    instance.value.emailOfBranchError = t('please_enter_name', {
      name: t('email').toLocaleLowerCase(),
    })
    return
  }
  if (!isEmail(emailOfBranch)) {
    instance.value.emailOfBranchError = t('name_is_not_correct_format', {
      name: t('email'),
    })
    return
  }
  instance.value.emailOfBranchError = ''
}
/// Validate address of branch
const validateAddressOfBranch = (instance: Ref<CreateOrgType>, t: any) => {
  const addressOfBranch = instance.value.addressOfBranch
  if (!addressOfBranch) {
    instance.value.addressOfBranchError = t('please_enter_name', {
      name: t('branch').toLocaleLowerCase(),
    })
    return
  }
  instance.value.addressOfBranchError = ''
}

/// Validate logo of org
const validateLogoOfOrg = (instance: Ref<CreateOrgType>, t: any) => {
  const logoOfOrganization = instance.value.avatarOfOrg || ''
  if (logoOfOrganization.endsWith(DEFAULT_AVATAR)) {
    instance.value.avatarOfOrgError = t('please_choose_avatar')
    return
  }
  if (instance.value.widthAvatarOfOrg !== instance.value.heightAvatarOfOrg) {
    instance.value.avatarOfOrgError = t('ratio_of_avatar_is_not_1x1')
    return
  }

  instance.value.avatarOfOrgError = ''
}

/// Validate avatar of branch
const validateAvatarOfBranch = (instance: Ref<CreateOrgType>, t: any) => {
  const avatarOfBranch = instance.value.avatarOfBranch || ''
  if (avatarOfBranch.endsWith(DEFAULT_AVATAR)) {
    instance.value.avatarOfBranchError = t('please_choose_avatar')
    return
  }
  if (
    instance.value.widthAvatarOfBranch !== instance.value.heightAvatarOfBranch
  ) {
    instance.value.avatarOfBranchError = t('ratio_of_avatar_is_not_1x1')
    return
  }

  instance.value.avatarOfBranchError = ''
}

/// Validate name of branch
const validateNameOfBranch = async (instance: Ref<CreateOrgType>, t: any) => {
  let nameOfBranch = `${instance.value.nameOfBranch || ''}`

  if (!nameOfBranch) {
    instance.value.nameOfBranchError = t('please_enter_name', {
      name: t('branch').toLocaleLowerCase(),
    })
    return
  }

  if (nameOfBranch.length < 3) {
    instance.value.nameOfBranchError = t(
      'name1_must_be_greater_than_name2_characters',
      { name1: t('name'), name2: 2 }
    )
    return
  }
  instance.value.nameOfBranchError = ''
}

/// Validate all
const validateAll = async (
  instance: Ref<CreateOrgType>,
  t: any,
  toast: ToastServiceMethods
) => {
  await Promise.all([
    validateLogoOfOrg(instance, t),
    validateNameOfOrg(instance, t, toast),
    validateSloganOfOrganization(instance, t),
    validateFieldsOfOrganization(instance, t),
    validateFieldsOfOrganization(instance, t),
    validateSizeOfOrganization(instance, t),
    validateAvatarOfBranch(instance, t),
    validateNameOfBranch(instance, t),
    validateEmailOfBranch(instance, t),
    validatePhoneNumberOfBranch(instance, t, toast),
    validateAddressOfBranch(instance, t),
  ])

  if (
    instance.value.avatarOfOrgError ||
    instance.value.nameOfOrgError ||
    instance.value.sloganOfOrgError ||
    instance.value.fieldsOfOrgError ||
    instance.value.sizeOfOrganizationError ||
    instance.value.avatarOfBranchError ||
    instance.value.nameOfBranchError ||
    instance.value.emailOfBranchError ||
    instance.value.phoneNumberOfBranchError ||
    instance.value.addressOfBranchError
  ) {
    return false
  }
  return true
}

export const CreateOrgValidate = {
  avatarOfOrg: validateLogoOfOrg,
  nameOfOrg: validateNameOfOrg,
  nameOfBranch: validateNameOfBranch,
  changeDialCode: changeDialCode,
  fieldsOfOrg: validateFieldsOfOrganization,
  emailOfBranch: validateEmailOfBranch,
  phoneNumberOfBranch: validatePhoneNumberOfBranch,
  addressOfBranch: validateAddressOfBranch,
  avatarOfBranch: validateAvatarOfBranch,
  sizeOfOrg: validateSizeOfOrganization,
  sloganOfOrg: validateSloganOfOrganization,
  validateAll: validateAll,
}
