import { createContext, useReducer, useCallback, ReactNode } from 'react'
import { initLoadable } from 'utils/state.utils'
import { isSuccesfulResponse } from 'utils/network.handlers'
import { apiPostPublicResource } from 'utils/network'
import { appReducer, BaseAppState } from './app.reducer'
import { User } from 'types/models'
import { Endpoints } from 'constants/endpoints'
import { LocalStorageHandler } from 'utils/LocalStorageHandler'

type LoginResponse = User & {
  token: string
}

type AppContextState = BaseAppState & {
  login: (email: string, password: string) => Promise<string | User>
}

const initialAppState: AppContextState = {
  login: () => Promise.resolve(''),
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

  const login = useCallback(
    async (email: string, password: string) => {
      dispatch({ type: 'UPDATE_USER_META_PROPS', isLoading: true })
      const response = await apiPostPublicResource<LoginResponse>(
        Endpoints.login,
        {
          email,
          password,
        }
      )

      if (isSuccesfulResponse(response)) {
        const { token, ...user } = response.data
        LocalStorageHandler.token = token
        LocalStorageHandler.user = user
        dispatch({ type: 'UPDATE_USER_DATA', user })
        return user
      }

      dispatch({
        type: 'UPDATE_USER_META_PROPS',
        isLoading: false,
        error: response.error,
      })

      return response.error.message
    },
    [dispatch]
  )

  return (
    <AppContext.Provider value={{ user, login }}>
      {children}
    </AppContext.Provider>
  )
}
