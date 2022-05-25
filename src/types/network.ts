import { Error } from 'types/state'

export type ApiSuccesfulResponse<T> = {
  data: T
}

export type ApiErrorResponse = {
  error: Error
}

export type ApiResponse<T> = ApiSuccesfulResponse<T> | ApiErrorResponse
