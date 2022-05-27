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

type UpdateRequestCreationMetaProps = {
  type: 'UPDATE_REQUEST_CREATION_META_PROPS'
  isLoading: boolean
  error?: Error
}

type UpdateRequestCreationData = {
  type: 'UPDATE_REQUEST_CREATION_DATA'
}

type UpdateBookDetailsMetaProps = {
  type: 'UPDATE_BOOK_DETAILS_META_PROPS'
  isLoading: boolean
  error?: Error
}

type UpdateBookDetailsData = {
  type: 'UPDATE_BOOKS_DETAILS_DATA'
  book: Book
}

export type StudentActions =
  | UpdateBooksMetaProps
  | UpdateBooksData
  | UpdateRequestsMetaProps
  | UpdateRequestsData
  | UpdateRequestCreationMetaProps
  | UpdateRequestCreationData
  | UpdateBookDetailsMetaProps
  | UpdateBookDetailsData

export type BaseStudentState = {
  books: Loadable<Book[]>
  requests: Loadable<StudentRequest[]>
  requestCreation: Loadable<null>
  bookDetails: Loadable<Book>
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
    case 'UPDATE_REQUEST_CREATION_META_PROPS':
      updateLoadableMetaProps(
        clone.requestCreation,
        action.isLoading,
        action.error
      )
      break
    case 'UPDATE_REQUEST_CREATION_DATA':
      updateLoadableData(clone.requestCreation, null)
      break
    case 'UPDATE_BOOK_DETAILS_META_PROPS':
      updateLoadableMetaProps(clone.bookDetails, action.isLoading, action.error)
      break
    case 'UPDATE_BOOKS_DETAILS_DATA':
      updateLoadableData(clone.bookDetails, action.book)
      break
    default:
      return state
  }

  return clone
}
