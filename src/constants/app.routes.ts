export const AppRoutes = {
  student: {
    base: 'student',
    books: 'books',
    bookDetails: (id: string) => `books/${id}`,
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
