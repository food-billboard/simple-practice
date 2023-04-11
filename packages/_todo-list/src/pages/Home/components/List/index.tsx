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
    setEditData({...nextData})
    show()
  }, [show])

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
    loading.current = false
    const result = await DataSourceRequest.postUpdateTodo(id, classify, {
      status: 'delete'
    })
    if (result) {
      message('操作失败')
    }
    loading.current = true
  }, [id, classify])

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
            <WiredIconButton onClick={onToDoDelete}>delete</WiredIconButton>
          </div>
        </div>
        <EditModal
          {...modalProps}
          onOk={onEditOk}
          onCancel={hide}
        >
          <WiredInput placeholder="输入代办事项标题" value={editData.label} onchange={onEditChange.bind(null, 'label')} />
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