import React from 'react'
import { Avatar, List, Switch } from 'antd';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
]

const ClassStudents = () => {

  return (
    <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item
       actions={[<Switch key={index} checkedChildren="PASS" unCheckedChildren="FAILED"  />]}
    >
        <List.Item.Meta
          avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
          title={<a href="https://ant.design">{item.title}</a>}
        />
    </List.Item>
    )}
  />
  )
}

export default ClassStudents