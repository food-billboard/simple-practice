import { ReactNode, useCallback, useState, useRef } from 'react';
import { 
  WiredCard as WERWiredCard,
  WiredCheckbox as WERWiredCheckbox,
  WiredButton as WERWiredButton
} from 'wired-elements-react'
import { ClassifyData, ListData } from '../../type'
import './index.less'

const WiredCard = WERWiredCard as any 
const WiredCheckbox = WERWiredCheckbox as any 
const WiredButton = WERWiredButton as any 

const ToDoItem = () => {

}

const ToDoCard = (props: ClassifyData) => {

  const {  } = props 

  const [ checkedList, setCheckedList ] = useState<string[]>(['0', '1', '2'])
  const [ dataSource, setDataSource ] = useState<ListData[]>([])

  const handleUpdate = useCallback(() => {

  }, [])

  const handleDelete = useCallback(() => {

  }, [])

  return (
    <WiredCard>
      <div className='todo-list-card-header'>
        <div>
          {
            [
              {
                label: '已办',
                value: '0'
              },
              {
                label: '待办',
                value: '1'
              },
              {
                label: '已删',
                value: '2'
              }
            ].map(item => {
              const { label, value } = item 
              const checked = checkedList.includes(value)
              return (
                <WiredCheckbox onChange={() => {
                  if(checked) {
                    setCheckedList(prev => prev.filter(item => item !== value))
                  }else {
                    setCheckedList(prev => [...prev, value])
                  }
                }} checked={checkedList.includes(value)} key={value}>{label}</WiredCheckbox>
              )
            })
          }
        </div>
        <div>
          <WiredButton elevation={3} onClick={handleUpdate}>修改</WiredButton>
          <WiredButton elevation={3} onClick={handleDelete}>删除</WiredButton>
        </div>
      </div>
      <div className='todo-list-card-section'>
        
      </div>
    </WiredCard>
  )

}

const ToDoList = () => {

  return (
    <div></div>
  )

}

export default ToDoList