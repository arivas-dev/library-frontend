import axios, { AxiosError, AxiosResponse } from 'axios'
import { LocalStorageHandler } from './LocalStorageHandler'
import { ApiResponse } from 'types/network'
import { createError } from './state.utils'

const protectedResourcesInstance = axios.create({
  validateStatus: (status) => status !== 401,
})

protectedResourcesInstance.interceptors.request.use(
  (config) => {
    if (config.headers) {
      config.headers.Authorization = LocalStorageHandler.token
    }
    return config
  },
  (error) => Promise.reject(error)
)

protectedResourcesInstance.interceptors.response.use(
  (config) => config,
  (error: AxiosError<unknown>): Promise<AxiosResponse<void> | void> => {
    if (error.response?.status === 401) {
      console.log('session expired')
      LocalStorageHandler.clearToken()
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export const apiPostProtectedResource = async <T>(
  endpoint: string,
  data?: unknown
): Promise<ApiResponse<T>> => {
  try {
    const res = await protectedResourcesInstance.post(endpoint, data)
    return res.data
  } catch (error) {
    return { error: createError((error as any).message, (error as any).name) }
  }
}

export const apiGetProtectedResource = async <T>(
  endpoint: string
): Promise<ApiResponse<T>> => {
  try {
    const res = await protectedResourcesInstance.get(endpoint)
    return res.data
  } catch (error) {
    return { error: createError((error as any).message, (error as any).name) }
  }
}
