export const AppRoutes = {
  student: {
    base: 'student',
    books: 'books',
    bookDetails: (id: number) => `books/${id}`,
    requests: 'my-requests',
  },
  librarian: {
    base: 'librarian',
    checkout: 'books-checkout',
    resourcesCreation: 'resources-creation',
  },
  login: 'login',
  notFound: '*',
}
