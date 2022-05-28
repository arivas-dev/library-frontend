import { updateLoadableData, updateLoadableMetaProps } from 'utils/state.utils'
import { StudentRequest, User,Genres, Author } from 'types/models'
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

type UpdateGenresMetaProps = {
  type: 'UPDATE_GENRES_META_PROPS'
  isLoading: boolean
  error?: Error
}

type UpdateGenresData = {
  type: 'UPDATE_GENRES_DATA'
  genres: Genres[]
}
type UpdateAuthorMetaProps = {
  type: 'UPDATE_AUTHOR_META_PROPS'
  isLoading: boolean
  error?: Error
}

type UpdateAuthorData = {
  type: 'UPDATE_AUTHOR_DATA'
  author: Author[]
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

type UpdateResourceCreationMetaProps = {
  type: 'UPDATE_USER_CREATION_META_PROPS' | 'UPDATE_BOOK_CREATION_META_PROPS'
  isLoading: boolean
  error?: Error
}

type UpdateResourceCreationData = {
  type: 'UPDATE_USER_CREATION_DATA' | 'UPDATE_BOOK_CREATION_DATA'
}

export type LibrarianActions =
  | UpdateUsersMetaProps
  | UpdateUsersData
  | UpdateRequestsMetaProps
  | UpdateRequestsData
  | UpdateResourceCreationMetaProps
  | UpdateResourceCreationData
  | UpdateGenresMetaProps
  | UpdateGenresData
  | UpdateAuthorMetaProps
  | UpdateAuthorData

export type BaseLibrarianState = {
  users: Loadable<User[]>
  genres: Loadable<Genres[]>
  author: Loadable<Author[]>
  requests: Loadable<StudentRequest[]>
  userCreation: Loadable<null>
  bookCreation: Loadable<null>
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
    case 'UPDATE_GENRES_META_PROPS':
      updateLoadableMetaProps(clone.genres, action.isLoading, action.error)
      break
    case 'UPDATE_GENRES_DATA':
      updateLoadableData(clone.genres, action.genres)
      break
    case 'UPDATE_AUTHOR_META_PROPS':
      updateLoadableMetaProps(clone.author, action.isLoading, action.error)
      break
    case 'UPDATE_AUTHOR_DATA':
      updateLoadableData(clone.author, action.author)
      break
    case 'UPDATE_USER_REQUESTS_META_PROPS':
      updateLoadableMetaProps(clone.requests, action.isLoading, action.error)
      break
    case 'UPDATE_USER_REQUESTS_DATA':
      updateLoadableData(clone.requests, action.requests)
      break
    case 'UPDATE_USER_CREATION_META_PROPS':
      updateLoadableMetaProps(
        clone.userCreation,
        action.isLoading,
        action.error
      )
      break
    case 'UPDATE_USER_CREATION_DATA':
      updateLoadableData(clone.userCreation, null)
      break
    case 'UPDATE_BOOK_CREATION_META_PROPS':
      updateLoadableMetaProps(
        clone.bookCreation,
        action.isLoading,
        action.error
      )
      break
    case 'UPDATE_BOOK_CREATION_DATA':
      updateLoadableData(clone.bookCreation, null)
      break
    default:
      return state
  }

  return clone
}
