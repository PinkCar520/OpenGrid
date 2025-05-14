// 格式化日期
export const formatDate = (date: Date | string | number, format = 'YYYY-MM-DD HH:mm:ss'): string => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

// 格式化金额
export const formatMoney = (amount: number, decimals = 2): string => {
  return amount.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 格式化文件大小
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 格式化手机号
export const formatPhone = (phone: string): string => {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

// 格式化身份证号
export const formatIDCard = (idCard: string): string => {
  return idCard.replace(/(\d{4})\d{10}(\d{4})/, '$1**********$2')
}

// 格式化银行卡号
export const formatBankCard = (cardNo: string): string => {
  return cardNo.replace(/(\d{4})\d+(\d{4})$/, '$1 **** **** $2')
}

// 格式化数字（添加千分位）
export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 格式化百分比
export const formatPercent = (num: number, decimals = 2): string => {
  return (num * 100).toFixed(decimals) + '%'
} 