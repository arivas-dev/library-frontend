import { ApiResponse, ApiSuccesfulResponse } from 'types/network'

export const isSuccesfulResponse = <T>(
  response: ApiResponse<T>
): response is ApiSuccesfulResponse<T> => Object.hasOwn(response, 'data')

export const isBackEndSuccessfulResponse = <T>(
  response: T | { message: string }
): response is T =>
  !Object.hasOwn(response as Record<string, unknown>, 'message')

export const getErrorNameFromStatus = (status: number): string => {
  switch (status) {
    case 404:
      return 'Resource not found'
    case 401:
      return 'Unauthorized'
    case 500:
      return 'Server error'
    default:
      return 'Api error'
  }
}
