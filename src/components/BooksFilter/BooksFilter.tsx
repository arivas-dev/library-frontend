import { Select, Input, Form, Button } from 'antd'
import { Book } from 'types/models'

type FilterForm = {
  key: keyof Book
  term: string
}

type BooksFilterProps = {
  onFilter: (key: keyof Book, term: string) => void
}

export const BooksFilter = (props: BooksFilterProps) => {
  const { onFilter } = props
  const form = Form.useForm()[0]

  const handleFilter = (data: FilterForm) => onFilter(data.key, data.term)

  return (
    <Form
      className="books-filters"
      form={form}
      onFinish={handleFilter}
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
      <Form.Item name="key" initialValue="title">
        <Select style={{ width: '140px' }} size="large">
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
