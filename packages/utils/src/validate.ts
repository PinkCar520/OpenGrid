// 验证邮箱
export const isEmail = (email: string): boolean => {
  const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return reg.test(email)
}

// 验证手机号
export const isPhone = (phone: string): boolean => {
  const reg = /^1[3-9]\d{9}$/
  return reg.test(phone)
}

// 验证密码（至少8位，包含大小写字母和数字）
export const isPassword = (password: string): boolean => {
  const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  return reg.test(password)
}

// 验证URL
export const isURL = (url: string): boolean => {
  const reg = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
  return reg.test(url)
}

// 验证身份证号
export const isIDCard = (idCard: string): boolean => {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(idCard)
}

// 验证是否为空
export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

// 验证是否为数字
export const isNumber = (value: any): boolean => {
  return !isNaN(Number(value))
}

// 验证是否为整数
export const isInteger = (value: any): boolean => {
  return Number.isInteger(Number(value))
}

// 验证是否为浮点数
export const isFloat = (value: any): boolean => {
  return !isNaN(Number(value)) && !Number.isInteger(Number(value))
} 