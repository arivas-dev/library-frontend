import { Input, Form, Button } from 'antd'
import './Login.css'

type LoginForm = {
  username: string
  password: string
}

const Login = () => {
  const form = Form.useForm()[0]

  const handleFormSubmit = (data: LoginForm) => {
    console.log('data', data)
  }

  return (
    <div className="login-page">
      <Form
        className="login-page-form"
        form={form}
        onFinish={handleFormSubmit}
        layout="vertical"
      >
        <h1>Login</h1>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username.' }]}
        >
          <Input placeholder="Username" className="login-page-username" />
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
      </Form>
    </div>
  )
}

export default Login
