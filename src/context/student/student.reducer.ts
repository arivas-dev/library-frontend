import { Loadable, Error } from 'types/state'
import { Book, StudentRequest } from 'types/models'
import { updateLoadableData, updateLoadableMetaProps } from 'utils/state.utils'
import { cloneDeep } from 'lodash'

type UpdateBooksMetaProps = {
  type: 'UPDATE_BOOKS_META_PROPS'
  isLoading: boolean
  error?: Error
}

type UpdateBooksData = {
  type: 'UPDATE_BOOKS_DATA'
  books: Book[]
}

type UpdateRequestsMetaProps = {
  type: 'UPDATE_STUDENT_REQUESTS_META_PROPS'
  isLoading: boolean
  error?: Error
}

type UpdateRequestsData = {
  type: 'UPDATE_STUDENT_REQUESTS_DATA'
  requests: StudentRequest[]
}

export type StudentActions =
  | UpdateBooksMetaProps
  | UpdateBooksData
  | UpdateRequestsMetaProps
  | UpdateRequestsData

export type BaseStudentState = {
  books: Loadable<Book[]>
  requests: Loadable<StudentRequest[]>
}

export const studentReducer = (
  state: BaseStudentState,
  action: StudentActions
) => {
  const clone = cloneDeep(state)

  switch (action.type) {
    case 'UPDATE_BOOKS_META_PROPS':
      updateLoadableMetaProps(clone.books, action.isLoading, action.error)
      break
    case 'UPDATE_BOOKS_DATA':
      updateLoadableData(clone.books, action.books)
      break
    case 'UPDATE_STUDENT_REQUESTS_META_PROPS':
      updateLoadableMetaProps(clone.requests, action.isLoading, action.error)
      break
    case 'UPDATE_STUDENT_REQUESTS_DATA':
      updateLoadableData(clone.requests, action.requests)
      break
    default:
      return state
  }

  return clone
}
