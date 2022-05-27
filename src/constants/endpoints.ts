import { Environment } from 'utils/Environment'

const joinPath = (path: string) => `${Environment.apiUrl}/${path}`

export const Endpoints = {
  login: joinPath('login'),
  students: {
    books: joinPath('book'),
    bookDetails: (id: number) => joinPath(`book/${id}`),
    requests: (userId: number) => joinPath(`loan/${userId}`),
    createRequest: joinPath('loan/loanBook'),
  },
  librarian: {
    students: joinPath('students'),
    studentRequests: (id: number) => joinPath(`student-requests/${id}`),
    createUser: joinPath('create-user'),
    createBook: joinPath('create-book'),
    returnBook: joinPath('return-book'),
  },
}
