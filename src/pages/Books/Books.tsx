import { StudentContext } from 'context/student'
import { List } from 'antd'
import { BooksFilter } from 'components/BooksFilter'
import { BookItem } from 'components/BookItem'
import { useContext, useEffect } from 'react'
import { useFilter } from 'hooks'
import { Link } from 'react-router-dom'
import { shouldLoadData } from 'utils/state.utils'
import './Books.css'

const Books = () => {
  const { books, loadBooks } = useContext(StudentContext)
  const [filtered, filter] = useFilter(books.data)

  useEffect(() => {
    if (shouldLoadData(books)) loadBooks()
  }, [books, loadBooks])

  return (
    <div className="books-page">
      <div className="books-page-header">
        <h1>Choose your book</h1>
        <BooksFilter onFilter={filter} />
      </div>
      <List
        loading={books.isLoading}
        dataSource={filtered}
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
