import moment from 'moment'
import type { DialCodePatternType } from '~/types/common/DialCodePatternType'

/// Get error messages
export const getErrorMessages = (errors: any, t: any) => {
  if (!errors) {
    return t('error_occur_please_try_again')
  }
  try {
    const messages = JSON.parse(errors)
    let str = ''
    for (let index = 0; index < messages.length; index++) {
      if (!str) {
        str = `${messages[index]}`
      } else {
        const it = `${messages[index]}`
        str = `${str}. ${it}`
      }
    }
    return str
  } catch (e) {
    return t('error_occur_please_try_again')
  }
}
/// Check email
export const isEmail = (data: any) => {
  return data.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
}

/// Check nick name
export const isNickName = (data: any) => {
  // letters (upper or lowercase)
  //numbers (0-9)
  // underscore (_)
  return data.match(/^[a-zA-Z0-9_]*$/)
}

/// Get gender
export const getGender = (gender: string, t: any) => {
  if (gender === 'male') {
    return t('male')
  }
  if (gender === 'female') {
    return t('female')
  }
  return t('other')
}

/// Convert string to date
export const stringToDate = (date: string): Date | null => {
  if (!date) {
    return null
  }
  return new Date(date)
}

/// Format date from string
export const convertDateToString = (
  date: string | Date,
  language: string
): string => {
  if (!date) {
    return ''
  }
  const dateValue = moment.utc(date).local()
  if (language === Locale.EN) {
    return dateValue.format('YYYY/MM/DD')
  }
  if (language === Locale.VI) {
    return dateValue.format('DD/MM/YYYY')
  }
  return ''
}

/// Format date from string
export const convertRanageDateToStringData = (
  date: string,
  language: string
): string => {
  if (!date) {
    return ''
  }
  const dateValue = moment.utc(date).local()
  let str = ''
  if (language === Locale.EN) {
    str = dateValue.format('YYYY-MM-DD')
  }
  if (language === Locale.VI) {
    str = dateValue.format('DD-MM-YYYY')
  }
  return `${str} 00:00:00,${str} 23:59:59`
}

/// Format date time from string
export const formatDateTimeFromString = (
  date: string,
  language: string,
  onlyDate: boolean = false
): string => {
  if (!date) {
    return ''
  }
  const dateValue = moment.utc(date).local()
  if (language === Locale.EN) {
    if (onlyDate) {
      return dateValue.format('YYYY/MM/DD')
    }
    return dateValue.format('YYYY/MM/DD HH:mm:ss')
  }
  if (language === Locale.VI) {
    if (onlyDate) {
      return dateValue.format('DD/MM/YYYY')
    }
    return dateValue.format('DD/MM/YYYY HH:mm:ss')
  }
  return ''
}

//// Convert dates to string
export const convertDatesToString = (list: any, lang: any): string => {
  let result = ''
  for (let index = 0; index < list.length; index++) {
    if (!list[index]) {
      continue
    }
    if (index === 0) {
      result = convertDateToString(list[index], lang)
    } else {
      result = `${result} - ${convertDateToString(list[index], lang)}`
    }
  }
  return result
}

//// Convert dates to string
export const convertDateRangeToStringData = (list: any, lang: any) => {
  let result = ''
  if (!list || !list.length) {
    return ''
  }

  if (list.length == 1 || !list[1]) {
    return convertRanageDateToStringData(list[0], lang)
  }

  let start = convertRanageDateToStringData(list[0], lang)
  let end = convertRanageDateToStringData(list[1], lang)
  let arrStart = start.split(',')
  let arrEnd = end.split(',')
  return `${arrStart[0]},${arrEnd[1]}`
}

export const getDateFormatPicker = (locale: any) => {
  let dateFormat = ''
  if (locale === Locale.EN) {
    dateFormat = 'yy/mm/dd'
  }
  if (locale === Locale.VI) {
    dateFormat = 'dd/mm/yy'
  }
  return dateFormat
}

export const getDateFormat = (locale: any) => {
  let dateFormat = ''
  if (locale === Locale.EN) {
    dateFormat = 'YYYY/MM/DD'
  }
  if (locale === Locale.VI) {
    dateFormat = 'DD/MM/YYYY'
  }
  return dateFormat
}

/// Check is date
export const isDate = (data: any, locale: any) => {
  let dateFormat = getDateFormat(locale)
  const dateValue = moment(data, dateFormat, true)
  return dateValue.isValid()
}

export const isObject = (obj: any) => {
  if (typeof obj === 'object') {
    return true
  }
  false
}

/// Check empty object
export const isEmptyObject = (obj: any) => {
  if (typeof obj !== 'object') {
    return false
  }
  return Object.keys(obj).length === 0
}

/// Map no to list
export const mapNoToList = (list: any, offset: number): [] => {
  let mapList = []
  for (let index = 0; index < list.length; index++) {
    let element = list[index]
    element['no'] = index + 1 + offset
    mapList.push(element)
  }
  return mapList as []
}

//// Get dial code pattern
export const getDialCodePattern = (code: string): DialCodePatternType => {
  if (code === '(+84)') {
    /// change pattern
    return {
      pattern: '999-999-999',
      placeHolder: '123-345-789',
    }
  }
  return {
    pattern: '9999-9999',
    placeHolder: '1234-4567',
  }
}

//// Get dial code pattern
export const getTextI18nString = (data: any, locale: string): string => {
  // instance.name?[locale]
  if (data) {
    return ''
  }
  let value = data[locale] || ''
  return value
}
