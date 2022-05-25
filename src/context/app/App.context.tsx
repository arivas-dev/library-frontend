import { createContext, useReducer, useCallback, ReactNode } from 'react'
import { initLoadable } from 'utils/state.utils'
import { appReducer, BaseAppState } from './app.reducer'
import { User } from 'types/models'

type AppContextState = BaseAppState & {
  login: (name: string, password: string) => Promise<void>
}

const initialAppState: AppContextState = {
  login: () => Promise.resolve(),
  user: initLoadable<User>({
    email: '',
    id: -1,
    id_role: -1,
    name: '',
    role: 'student',
  }),
}

export const AppContext = createContext(initialAppState)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState)
  const { user } = state

  const login = useCallback(async () => {
    try {
      dispatch({ type: 'UPDATE_USER_META_PROPS', isLoading: true })
      // dispatch({ type: 'UPDATE_USER_DATA', user: {} as any })
    } catch (error) {
      dispatch({
        type: 'UPDATE_USER_META_PROPS',
        isLoading: false,
        error: error as any,
      })
    }
  }, [dispatch])

  return (
    <AppContext.Provider value={{ user, login }}>
      {children}
    </AppContext.Provider>
  )
}
