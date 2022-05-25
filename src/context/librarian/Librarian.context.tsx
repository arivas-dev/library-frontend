import { createContext, useReducer, useCallback, ReactNode } from 'react'
import { BaseLibrarianState, librarianReducer } from './librarian.reducer'
import { initLoadable } from 'utils/state.utils'

type LibrarianContextState = BaseLibrarianState & {
  loadUsers: () => Promise<void>
  loadRequests: () => Promise<void>
}

const initialLibrarianState: LibrarianContextState = {
  loadRequests: () => Promise.resolve(),
  loadUsers: () => Promise.resolve(),
  users: initLoadable([]),
  requests: initLoadable([]),
}

export const LibrarianContext = createContext(initialLibrarianState)

export const LibrarianContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [state, dispatch] = useReducer(librarianReducer, initialLibrarianState)
  const { requests, users } = state

  const loadUsers = useCallback(async () => {
    try {
      dispatch({ type: 'UPDATE_USERS_META_PROPS', isLoading: true })
      // dispatch({ type: 'UPDATE_USERS_DATA', users: [] })
    } catch (error) {
      dispatch({
        type: 'UPDATE_USERS_META_PROPS',
        isLoading: true,
        error: {} as any,
      })
    }
  }, [dispatch])

  const loadRequests = useCallback(async () => {
    try {
      dispatch({ type: 'UPDATE_USER_REQUESTS_META_PROPS', isLoading: true })
      // dispatch({ type: 'UPDATE_USER_REQUESTS_DATA', requests: [] })
    } catch (error) {
      dispatch({
        type: 'UPDATE_USER_REQUESTS_META_PROPS',
        isLoading: true,
        error: {} as any,
      })
    }
  }, [dispatch])

  return (
    <LibrarianContext.Provider
      value={{ loadRequests, loadUsers, requests, users }}
    >
      {children}
    </LibrarianContext.Provider>
  )
}
