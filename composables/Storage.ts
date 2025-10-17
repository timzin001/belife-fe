export const getItem = (key: string) => {
  if (import.meta.client) {
    return localStorage.getItem(key)
  } else {
    return ''
  }
}

export const getObjectItem = (key: string) => {
  if (import.meta.client) {
    try {
      const str = localStorage.getItem(key) ?? ''
      return JSON.parse(str)
    } catch (e) {
      return ''
    }
  } else {
    return ''
  }
}

export const setItem = (key: string, value: any) => {
  if (import.meta.client) {
    return localStorage.setItem(key, value)
  }
}

export const removeItem = (key: string) => {
  if (import.meta.client) {
    return localStorage.removeItem(key)
  }
}
