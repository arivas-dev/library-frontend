import { List, Avatar } from 'antd'
import { Book } from 'types/models'
import { ReactNode } from 'react'

type BookItemProps = {
  book: Book
  extra?: ReactNode
}

export const BookItem = (props: BookItemProps) => {
  const { book, extra } = props

  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src={book.image} />}
        title={
          <p>
            <b>{book.title} - {book.author}</b>
            {book.name} ({book.published})
          </p>
        }
        description={book.description}
      />
      {extra}
    </List.Item>
  )
}
