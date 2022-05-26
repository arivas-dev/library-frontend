import { AppRoutes } from 'components/routes'
import { Suspense } from 'react'
import { AppContextProvider } from 'context/app'
import { Spin } from 'antd'

export const App = () => (
  <Suspense
    fallback={
      <Spin
        style={{ width: '100%', marginTop: '4em' }}
        size="large"
        tip="Your page is loading..."
        spinning
      />
    }
  >
    <AppContextProvider>
      <AppRoutes />
    </AppContextProvider>
  </Suspense>
)
