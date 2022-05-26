export type Book = {
  id: number
  title: string
  description: string
  copies_available: number
  image: string | null
  id_genre: number
  id_author: number
  published: number
  name: string
  author: string
  in_stock: number
}

export type User = {
  id: number
  name: string
  email: string
  id_role: number
  role: 'librarian' | 'student'
}

export type StudentRequest = {
  id: number
  book: Book
  count: number
}

export type BookCheckout = {
  book: Book
  student: User
}
