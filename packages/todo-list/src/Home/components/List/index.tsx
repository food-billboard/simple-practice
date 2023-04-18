import {
  useCallback,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo
} from 'react';
import { uniqueId } from 'lodash'
import { useUpdateEffect } from 'ahooks'
import useNotation from '../Notation';
import DataSourceRequest from '../../utils/request'
import { useContext } from '../../utils/context'
import { WiredCard, WiredCheckbox, WiredIconButton, WiredButton, WiredInput } from '../../utils/element'
import { COLOR_MAP } from '../../utils/tool'
import useModal from '../Modal'
import Loading from '../Loading'
import MarkDownEditor from '../MarkDownEditor';
import ImageUpload from '../ImageUpload';
import { ClassifyData, ListData, ListSearchType } from '../../type'
import './index.css'

const ToDoItem = (props: ListData & {
  onReload?: () => Promise<void>
}) => {

  const { onReload, ...nextData } = props
  const { label, status, classify, id, top } = nextData

  const [editData, setEditData] = useState<ListData>({ ...nextData })

  const loading = useRef(false)
  const todoId = useRef(uniqueId('todo-item'))

  const [ showNotation, hideNotation ] = useNotation(`#${todoId.current}`)

  const [EditModal, show, hide, modalProps] = useModal()
  const { message, classify: classifyDataSource } = useContext()

  const labelColor = useMemo(() => {
    const targetIndex = (classifyDataSource.findIndex(item => item.id === classify) || -1) + 1
    return COLOR_MAP[targetIndex % COLOR_MAP.length]
  }, [classify, classifyDataSource])

  const disabled = useMemo(() => {
    return status === 'delete'
  }, [status])

  const classifyData = useMemo(() => {
    return classifyDataSource.find(item => item.id === classify)
  }, [classify, classifyDataSource])

  // 修改数据监听
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

  // 打开修改
  const handleEdit = useCallback(() => {
    if(nextData.status !== 'todo') return 
    setEditData({...nextData})
    show()
  }, [show, nextData])

  // 修改提交
  const onEditOk = useCallback(async () => {
    if (loading.current) return
    loading.current = false
    const result = await DataSourceRequest.postUpdateTodo(id, classify, editData)
    if (!result) {
      message('操作失败')
    }else {
      await onReload?.()
      hide()
    }
    loading.current = true
  }, [id, classify, editData])

  // 删除
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

  const onToDoTop = useCallback(async () => {
    if (loading.current) return
    loading.current = true
    const result = await DataSourceRequest.postUpdateTodo(id, classify, {
      top: !top
    })
    if (!result) {
      message('操作失败')
    }
    await onReload?.()
    loading.current = false
  }, [id, classify, onReload, top])

  const onStatusChange = useCallback(async (e: any) => {
    if (loading.current) return
    loading.current = true
    const value = e.detail.checked 
    const nextStatus = value ? 'complete' : 'todo'
    const result = await DataSourceRequest.postUpdateTodo(id, classify, {
      status: nextStatus
    })
    if (!result) {
      message('操作失败')
    }
    await onReload?.()
    loading.current = false 
  }, [])

  const updateNotation = (status: ListData['status'], top: boolean, animate: boolean) => {
    if(status === 'delete') {
      showNotation({
        type: 'crossed-off',
        animate 
      })
    }else if(status === 'complete') {
      showNotation({
        type: 'strike-through',
        animate 
      })
    }else if(top) {
      showNotation({
        type: 'highlight',
        animate 
      })
    }else {
      hideNotation()
    }
  }

  useEffect(() => {
    updateNotation(status, top, false)
  }, [])

  useUpdateEffect(() => {
    updateNotation(status, top, true)
  }, [status, top])

  return (
    <>
      <WiredCard
        className="todo-list-card-item animate__animated animate__delay-1s"
      >
        <div className='todo-list-card-item-wrapper'>
          <div>
            <WiredCheckbox disabled={disabled} checked={status === 'complete'} onchange={onStatusChange} />
            <WiredCard className="todo-list-card-item-label">
              <div id={todoId.current} onClick={handleEdit}>{label}</div>
            </WiredCard>
            <WiredCard fill={labelColor} disabled={disabled}>{classifyData?.label}</WiredCard>
          </div>
          <div className="todo-list-card-item-action">
            <WiredIconButton 
              onClick={onToDoTop} 
              style={{
                marginRight: 4,
                visibility: status === 'todo' ? 'visible' : 'hidden'
              }}
            >
              {
                top ? 
                (
                  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1531" width="16" height="16"><path d="M189.3 115h653.4c12.1 0 22-9.9 22-22v-6c0-12.1-9.9-22-22-22H189.3c-12.1 0-22 9.9-22 22v6c0 12.1 9.9 22 22 22zM152.2 524.5c-16.1 15.5-16.5 41.4-1 57.5s41.4 16.5 57.5 1l150.5-145-57.4-57.6-149.6 144.1zM474.5 918.4c0 22.4 18.3 40.6 40.6 40.6 22.4 0 40.6-18.3 40.6-40.6V635.3l-81.3-81.6v364.7zM872.3 524.5L547.1 211.3c-7.5-9.5-19-15.6-32-15.6h-0.5c-0.8 0-1.6 0-2.4 0.1-10.9-0.6-22 3.2-30.4 11.3l-98.4 94.7 57.4 57.6 33.6-32.3v66l81.3 81.6V332.5l260.1 250.4c16.1 15.5 41.9 15.1 57.5-1 15.6-16 15.1-41.9-1-57.4zM257.1 207c-6.6-6.7-15.4-10-24.1-10-8.7 0-17.4 3.3-24 9.9-13.3 13.3-13.3 34.8-0.1 48.1l538 540c6.6 6.7 15.4 10 24.1 10 8.7 0 17.4-3.3 24-9.9 13.3-13.3 13.3-34.8 0.1-48.1l-538-540z" fill="#2c2c2c" p-id="1532"></path></svg>
                )
                :
                (
                  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1741" width="16" height="16"><path d="M555.818667 940.629333c-6.229333 56.746667-85.418667 51.669333-88.533334 0V324.693333l-272.64 263.210667c-42.752 36.778667-93.610667-22.058667-61.824-60.757333 120.704-117.034667 337.322667-326.485333 342.4-331.349334 19.968-21.674667 51.413333-22.784 72.661334 0 39.808 38.442667 334.890667 322.986667 343.808 333.226667 29.952 37.205333-18.432 92.245333-59.733334 61.226667-10.666667-9.002667-276.053333-265.514667-276.053333-265.514667l-0.085333 615.893333zM168.448 42.666667h687.104c14.336 0 21.504 8.704 21.504 26.069333 0 17.408-7.168 26.069333-21.504 26.069333H168.448c-14.336 0-21.504-8.661333-21.504-26.026666 0-17.408 7.168-26.112 21.504-26.112z" fill="#2c2c2c" p-id="1742"></path></svg>
                )
              }
            </WiredIconButton>
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
          title={label}
          width={0.8}
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
  reload: (search?: ListSearchType) => Promise<void>
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

  const fetchData = useCallback(async (search?: ListSearchType) => {
    const result = await DataSourceRequest.getListDataByClassify(id, search)
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
        <div 
          className='todo-list-card-header-action'
          style={{
            visibility: isAll ? 'hidden' : 'visible'
          }}
        >
          <WiredButton style={{ marginRight: 8 }} elevation={3} onClick={handleUpdateClassify}>修改</WiredButton>
          <WiredButton elevation={3} onClick={deleteShow}>删除</WiredButton>
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