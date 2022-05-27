import { Layout as AntdLayout, Menu, Button } from 'antd'
import { Outlet, useLocation, Link } from 'react-router-dom'
import { AppRoutes } from 'constants/app.routes'
import { LibrarianContextProvider } from 'context/librarian'
import { StudentContextProvider } from 'context/student'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { LocalStorageHandler } from 'utils/LocalStorageHandler'
import { User } from 'types/models'
import './Layout.css'

const { Header, Content } = AntdLayout

export const Layout = () => {
  const { pathname } = useLocation()
  const activeRoute = pathname.split('/').pop()
  const { librarian, student } = AppRoutes
  const user = LocalStorageHandler.user as User

  const getMenuOptions = (): ItemType[] => {
    if (!user?.role) return []
    switch (user.role) {
      case 'librarian':
        return [
          {
            key: librarian.checkout,
            label: (
              <Link to={`/librarian/${librarian.checkout}`}>Checkout</Link>
            ),
          },
          {
            key: librarian.resourcesCreation,
            label: (
              <Link to={`/librarian/${librarian.resourcesCreation}`}>
                Create resource
              </Link>
            ),
          },
        ]
      case 'student':
        return [
          {
            key: student.books,
            label: (
              <>
                <Link to={`/student/${student.books}`}>Books</Link>
              </>
            ),
          },
          {
            key: student.requests,
            label: <Link to={`/student/${student.requests}`}>My Requests</Link>,
          },
        ]
    }
  }

  return (
    <AntdLayout>
      <Header>
        {LocalStorageHandler.token && (
          <Button
            type="primary"
            style={{
              float: 'right',
              transform: 'translateY(18px)',
            }}
            size="large"
          >
            <Link to="/login" onClick={() => LocalStorageHandler.clearToken()}>
              Logout
            </Link>
          </Button>
        )}
        <Menu
          activeKey={activeRoute}
          theme="dark"
          mode="horizontal"
          items={getMenuOptions()}
        />
      </Header>
      <Content className="app-main-content">
        <StudentContextProvider>
          <LibrarianContextProvider>
            <Outlet />
          </LibrarianContextProvider>
        </StudentContextProvider>
      </Content>
    </AntdLayout>
  )
}
