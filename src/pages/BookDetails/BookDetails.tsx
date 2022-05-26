import { Book } from 'types/models'
// import { useParams } from 'react-router-dom'
import { Avatar, Table, Button, Row, Col } from 'antd'
import { ColumnType } from 'antd/lib/table'
import './BookDetails.css'

const book: Book = {
  author: 'Herman Melville',
  copies_available: 1,
  description: 'The description',
  id: 1,
  id_author: 9,
  id_genre: 1,
  image: 'https://picsum.photos/300',
  name: 'Moby-dick',
  published: 1900,
  title: 'The moby-dick',
  in_stock: 1,
}

const BookDetails = () => {
  // const { id } = useParams<{ id: string }>()

  const cols: ColumnType<Book>[] = [
    {
      align: 'center',
      dataIndex: 'author',
      title: 'Author',
    },
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
      dataIndex: 'id',
      title: 'Action',
      fixed: 'right',
      render: (value: number) => (
        <Button onClick={() => console.log(value)} type="primary">
          Checkout
        </Button>
      ),
    },
  ]

  return (
    <div className="book-details">
      <Row className="book-details-header">
        <Col xs={6} sm={3}>
          <Avatar
            style={{ width: '100%', height: '100%' }}
            shape="square"
            src={book.image}
            alt={book.name}
          />
        </Col>
        <Col xs={18} sm={21} className="book-details-meta">
          <h2>{book.name}</h2>
          <p>{book.description}</p>
        </Col>
      </Row>
      <Table
        dataSource={[book]}
        columns={cols}
        rowKey="id"
        pagination={false}
        scroll={{ x: 500 }}
      />
    </div>
  )
}

export default BookDetails
