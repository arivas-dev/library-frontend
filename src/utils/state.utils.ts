import { Loadable, Error } from 'types/State'

export const createError = (message: string, name?: string): Error => ({
  message,
  name,
})

export const initLoadable = <T>(data: T): Loadable<T> => ({
  data,
  error: null,
  isDirty: false,
  isLoading: false,
})

export const updateLoadableMetaProps = <T>(
  loadable: Loadable<T>,
  isLoading: boolean,
  error: Error | null = null
) => {
  loadable.isDirty = true
  loadable.isLoading = isLoading
  loadable.error = error
}

export const updateLoadableData = <T>(loadable: Loadable<T>, data: T) => {
  updateLoadableMetaProps(loadable, false, null)
  loadable.data = data
}
