import type { ToastServiceMethods } from 'primevue'
import { type Ref } from 'vue'
import type { CreateOrgType } from '~/types/org/CreateOrgType'

/// Validate name of org
const nameOfOrg = async (
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

  if (instance.value.nameOfOrgAbort) {
    instance.value.nameOfOrgAbort.abort(APIStatus.ABORT_API)
  }
  instance.value.nameOfOrgAbort = new AbortController()
  const signal = instance.value.nameOfOrgAbort.signal
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
  instance.value.nameOfOrgAbort = null
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
const fieldsOfOrg = (instance: Ref<CreateOrgType>, t: any) => {
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
const sloganOfOrg = (instance: Ref<CreateOrgType>, t: any) => {
  let sloganOfOrganization = instance.value.sloganOfOrg

  if (!sloganOfOrganization) {
    instance.value.sloganOfOrgError = t('please_enter_name', {
      name: t('slogan').toLocaleLowerCase(),
    })
    return
  }
  instance.value.sloganOfOrgError = ''
}

/// Validate size of organzation
const sizeOfOrg = (instance: Ref<CreateOrgType>, t: any) => {
  let sizeOfOrganization = instance.value.sizeOfOrg
  if (!sizeOfOrganization) {
    instance.value.sizeOfOrgError = t('please_enter_name', {
      name: t('size'),
    })
    return
  }
  instance.value.sizeOfOrgError = ''
}

/// Validate phone number of branch
const phoneNumberOfBranch = async (
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
  if (instance.value.phoneNumberOfBranchAbort) {
    instance.value.phoneNumberOfBranchAbort.abort(APIStatus.ABORT_API)
  }
  instance.value.phoneNumberOfBranchAbort = new AbortController()
  const signal = instance.value.phoneNumberOfBranchAbort.signal
  const options = {
    method: 'get',
    signal: signal,
    query: {
      phoneNumber: phoneNumber,
    },
  }

  const { data, error, status } = await CallAPI(
    APIPathOrg.BRANCH.GET_EXIST_PHONE_NUMBER_IN_SYSTEM,
    options,
    toast,
    t,
    false
  )
  instance.value.phoneNumberOfBranchAbort = null
  if (status.value !== APIStatus.SUCCESS) {
    const strError = error?.value?.message || ''
    if (!strError.includes(APIStatus.ABORT_API)) {
      instance.value.phoneNumberOfBranchError = t('name_is_exist_in_system', {
        name: t('phone_number'),
      })
      return
    }
    /// Abort
    return
  }
  const valueCont: any = data.value
  const result: any = valueCont.data
  if (result) {
    instance.value.phoneNumberOfBranchError = t('name_is_exist_in_system', {
      name: t('phone_number'),
    })
  } else {
    instance.value.phoneNumberOfBranchError = ''
  }
}
/// Validate email of branch
const emailOfBranch = async (
  instance: Ref<CreateOrgType>,
  t: any,
  toast: ToastServiceMethods
) => {
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

  if (instance.value.emailOfBranchAbort) {
    instance.value.emailOfBranchAbort.abort(APIStatus.ABORT_API)
  }
  instance.value.emailOfBranchAbort = new AbortController()
  const signal = instance.value.emailOfBranchAbort.signal
  const options = {
    method: 'get',
    signal: signal,
    query: {
      email: emailOfBranch,
    },
  }

  const { data, error, status } = await CallAPI(
    APIPathOrg.BRANCH.GET_EXIST_PHONE_NUMBER_IN_SYSTEM,
    options,
    toast,
    t,
    false
  )
  instance.value.phoneNumberOfBranchAbort = null
  if (status.value !== APIStatus.SUCCESS) {
    const strError = error?.value?.message || ''
    if (!strError.includes(APIStatus.ABORT_API)) {
      instance.value.phoneNumberOfBranchError = t('name_is_exist_in_system', {
        name: t('phone_number'),
      })
      return
    }
    /// Abort
    return
  }
  const valueCont: any = data.value
  const result: any = valueCont.data
  if (result) {
    instance.value.phoneNumberOfBranchError = t('name_is_exist_in_system', {
      name: t('phone_number'),
    })
  } else {
    instance.value.phoneNumberOfBranchError = ''
  }

  instance.value.phoneNumberOfBranchError = ''
}
/// Validate address of branch
const addressOfBranch = (instance: Ref<CreateOrgType>, t: any) => {
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
const avatarOfOrg = (instance: Ref<CreateOrgType>, t: any) => {
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
const avatarOfBranch = (instance: Ref<CreateOrgType>, t: any) => {
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
const nameOfBranch = async (instance: Ref<CreateOrgType>, t: any) => {
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

/// All validate
const allValidate = async (
  instance: Ref<CreateOrgType>,
  t: any,
  toast: ToastServiceMethods
) => {
  await Promise.all([
    avatarOfOrg(instance, t),
    nameOfOrg(instance, t, toast),
    sloganOfOrg(instance, t),
    fieldsOfOrg(instance, t),
    sizeOfOrg(instance, t),
    avatarOfBranch(instance, t),
    nameOfBranch(instance, t),
    emailOfBranch(instance, t, toast),
    phoneNumberOfBranch(instance, t, toast),
    addressOfBranch(instance, t),
  ])

  if (
    instance.value.avatarOfOrgError ||
    instance.value.nameOfOrgError ||
    instance.value.sloganOfOrgError ||
    instance.value.fieldsOfOrgError ||
    instance.value.sizeOfOrgError ||
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
  avatarOfOrg: avatarOfOrg,
  sizeOfOrg: sizeOfOrg,
  sloganOfOrg: sloganOfOrg,
  nameOfOrg: nameOfOrg,
  nameOfBranch: nameOfBranch,
  changeDialCode: changeDialCode,
  fieldsOfOrg: fieldsOfOrg,
  emailOfBranch: emailOfBranch,
  phoneNumberOfBranch: phoneNumberOfBranch,
  addressOfBranch: addressOfBranch,
  avatarOfBranch: avatarOfBranch,
  allValidate: allValidate,
}
