import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { Layout } from 'components/Layout'
import { PrivateRoute } from './PrivateRoute'
import { AppRoutes as AppRoutesObj } from 'constants/app.routes'
import { lazy } from 'react'

const BookDetailsPage = lazy(() => import('pages/BookDetails/BookDetails'))

const BooksPage = lazy(() => import('pages/Books/Books'))

const BooksCheckoutPage = lazy(
  () => import('pages/BooksCheckout/BooksCheckout')
)

const LoginPage = lazy(() => import('pages/Login/Login'))

const NotFoundPage = lazy(() => import('pages/NotFound/NotFound'))

const ResourcesCreationPage = lazy(
  () => import('pages/ResourcesCreation/ResourcesCreation')
)

const StudentRequestsPage = lazy(
  () => import('pages/StudentRequests/StudentRequests')
)

export const AppRoutes = () => {
  const { librarian, login, notFound, student } = AppRoutesObj

  const renderStudentRoutes = () => (
    <Route path={student.base} element={<Layout />}>
      <Route
        index
        element={
          <PrivateRoute>
            <Navigate to={student.books} replace />
          </PrivateRoute>
        }
      />
      <Route path={student.books}>
        <Route
          index
          element={
            <PrivateRoute>
              <BooksPage />
            </PrivateRoute>
          }
        />
        <Route
          path=":id"
          element={
            <PrivateRoute>
              <BookDetailsPage />
            </PrivateRoute>
          }
        />
      </Route>
      <Route
        path={student.requests}
        element={
          <PrivateRoute>
            <StudentRequestsPage />
          </PrivateRoute>
        }
      />
    </Route>
  )

  const renderLibrarianRoutes = () => (
    <Route path={librarian.base} element={<Layout />}>
      <Route
        index
        element={
          <PrivateRoute>
            <Navigate to={librarian.checkout} replace />
          </PrivateRoute>
        }
      />
      <Route
        path={librarian.checkout}
        element={
          <PrivateRoute>
            <BooksCheckoutPage />
          </PrivateRoute>
        }
      />
      <Route
        path={librarian.resourcesCreation}
        element={
          <PrivateRoute>
            <ResourcesCreationPage />
          </PrivateRoute>
        }
      />
    </Route>
  )

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={login} replace />} />
        {renderStudentRoutes()}
        {renderLibrarianRoutes()}
        <Route path={login} element={<LoginPage />} />
        <Route path={notFound} element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}
