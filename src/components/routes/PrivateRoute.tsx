import { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { AppRoutes } from 'constants/app.routes'
import { LocalStorageHandler } from 'utils/LocalStorageHandler'

type PrivateRouteProps = {
  children: ReactElement
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  return LocalStorageHandler.token ? (
    children
  ) : (
    <Navigate to={`/${AppRoutes.login}`} />
  )
}
