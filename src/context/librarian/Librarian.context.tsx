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
  loadGenres: () => Promise<void>
  loadAuthor: () => Promise<void>
  loadRequests: (studentId: number) => Promise<void>
  createUser: (data: any) => Promise<String | void>
  createBook: (data: any) => Promise<String | void>
  returnBook: (data: any) => Promise<String | void>
}

const initialLibrarianState: LibrarianContextState = {
  bookCreation: initLoadable(null),
  createBook: () => Promise.resolve(),
  createUser: () => Promise.resolve(),
  loadRequests: () => Promise.resolve(),
  loadStudents: () => Promise.resolve(),
  loadGenres: () => Promise.resolve(),
  loadAuthor: () => Promise.resolve(),
  requests: initLoadable([]),
  users: initLoadable([]),
  genres: initLoadable([]),
  author: initLoadable([]),
  userCreation: initLoadable(null),
  returnBook: () => Promise.resolve(),
}

export const LibrarianContext = createContext(initialLibrarianState)

export const LibrarianContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [state, dispatch] = useReducer(librarianReducer, initialLibrarianState)
  const { requests, users, bookCreation, userCreation, genres, author } = state

  const returnBook = useCallback(
    async (IdBook:number) => {
      dispatch({ type: 'UPDATE_BOOK_CREATION_META_PROPS', isLoading: true })
      const response = await apiGetProtectedResource(
        Endpoints.librarian.returnBook(IdBook)
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

      return response.error.message
    },
    [dispatch]
  )


  const loadStudents = useCallback(async () => {
    dispatch({ type: 'UPDATE_USERS_META_PROPS', isLoading: true })
    const response = await apiGetProtectedResource<{ data: User[] }>(
      Endpoints.librarian.students
    )

    if (isSuccesfulResponse(response)) {
      dispatch({ type: 'UPDATE_USERS_DATA', users: response.data.data })
      return
    }

    dispatch({
      type: 'UPDATE_USERS_META_PROPS',
      isLoading: true,
      error: response.error,
    })
  }, [dispatch])


  const loadGenres = useCallback(async () => {
    dispatch({ type: 'UPDATE_GENRES_META_PROPS', isLoading: true })
    const response = await apiGetProtectedResource<{ data: User[] }>(
      Endpoints.librarian.genres
    )

    if (isSuccesfulResponse(response)) {
      dispatch({ type: 'UPDATE_GENRES_DATA', genres: response.data.data })
      return
    }

    dispatch({
      type: 'UPDATE_GENRES_META_PROPS',
      isLoading: true,
      error: response.error,
    })
  }, [dispatch])

  const loadAuthor = useCallback(async () => {
    dispatch({ type: 'UPDATE_AUTHOR_META_PROPS', isLoading: true })
    const response = await apiGetProtectedResource<{ data: User[] }>(
      Endpoints.librarian.author
    )

    if (isSuccesfulResponse(response)) {
      dispatch({ type: 'UPDATE_AUTHOR_DATA', author: response.data.data })
      return
    }

    dispatch({
      type: 'UPDATE_AUTHOR_META_PROPS',
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

      return response.error.message
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

      return response.error.message
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
        genres,
        author,
        bookCreation,
        createBook,
        createUser,
        userCreation,
        loadGenres,
        loadAuthor,
        returnBook
      }}
    >
      {children}
    </LibrarianContext.Provider>
  )
}
