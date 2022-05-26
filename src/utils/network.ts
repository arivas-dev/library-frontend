import axios, { AxiosError, AxiosResponse } from 'axios'
import { LocalStorageHandler } from './LocalStorageHandler'
import { ApiResponse, BackEndResponse } from 'types/network'
import { createError } from './state.utils'
import {
  isBackEndSuccessfulResponse,
  getErrorNameFromStatus,
} from './network.handlers'

const protectedResourcesInstance = axios.create({
  validateStatus: (status) => status !== 401,
})

protectedResourcesInstance.interceptors.request.use(
  (config) => {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${LocalStorageHandler.token}`
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

export const apiPostPublicResource = async <T>(
  endpoint: string,
  data?: unknown
): Promise<ApiResponse<T>> => {
  try {
    const res = await axios.post<BackEndResponse<T>>(endpoint, data, {
      validateStatus: (status) => status !== 401,
    })

    return isBackEndSuccessfulResponse(res.data)
      ? { data: res.data }
      : {
          error: createError(
            res.data.message,
            getErrorNameFromStatus(res.status)
          ),
        }
  } catch (error) {
    console.log(JSON.stringify((error as any).response))
    return { error: createError((error as any).message, (error as any).name) }
  }
}

export const apiPostProtectedResource = async <T>(
  endpoint: string,
  data?: unknown
): Promise<ApiResponse<T>> => {
  try {
    const res = await protectedResourcesInstance.post<
      BackEndResponse<{ data: T }>
    >(endpoint, data)

    return isBackEndSuccessfulResponse(res.data)
      ? { data: res.data.data }
      : {
          error: createError(
            res.data.message,
            getErrorNameFromStatus(res.status)
          ),
        }
  } catch (error) {
    return { error: createError((error as any).message, (error as any).name) }
  }
}

export const apiGetProtectedResource = async <T>(
  endpoint: string
): Promise<ApiResponse<T>> => {
  try {
    const res = await protectedResourcesInstance.get<
      BackEndResponse<{ data: T }>
    >(endpoint)

    return isBackEndSuccessfulResponse(res.data)
      ? { data: res.data.data }
      : {
          error: createError(
            res.data.message,
            getErrorNameFromStatus(res.status)
          ),
        }
  } catch (error) {
    return { error: createError((error as any).message, (error as any).name) }
  }
}
