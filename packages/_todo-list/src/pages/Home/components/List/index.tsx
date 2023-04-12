import {
  useCallback,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo
} from 'react';
import {
  WiredCard as WERWiredCard,
  WiredCheckbox as WERWiredCheckbox,
  WiredIconButton as WERWiredIconButton,
  WiredButton as WERWiredButton,
  WiredInput as WERWiredInput,
} from 'wired-elements-react'
import DataSourceRequest from '../../utils/request'
import { useContext } from '../../utils/context'
import useModal from '../Modal'
import Loading from '../Loading'
import MarkDownEditor from '../MarkDownEditor';
import ImageUpload from '../ImageUpload';
import { ClassifyData, ListData } from '../../type'
import './index.less'

const WiredCard = WERWiredCard as any
const WiredCheckbox = WERWiredCheckbox as any
const WiredButton = WERWiredButton as any
const WiredInput = WERWiredInput as any
const WiredIconButton = WERWiredIconButton as any

const ToDoItem = (props: ListData & {
  onReload?: () => Promise<void>
}) => {

  const { onReload, ...nextData } = props
  const { label, status, classify, id } = nextData

  const [editData, setEditData] = useState<ListData>({ ...nextData })

  const loading = useRef(false)

  const [EditModal, show, hide, modalProps] = useModal()
  const { message, classify: classifyDataSource } = useContext()

  const classifyData = useMemo(() => {
    return classifyDataSource.find(item => item.id === classify)
  }, [classify, classifyDataSource])

  const onEditChange = useCallback((key: keyof ListData, value: any) => {
    let realValue = value 
    try {
      realValue = value.target.value
    }catch(err){}
    try {
      realValue = value.target.value.value || realValue
    }catch(err){}
    setEditData({
      ...editData,
      [key]: realValue
    })
  }, [editData])

  const handleEdit = useCallback(() => {
    if(nextData.status !== 'todo') return 
    setEditData({...nextData})
    show()
  }, [show, nextData])

  const onEditOk = useCallback(async () => {
    if (loading.current) return
    loading.current = false
    const result = await DataSourceRequest.postUpdateTodo(id, classify, editData)
    if (result) {
      message('操作失败')
    }
    loading.current = true
  }, [id, classify])

  const onToDoDelete = useCallback(async () => {
    if (loading.current) return
    loading.current = true
    const result = await DataSourceRequest.postUpdateTodo(id, classify, {
      status: status === 'delete' ? 'todo' : 'delete'
    })
    if (!result) {
      message('操作失败')
    }
    await onReload?.()
    loading.current = false
  }, [id, classify, onReload, status])

  return (
    <>
      <WiredCard
        className="todo-list-card-item"
      >
        <div className='todo-list-card-item-wrapper'>
          <div>
            <WERWiredCheckbox checked={status === 'complete'} />
            <WiredCard className="todo-list-card-item-label">
              <div onClick={handleEdit}>{label}</div>
            </WiredCard>
            <WiredButton>{classifyData?.label}</WiredButton>
          </div>
          <div className="todo-list-card-item-action">
            <WiredIconButton onClick={onToDoDelete}>
              {
                status === 'delete' ? 
                (
                  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3673" width="16" height="16"><path d="M690 145.3l-70.6 12.4-12.3-69.6c-2.4-13.6-15.4-22.8-29.1-20.4L395.5 100c-13.6 2.4-22.8 15.4-20.4 29.1l12.3 69.6L130.3 244l17.2 97.3 746.2-131.6-17.2-97.3L690 145.3z m-141.3 24.4l-90.8 16-5.8-32.8 90.8-16 5.8 32.8zM187.1 341.6l51.2 516.1c0 54.3 48.6 98.8 108 98.8h331.8c59.9 0 108-44 108-98.8l50.7-516.1H187.1z m549.8 339c-0.3 9.3-7.7 16.7-16.9 17-5 0-9.7-2.3-12.6-6.2l-39-39.5c-98.1 98.1-230.7 107.6-327.6 32.7-23.5-23.4-43.5-44.3-72.3-79.4 162.9 114 297.4-7.2 318.1-34.7l-40.1-38.7h0.1c-4-3-6.3-7.7-6.2-12.7 0-0.6 0-1.2 0.1-1.8 0.9-9.2 9.1-16 18.3-15.1l180.1-19.9c4.6-0.1 9 1.8 12.1 5.3 3.4 3.1 5.4 7.5 5.3 12.1l-19.4 180.9z" p-id="3674"></path></svg>
                )
                :
                (
                  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2668" width="16" height="16"><path d="M96 320a32 32 0 1 1 0-64h832a32 32 0 0 1 0 64H96z m736 0h64v448a160 160 0 0 1-160 160H288a160 160 0 0 1-160-160V320h64v96H128v-96h64v448a96 96 0 0 0 96 96h448a96 96 0 0 0 96-96V320z m-512 112a32 32 0 0 1 64 0v320a32 32 0 0 1-64 0v-320z m320 0a32 32 0 0 1 64 0v320a32 32 0 0 1-64 0v-320zM288 256H224V192a96 96 0 0 1 96-96h384a96 96 0 0 1 96 96v64h-64V224h64v32h-64V192a32 32 0 0 0-32-32H320a32 32 0 0 0-32 32v64z" p-id="2669"></path></svg>
                )
              }
            </WiredIconButton>
          </div>
        </div>
        <EditModal
          {...modalProps}
          onOk={onEditOk}
          onCancel={hide}
        >
          <WiredInput style={{width: '100%'}} placeholder="输入代办事项标题" value={editData.label} onchange={onEditChange.bind(null, 'label')} />
          <MarkDownEditor value={editData.description} onChange={onEditChange.bind(null, 'description')} />
          <ImageUpload value={editData.images} onChange={onEditChange.bind(null, 'images')} />
        </EditModal>
      </WiredCard>

    </>
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

  const [checkedList, setCheckedList] = useState<string[]>(['complete', 'todo', 'delete'])
  const [dataSource, setDataSource] = useState<ListData[]>([])
  const [labelInput, setLabelInput] = useState(label || "")
  const [loading, setLoading] = useState(false)

  const { message } = useContext()

  const [DeleteModal, deleteShow, deleteHide, deleteModalProps] = useModal()
  const [UpdateModal, updateShow, updateHide, updateModalProps] = useModal()

  const handleUpdateClassify = useCallback(() => {
    setLabelInput(label || "")
    updateShow()
  }, [label])

  const onLabelChange = useCallback((e: any) => {
    setLabelInput(e.target.value)
  }, [])

  const onUpdate = useCallback(async () => {
    if (loading) return
    setLoading(true)
    const result = await DataSourceRequest.postUpdateClassify(id!, labelInput)
    if (!result) {
      message('修改失败')
    } else {
      await reload?.(false)
      updateHide()
    }
    setLoading(false)
  }, [labelInput, reload, loading])

  const onDelete = useCallback(async () => {
    if (loading) return
    setLoading(true)
    const result = await DataSourceRequest.postDeleteClassify(id!)
    if (!result) {
      message('删除失败')
    } else {
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
                  if (checked) {
                    setCheckedList(prev => prev.filter(item => item !== value))
                  } else {
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
                <WiredButton style={{ marginRight: 8 }} elevation={3} onClick={handleUpdateClassify}>修改</WiredButton>
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
        style={{ width: 'max(50vw, 200px)' }}
        title="提示"
      >
        <span>删除待办分类"{label}"会直接删除所有相关待办，是否确认删除？</span>
      </DeleteModal>
      <UpdateModal
        {...updateModalProps}
        onCancel={updateHide}
        onOk={onUpdate}
        style={{ width: 'max(50vw, 300px)' }}
        title="修改分类"
      >
        <WiredInput style={{ width: '100%', boxSizing: 'border-box' }} value={labelInput} placeholder="请输入分类名称" onChange={onLabelChange} />
      </UpdateModal>
      <Loading loading={loading} />
    </WiredCard>
  )

})

export default ToDoCard