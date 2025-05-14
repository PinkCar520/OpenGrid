const PREFIX = 'zerosphere_'

// 存储数据
export const setStorage = (key: string, value: any): void => {
  const data = JSON.stringify(value)
  localStorage.setItem(PREFIX + key, data)
}

// 获取数据
export const getStorage = <T = any>(key: string): T | null => {
  const data = localStorage.getItem(PREFIX + key)
  if (!data) return null
  try {
    return JSON.parse(data) as T
  } catch (error) {
    return null
  }
}

// 删除数据
export const removeStorage = (key: string): void => {
  localStorage.removeItem(PREFIX + key)
}

// 清空所有数据
export const clearStorage = (): void => {
  localStorage.clear()
}

// 获取所有数据
export const getAllStorage = (): Record<string, any> => {
  const result: Record<string, any> = {}
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith(PREFIX)) {
      const value = getStorage(key.slice(PREFIX.length))
      if (value !== null) {
        result[key.slice(PREFIX.length)] = value
      }
    }
  }
  return result
} 