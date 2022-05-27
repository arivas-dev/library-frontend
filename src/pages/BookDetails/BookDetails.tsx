import { Book } from 'types/models'
import { useParams } from 'react-router-dom'
import { Avatar, Table, Button, Row, Col, Spin, message } from 'antd'
import { useEffect, useContext } from 'react'
import { StudentContext } from 'context/student'
import { ColumnType } from 'antd/lib/table'
import './BookDetails.css'

const BookDetails = () => {
  const { bookDetails, loadBookDetails, createRequest, requestCreation } =
    useContext(StudentContext)
  const book = bookDetails.data
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const bookId = Number(id)

    if (Number.isFinite(bookId)) loadBookDetails(bookId)
  }, [id, loadBookDetails])

  const handleRequestCreation = (bookId: number) => {
    createRequest(bookId).then((error) => {
      if (error) message.error(error)
    })
  }

  const cols: ColumnType<Book>[] = [
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
    {
      align: 'center',
      dataIndex: 'id',
      title: 'Action',
      fixed: 'right',
      render: (value: number, record) => (
        <Button
          disabled={record.in_stock === 0}
          onClick={() => handleRequestCreation(value)}
          type="primary"
        >
          Checkout
        </Button>
      ),
    },
  ]

  return (
    <Spin
      wrapperClassName="book-details"
      spinning={bookDetails.isLoading}
      tip="Loading..."
    >
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
        loading={requestCreation.isLoading}
        dataSource={[book]}
        columns={cols}
        rowKey="id"
        pagination={false}
        scroll={{ x: 500 }}
      />
    </Spin>
  )
}

export default BookDetails
