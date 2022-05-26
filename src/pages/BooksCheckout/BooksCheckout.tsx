import { Input, List, Avatar } from 'antd'
import { UserBooksModal } from 'components/UserBooksModal'
import { User } from 'types/models'
import { useState } from 'react'
import './BooksCheckout.css'

const users: User[] = [
  {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    id: -1,
    id_role: 1,
    role: 'student',
  },
  {
    name: 'Britney Carson',
    email: 'bcarson@gmail.com',
    id: -1,
    id_role: 1,
    role: 'student',
  },
  {
    name: 'Mick Morales',
    email: 'morales@gmail.com',
    id: -1,
    id_role: 1,
    role: 'student',
  },
  {
    name: 'Linda Reyna',
    email: 'linda@gmail.com',
    id: -1,
    id_role: 1,
    role: 'student',
  },
]

const BooksCheckout = () => {
  const [visible, setVisible] = useState(false)

  const handleUserSelection = (userId: number) => {
    setVisible(true)
    console.log('userId', userId)
  }

  return (
    <div className="books-checkout-page">
      <div className="books-checkout-header">
        <h1>Search people</h1>
        <Input.Search placeholder="Search by name" style={{ width: '240px' }} />
      </div>
      <List
        dataSource={users}
        renderItem={(user) => (
          <List.Item key={user.id} onClick={() => handleUserSelection(user.id)}>
            <List.Item.Meta
              avatar={<Avatar src={null} />}
              title={user.name}
              description={user.email}
            />
          </List.Item>
        )}
      />
      <UserBooksModal visible={visible} onCancel={() => setVisible(false)} />
    </div>
  )
}

export default BooksCheckout
