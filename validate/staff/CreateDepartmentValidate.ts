import type { ToastServiceMethods } from 'primevue'
import { type Ref } from 'vue'
import type { CreateDepartmentType } from '~/types/staff/CreateDepartmentType'
/// Validate logo of org
const validateAvatar = (instance: any, t: any) => {
  const avatar = instance.value.avatar
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
  instance: Ref<CreateDepartmentType>,
  t: any,
  toast: ToastServiceMethods,
  locale: string
) => {
  let nameObject: any = instance.value.name

  console.log(nameObject)

  if (!nameObject) {
    instance.value.nameError = t('please_enter_name', {
      name: t('name').toLocaleLowerCase(),
    })
    return
  }
  let name = nameObject[locale] ?? ''
  if (!name.length) {
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
    instance.value.department &&
    instance.value.department.name[locale] === nameObject[locale]
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
    APIPathDepartment.GET_EXIST_NAME_DEARTMENT,
    options,
    toast,
    t,
    true
  )
  if (status.value !== APIStatus.SUCCESS) {
    instance.value.nameError = t(
      'name1_is_already_in_use_by_anthor_name2_in_organization',
      { name1: t('name'), name2: t('department') }
    )
    return
  }
  const valueCont: any = data.value
  const result: any = valueCont.data
  if (result) {
    instance.value.nameError = t(
      'name1_is_already_in_use_by_anthor_name2_in_organization',
      { name1: t('name'), name2: t('department') }
    )
  } else {
    instance.value.nameError = ''
  }
}

/// Validate all
const validateAll = async (
  instance: any,
  t: any,
  toast: ToastServiceMethods,
  locale: string
) => {
  await Promise.all([
    validateAvatar(instance, t),
    validateName(instance, t, toast, locale),
  ])

  if (instance.value.avatarError || instance.value.titleError) {
    return false
  }
  return true
}

export const CreateDepartmentValidate = {
  avatar: validateAvatar,
  name: validateName,
  all: validateAll,
}
