import { Input, Form, Button, Spin, message } from 'antd'
import { AppContext } from 'context/app'
import { LocalStorageHandler } from 'utils/LocalStorageHandler'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import './Login.css'
import { AppRoutes } from 'constants/app.routes'

type LoginForm = {
  email: string
  password: string
}

const Login = () => {
  const { login, user } = useContext(AppContext)
  const form = Form.useForm()[0]

  const handleFormSubmit = (data: LoginForm) => {
    login(data.email, data.password).then((error) => {
      if (error) message.error(error)
    })
  }

  if (LocalStorageHandler.token) {
    return (
      <Navigate
        to={
          user.data.role === 'librarian'
            ? `/${AppRoutes.librarian.base}`
            : `/${AppRoutes.student.base}`
        }
      />
    )
  }

  return (
    <div className="login-page">
      <Form
        className="login-page-form"
        form={form}
        onFinish={handleFormSubmit}
        layout="vertical"
      >
        <Spin tip="Loading..." spinning={user.isLoading}>
          <h1>Login</h1>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email.' }]}
          >
            <Input
              placeholder="Email"
              type="email"
              className="login-page-email"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password.' },
              {
                min: 8,
                message: 'Your passsword should have 8 chars at least',
              },
              {
                max: 30,
                message: 'Your passsword should not exceeed 30 chars.',
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
              className="login-page-password"
            />
          </Form.Item>
          <div className="login-page-buttons">
            <Button htmlType="reset">Cancel</Button>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </div>
        </Spin>
      </Form>
    </div>
  )
}

export default Login
