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
    students: joinPath('user'),
    genres : joinPath('genre'),
    author : joinPath('author'),
    studentRequests: (id: number) => joinPath(`loan/${id}`),
    createUser: joinPath('user'),
    createBook: joinPath('book'),
    returnBook: (id: number) => joinPath(`loan/returnBook/${id}`),
  },
}
