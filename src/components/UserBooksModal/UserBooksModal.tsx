import { Modal, Button, List, Popconfirm } from 'antd'
import { BookItem } from 'components/BookItem'
import { StudentRequest } from 'types/models'

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

type UserBooksModalProps = {
  visible: boolean
  onCancel: () => void
}

export const UserBooksModal = ({ visible, onCancel }: UserBooksModalProps) => {
  return (
    <Modal
      title="User's books"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <List
        dataSource={requests}
        renderItem={(request) => (
          <BookItem
            book={request.book}
            extra={
              <Popconfirm
                title="Are you sure to mark this book as returned?"
                onConfirm={() => console.log('ok')}
                trigger={['click']}
                getPopupContainer={(node) => node.parentElement as HTMLElement}
              >
                <Button danger>Mark as returned</Button>
              </Popconfirm>
            }
          />
        )}
      />
    </Modal>
  )
}
