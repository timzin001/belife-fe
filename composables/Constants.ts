export const DEFAULT_AVATAR = 'default-avatar.png'
export const DEFAULT_PICTURE = 'default-picture.png'
export const Layout = {
  HIDE_MENU: 'hide-menu',
  SHOW_MENU: 'show-menu',
  NO_FULL_CONTAIN: 'no-full-contain',
  FULL_CONTAIN: 'full-contain',
  SHOW_COVER: 'show-cover',
  HIDE_COVER: 'hide-cover',
  OPTIONS: {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
    secure: true,
    httpOnly: true,
  },
}

export const Locale = {
  EN_US: 'en-US',
  VI_VN: 'vi-VN',
  EN: 'en',
  VI: 'vi',
}

export const Method = {
  POST: 'post',
  GET: 'get',
}

export const CookieStorage = {
  USER: 'user',
  LANGUAGE: 'language',
  USER_AUTH: 'user_auth',
  ORG_AUTH: 'org_auth',
  ORG: 'org',
  LIST_ORGS: 'list_orgs',

  OPTION: {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
    secure: true,
    // httpOnly: true,
  },
}

export const LocalStorage = {
  TEM_SIGN_IN: 'tem_sign_in',
  TEM_SIGN_UP: 'tem_sign_up',
  USER: 'user',
  LANGUAGE: 'language',
  USER_AUTH: 'user_auth',
  ORG_AUTH: 'org_auth',
  ORG: 'org',
  LIST_ORGS: 'list_orgs',
}

export const Toast = {
  DURATION: 4000,
  SUCCESS: 'success',
  ERROR: 'error',
}

export const APIStatus = {
  SUCCESS: 'success',
  IDLE: 'idle',
  ABORT_API: 'abort_api',
}

export const APIPathAuth = {
  POST_SIGN_UP_AUTH: 'auth/post-sign-up',
  POST_SIGN_IN_AUTH: 'auth/post-sign-in',
  POST_SIGN_IN_ORG_AUTH: 'auth/post-sign-in-org',
}

export const APIPathUser = {
  GET_USER: 'user/get-user',
  GET_USER_WITH_CODE: 'user/get-user-with-code',
  GET_EXIST_PHONE_NUMBER_USER: 'user/get-exist-phone-number',
  GET_EXIST_USER: 'user/get-exist-user',
  GET_ORGANIZATION_OF_USER: 'user/get-org-of-user',
  POST_SET_AVATAR_USER: 'user/post-set-avatar',
  POST_SET_IMG_DESCRIPTION_AVATAR_USER: 'user/post-set-img-description',
  POST_UPDATE_FULL_NAME_USER: 'user/post-update-full-name',
  POST_UPDATE_ADDRESS_USER: 'user/post-update-address',
  POST_UPDATE_DATE_OF_BIRTH_USER: 'user/post-update-date-of-birth',
  POST_UPDATE_NICK_NAME_USER: 'user/post-update-nick-name',
  GET_EXIST_NICK_NAME_USER: 'user/get-exist-nick-name',
  POST_UPDATE_PASSWORD_USER: 'user/post-update-password',
  POST_UPDATE_DESCRIPTION_USER: 'user/post-update-description',
  POST_UPDATE_GENDER_USER: 'user/post-update-gender',
  POST_UPDATE_PHONE_NUMBER_USER: 'user/post-update-phone-number',
}
export const APIPathOrg = {
  GET_EXIST_NAME_ORG: 'org/get-exist-name',
  POST_CREATE_ORG: 'org/post-create',
  POST_SET_LOGO_ORG: 'org/post-set-logo',
}
export const APIPathBranch = {
  GET_LIST: 'branch/get-list',
  GET_EXIST_EMAIL: 'branch/get-exist-email',
  GET_EXIST_NAME: 'branch/get-exist-name',
  GET_EXIST_ADDRESS: 'branch/get-exist-address',
  GET_EXIST_PHONE_NUMBER: 'branch/get-exist-phone-number',
  POST_CREATE: 'branch/post-create',
}

export const APIPathEmployee = {
  GET_LIST: 'employee/get-list',
  POST_CREATE: 'employee/post-create',
  GET_EXIST_EMPLOYEE_WITH_CODE: 'employee/get-exist-employee-with-code',
}

export const APIPathDepartment = {
  GET_EXIST_NAME_DEARTMENT: 'department/get-exist-name',
  POST_CREATE: 'department/post-create',
  GET_LIST: 'department/get-list',
}

export const APIPathPosition = {
  POST_SET_AVATAR: 'position/post-set-avatar',
  GET_EXIST_NAME: 'position/get-exist-name',
  POST_CREATE: 'position/post-create',
  POST_UPDATE: 'position/post-update',
  GET_LIST: 'position/get-list',
}

export const APIPath = {
  POST_MULTIPLE_MEDIA_ORG: 'media/post-multiple-media',
  POST_SET_AVATAR_BRANCH_ORG: 'branch/post-set-avatar',
}
export const PathStaff = {
  BRANCHES: '/staff/branches',
  EMPLOYEES: '/staff/employees',
  DEPARTMENTS: '/staff/departments',
  POSITIONS: '/staff/positions',
  CREATE_BRANCH: '/staff/create-branch',
  CREATE_DEPARTMENT: '/staff/create-department',
  CREATE_EMPLOYEE: '/staff/create-employee',
  CREATE_POSITION: '/staff/create-position',
}

export const PathUser = {
  SIGN_IN: '/user/sign-in',
  SIGN_UP: '/user/sign-up',
  VERIFICATION_CODE: '/user/verification-code',
}

export const PathOrg = {
  CREATE_ORG: '/org/create-org',
}

export const Path = {
  HOME: '/',
  PROFILE: '/profile',
  INFORM: '/inform',
  INFORM_OF_ORG: '/inform-of-org',
  RECRUIT: '/recruit',
  EVENT: '/event',
}
