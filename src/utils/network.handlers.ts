import { ApiResponse, ApiSuccesfulResponse } from 'types/network'

export const isSuccesfulResponse = <T>(
  response: ApiResponse<T>
): response is ApiSuccesfulResponse<T> => Object.hasOwn(response, 'data')
