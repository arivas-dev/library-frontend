import { StudentContext } from 'context/student'
import { List } from 'antd'
import { BooksFilter } from 'components/BooksFilter'
import { BookItem } from 'components/BookItem'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { shouldLoadData } from 'utils/state.utils'
import './Books.css'

const Books = () => {
  const { books, loadBooks } = useContext(StudentContext)

  useEffect(() => {
    if (shouldLoadData(books)) loadBooks()
  }, [books, loadBooks])

  return (
    <div className="books-page">
      <div className="books-page-header">
        <h1>Choose your book</h1>
        <BooksFilter />
      </div>
      <List
        loading={books.isLoading}
        dataSource={books.data}
        renderItem={(book) => {
          console.log('book :>> ', book)
          return (
            <Link to={book.id.toString()} key={book.id}>
              <BookItem book={book} />
            </Link>
          )
        }}
      />
    </div>
  )
}

export default Books
