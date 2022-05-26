import { AppRoutes } from 'components/routes'
import { Suspense } from 'react'
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
    <AppRoutes />
  </Suspense>
)
