import type { OrgType } from '~/types/org/org/OrgType'

export const parseListOrg = (mapOrgs: any) => {
  let listOrgs: OrgType[] = []
  if (!mapOrgs || !mapOrgs.length) {
    return listOrgs
  }
  Object.keys(mapOrgs).forEach((key) => {
    const value = mapOrgs[key]
    const object = JSON.parse(value)
    object.name = JSON.parse(object.name)
    object.slogan = JSON.parse(object.slogan)
    object.fields = JSON.parse(object.fields)
    object.active = JSON.parse(object.active)
    if (object.avatar) {
      object.avatar = JSON.parse(object.avatar)
    }
    object.createdAt = JSON.parse(object.createdAt)
    if (object.updatedAt) {
      object.updatedAt = JSON.parse(object.updatedAt)
    }
    listOrgs.push(object)
  })
  return listOrgs
}
