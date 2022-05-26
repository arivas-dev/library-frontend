import { Environment } from 'utils/Environment'

const joinPath = (path: string) => `${Environment.apiUrl}/${path}`

export const Endpoints = {
  login: joinPath('login'),
  students: {
    books: joinPath('books'),
    bookDetails: (id: number) => joinPath(`books/${id}`),
    requests: joinPath('books'),
    createRequest: joinPath('create-request'),
  },
  librarian: {
    students: joinPath('students'),
    studentRequests: (id: number) => joinPath(`student-requests/${id}`),
    createUser: joinPath('create-user'),
    createBook: joinPath('create-book'),
    returnBook: joinPath('return-book'),
  },
}
