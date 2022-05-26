import { Layout as AntdLayout, Menu } from 'antd'
import { AppContext } from 'context/app'
import { Outlet, useLocation, Link } from 'react-router-dom'
import { AppRoutes } from 'constants/app.routes'
import { LibrarianContextProvider } from 'context/librarian'
import { StudentContextProvider } from 'context/student'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { useContext } from 'react'
import './Layout.css'

const { Header, Content } = AntdLayout

export const Layout = () => {
  const { pathname } = useLocation()
  const { user } = useContext(AppContext)
  const activeRoute = pathname.split('/').pop()
  const { librarian, student } = AppRoutes

  const menuOptions: ItemType[] =
    user.data.role === 'student'
      ? [
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
      : [
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

  return (
    <AntdLayout>
      <Header>
        <Menu
          activeKey={activeRoute}
          theme="dark"
          mode="horizontal"
          items={menuOptions}
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
