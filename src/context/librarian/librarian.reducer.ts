import { updateLoadableData, updateLoadableMetaProps } from 'utils/state.utils'
import { StudentRequest, User } from 'types/models'
import { Loadable, Error } from 'types/state'
import { cloneDeep } from 'lodash'

type UpdateUsersMetaProps = {
  type: 'UPDATE_USERS_META_PROPS'
  isLoading: boolean
  error?: Error
}

type UpdateUsersData = {
  type: 'UPDATE_USERS_DATA'
  users: User[]
}

type UpdateRequestsMetaProps = {
  type: 'UPDATE_USER_REQUESTS_META_PROPS'
  isLoading: boolean
  error?: Error
}

type UpdateRequestsData = {
  type: 'UPDATE_USER_REQUESTS_DATA'
  requests: StudentRequest[]
}

export type LibrarianActions =
  | UpdateUsersMetaProps
  | UpdateUsersData
  | UpdateRequestsMetaProps
  | UpdateRequestsData

export type BaseLibrarianState = {
  users: Loadable<User[]>
  requests: Loadable<StudentRequest[]>
}

export const librarianReducer = (
  state: BaseLibrarianState,
  action: LibrarianActions
) => {
  const clone = cloneDeep(state)

  switch (action.type) {
    case 'UPDATE_USERS_META_PROPS':
      updateLoadableMetaProps(clone.users, action.isLoading, action.error)
      break
    case 'UPDATE_USERS_DATA':
      updateLoadableData(clone.users, action.users)
      break
    case 'UPDATE_USER_REQUESTS_META_PROPS':
      updateLoadableMetaProps(clone.requests, action.isLoading, action.error)
      break
    case 'UPDATE_USER_REQUESTS_DATA':
      updateLoadableData(clone.requests, action.requests)
      break
    default:
      return state
  }

  return clone
}
