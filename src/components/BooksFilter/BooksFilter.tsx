import { Select, Input, Form, Button } from 'antd'

export const BooksFilter = () => {
  const form = Form.useForm()[0]

  return (
    <Form
      className="books-filters"
      form={form}
      onFinish={console.log}
      layout="inline"
    >
      <Form.Item name="term">
        <Input.Search
          placeholder="Search"
          allowClear
          className="books-filter-term"
          size="large"
        />
      </Form.Item>
      <Form.Item name="filter">
        <Select defaultValue="title" style={{ width: '140px' }} size="large">
          <Select.Option key="title">Title</Select.Option>
          <Select.Option key="author">Author</Select.Option>
          <Select.Option key="gender">Gender</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary" size="large">
          Search
        </Button>
      </Form.Item>
    </Form>
  )
}
