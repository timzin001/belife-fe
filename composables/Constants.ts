export const DEFAULT_AVATAR = 'default-avatar.png'
export const DEFAULT_PICTURE = 'default-picture.png'
export const APPTYPECons = {
  ACCOUNT: 'account',
  ORG: 'org',
  CHAT: 'chat',
}
export const LayoutCons = {
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

export const LocaleCons = {
  EN_US: 'en-US',
  VI_VN: 'vi-VN',
  EN: 'en',
  VI: 'vi',
}

export const MethodCons = {
  POST: 'post',
  GET: 'get',
}

export const CookieCons = {
  ACCESS_TOKEN_USER: 'accessTokenUser',
  REFRESH_TOKEN_USER: 'refreshTokenUser',
  USER: 'user',

  ACCESS_TOKEN_EMPLOYEE: 'accessTokenEmployee',
  REFRESH_TOKEN_EMPLOYEE: 'refreshTokenEmployee',
  EMPLOYEE: 'employee',

  LANGUAGE: 'language',
  ORG: 'org',
  LIST_ORGS: 'list_orgs',

  OPTION: {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
    secure: true,
    // httpOnly: true,
  },
}

export const StorageCons = {
  TEM_SIGN_IN: 'tem_sign_in',
  TEM_SIGN_UP: 'tem_sign_up',
  USER: 'user',
  LANGUAGE: 'language',
  ORG: 'org',
  LIST_ORGS: 'list_orgs',
}

export const ToastCons = {
  DURATION: 4000,
  SUCCESS: 'success',
  ERROR: 'error',
}

export const APIStatusCons = {
  SUCCESS: 'success',
  IDLE: 'idle',
  ABORT_API: 'belife_abort_api',
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
}

/// BACKEND

export const APISocialAuthCons = {
  SIGN_UP: 'auth/sign-up',
  SIGN_IN: 'auth/sign-in',
  VERIFY: 'auth/verify',
}
export const APISocialUserCons = {
  EXIST_PHONE_NUMBER: 'user/exist-phone-number',
}
export const APIOrgAuthCons = {
  SIGN_UP: 'auth/sign-up',
  SIGN_IN: 'auth/sign-in',
}
export const APIOrgTenantCons = {
  EXIST_NAME: 'tenant/exist-name',
}
export const APIOrgPositionCons = {
  EXIST_NAME: 'position/exist-name',
  CREATE: 'position/create',
  UPDATE: 'position/update',
  LIST: 'position/get-list',
}
export const APIOrgDepartmentCons = {
  EXIST_NAME: 'department/exist-name',
  CREATE: 'department/create',
  UPDATE: 'department/update',
  LIST: 'department/get-list',
}
export const APIOrgDepartmentGroupCons = {
  EXIST_NAME: 'department-group/exist-name',
  CREATE: 'department-group/create',
  UPDATE: 'department-group/update',
  LIST_GROUPS_DATA: 'department-group/get-list-groups-data',
  LIST_GROUPS: 'department-group/get-list-groups',
}
export const APIOrgBranchCons = {
  EXIST_NAME: 'branch/exist-name',
  EXIST_EMAIL: 'branch/exist-email',
  EXIST_PHONE_NUMBER: 'branch/exist-phone-number',
  CREATE: 'branch/create',
}

export const APIPathAccountCons = {
  GET_EXIST_PHONE_NUMBER: 'account/exist-phone-number',
  GET_EXIST_ACCOUNT: 'account/exist-account',
  POST_SIGN_IN: 'account/sign-in',
  POST_SIGN_UP: 'account/sign-up',

  GET_USER: 'user/get-user',
  GET_USER_WITH_CODE: 'user/get-user-with-code',

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
export const APIPathOrgCons = {
  GET_EXIST_NAME_ORG: 'org/exist-name',
  POST_CREATE_ORG: 'org/create',
  POST_SET_LOGO_ORG: 'org/post-set-logo',
  BRANCH: {
    GET_EXIST_PHONE_NUMBER_IN_SYSTEM: 'org/branch/exist-phone-number-in-system',
    GET_EXIST_EMAIL_IN_SYSTEM: 'org/branch/exist-email-in-system',
  },
}
export const APIPathBranchCons = {
  GET_LIST: 'branch/get-list',
  GET_EXIST_EMAIL: 'branch/exist-email',
  GET_EXIST_ADDRESS: 'branch/get-exist-address',
  GET_EXIST_PHONE_NUMBER: 'branch/get-exist-phone-number',
  POST_CREATE: 'branch/post-create',
}

export const APIPathEmployeeCons = {
  GET_LIST: 'employee/get-list',
  POST_CREATE: 'employee/post-create',
  GET_EXIST_EMPLOYEE_WITH_CODE: 'employee/get-exist-employee-with-code',
}

export const APIPathDepartment = {
  GET_EXIST_NAME_DEARTMENT: 'department/get-exist-name',
  POST_CREATE: 'department/post-create',
  GET_LIST: 'department/get-list',
}

export const APIPathPositionCons = {
  POST_SET_AVATAR: 'position/post-set-avatar',
  GET_EXIST_NAME: 'position/get-exist-name',
  POST_CREATE: 'position/post-create',
  POST_UPDATE: 'position/post-update',
  GET_LIST: 'position/get-list',
}

export const APIPathCons = {
  POST_MULTIPLE_MEDIA_ORG: 'media/post-multiple-media',
  POST_SET_AVATAR_BRANCH_ORG: 'branch/post-set-avatar',
}

/// FRONT END

export const PathSocialSignInCons = {
  SIGN_IN: '/social/sign-in',
}

export const PathSocialSignUpCons = {
  SIGN_UP: '/social/sign-up',
}
export const PathSocialHomeCons = {
  HOME: '/',
}

export const PathSocialTermCons = {
  TERM: '/social/term',
}
export const PathSocialPrivacyCons = {
  PRIVACY: '/social/privacy',
}

export const PathOrgTermCons = {
  TERM: '/term-privacy/term',
}
export const PathOrgPrivacyCons = {
  PRIVACY: '/term-privacy/privacy',
}

export const PathStaffCons = {
  BRANCHES: '/staff/branches',
  EMPLOYEES: '/staff/employees',
  DEPARTMENTS: '/staff/departments',
  POSITIONS: '/staff/positions',
  CREATE_BRANCH: '/staff/create-branch',
}

export const PathOrgCons = {
  CREATE_ORG: '/org/create-org',
}

export const PathCons = {
  HOME: '/',
  PROFILE: '/profile',
  INFORM: '/inform',
  INFORM_OF_ORG: '/inform-of-org',
  RECRUIT: '/recruit',
  EVENT: '/event',
}
