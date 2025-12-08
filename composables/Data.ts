import type { OrgType } from '~/types/org/org/OrgType'

export const parseListOrgCookie = (mapOrgs: any) => {
  let listOrgs: OrgType[] = []
  if (!mapOrgs || !Object.keys(mapOrgs).length) {
    return listOrgs
  }
  Object.keys(mapOrgs).forEach((key) => {
    const value = mapOrgs[key]
    const object = JSON.parse(value)
    let newObj: any = {}
    newObj.id = object.id
    newObj.name = JSON.parse(object.name)
    newObj.active = JSON.parse(object.active)
    if (object.avatar) {
      const avatar = JSON.parse(object.avatar)
      newObj.avatar = { location: avatar.location }
    }
    listOrgs.push(newObj)
  })
  return listOrgs
}
export const parseUserCookie = (object: any) => {
  if (!object) {
    return null
  }
  let newObj: any = {}
  newObj.id = object.id
  newObj.fullName = object.fullName
  newObj.nickName = object.nickName
  newObj.active = object.active
  if (object.avatar) {
    const avatar = object.avatar
    newObj.avatar = { location: avatar.location }
  }
  return newObj
}
export const parseOrgCookie = (object: any) => {
  if (!object) {
    return null
  }
  let newObj: any = {}
  newObj.id = object.id
  newObj.name = object.name
  newObj.active = object.active
  if (object.avatar) {
    const avatar = object.avatar
    newObj.avatar = { location: avatar.location }
  }
  return newObj
}
export const parseEmployeeCookie = (object: any) => {
  if (!object) {
    return null
  }
  let newObj: any = {}
  newObj.id = object.id
  newObj.fullName = object.userFullName
  newObj.nickName = object.userNickName
  newObj.active = object.active
  if (object.userAvatarLocation) {
    newObj.avatar = { location: object.userAvatarLocation }
  }
  return newObj
}
