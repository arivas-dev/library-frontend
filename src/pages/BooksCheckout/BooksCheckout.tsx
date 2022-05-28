import { Input, List, Avatar, message } from 'antd'
import { UserBooksModal } from 'components/UserBooksModal'
import { User } from 'types/models'
import { useContext, useEffect, useState } from 'react'
import './BooksCheckout.css'
import { LibrarianContext } from 'context/librarian'
import { StudentContext } from 'context/student'
import { shouldLoadData } from 'utils/state.utils'
import { BooksFilter } from 'components/BooksFilter'
import { useFilter } from 'hooks'



const BooksCheckout = () => {
  const [visible, setVisible] = useState(false)
  

  const { users,loadStudents} =
    useContext(LibrarianContext)

    const {  requests, loadRequests } =
    useContext(StudentContext)

  const [filtered, filter] = useFilter(users.data)



    const { returnBook } =
    useContext(LibrarianContext)

  const handleUserSelection = (userId: number) => {
    setVisible(true)
    const bookId = Number(userId)
    if (Number.isFinite(bookId)) loadRequests(bookId)
  }

  useEffect(() => {
    if (shouldLoadData(users)) loadStudents()
  }, [users, loadStudents])

  const handleReturnBook = (id_loan:number,id_user:number) => {
    returnBook(id_loan).then(error => {
      if (error) message.error(error)
      else {
        loadStudents()
        loadRequests(id_user)
        message.success('Book returned')
      }
    })
  }

  return (
    <div className="books-checkout-page">
      <div className="books-checkout-header">
        <h1>Search people</h1>
        <Input.Search placeholder="Search by name" style={{ width: '240px' }}/>
      </div>
      <List
        dataSource={users.data}
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
      <UserBooksModal visible={visible} onCancel={() => setVisible(false)} requests={requests.data} checkout={(id_loan,id_user)=> handleReturnBook(id_loan,id_user)}/>
    </div>
  )
}

export default BooksCheckout
