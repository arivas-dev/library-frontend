import { Form, Input, InputNumber, Button, Table, message, Select } from 'antd'
import { Rule } from 'antd/lib/form'
import { useContext, useEffect } from 'react'
import { Author, Book,Genres } from 'types/models'
import type { ColumnsType } from 'antd/lib/table';
import { LibrarianContext } from 'context/librarian'
import { StudentContext } from 'context/student'
import { shouldLoadData } from 'utils/state.utils';

export const CreateBook = () => {
  const form = Form.useForm()[0]

  const { createBook, genres, loadGenres,author,loadAuthor } =
  useContext(LibrarianContext)
  console.log("CreateBook  -  author", author);

  
  const { loadBooks, books } = useContext(StudentContext)

  useEffect(() => {
    if (shouldLoadData(books)) loadBooks()
  }, [books, loadBooks])

  useEffect(() => {
    if (shouldLoadData(genres)) loadGenres()
  }, [genres, loadBooks])


  useEffect(() => {
    if (shouldLoadData(author)) loadAuthor()
  }, [author, loadAuthor])


  const requiredRule: Rule = {
    required: true,
    message: 'Required field',
  }

  const handleCreateUser = (book: Book) => {
    console.log("handleCreateUser  -  book", book);
    createBook(book).then((error) => {
      if (error) message.error(error)
      else {
        loadBooks()
        message.success('Book added')
        form.resetFields()
      }
    })
  }

  const cols: ColumnsType<Book> = [
    {
      align: 'center',
      dataIndex: 'title',
      title: 'Title',
    },
    {
      align: 'center',
      dataIndex: 'published',
      title: 'Published on',
    },
    {
      align: 'center',
      dataIndex: 'copies_available',
      title: 'Available copies',
    },
    {
      align: 'center',
      dataIndex: 'in_stock',
      title: 'In stock',
    },
  ]

  return (
    <Form form={form} onFinish={handleCreateUser} layout="vertical">
      <Form.Item name="title" rules={[requiredRule]} label="Title">
        <Input placeholder="Title" size="large" />
      </Form.Item>


      <Form.Item name="id_author" rules={[requiredRule]} label="Author">
        <Select placeholder="Author" size="large">
        {
            author.data && author.data.map((Author : Author) =>
              <>
                <Select.Option key={Author.id} value={Author.id}>{Author.name}</Select.Option>
              </>
            )
          }
        </Select>
      </Form.Item>

      <Form.Item
        name="published"
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

      <Form.Item name="id_genre" rules={[requiredRule]} label="Genre">
        <Select placeholder="Genre" size="large">
          {
            genres.data && genres.data.map((Genre : Genres) =>
              <>
                <Select.Option key={Genre.id} value={Genre.id}>{Genre.name}</Select.Option>
              </>
            )
          }
        </Select>
      </Form.Item>


      <Form.Item name="description" rules={[requiredRule]} label="Description">
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name="copies_available"
        rules={[requiredRule]}
        label="Copies available"
      >
        <InputNumber
          placeholder="Copies available"
          size="large"
          min={0}
          max={100}
          step={1}
          style={{ width: '100%' }}
        />
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


      <h3>Added Users</h3>
      <hr />
      <Table
        loading={books.isLoading}
        dataSource={books.data}
        columns={cols}
        rowKey="id"
        pagination={false}
        scroll={{ x: 500 }}
      />
      <br />

    </Form>
  )
}
