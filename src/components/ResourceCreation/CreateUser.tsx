import { Form, Input, Select, Button } from 'antd'
import { Rule } from 'antd/lib/form'

export const CreateUser = () => {
  const form = Form.useForm()[0]

  const requiredRule: Rule = {
    required: true,
    message: 'Required field',
  }

  return (
    <Form form={form} onFinish={console.log} layout="vertical">
      <Form.Item name="firstName" rules={[requiredRule]} label="First name">
        <Input placeholder="First name" size="large" />
      </Form.Item>
      <Form.Item name="lastName" rules={[requiredRule]} label="Last name">
        <Input placeholder="Last name" size="large" />
      </Form.Item>
      <Form.Item name="email" rules={[requiredRule]} label="Email">
        <Input type="email" placeholder="Email" size="large" />
      </Form.Item>
      <Form.Item name="role" rules={[requiredRule]} label="Role">
        <Select placeholder="Role" size="large">
          <Select.Option key="student">Student</Select.Option>
          <Select.Option key="librarian">Librarian</Select.Option>
        </Select>
      </Form.Item>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1em' }}>
        <Button htmlType="reset" size="large" style={{ width: '140px' }}>
          Reset
        </Button>
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          style={{ width: '140px' }}
        >
          Create
        </Button>
      </div>
    </Form>
  )
}
