import { Tabs } from 'antd'
import { CreateBook, CreateUser } from 'components/ResourceCreation'
import './ResourcesCreation.css'

const { TabPane } = Tabs

const ResourcesCreation = () => {
  return (
    <div className="resources-creation-page">
      <Tabs defaultActiveKey="1" animated>
        <TabPane key="1" tab="Create user">
          <CreateUser />
        </TabPane>
        <TabPane key="2" tab="Create book">
          <CreateBook />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default ResourcesCreation
