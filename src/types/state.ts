export type Error = {
  name?: string
  message: string
}

export type Loadable<T> = {
  isDirty: boolean
  isLoading: boolean
  error: Error | null
  data: T
}
