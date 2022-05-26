import { createContext, useReducer, useCallback, ReactNode } from 'react'
import { BaseLibrarianState, librarianReducer } from './librarian.reducer'
import { initLoadable } from 'utils/state.utils'
import { Endpoints } from 'constants/endpoints'
import { User, StudentRequest } from 'types/models'
import { isSuccesfulResponse } from 'utils/network.handlers'
import {
  apiGetProtectedResource,
  apiPostProtectedResource,
} from 'utils/network'

type LibrarianContextState = BaseLibrarianState & {
  loadStudents: () => Promise<void>
  loadRequests: (studentId: number) => Promise<void>
  createUser: (data: any) => Promise<void>
  createBook: (data: any) => Promise<void>
}

const initialLibrarianState: LibrarianContextState = {
  bookCreation: initLoadable(null),
  createBook: () => Promise.resolve(),
  createUser: () => Promise.resolve(),
  loadRequests: () => Promise.resolve(),
  loadStudents: () => Promise.resolve(),
  requests: initLoadable([]),
  users: initLoadable([]),
  userCreation: initLoadable(null),
}

export const LibrarianContext = createContext(initialLibrarianState)

export const LibrarianContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [state, dispatch] = useReducer(librarianReducer, initialLibrarianState)
  const { requests, users, bookCreation, userCreation } = state

  const loadStudents = useCallback(async () => {
    dispatch({ type: 'UPDATE_USERS_META_PROPS', isLoading: true })
    const response = await apiGetProtectedResource<User[]>(
      Endpoints.librarian.students
    )

    if (isSuccesfulResponse(response)) {
      dispatch({ type: 'UPDATE_USERS_DATA', users: response.data })
      return
    }

    dispatch({
      type: 'UPDATE_USERS_META_PROPS',
      isLoading: true,
      error: response.error,
    })
  }, [dispatch])

  const loadRequests = useCallback(
    async (studentId: number) => {
      dispatch({ type: 'UPDATE_USER_REQUESTS_META_PROPS', isLoading: true })
      const response = await apiGetProtectedResource<StudentRequest[]>(
        Endpoints.librarian.studentRequests(studentId)
      )

      if (isSuccesfulResponse(response)) {
        dispatch({ type: 'UPDATE_USER_REQUESTS_DATA', requests: response.data })
        return
      }

      dispatch({
        type: 'UPDATE_USER_REQUESTS_META_PROPS',
        isLoading: true,
        error: response.error,
      })
    },
    [dispatch]
  )

  const createBook = useCallback(
    async (data: any) => {
      dispatch({ type: 'UPDATE_BOOK_CREATION_META_PROPS', isLoading: true })
      const response = await apiPostProtectedResource(
        Endpoints.librarian.createBook,
        data
      )

      if (isSuccesfulResponse(response)) {
        dispatch({ type: 'UPDATE_BOOK_CREATION_DATA' })
        return
      }

      dispatch({
        type: 'UPDATE_BOOK_CREATION_META_PROPS',
        isLoading: false,
        error: response.error,
      })
    },
    [dispatch]
  )

  const createUser = useCallback(
    async (data: any) => {
      dispatch({ type: 'UPDATE_USER_CREATION_META_PROPS', isLoading: true })
      const response = await apiPostProtectedResource(
        Endpoints.librarian.createUser,
        data
      )

      if (isSuccesfulResponse(response)) {
        dispatch({ type: 'UPDATE_USER_CREATION_DATA' })
        return
      }

      dispatch({
        type: 'UPDATE_USER_CREATION_META_PROPS',
        isLoading: false,
        error: response.error,
      })
    },
    [dispatch]
  )

  return (
    <LibrarianContext.Provider
      value={{
        loadRequests,
        loadStudents,
        requests,
        users,
        bookCreation,
        createBook,
        createUser,
        userCreation,
      }}
    >
      {children}
    </LibrarianContext.Provider>
  )
}
