import React, { 
  useCallback, 
  useEffect, 
  useMemo, 
  useState, 
  useRef,
  createContext, 
  useContext as RCUseContext,
  useImperativeHandle,
  forwardRef,
  ReactNode,
  CSSProperties
} from 'react';
import IsMobile from 'is-mobile'
import MarkDownIt from 'markdown-it'
import {
  ArcSeries,
  Arc,
  Tooltip as RTooltip,
  ChartProvider as RChartProvider,
} from 'rough-charts'
import {
  WiredCard as WERWiredCard,
  WiredCombo as WERWiredCombo,
  WiredItem as WERWiredItem,
  WiredImage as WERWiredImage,
  WiredInput as WERWiredInput,
  WiredDialog as WERWiredDialog,
  WiredButton as WERWiredButton,
  WiredDivider as WERWiredDivider,
  WiredCheckbox as WERWiredCheckbox,
  WiredIconButton as WERWiredIconButton,
} from 'wired-elements-react'
import { uniqueId } from 'lodash'
import { useSize, useUpdateEffect } from 'ahooks'
import Marquee from 'react-fast-marquee'
import LocalForage from "localforage"
import PMap from "p-map"
import { annotate } from 'rough-notation'
import type { RoughAnnotationConfig, RoughAnnotationType } from 'rough-notation/lib/model'
import 'animate.css'
import './index.less'

// 图表数据
type ChartData = {
  name: string 
  value: number 
}

// 全局数据
type ContextData = {
  classify: ClassifyData[]
  width: number 
  message: (message: string, duration?: number) => void 
}

// 分类
type ClassifyData = {
  id: string 
  label: string 
}

// 列表项
type ListData = {
  id: string 
  classify: string 
  status: 'todo' | 'delete' | 'complete'
  label: string 
  top: boolean 
  images?: string[] 
  description?: string 
  timestamps: number 
}

// 列表搜索项
type ListSearchType = Partial<Pick<ListData, 'status'> & {
  content?: string 
}>

// 表单
type CommonFormProps<T=any> = {
  readonly?: boolean 
  value?: T 
  onChange?: (value: T) => void 
}

const isMobile = IsMobile()

function uuid() {
  return `todo-uuid-${Math.random()}-${Math.random()}_${Date.now()}`
}

const COLOR_MAP = [
  "#c12e34",
  "#e6b600",
  "#0098d9",
  "#2b821d",
  "#005eaa",
  "#339ca8",
  "#cda819",
  "#32a487"
]

const Context = createContext<ContextData>({
  classify: [],
  width: 100,
  message: () => {}
})

const useContext = () => {
  return RCUseContext(Context)
}

const REQUEST_CACHE_PREFIX = "TODO_LIST_REQUEST_CACHE_PREFIX"
const REQUEST_CACHE_CLASSIFY = `${REQUEST_CACHE_PREFIX}_CLASSIFY`
const REQUEST_CACHE_LIST_DATA = `${REQUEST_CACHE_PREFIX}_LIST_DATA`
const REQUEST_CACHE_IMAGE = "REQUEST_CACHE_IMAGE"

class _DataSourceRequest {

	#CACHE: {
		classify: ClassifyData[],
		todoList: ListData[]
	} = {
		classify: [],
		todoList: [] 
	}

	get CACHE() {
		return this.#CACHE
	}

	// ---getter---

	// 排序todo
	sortToDoList(value: ListData[]) {
		const { todo, remove, complete, top } = value.reduce<{
			top: ListData[]
			todo: ListData[]
			remove: ListData[]
			complete: ListData[]
		}>(
			(acc, cur) => {
				const { status } = cur
				switch (status) {
					case "complete":
						acc.complete.push(cur)
						break
					case "delete":
						acc.remove.push(cur)
						break
					case "todo":
						if(cur.top) {
							acc.top.push(cur)
						}else {
							acc.todo.push(cur)
						}
						break
				}
				return acc
			},
			{
				top: [],
				todo: [],
				remove: [],
				complete: [],
			}
		)
		return [
			...top.sort((a, b) => b.timestamps - a.timestamps),
			...todo.sort((a, b) => b.timestamps - a.timestamps),
			...complete.sort((a, b) => b.timestamps - a.timestamps),
			...remove.sort((a, b) => b.timestamps - a.timestamps),
		]
	}

	// 分类列表
	async getClassifyList(): Promise<ClassifyData[]> {
		try {
			const result = await LocalForage.getItem<ClassifyData[]>(
				REQUEST_CACHE_CLASSIFY
			) || []
			this.#CACHE.classify = result 
			return result
		} catch (err) {
			console.error(err)
			return []
		}
	}

	// todo搜索查询parse
	parseSearchTodo(value: ListData[], search?: ListSearchType) {
		if (!search) return value
		const { content, ...nextSearch } = search
		return value.filter((item) => {
			return (
				Object.entries(nextSearch).every((search) => {
					const [key, value] = search
					return (item as any)[key] === value
				}) &&
				["label", "description"].some((search) =>
					(item as any)[search].includes(content)
				)
			)
		})
	}

	// 指定分类todo
	async getListDataByClassify(
		_classify?: string,
		_search?: ListSearchType,
    sort: boolean=true 
	): Promise<ListData[]> {
		let classify = _classify === "all" ? "" : _classify
		let search: ListSearchType = _search || {}

		if (typeof _classify === "object") {
			classify = ""
			search = _classify
		}

		try {
			if (classify) {
				const result =
					(await LocalForage.getItem<ListData[]>(
						`${REQUEST_CACHE_LIST_DATA}_${classify}`
					)) || []
				let target = sort ? this.sortToDoList(result) : result 
				target = target.filter(item => {
					const { status, content } = search || {}
					return (!status || item.status === status) && (!content || item.description?.includes(content) || item.label.includes(content))
				})
				this.#CACHE.todoList = target 
				return target
			} else {
				const classifyData = await this.getClassifyList()
				const result = await PMap<ClassifyData, ListData[]>(
					classifyData,
					(classify) => {
						return this.getListDataByClassify(classify.id, search, false)
					}
				)
				const target = this.sortToDoList(result.flat(1))
				this.#CACHE.todoList = target 
				return target 
			}
		} catch (err) {
			console.error(err)
			return []
		}
	}

	// ---setter--

	// 增加todo项
	async postInsertTodo(value: Omit<ListData, "id" | "status" | "timestamps" | "top">) {
		const { classify } = value
		try {
			const data = await this.getListDataByClassify(classify)
			data.push({
				...value,
				top: false,
				timestamps: Date.now(),
				status: "todo",
				id: uuid(),
			})
			await LocalForage.setItem(`${REQUEST_CACHE_LIST_DATA}_${classify}`, data)
			return true
		} catch (err) {
			console.error(err)
			return false
		}
	}

	// 修改todo项
	async postUpdateTodo(
		id: string,
		classify: string,
		value: Partial<Pick<ListData, "label" | "description" | "status" | "top">>
	) {
		try {
			const data = await this.getListDataByClassify(classify)
			const newData = data.map((item) => {
				if (item.id !== id) return item
				return {
					...item,
					...value,
				}
			})
			await LocalForage.setItem(
				`${REQUEST_CACHE_LIST_DATA}_${classify}`,
				newData
			)
			return true
		} catch (err) {
			console.error(err)
			return false
		}
	}

	// 增加classify
	async postInsertClassify(classify: Omit<ClassifyData, "id">) {
		try {
			const data = await this.getClassifyList()
			const newData: ClassifyData = {
				...classify,
				id: uuid(),
			}
			data.push(newData)
			await LocalForage.setItem(REQUEST_CACHE_CLASSIFY, data)
			return true
		} catch (err) {
			console.error(err)
			return false
		}
	}

	// 删除classify
	async postDeleteClassify(id: string) {
		try {
			const listDataKey = `${REQUEST_CACHE_LIST_DATA}_${id}`
			await LocalForage.removeItem(listDataKey)
			const data = await this.getClassifyList()
			const newData = data.filter((item) => item.id !== id)
			await LocalForage.setItem(REQUEST_CACHE_CLASSIFY, newData)
			return true
		} catch (err) {
			console.error(err)
			return false
		}
	}

	// 修改classify
	async postUpdateClassify(id: string, label: string) {
		try {
			const data = await this.getClassifyList()
			const newData = data.map((item) => {
				if (item.id !== id) return item
				return {
					...item,
					label,
				}
			})
			await LocalForage.setItem(REQUEST_CACHE_CLASSIFY, newData)
			return true
		} catch (err) {
			console.error(err)
			return false
		}
	}

	// 文件上传
	async postImageUpload(file: File): Promise<string> {
		return new Promise((resolve) => {
			const fileReader = new FileReader()
			fileReader.onload = (e) => {
				const result = e.target?.result
				resolve((result as string) || "")
			}
			fileReader.readAsDataURL(file)
		})
	}
}

const DataSourceRequest = new _DataSourceRequest()

const WWiredCard = WERWiredCard as any
const WWiredCombo = WERWiredCombo as any
const WWiredItem = WERWiredItem as any
const WWiredImage = WERWiredImage as any
const WWiredInput = WERWiredInput as any
const WWiredButton = WERWiredButton as any
const WWiredDivider = WERWiredDivider as any 
const WWiredDialog = WERWiredDialog as any 
const WWiredIconButton = WERWiredIconButton as any
const WWiredCheckbox = WERWiredCheckbox as any
const ChartProvider = RChartProvider as any
const Tooltip = RTooltip as any

const InternalChart = (props: {
  dataSource: { name: string, value: number }[]
}) => {

  const { dataSource } = props 

  const { width } = useContext()

  const chartId = useRef(uniqueId('todo-chart'))

  // useEffect(() => {
  //   new roughViz.Pie({
  //     element: `#${chartId.current}`,
  //     colors: COLOR_MAP,
  //     data: dataSource.reduce<{ labels: string[], values: number[] }>((acc, cur) => {
  //       const { name, value } = cur
  //       acc.labels.push(name)
  //       acc.values.push(value) 
  //       return acc 
  //     }, {
  //       labels: [],
  //       values: [] 
  //     })
  //   })
  // }, [])

  // return (
  //   <roughViz.Pie
  //     data={dataSource.reduce<{ labels: string[], values: number[] }>((acc, cur) => {
  //       const { name, value } = cur
  //       acc.labels.push(name)
  //       acc.values.push(value) 
  //       return acc 
  //     }, {
  //       labels: [],
  //       values: [] 
  //     })}
  //     colors={COLOR_MAP}
  //   >

  //   </roughViz.Pie>
  // )

  // return (
  //   <div
  //     id={chartId.current}
  //   >

  //   </div>
  // )

  return (
    <ChartProvider
      height={width * 0.5}
      width={width * 0.5}
      data={dataSource}
    >
      <ArcSeries
        dataKey="value"
      >
        {(item, itemProps, index) => {
          return (
            <Arc
              key={index}
              {...itemProps}
              // @ts-ignore
              options={{ fill: COLOR_MAP[index % COLOR_MAP.length] }}
            />
          )
        }}
      </ArcSeries>
      <Tooltip>
        {
          (activeItem: any) => {
            const { name, value } = activeItem
            return `${name}: ${value}`
          }
        }
      </Tooltip>
    </ChartProvider>
  )

}

const Chart = () => {

  const [dataSource, setDataSource] = useState<ChartData[]>([])

  const { message } = useContext()

  const [Modal, showModal, hideModal, modalProps] = useModal()

  const handleClick = useCallback(() => {
    const currentData = DataSourceRequest.CACHE.todoList
    const { todo, remove, complete } = currentData.reduce(
      (acc, cur) => {
        const { status } = cur
        switch (status) {
          case "complete":
            acc.complete++
            break
          case "delete":
            acc.remove++
            break
          case "todo":
            acc.todo++
            break
        }
        return acc
      },
      {
        todo: 0,
        remove: 0,
        complete: 0,
      }
    )
    if (todo + complete + remove === 0) return message('暂无数据')
    setDataSource([
      {
        name: '待办',
        value: todo
      },
      {
        name: '已办',
        value: complete
      },
      {
        name: '已删除',
        value: remove
      }
    ])
    showModal()
  }, [])

  return (
    <div>
      <WWiredButton onClick={handleClick}>待办情况</WWiredButton>
      <Modal
        title="待办情况"
        {...modalProps}
        width={0.7}
        cancelText=""
        okText="关闭"
        onOk={hideModal}
      >
        <div style={{ textAlign: 'center' }}>
          <InternalChart dataSource={dataSource} />
        </div>
      </Modal>
    </div>
  )

}

const COLOR_TYPE_MAP: {
  [K in RoughAnnotationType]: string 
} = {
  underline: '',
  box: '',
  circle: '',
  highlight: '',
  'strike-through': '#4ea397',
  'crossed-off': '#f00',
  bracket: ''
}

type ShowMethodType = (config: Partial<RoughAnnotationConfig> & { type: RoughAnnotationConfig['type'] }) => void 

function useNotation(query: string): [
  ShowMethodType,
  () => void 
] {

  const notationRef = useRef<ReturnType<typeof annotate>>()
  const currentType = useRef('')

  const show: ShowMethodType = useCallback((config) => {
    const { type } = config 
    if(!type) return
    const prevType = currentType.current 
    currentType.current = type
    if(currentType.current !== prevType) {
      notationRef.current?.remove()
      notationRef.current = annotate(document.querySelector(query) as any, {
        color: COLOR_TYPE_MAP[config.type],
        ...config 
      })
    }
    notationRef.current?.show()
  }, [])

  const hide = useCallback(() => {
    notationRef.current?.hide() 
  }, [])

  useEffect(() => {
    return () => {
      notationRef.current?.remove()
    }
  }, [])

  return [
    show,
    hide 
  ]

}

const Loading = (props: { loading: boolean }) => {

  return (
    <div></div>
  )

}

const ImageUpload = (props: CommonFormProps<string[]> & { limit?: number }) => {

  const { value = [], onChange, limit = 3 } = props
  const [loading, setLoading] = useState(false)

  const { message } = useContext()

  const fileRef = useRef<HTMLInputElement>(null)

  const handleAdd = useCallback(() => {
    if (loading) return
    fileRef.current?.click()
  }, [loading])

  const onFileChange = useCallback(async (e: any) => {
    const [file] = e.target.files
    e.target.value = ''
    if (file) {
      if (file.size > 5 * 1024) {
        message('文件大小不能超过5kb')
        return
      }else if(!['png', 'jpg', 'jpeg', 'webp'].includes(file.type.split('/')[1])) {
        message('不支持的图片格式')
        return 
      }
      setLoading(true)
      try {
        const result = await DataSourceRequest.postImageUpload(file)
        onChange?.([...value, result])
      } catch (err) {

      } finally {
        setLoading(false)
      }
    }
  }, [value, onChange])

  const handleDelete = useCallback((index: number) => {
    value.splice(index, 1)
    onChange?.(value)
  }, [value, onChange])

  return (
    <div className='todo-list-upload'>
      {
        (!~limit || limit > value.length) && (
          <div onClick={handleAdd} className='todo-list-upload-item'>
            <WWiredCard className='todo-list-upload-item-card'>
              
            </WWiredCard>
            <div className='todo-list-upload-item-card' style={{ padding: 10 }}>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAABMCAMAAAAr8gs7AAAAPFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQLyYwAAAAE3RSTlMAwECAcF4gTxDfsPDQoDDvkI/PCjtUZwAAAQVJREFUWMPt2I1OxSAMhmHawoD9a+//XgVPTObJjGL6xRB5L+DJlhVYcKPRn5bCbo9Oh+pmroqWJmuVIGou6OKs0xJZo1xVgajBWpWqMkRN1ipBRoAQI+CWop7mKmSwHGQEdojKHanxqvawYId6r+4sL0T6iFLzWcgXiTlK1Q793NmsBg6y0at+VcPRNr0/VdYf5t1TaaanDr0pE81S8/yRyEalRVe5+SLflCXw5BrzNxARbVKw9ff7a7i+VXLXCLJr61BrM0SloXahckdqhMyrQNbWCVFJax6isrGaIar+d3WCqAxRvSrgJkMequtBJaC6QlTqQvWYH6K5oGty1kWJbjRq6g3isSNM2K9SuQAAAABJRU5ErkJggg=="
              />
            </div>
          </div>
        )
      }
      {
        value.map((item, index) => {
          return (
            <div
              key={index}
              onClick={handleDelete.bind(null, index)}
              className='todo-list-upload-item'
            >
              <WWiredCard className='todo-list-upload-item-card'>

              </WWiredCard>
              <div className='todo-list-upload-item-card' style={{ padding: 10 }}>
                <img
                  src={item}
                />
              </div>
            </div>
          )
        })
      }
      <input style={{ display: 'none' }} multiple={false} type="file" ref={fileRef} onChange={onFileChange} />
    </div>
  )

}

let instance: MarkDownRender

class MarkDownRender {

  constructor() {
    if(instance) return instance 
    instance = this 
    this.markDownInstance = new MarkDownIt('default', {
      langPrefix: 'language-',
    })
    return instance  
  }

  markDownInstance

  render(value: string) {
    return this.markDownInstance?.render(value)
  }

}

const MarkDownEditor = (props: CommonFormProps) => {

  const { value, onChange } = props 

  const [ markdownAble, setMarkdownAble ] = useState(true)

  const markdownRef = useRef<MarkDownRender>(new MarkDownRender())

  const onTextChange = useCallback((value: any) => {
    onChange?.(value.target.value)
  }, [onChange])

  const previewValue = useMemo(() => {
    if(markdownAble || !value) return '' 
    return markdownRef.current.render(value.toString())
  }, [markdownAble, value])

  return (
    <WWiredCard className="todo-list-markdown">
      <div className='todo-list-markdown-header'>
        <WWiredButton onClick={setMarkdownAble.bind(null, !markdownAble)}>
          {markdownAble ? '编辑模式' : '预览模式'}
        </WWiredButton>
      </div>
      <WWiredCard className="todo-list-markdown-editor">
        {
          markdownAble ? (
            <textarea onChange={onTextChange} value={value} rows={10} placeholder='可以输入待办的描述（这是一个markdown编辑）' />
          )
          :
          (
            <div 
              className="todo-list-markdown-shower"
              dangerouslySetInnerHTML={{
                __html: previewValue || ''
              }}
            />
          )
        }
      </WWiredCard>
    </WWiredCard>
  )

}

const Message = (props: {
  children?: ReactNode
  visible: boolean 
}) => {

  const { children, visible } = props 

  if(!visible) return null 

  return (
    <WWiredCard className='todo-list-message animate__animated animate__fadeInUp animate__faster' fill="green">
      {children}
    </WWiredCard>
  )

}

function useMessage(duration=3000) {

  const [ visible, setVisible ] = useState(false)
  const [ children, setChildren ] = useState<any>('')

  const timeoutRef = useRef<any>()

  const show = useCallback((child?: ReactNode, _duration?: number) => {
    setChildren(child)
    setVisible(true)
    timeoutRef.current = setTimeout(() => {
      setVisible(false)
    }, _duration ?? duration)
  }, [duration])

  const hide = useCallback(() => {
    clearTimeout(timeoutRef.current)
    setVisible(false)
  }, [])  

  return [
    Message as any,
    show,
    hide,
    {
      visible,
      children
    }
  ]

}

const Modal = (props: {
  children?: ReactNode
  title?: false | ReactNode 
  okText?: ReactNode 
  cancelText?: ReactNode
  visible: boolean 
  onOk?: () => void 
  onCancel?: () => void 
  disabled?: boolean 
  style?: CSSProperties
  className?: string,
  width?: number 
}) => {

  const { children, visible, title, okText='确定', cancelText='取消', onOk, onCancel, disabled, style, className, width: propsWidth } = props 

  const { width } = useContext()

  return (
    <WWiredDialog 
      className={`todo-list-modal ${className || ""}`}
      open={visible}
      elevation={3}
      style={style}
    >
      <div 
        className='todo-list-modal-wrapper'
        style={propsWidth ? {
          width: propsWidth <= 1 ? propsWidth * width : propsWidth
        } : {
          maxWidth: width * 0.8
        }}
      >
        {
          !!title && (
            <div className='todo-list-modal-title'>
              {title}
              <WWiredDivider elevation={1} />
            </div>
          )
        }
        {children}
        {
          (okText || cancelText) && (
            <div className='todo-list-modal-footer'>
              {
                !!cancelText && (
                  <WWiredButton style={{marginRight: 8}} elevation={3} onClick={onCancel}>{cancelText}</WWiredButton>
                )
              }
              {
                !!okText && (
                  <WWiredButton disabled={disabled} elevation={3} onClick={onOk}>{okText}</WWiredButton>
                )
              }
            </div>
          )
        }
      </div>
    </WWiredDialog>
  )

}

function useModal() {

  const [ visible, setVisible ] = useState(false)

  const timeoutRef = useRef<any>()

  const show = useCallback(() => {
    setVisible(true)
  }, [])

  const hide = useCallback(() => {
    clearTimeout(timeoutRef.current)
    setVisible(false)
  }, [])  

  return [
    Modal as any,
    show,
    hide,
    {
      visible,
    }
  ]

}

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

  const updateNotation = (status: ListData['status'], animate: boolean) => {
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
    }else {
      hideNotation()
    }
  }

  useEffect(() => {
    updateNotation(status, false)
  }, [])

  useUpdateEffect(() => {
    updateNotation(status, true)
  }, [status])

  return (
    <>
      <WWiredCard
        className="todo-list-card-item animate__animated animate__delay-1s"
      >
        <div className='todo-list-card-item-wrapper'>
          <div>
            <WWiredCheckbox disabled={disabled} checked={status === 'complete'} onchange={onStatusChange} />
            <WWiredCard className="todo-list-card-item-label">
              <div id={todoId.current} onClick={handleEdit}>{label}</div>
            </WWiredCard>
            <WWiredCard fill={labelColor} disabled={disabled}>{classifyData?.label}</WWiredCard>
          </div>
          <div className="todo-list-card-item-action">
            <WWiredIconButton onClick={onToDoTop} style={{marginRight: 4}}>
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
            </WWiredIconButton>
            <WWiredIconButton onClick={onToDoDelete}>
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
            </WWiredIconButton>
          </div>
        </div>
        <EditModal
          {...modalProps}
          onOk={onEditOk}
          onCancel={hide}
          title={label}
          width={0.8}
        >
          <WWiredInput style={{width: '100%'}} placeholder="输入代办事项标题" value={editData.label} onchange={onEditChange.bind(null, 'label')} />
          <MarkDownEditor value={editData.description} onChange={onEditChange.bind(null, 'description')} />
          <ImageUpload value={editData.images} onChange={onEditChange.bind(null, 'images')} />
        </EditModal>
      </WWiredCard>

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
    <WWiredCard className="todo-list-card">
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
                <WWiredCheckbox onChange={() => {
                  if (checked) {
                    setCheckedList(prev => prev.filter(item => item !== value))
                  } else {
                    setCheckedList(prev => [...prev, value])
                  }
                }} checked={checkedList.includes(value)} key={value}>{label}</WWiredCheckbox>
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
          <WWiredButton style={{ marginRight: 8 }} elevation={3} onClick={handleUpdateClassify}>修改</WWiredButton>
          <WWiredButton elevation={3} onClick={deleteShow}>删除</WWiredButton>
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
        <WWiredInput style={{ width: '100%', boxSizing: 'border-box' }} value={labelInput} placeholder="请输入分类名称" onChange={onLabelChange} />
      </UpdateModal>
      <Loading loading={loading} />
    </WWiredCard>
  )

})

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

  // 搜索todo
  const handleSearchToDo = useCallback(async () => {
    if (!toDoInputValue || fetchLoading) return
    await cardRef.current?.reload({
      content: toDoInputValue
    })
    setFetchLoading(false)
  }, [toDoInputValue, fetchLoading])

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
    const result: any = await DataSourceRequest.postInsertClassify({ label: classifyInputValue.slice(0, 4) })
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
        <WWiredItem key={id} value={id}>{label}</WWiredItem>
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
      <WWiredCard
        className={`todo-list-container todo-list-container-${isMobile ? 'h5' : 'pc'}`}
      >
        <div className='todo-list-container-wrapper'>
          <header>
            <WWiredCard className="todo-list-header">
              <div>
                <div>
                  我的待办事项
                  <Marquee style={{fontSize: '12px'}}>
                    这是一个手绘风格的ToDoList列表，支持基本功能以及分类、置顶，数据存储在浏览器本地缓存中，记得及时清理哦。  
                  </Marquee>
                </div>
                <WWiredImage
                  className="todo-list-header-avatar"
                  src="data:image/jpeg;base64,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"
                  elevation={2}
                />
              </div>
            </WWiredCard>
          </header>
          <section>
            <div className='todo-list-section-input'>
              <WWiredInput className="todo-list-section-input-main" placeholder="输入你的待办事项吧（根据下面的当前分类进行增加）" value={toDoInputValue} onchange={onInputChange} />
              <WWiredButton onClick={handleCreateToDo}>生成</WWiredButton>
              <WWiredButton onClick={handleSearchToDo}>搜索</WWiredButton>
            </div>
            <div className='todo-list-section-action'>
              <div className='todo-list-section-action-wrapper'>
                <WWiredCombo id="classify-select" selected={currentClassify} onselected={onSelectChange}>
                  <WWiredItem value="all">全部</WWiredItem>
                  {classifyDomList}
                </WWiredCombo>
                <WWiredButton onClick={showModal}>+添加分类+</WWiredButton>
              </div>
              <Chart />
            </div>
            <div className='todo-list-section-main'>
              <ToDoCard
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
          <WWiredInput className="todo-list-classify-input" placeholder="输入分类名称(最多四个字)" value={classifyInputValue} onchange={onClassifyInputValue} />
        </AddClassifyModal>
      </WWiredCard>
    </Context.Provider>
  );
}

export default HomePage
      