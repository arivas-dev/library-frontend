import { Book } from 'types/models'
import { List } from 'antd'
import { BooksFilter } from 'components/BooksFilter'
import { BookItem } from 'components/BookItem'
import { Link } from 'react-router-dom'
import './Books.css'

const books: Book[] = [
  {
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
  {
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
]

const Books = () => {
  return (
    <div className="books-page">
      <div className="books-page-header">
        <h1>Choose your book</h1>
        <BooksFilter />
      </div>
      <List
        dataSource={books}
        renderItem={(book) => (
          <Link to={book.id.toString()} key={book.id}>
            <BookItem book={book} />
          </Link>
        )}
      />
    </div>
  )
}

export default Books
