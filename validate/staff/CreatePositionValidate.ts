import type { CreatePositionType } from '~/types/staff/CreatePositionType'
import { type Ref } from 'vue'
import type { ToastServiceMethods } from 'primevue'
/// Validate avatar
const validateAvatar = (instance: Ref<CreatePositionType>, t: any) => {
  const avatar = instance.value.avatar || ''
  if (avatar.endsWith(DEFAULT_AVATAR)) {
    instance.value.avatarError = t('please_choose_avatar')
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
  toast: ToastServiceMethods,
  locale: string
) => {
  let nameObject: any = instance.value.name

  if (!nameObject || !nameObject[locale]) {
    instance.value.nameError = t('please_enter_name', {
      name: t('name').toLocaleLowerCase(),
    })
    return
  }
  let name = nameObject[locale] || ''
  if (!name) {
    instance.value.nameError = t('please_enter_name', {
      name: t('name').toLocaleLowerCase(),
    })
    return
  }

  if (name.length < 3) {
    instance.value.nameError = instance.value.nameError = t(
      'name1_must_be_greater_than_name2_characters',
      { name1: t('name'), name2: 2 }
    )
    return
  }
  if (
    instance.value.position &&
    instance.value.position.name[locale] === name
  ) {
    return
  }

  const options: any = {
    method: Method.GET,
    query: {
      name: name,
    },
  }

  const { data, error, status } = await CallAPI(
    APIPathPosition.GET_EXIST_NAME,
    options,
    toast,
    t,
    true
  )

  if (status.value !== APIStatusCons.SUCCESS) {
    instance.value.nameError = t(
      'name1_is_already_in_use_by_anthor_name2_in_organization',
      { name1: t('name'), name2: t('position').toLocaleLowerCase() }
    )
    return
  }
  const valueCont: any = data.value
  const result: any = valueCont.data
  if (result) {
    instance.value.nameError = t(
      'name1_is_already_in_use_by_anthor_name2_in_organization',
      { name1: t('name'), name2: t('position').toLocaleLowerCase() }
    )
  } else {
    instance.value.nameError = ''
  }
}

/// Validate all
const validateAll = async (
  instance: Ref<CreatePositionType>,
  t: any,
  toast: ToastServiceMethods,
  locale: string,
  position: any = null
) => {
  await Promise.all([
    validateAvatar(instance, t),
    validateName(instance, t, toast, locale),
  ])

  if (instance.value.avatarError || instance.value.nameError) {
    return false
  }
  return true
}

export const CreatePositionValidate = {
  avatar: validateAvatar,
  name: validateName,
  all: validateAll,
}
