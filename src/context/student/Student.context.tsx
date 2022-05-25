import { createContext, useReducer, useCallback, ReactNode } from 'react'
import { initLoadable } from 'utils/state.utils'
import { BaseStudentState, studentReducer } from './student.reducer'

type StudentContextState = BaseStudentState & {
  loadBooks: () => Promise<void>
  loadRequests: () => Promise<void>
}

const initialStudentState: StudentContextState = {
  books: initLoadable([]),
  loadBooks: () => Promise.resolve(),
  loadRequests: () => Promise.resolve(),
  requests: initLoadable([]),
}

export const StudentContext = createContext(initialStudentState)

export const StudentContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [state, dispatch] = useReducer(studentReducer, initialStudentState)
  const { books, requests } = state

  const loadBooks = useCallback(async () => {
    try {
      dispatch({ type: 'UPDATE_BOOKS_META_PROPS', isLoading: true })
      // dispatch({ type: 'UPDATE_BOOKS_DATA', books: [] })
    } catch (error) {
      dispatch({
        type: 'UPDATE_BOOKS_META_PROPS',
        isLoading: false,
        error: error as any,
      })
    }
  }, [dispatch])

  const loadRequests = useCallback(async () => {
    try {
      dispatch({ type: 'UPDATE_STUDENT_REQUESTS_META_PROPS', isLoading: true })
      // dispatch({ type: 'UPDATE_STUDENT_REQUESTS_DATA', requests: [] })
    } catch (error) {
      dispatch({
        type: 'UPDATE_STUDENT_REQUESTS_META_PROPS',
        isLoading: false,
        error: error as any,
      })
    }
  }, [dispatch])

  return (
    <StudentContext.Provider
      value={{ books, requests, loadBooks, loadRequests }}
    >
      {children}
    </StudentContext.Provider>
  )
}
