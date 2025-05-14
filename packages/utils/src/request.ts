import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response
    
    // 这里可以根据后端的响应结构进行调整
    if (data.code === 0) {
      return data.data
    }
    
    ElMessage.error(data.message || '请求失败')
    return Promise.reject(new Error(data.message || '请求失败'))
  },
  (error) => {
    ElMessage.error(error.message || '请求失败')
    return Promise.reject(error)
  }
)

// 封装 GET 请求
export const get = <T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> => {
  return service.get(url, { params, ...config })
}

// 封装 POST 请求
export const post = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return service.post(url, data, config)
}

// 封装 PUT 请求
export const put = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return service.put(url, data, config)
}

// 封装 DELETE 请求
export const del = <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return service.delete(url, config)
}

export default service 