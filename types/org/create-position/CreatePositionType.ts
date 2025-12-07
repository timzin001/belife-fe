export interface CreatePositionType {
  visible: boolean

  name: {
    en: string
    vi: string
  }
  nameError: string | null
  description: {
    en: string
    vi: string
  }
  active: boolean
  avatar: any | null
  avatarFile: any | null
  widthAvatar: number | null
  heightAvatar: number | null
  avatarError: string | null
  position: any
  nameAbort: any
}
