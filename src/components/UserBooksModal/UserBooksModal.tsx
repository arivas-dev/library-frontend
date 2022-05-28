import { Modal, Button, List, Popconfirm } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import { BookItem } from 'components/BookItem'
import { Book, StudentRequest } from 'types/models'
// import { StudentRequest } from 'types/models'

// const requests = [
//   {
//     id: 1,
//     count: 3,
//     book: {
//       author: 'Herman Melville',
//       copies_available: 1,
//       description: 'The description',
//       id: 1,
//       id_author: 9,
//       id_genre: 1,
//       image: 'https://picsum.photos/300',
//       name: 'Moby-dick',
//       published: 1900,
//       title: 'The moby-dick',
//       in_stock: 1,
//     },
//   },
//   {
//     id: 2,
//     count: 3,
//     book: {
//       author: 'Homer',
//       copies_available: 1,
//       description: 'The description',
//       id: 2,
//       id_author: 2,
//       id_genre: 4,
//       image: 'https://picsum.photos/300',
//       name: 'The odyssea',
//       published: 1000,
//       title: 'The odyssea',
//       in_stock: 3,
//     },
//   },
// ]

type UserBooksModalProps = {
  visible: boolean
  onCancel: () => void
  requests: StudentRequest[]
  checkout : (id_loan:number,id_user:number)=> void
}

export const UserBooksModal = ({ visible, onCancel, requests,checkout }: UserBooksModalProps) => {
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

          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src='' />}
              title={
                <p>
                  <b>{request.title}</b>
                </p>
              }
              description={request.description}
            />
            <Popconfirm
              title="Are you sure to mark this book as returned?"
              onConfirm={()=> checkout(request.id,request.id_user)}
              trigger={['click']}
              getPopupContainer={(node) => node.parentElement as HTMLElement}
            >
              <Button danger>Mark as returned</Button>
            </Popconfirm>
          </List.Item>


        )}
      />
    </Modal>
  )
}
