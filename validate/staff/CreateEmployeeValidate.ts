import type { CreateEmployeeType } from '~/types/staff/CreateEmployeeType'
import { type Ref } from 'vue'
import type { ToastServiceMethods } from 'primevue'
/// Validate name of branch
const validateUserCode = async (
  instance: Ref<CreateEmployeeType>,
  t: any,
  toast: ToastServiceMethods
) => {
  const options: any = {
    method: Method.GET,
    query: {
      code: instance.value.userCode,
    },
  }

  const listResponses = await Promise.all([
    CallAPI(APIPathAccount.GET_USER_WITH_CODE, options, toast, t, false),
    CallAPI(APIPathEmployee.GET_EXIST_EMPLOYEE_WITH_CODE, options, toast, t),
  ])
  const resUser = listResponses[0]
  const resEmployee = listResponses[1]
  const valUser: any = resUser.data.value
  const valEmployee: any = resEmployee.data.value
  const user = valUser.data
  const employee = valEmployee.data
  if (!user) {
    instance.value.userCodeError = t('name_is_not_exist_in_system', {
      name: t('user'),
    })
  } else if (employee) {
    instance.value.userCodeError = t('name_is_exist_in_organization', {
      name: t('employee'),
    })
  } else {
    instance.value.userCodeError = ''
  }
  instance.value.user = user
}

/// Validate all
const validateAll = async (
  instance: Ref<CreateEmployeeType>,
  t: any,
  toast: ToastServiceMethods,
  locale: string
) => {
  await Promise.all([
    validateUserCode(instance, t, toast),
    validateBranch(instance, t),
    validateDepartment(instance, t),
    validatePosition(instance, t),
    validateStartDateOffWork(instance, t),
  ])

  if (
    instance.value.userCodeError ||
    instance.value.branchError ||
    instance.value.startDateOfWorkError
  ) {
    return false
  }
  return true
}

const validateStartDateOffWork = async (
  instance: Ref<CreateEmployeeType>,
  t: any
) => {
  if (!instance.value.startDateOfWork) {
    instance.value.startDateOfWorkError = t(
      'please_enter_name',
      t('start_date').toLocaleLowerCase()
    )
  } else {
    instance.value.startDateOfWorkError = ''
  }
}

const validateBranch = async (instance: Ref<CreateEmployeeType>, t: any) => {
  if (
    !instance.value.branchAll &&
    (!instance.value.branchSelected || !instance.value.branchSelected.length)
  ) {
    instance.value.branchError = t('please_select_name', {
      name: t('branch').toLocaleLowerCase(),
    })
  } else {
    instance.value.branchError = ''
  }
}
const validateDepartment = async (
  instance: Ref<CreateEmployeeType>,
  t: any
) => {
  if (
    !instance.value.departmentAll &&
    (!instance.value.departmentSelected ||
      !instance.value.departmentSelected.length)
  ) {
    instance.value.departmentError = t('please_select_name', {
      name: t('department').toLocaleLowerCase(),
    })
  } else {
    instance.value.departmentError = ''
  }
}
const validatePosition = async (instance: Ref<CreateEmployeeType>, t: any) => {
  if (
    !instance.value.positionAll &&
    (!instance.value.positionSelected ||
      !instance.value.positionSelected.length)
  ) {
    instance.value.positionError = t('please_select_name', {
      name: t('position').toLocaleLowerCase(),
    })
  } else {
    instance.value.positionError = ''
  }
}

export const CreateEmployeeValidate = {
  userCode: validateUserCode,
  all: validateAll,
  startDateOfWork: validateStartDateOffWork,
  branch: validateBranch,
  position: validatePosition,
  department: validateDepartment,
}
