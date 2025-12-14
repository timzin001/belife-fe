import type { CreatePositionType } from '~/types/org/positions/CreatePositionType'
import { type Ref } from 'vue'
/// Validate avatar
const validateAvatar = (instance: Ref<CreatePositionType>, t: any) => {
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
  instance: Ref<CreatePositionType>,
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
  const result = await $orgAPI(APIOrgDepartmentCons.EXIST_NAME, options)
  if (result.data) {
    instance.value.nameError = t('name_is_exist_in_organization', {
      name1: t('name'),
    })
  } else {
    instance.value.nameError = ''
  }
}

/// Validate all
const validateAll = async (
  instance: Ref<CreatePositionType>,
  t: any,
  $orgAPI: any
) => {
  await Promise.all([
    validateAvatar(instance, t),
    validateName(instance, t, $orgAPI),
  ])

  if (instance.value.avatarError || instance.value.nameError) {
    return false
  }
  return true
}

export const CreateDepartmentValidate = {
  avatar: validateAvatar,
  name: validateName,
  all: validateAll,
}
