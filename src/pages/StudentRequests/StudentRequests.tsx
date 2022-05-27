import { List, Tag } from 'antd'
import { StudentContext } from 'context/student'
import { useContext, useEffect } from 'react'
import './StudentRequests.css'

const StudentRequests = () => {
  const { requests, loadRequests } = useContext(StudentContext)

  useEffect(() => {
    loadRequests()
  }, [loadRequests])

  return (
    <div className="student-requests-page">
      <h1>My requests</h1>
      <List
        loading={requests.isLoading}
        dataSource={requests.data}
        renderItem={(request) => (
          <List.Item key={request.id}>
            <List.Item.Meta
              title={request.title}
              description={request.description}
            />
            <Tag color={request.returned > 0 ? 'green' : 'blue'}>
              {request.returned > 0 ? 'Returned' : 'Pending'}
            </Tag>
          </List.Item>
        )}
      />
    </div>
  )
}

export default StudentRequests
