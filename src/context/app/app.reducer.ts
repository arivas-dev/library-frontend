import { cloneDeep } from 'lodash'
import { User } from 'types/models'
import { Error, Loadable } from 'types/state'
import { updateLoadableData, updateLoadableMetaProps } from 'utils/state.utils'

type UpdateUserMetaProps = {
  type: 'UPDATE_USER_META_PROPS'
  isLoading: boolean
  error?: Error
}

type UpdateUserData = {
  type: 'UPDATE_USER_DATA'
  user: User
}

export type AppActions = UpdateUserMetaProps | UpdateUserData

export type BaseAppState = {
  user: Loadable<User>
}

export const appReducer = (state: BaseAppState, action: AppActions) => {
  const clone = cloneDeep(state)

  switch (action.type) {
    case 'UPDATE_USER_META_PROPS':
      updateLoadableMetaProps(clone.user, action.isLoading, action.error)
      break
    case 'UPDATE_USER_DATA':
      updateLoadableData(clone.user, action.user)
      break
    default:
      return state
  }

  return clone
}
