import { createContext, useReducer, useCallback, ReactNode } from 'react'
import { initLoadable } from 'utils/state.utils'
import { BaseStudentState, studentReducer } from './student.reducer'
import { isSuccesfulResponse } from 'utils/network.handlers'
import { Endpoints } from 'constants/endpoints'
import { Book, StudentRequest } from 'types/models'
import {
  apiGetProtectedResource,
  apiPostProtectedResource,
} from 'utils/network'

type StudentContextState = BaseStudentState & {
  loadBooks: () => Promise<void>
  loadRequests: () => Promise<void>
  createRequest: (data: any) => Promise<void>
}

const initialStudentState: StudentContextState = {
  books: initLoadable([]),
  loadBooks: () => Promise.resolve(),
  loadRequests: () => Promise.resolve(),
  requestCreation: initLoadable(null),
  createRequest: () => Promise.resolve(),
  requests: initLoadable([]),
}

export const StudentContext = createContext(initialStudentState)

export const StudentContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [state, dispatch] = useReducer(studentReducer, initialStudentState)
  const { books, requests, requestCreation } = state

  const loadBooks = useCallback(async () => {
    dispatch({ type: 'UPDATE_BOOKS_META_PROPS', isLoading: true })

    const response = await apiGetProtectedResource<Book[]>(
      Endpoints.students.books
    )

    if (isSuccesfulResponse(response)) {
      dispatch({ type: 'UPDATE_BOOKS_DATA', books: response.data })
      return
    }

    dispatch({
      type: 'UPDATE_BOOKS_META_PROPS',
      isLoading: false,
      error: response.error,
    })
  }, [dispatch])

  const loadRequests = useCallback(async () => {
    dispatch({ type: 'UPDATE_STUDENT_REQUESTS_META_PROPS', isLoading: true })
    const response = await apiGetProtectedResource<StudentRequest[]>(
      Endpoints.students.requests
    )

    if (isSuccesfulResponse(response)) {
      dispatch({
        type: 'UPDATE_STUDENT_REQUESTS_DATA',
        requests: response.data,
      })
      return
    }

    dispatch({
      type: 'UPDATE_STUDENT_REQUESTS_META_PROPS',
      isLoading: false,
      error: response.error,
    })
  }, [dispatch])

  const createRequest = useCallback(
    async (data: any) => {
      dispatch({ type: 'UPDATE_REQUEST_CREATION_META_PROPS', isLoading: true })
      const response = await apiPostProtectedResource(
        Endpoints.students.createRequest,
        data
      )

      if (isSuccesfulResponse(response)) {
        dispatch({ type: 'UPDATE_REQUEST_CREATION_DATA' })
        return
      }

      dispatch({
        type: 'UPDATE_REQUEST_CREATION_META_PROPS',
        isLoading: false,
        error: response.error,
      })
    },
    [dispatch]
  )

  return (
    <StudentContext.Provider
      value={{
        books,
        requests,
        loadBooks,
        loadRequests,
        createRequest,
        requestCreation,
      }}
    >
      {children}
    </StudentContext.Provider>
  )
}
