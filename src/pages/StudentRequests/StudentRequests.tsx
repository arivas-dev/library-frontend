import { List, Tag } from 'antd'
import { BookItem } from 'components/BookItem'
import { StudentRequest } from 'types/models'
import './StudentRequests.css'

const requests: StudentRequest[] = [
  {
    id: 1,
    count: 3,
    book: {
      author: 'Herman Melville',
      copies_available: 1,
      description: 'The description',
      id: 1,
      id_author: 9,
      id_gender: 1,
      image: 'https://picsum.photos/300',
      name: 'Moby-dick',
      published: 1900,
      title: 'The moby-dick',
    },
  },
  {
    id: 2,
    count: 3,
    book: {
      author: 'Homer',
      copies_available: 1,
      description: 'The description',
      id: 2,
      id_author: 2,
      id_gender: 4,
      image: 'https://picsum.photos/300',
      name: 'The odyssea',
      published: 1000,
      title: 'The odyssea',
    },
  },
]

const StudentRequests = () => {
  return (
    <div className="student-requests-page">
      <h1>My requests</h1>
      <List
        dataSource={requests}
        renderItem={(request) => (
          <BookItem
            key={request.id}
            book={request.book}
            extra={<Tag color="blue">{request.count}</Tag>}
          />
        )}
      />
    </div>
  )
}

export default StudentRequests
