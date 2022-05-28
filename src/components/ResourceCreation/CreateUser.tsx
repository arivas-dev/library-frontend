import { Form, Input, Select, Button, Table, message } from 'antd'
import { Rule } from 'antd/lib/form'
import { LibrarianContext } from 'context/librarian'
import { useContext, useEffect } from 'react'
import { User } from 'types/models'
import type { ColumnsType } from 'antd/lib/table';
import { shouldLoadData } from 'utils/state.utils'

export const CreateUser = () => {
  const form = Form.useForm()[0]

  const { loadStudents, users, createUser } =
    useContext(LibrarianContext)


  useEffect(() => {
    if (shouldLoadData(users)) loadStudents()
  }, [users, loadStudents])

  const handleCreateUser = (user: User) => {
    createUser(user).then((error) => {
      if (error) message.error(error)
      else {
        loadStudents()
        message.success('User added')
        form.resetFields()
      }
    })
  }

  const requiredRule: Rule = {
    required: true,
    message: 'Required field',
  }

  const cols: ColumnsType<User> = [
    {
      align: 'center',
      dataIndex: 'name',
      title: 'Name',
    },
    {
      align: 'center',
      dataIndex: 'email',
      title: 'Email',
    },
    {
      align: 'center',
      dataIndex: 'role',
      title: 'Role',
    }
  ]


  return (
    <Form form={form} onFinish={handleCreateUser} layout="vertical">
      <Form.Item name="name" rules={[requiredRule]} label="First name">
        <Input placeholder="Input name" size="large" />
      </Form.Item>
      <Form.Item name="email" rules={[requiredRule]} label="Email">
        <Input type="email" placeholder="Email" size="large" />
      </Form.Item>
      <Form.Item name="id_role" rules={[requiredRule]} label="Role">
        <Select placeholder="Role" size="large">
          <Select.Option key="student" value="1">Student</Select.Option>
          <Select.Option key="librarian" value="2">Librarian</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="password" rules={[requiredRule]} label="Password">
        <Input.Password />
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
        loading={users.isLoading}
        dataSource={users.data}
        columns={cols}
        rowKey="id"
        pagination={false}
        scroll={{ x: 500 }}
      />
      <br />
    </Form>
  )
}
