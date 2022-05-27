// import { List, Tag } from 'antd'
// import { BookItem } from 'components/BookItem'
import { StudentContext } from 'context/student'
import { useContext, useEffect } from 'react'
// import { shouldLoadData } from 'utils/state.utils'
import './StudentRequests.css'

const StudentRequests = () => {
  const { requests, loadRequests } = useContext(StudentContext)

  useEffect(() => {
    loadRequests()
  }, [loadRequests])

  console.log('requests', requests)
  return (
    <div className="student-requests-page">
      <h1>My requests</h1>
      {/* <List
        dataSource={requests}
        renderItem={(request) => (
          <BookItem
            key={request.id}
            book={request.book}
            extra={<Tag color="blue">{request.count}</Tag>}
          />
        )}
      /> */}
    </div>
  )
}

export default StudentRequests
