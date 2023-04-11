import { useCallback, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { 
  WiredCard as WERWiredCard,
  WiredCheckbox as WERWiredCheckbox,
  WiredButton as WERWiredButton,
  WiredInput as WERWiredInput
} from 'wired-elements-react'
import DataSourceRequest from '../../utils/request'
import useModal from '../Modal'
import useMessage from '../message'
import Loading from '../Loading'
import { ClassifyData, ListData } from '../../type'
import './index.less'

const WiredCard = WERWiredCard as any 
const WiredCheckbox = WERWiredCheckbox as any 
const WiredButton = WERWiredButton as any 
const WiredInput = WERWiredInput as any 

const ToDoItem = (props: ListData & {
  onReload?: () => Promise<void>
}) => {

  const { label } = props 

  return (
    <div>{label}</div>
  )
}

export type ToDoCardRef = {
  reload: () => Promise<void>
}

const ToDoCard = forwardRef<ToDoCardRef, Partial<ClassifyData> & { 
  isAll?: boolean 
  reload?: (backToAll: boolean) => Promise<void> 
}>((props, ref) => {

  const { id, label, isAll, reload } = props 

  const [ checkedList, setCheckedList ] = useState<string[]>(['complete', 'todo', 'delete'])
  const [ dataSource, setDataSource ] = useState<ListData[]>([])
  const [ labelInput, setLabelInput ] = useState(label || "")
  const [ loading, setLoading ] = useState(false)

  const [ DeleteModal, deleteShow, deleteHide, deleteModalProps ] = useModal()
  const [ UpdateModal, updateShow, updateHide, updateModalProps ] = useModal()
  const [ Message, messageShow, messageHide, messageProps ] = useMessage(1000)

  const handleUpdateClassify = useCallback(() => {
    setLabelInput(label || "")
    updateShow() 
  }, [label])

  const onLabelChange = useCallback((e: any) => {
    setLabelInput(e.target.value)
  }, [])

  const onUpdate = useCallback(async () => {
    if(loading) return 
    setLoading(true)
    const result = await DataSourceRequest.postUpdateClassify(id!, labelInput)
    if(!result) {
      messageShow('修改失败')
    }else {
      await reload?.(false)
      updateHide()
    }
    setLoading(false)
  }, [labelInput, reload, loading])

  const onDelete = useCallback(async () => {
    if(loading) return 
    setLoading(true)
    const result = await DataSourceRequest.postDeleteClassify(id!)
    if(!result) {
      messageShow('删除失败')
    }else {
      await reload?.(true)
      deleteHide()
    }
    setLoading(false)
  }, [id, reload, loading])

  const fetchData = useCallback(async () => {
    const result = await DataSourceRequest.getListDataByClassify(id) 
    setDataSource(result)
  }, [id])

  useImperativeHandle(ref, () => {
    return {
      reload: fetchData
    }
  }, [fetchData])

  useEffect(() => {
    fetchData()
  }, [id])

  return (
    <WiredCard className="todo-list-card">
      <div className='todo-list-card-header'>
        <div>
          {
            [
              {
                label: '已办',
                value: 'complete'
              },
              {
                label: '待办',
                value: 'todo'
              },
              {
                label: '已删',
                value: 'delete'
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
        <div className='todo-list-card-header-action'>
          {
            !isAll && (
              <>
                <WiredButton style={{marginRight: 8}} elevation={3} onClick={handleUpdateClassify}>修改</WiredButton>
                <WiredButton elevation={3} onClick={deleteShow}>删除</WiredButton>
              </>
            )
          }
        </div>
      </div>
      <div className='todo-list-card-section'>
        {
          dataSource.filter(item => checkedList.includes(item.status)).map(item => {
            return (
              <ToDoItem key={item.id} {...item} onReload={fetchData} />
            )
          })
        }
      </div>
      <DeleteModal
        {...deleteModalProps}
        onCancel={deleteHide}
        onOk={onDelete}
        style={{width: 'max(50vw, 200px)'}}
        title="提示"
      >
        <span>删除待办分类"{label}"会直接删除所有相关待办，是否确认删除？</span>
      </DeleteModal>
      <UpdateModal
        {...updateModalProps}
        onCancel={updateHide}
        onOk={onUpdate}
        style={{width: 'max(50vw, 300px)'}}
        title="修改分类"
      >
        <WiredInput style={{width: '100%', boxSizing: 'border-box'}} value={labelInput} placeholder="请输入分类名称" onChange={onLabelChange} />
      </UpdateModal>
      <Message
        {...messageProps}
      />
      <Loading loading={loading} />
    </WiredCard>
  )

})

export default ToDoCard