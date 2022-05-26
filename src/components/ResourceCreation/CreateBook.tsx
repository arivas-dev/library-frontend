import { Form, Input, InputNumber, Button } from 'antd'
import { Rule } from 'antd/lib/form'

export const CreateBook = () => {
  const form = Form.useForm()[0]

  const requiredRule: Rule = {
    required: true,
    message: 'Required field',
  }

  return (
    <Form form={form} onFinish={console.log} layout="vertical">
      <Form.Item name="title" rules={[requiredRule]} label="Title">
        <Input placeholder="Title" size="large" />
      </Form.Item>
      <Form.Item name="author" rules={[requiredRule]} label="Author">
        <Input placeholder="Author" size="large" />
      </Form.Item>
      <Form.Item
        name="publishedYear"
        rules={[requiredRule]}
        label="Published year"
      >
        <InputNumber
          placeholder="Published year"
          size="large"
          min={1900}
          max={new Date().getFullYear()}
          step={5}
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item name="gender" rules={[requiredRule]} label="Gender">
        <Input placeholder="Gender" size="large" />
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
