import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import IsMobile from 'is-mobile';
import {
  WiredCard as WERWiredCard,
  WiredCombo as WERWiredCombo,
  WiredItem as WERWiredItem,
  WiredImage as WERWiredImage,
  WiredInput as WERWiredInput,
  WiredButton as WERWiredButton
} from 'wired-elements-react'
import { useSize } from 'ahooks'
import useMessage from './components/message';
import useModal from './components/Modal'
import List, { ToDoCardRef } from './components/List'
import DataSourceRequest from './utils/request'
import { Context } from './utils/context'
import Loading from './components/Loading'
import Chart from './components/Chart'
import { ClassifyData } from './type'
import 'animate.css'
import './index.less'

const WiredCard = WERWiredCard as any
const WiredCombo = WERWiredCombo as any
const WiredItem = WERWiredItem as any
const WiredImage = WERWiredImage as any
const WiredInput = WERWiredInput as any
const WiredButton = WERWiredButton as any

const isMobile = IsMobile()

function HomePage() {

  const [fetchLoading, setFetchLoading] = useState(false)
  const [classifyList, setClassifyList] = useState<ClassifyData[]>([])
  const [currentClassify, setCurrentClassify] = useState('all')
  const [toDoInputValue, setToDoInputValue] = useState('')
  const [classifyInputValue, setClassifyInputValue] = useState('')

  const { width = 0 } = useSize(() => document.querySelector('.todo-list-container')) || {}

  const cardRef = useRef<ToDoCardRef>(null)

  const [Message, show, hide, messageProps] = useMessage(2000)
  const [AddClassifyModal, showModal, hideModal, modalProps] = useModal()

  // 选择分类
  const onSelectChange = useCallback((e: any) => {
    try {
      const value = e.target.value
      setCurrentClassify(value.value)
    }catch(err) {

    }
  }, [])

  // 输入内容
  const onInputChange = useCallback((e: any) => {
    const value = e.target.value
    setToDoInputValue(value)
  }, [])

  // 输入分类名称
  const onClassifyInputValue = useCallback((e: any) => {
    const value = e.target.value
    setClassifyInputValue(value)
  }, [])

  // 生成todo
  const handleCreateToDo = useCallback(async () => {
    if (!toDoInputValue || fetchLoading) return
    if (!classifyList.length) {
      show('请先增加分类😊')
      return
    }
    const classify = currentClassify === 'all' ? classifyList[0].id : currentClassify
    setFetchLoading(true)
    const result = await DataSourceRequest.postInsertTodo({
      label: toDoInputValue,
      classify,
    })
    if (result) {
      setToDoInputValue('')
      await cardRef.current?.reload()
    } else {
      show('新增失败！')
    }
    setFetchLoading(false)
  }, [toDoInputValue, fetchLoading, classifyList, classifyInputValue])

  // 获取分类
  const fetchClassifyList = useCallback(async () => {
    if (fetchLoading) return
    setFetchLoading(true)
    const result = await DataSourceRequest.getClassifyList()
    setClassifyList(result)
    setFetchLoading(false)
  }, [fetchLoading])

  // 关闭modal
  const onAddClassifyModalClose = useCallback(() => {
    hideModal()
    setClassifyInputValue('')
  }, [])

  // 新增分类
  const onAddClassifyModalOk = useCallback(async () => {
    if (fetchLoading || !classifyInputValue) return
    setFetchLoading(true)
    const result: any = await DataSourceRequest.postInsertClassify({ label: classifyInputValue })
    if (result) {
      await fetchClassifyList()
      hideModal()
      setClassifyInputValue('')
      show('成功')
    } else {
      show('新增分类失败')
    }
  }, [fetchLoading, classifyInputValue])

  // 刷新数据
  const onListActionReload = useCallback(async (backToAll: boolean) => {
    await fetchClassifyList()
    if (backToAll) {
      setCurrentClassify('all')
    } else {
      setCurrentClassify(prev => prev)
    }
  }, [])

  const currentClassifyData = useMemo(() => {
    if (!currentClassify) return {
      isAll: true
    }
    return classifyList.find(item => item.id === currentClassify) || { isAll: true }
  }, [classifyList, currentClassify])

  const classifyDomList = useMemo(() => {
    return classifyList.map(item => {
      const { id, label } = item
      return (
        <WiredItem key={id} value={id}>{label}</WiredItem>
      )
    })
  }, [classifyList])

  useEffect(() => {
    fetchClassifyList()
  }, [])

  return (
    <Context.Provider
      value={{
        classify: classifyList,
        message: show,
        width
      }}
    >
      <WiredCard
        className={`todo-list-container todo-list-container-${isMobile ? 'h5' : 'pc'}`}
      >
        <div className='todo-list-container-wrapper'>
          <header>
            <WiredCard className="todo-list-header">
              <div>
                <div>我的待办事项</div>
                <WiredImage
                  className="todo-list-header-avatar"
                  src="data:image/jpeg;base64,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"
                  elevation={2}
                />
              </div>
            </WiredCard>
          </header>
          <section>
            <div className='todo-list-section-input'>
              <WiredInput className="todo-list-section-input-main" placeholder="输入你的待办事项吧（根据下面的当前分类进行增加）" value={toDoInputValue} onchange={onInputChange} />
              <WiredButton onClick={handleCreateToDo}>生成</WiredButton>
            </div>
            <div className='todo-list-section-action'>
              <div className='todo-list-section-action-wrapper'>
                <WiredCombo id="classify-select" selected={currentClassify} onselected={onSelectChange}>
                  <WiredItem value="all">全部</WiredItem>
                  {classifyDomList}
                </WiredCombo>
                <WiredButton onClick={showModal}>+添加分类+</WiredButton>
              </div>
              <Chart />
            </div>
            <div className='todo-list-section-main'>
              <List
                {...currentClassifyData}
                ref={cardRef}
                reload={onListActionReload}
              />
            </div>
          </section>
        </div>
        <Loading loading={fetchLoading} />
        <Message {...messageProps} />
        <AddClassifyModal
          title="新增分类"
          {...modalProps}
          style={{ width: 'max(50vw, 300px)' }}
          disabled={!classifyInputValue}
          onCancel={onAddClassifyModalClose}
          onOk={onAddClassifyModalOk}
        >
          <WiredInput className="todo-list-classify-input" placeholder="输入分类名称" value={classifyInputValue} onchange={onClassifyInputValue} />
        </AddClassifyModal>
      </WiredCard>
    </Context.Provider>
  );
}

export default HomePage
