export type Book = {
  id: number
  title: string
  description: string
  copies_available: number
  image: string | null
  id_gender: number
  id_author: number
  published: number
  name: string
  author: string
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
}

export type BookCheckout = {
  book: Book
  student: User
}
