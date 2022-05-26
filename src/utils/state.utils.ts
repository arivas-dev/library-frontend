import { Loadable, Error } from 'types/state'

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

export const shouldLoadData = <T>(loadable: Loadable<T>): boolean =>
  !loadable.isDirty && !loadable.isLoading && !loadable.error

export const hasSuccessfullyLoaded = <T>(loadable: Loadable<T>): boolean =>
  loadable.isDirty && !loadable.isLoading && !loadable.error
