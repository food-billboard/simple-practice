import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import EventEmitter from 'eventemitter3'
import { debounce } from 'lodash'
// @ts-ignore
import * as ChartXkcd from 'chart.xkcd'
import { WiredProgress } from "wired-elements-react/lib/WiredProgress"
import { WiredListbox } from "wired-elements-react/lib/WiredListbox"
import { WiredItem } from "wired-elements-react/lib/WiredItem"
import { WiredCard } from "wired-elements-react/lib/WiredCard"
import { WiredImage } from "wired-elements-react/lib/WiredImage"
// @ts-ignore
import Rough from 'roughjs/bundled/rough.esm'
import type { RoughSVG } from 'roughjs/bin/svg'
import './index.css'

// ----type----

type Options = {
  value: string 
  text: string 
}

type RoughInstance = RoughSVG

type CommonAnimationProps = {
  id: string 
  onComplete: () => void 
  children?: ReactNode
}

type LifecycleDataSourceItem = {
  key: string
  element: any 
  direction: 'left'
  response?: (value: string) => boolean 
  options?: Options[]
}

// ----type----

// ----components----

// 柱形图
const BarChart = (props: {
  title: string 
  value: {
    x: string 
    y: number 
  }[]
}) => {

  const { title, value=[{x: '1', y: 20}, {x: '2', y: 20}] } = props 

  const chartRef = useRef<SVGSVGElement>(null)

  const realData = useMemo(() => {
    let labels: string[] = [] 
    let values: number[] = [] 
    value.forEach(item => {
      const { x, y } = item
      labels.push(x) 
      values.push(y)
    })
    return {
      labels,
      datasets: [{
        data: values,
      }]
    }
  }, [value])

  useEffect(() => {
    new ChartXkcd.Bar(chartRef.current, {
      title,
      data: realData,
      options: {
        backgroundColor: 'transparent',
        dataColors: COLOR_LIST
      }
    })
  }, [title, realData])

  return (
    <svg
      ref={chartRef}
      className="home-page-bar-chart"
    >

    </svg>
  )

}

// 折线图
const LineChart = (props: {
  title: string 
  value: {
    series: string[]
    value: {
      [key: string]: number[]
    }
    label: string[]
  }
}) => {

  const { title, value={
    series: ['1', '2'],
    label: ['1', '2'],
    value: {
      1: [20, 30],
      2: [40, 20]
    }
  } } = props 

  const chartRef = useRef<SVGSVGElement>(null)

  const realData = useMemo(() => {
    return {
      labels: value.label,
      datasets: value.series.map((item) => {
        return {
          label: item,
          data: value.value[item]
        }
      })
    }
  }, [value])

  useEffect(() => {
    new ChartXkcd.Line(chartRef.current, {
      title,
      data: realData,
      options: {
        backgroundColor: 'transparent',
        dataColors: COLOR_LIST
      }
    })
  }, [title, realData])

  return (
    <svg
      ref={chartRef}
      className="home-page-line-chart"
    >

    </svg>
  )

}

// 雷达图
const RadarChart = (props: {
  title: string 
  value: {
    series: string[]
    value: {
      [key: string]: number[]
    }
    label: string[]
  }
}) => {

  const { title, value={
    series: ['1', '2'],
    label: ['1', '2', '3', '4'],
    value: {
      1: [20, 30, 50, 10],
      2: [40, 20, 5, 25]
    }
  } } = props 

  const chartRef = useRef<SVGSVGElement>(null)

  const realData = useMemo(() => {
    return {
      labels: value.label,
      datasets: value.series.map((item) => {
        return {
          label: item,
          data: value.value[item]
        }
      })
    }
  }, [value])

  useEffect(() => {
    new ChartXkcd.Radar(chartRef.current, {
      title,
      data: realData,
      options: {
        backgroundColor: 'transparent',
        dataColors: COLOR_LIST
      }
    })
  }, [title, realData])

  return (
    <svg
      ref={chartRef}
      className="home-page-radar-chart"
    >

    </svg>
  )

}

// 饼图
const PieChart = (props: {
  title: string 
  value: {
    x: string 
    y: number 
  }[]
}) => {

  const { title, value=[{x: '1', y: 20}, {x: '2', y: 20}] } = props 

  const chartRef = useRef<SVGSVGElement>(null)

  const realData = useMemo(() => {
    let labels: string[] = [] 
    let values: number[] = [] 
    value.forEach(item => {
      const { x, y } = item
      labels.push(x) 
      values.push(y)
    })
    return {
      labels,
      datasets: [{
        data: values,
      }]
    }
  }, [value])

  useEffect(() => {
    new ChartXkcd.Pie(chartRef.current, {
      title,
      data: realData,
      options: {
        backgroundColor: 'transparent',
        dataColors: COLOR_LIST
      }
    })
  }, [title, realData])

  return (
    <svg
      ref={chartRef}
      className="home-page-pie-chart"
    >

    </svg>
  )

}

// 提交记录
const GithubCommitHistoryChart = (props: CommonAnimationProps) => {

  const { id } = props 

  const roughRef = useRef<RoughInstance>()
  const svgRef = useRef<SVGSVGElement>(null)

  // 创建月份和周文字
  const createDateText = useCallback(() => {
    const month = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((item, index) => {
      const firstDay = new Date(GITHUB_INFO.CURRENT_YEAR.toString()).getTime()
      const monthFirstDay = new Date(`${GITHUB_INFO.CURRENT_YEAR}-${index + 1}`).getTime()

    })
    const week = ['Mon', 'Wed', 'Fri']

  }, [])

  // 创建图例
  const createLegend = useCallback(() => {

  }, [])

  // 填充内容
  const createDataChart = useCallback(() => {

  }, [])

  // 创建空的一年图
  const createEmpty = useCallback(() => {
    const date = new Date(GITHUB_INFO.CURRENT_YEAR.toString())
    // 当年
    const currentYear = date.getFullYear()
    // 当年第一天星期几
    const weekDay = date.getDay()

    let startIndex = weekDay
    let currentLine = 0

    const children = new Array(getCurrentDayCount(currentYear)).fill(0).map((date) => {
      const dom = roughRef.current?.rectangle(
        (currentLine + 1) * GITHUB_INFO.RECT_MARGIN + (currentLine + 1) * GITHUB_INFO.RECT_SIZE,
        (startIndex + 1) * GITHUB_INFO.RECT_MARGIN + (startIndex + 1) * GITHUB_INFO.RECT_SIZE,
        GITHUB_INFO.RECT_SIZE,
        GITHUB_INFO.RECT_SIZE,
        {
          fill: 'gray',
          stroke: 'transparent'
        }
      )
      startIndex ++
      if(startIndex >= 7) {
        currentLine ++ 
        startIndex = 0 
      }
      if(dom) dom.style.fill = 'red'
      return dom!
    })

    svgRef.current?.append(...children)

  }, [])

  // 初始化
  const init = useCallback(() => {
    if(svgRef.current) svgRef.current.innerHTML = ''
    createEmpty()
    createDateText()
    createLegend()
    createDataChart()
  }, [])

  useEffect(() => {
    roughRef.current = Rough.svg(svgRef)
    init()
  }, [])

  return (
    <svg ref={svgRef} className="github-commit-svg" />
  )

}

// 健康码
const HealthyAnimation = () => {

  return (
    <div>

    </div>
  )

}

// 数字动画
const NumberAnimation = () => {

  return (
    <div>

    </div>
  )

}

// 物体抖动
const ShakeAnimation = () => {

  return (
    <div>

    </div>
  )

}

// 时钟
const ClockChart = () => {

  return (
    <div>

    </div>
  )

}

// 文字动画
const TextAnimation = (props: CommonAnimationProps & {
  value: string 
  onComplete: () => void 
}) => {

  const { value, onComplete, id } = props 

  const [ animationText, setAnimationText ] = useState('')

  const timerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    clearInterval(timerRef.current)
    let index = 1
    timerRef.current = setInterval(() => {
      index ++ 
      setAnimationText(value.slice(0, index))
      if(index >= value.length + 20) {
        clearInterval(timerRef.current)
        onComplete()
      }
    }, 66)

    return () => {
      clearInterval(timerRef.current)
    }
  }, [value, id])

  return (
    <div>
      {animationText}
    </div>
  )
}

// 聊天框
const MessageBubble = (props: Omit<CommonAnimationProps, 'onComplete'> & {

}) => {

  const { id, children } = props 

  const cardRef = useRef<any>()

  const _onResize = useCallback((targetId: string) => {
    if(targetId === id) {
    }
  }, [id])

  const onResize = debounce(_onResize)

  useEffect(() => {
    EVENT_EMITTER.addListener(EVENT_EMITTER_LISTENER.MESSAGE_SIZE_CHANGE, onResize)

    return () => {
      EVENT_EMITTER.removeListener(EVENT_EMITTER_LISTENER.MESSAGE_SIZE_CHANGE, onResize)
    }
  }, [onResize])

  return (
    <div
      className="home-page-message-box"
    >
      <WiredCard ref={cardRef}>
        {/* @ts-ignore */}
        {children}
      </WiredCard>
    </div>
  )

}

// 图片
const Image = () => {

  return (
    <WiredImage />
  )

}

// 路径动画
const PathAnimation = () => {

  return (
    <div>

    </div>
  )

}

// 加载动画
const Loading = ({ onLoad }: { onLoad: () => void }) => {

  const [ step, setStep ] = useState(0)

  const timerRef = useRef<NodeJS.Timeout>()

  const content = useMemo(() => {
    if(step <= 20) return '加载历史中。。。'
    if(step <= 50) return '计算历史中。。。'
    if(step < 100) return '打包历史中。。。'
    if(step >= 100) return '加载成功！！！'
  }, [step])

  useEffect(() => {
    if(step === 120) {
      clearInterval(timerRef.current)
      onLoad()
    }
  }, [step, onLoad])

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setStep(prev => prev + 1)
    }, 66)
    return () => {
      clearInterval(timerRef.current)
    }
  }, [])

  return (
    <div className="home-page-loading w-100 h-100 dis-flex">
      <WiredProgress
        max={100}
        min={0}
        value={step >= 100 ? 100 : step}
      />
      {content}
    </div>
  )

}

// 选择表单
const SelectBox = (props: Pick<CommonAnimationProps, 'children'> & {
  onResponse: (value: string) => void 
}) => {

  const {  } = props 

  const [ options, setOptions ] = useState<Options[]>([])

  const selectOptions: any = useMemo(() => {
    return options.map(item => {
      const { value, text } = item 
      return (
        <WiredItem
          value={value}
          key={value}
        >
          {(text || value) as any}
        </WiredItem>
      )
    })
  }, [options])

  const onPostMessage = useCallback((value: LifecycleDataSourceItem) => {

  }, [])

  useEffect(() => {
    EVENT_EMITTER.addListener(EVENT_EMITTER_LISTENER.POST_MESSAGE, onPostMessage)
    return () => {
      EVENT_EMITTER.removeListener(EVENT_EMITTER_LISTENER.POST_MESSAGE, onPostMessage)
    }
  }, [onPostMessage])

  return (
    <div>
      <WiredListbox
        selected=""
      >
        {selectOptions}
      </WiredListbox>
    </div>
  )

}

// ----components----

// ----constants----

// 历史数据的一个记录
const LIFE_CYCLE_DATA_SOURCE: LifecycleDataSourceItem[] = [
  {
    key: '9999',
    element: PieChart,
    direction: 'left',
    response: () => true 
  },
  {
    key: '1',
    element: '你好，年底的我',
    direction: 'left'
  },
  {
    key: '2',
    element: '我是年前的我',
    direction: 'left',
    response: (value) => {
      return value === '你好'
    },
    options: [
      {
        value: '你好',
        text: '你好'
      }
    ]
  },
  {
    key: '3',
    element: '一年的时间',
    direction: 'left'
  },
]

// 全局事件
const EVENT_EMITTER = new EventEmitter()
const EVENT_EMITTER_LISTENER = {
  // 对方发送了新消息
  POST_MESSAGE: 'POST_MESSAGE',
  // 自己发送了新消息
  POST_MY_MESSAGE: "POST_MY_MESSAGE",
  // 内容尺寸发生变化
  MESSAGE_SIZE_CHANGE: "MESSAGE_SIZE_CHANGE"
}

// github 提交记录的一些值
const GITHUB_INFO = {
  GITHUB_COMMIT_HISTORY_DATA: [],
  CURRENT_YEAR: 2022,
  RECT_SIZE: 8,
  RECT_MARGIN: 4,

}

// 色调列表
const COLOR_LIST = ['red', 'yellow', 'green', 'pink']

// 公交图标
const BUS_SVG = ""

// ----constants----

// ----utils----

const getCurrentDayCount = (year: number) => {
  return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 365 : 366
}

// ----utils----

const Home = () => {

  const [ loading, setLoading ] = useState(false)
  const [ lifecycleList, setLifecycleList ] = useState<typeof LIFE_CYCLE_DATA_SOURCE>([])

  const responseCallback = useRef<any>()

  // 动画完成
  const onComplete = useCallback(() => {
    if(responseCallback.current) return 
    const nextMessage = LIFE_CYCLE_DATA_SOURCE.shift()
    responseCallback.current = nextMessage?.response
    if(nextMessage) setLifecycleList(prev => [...prev, nextMessage])
  }, [])

  // 交互响应
  const onResponse = useCallback((value: string) => {
    let isCorrect = true 
    if(responseCallback.current) {
      isCorrect = responseCallback.current(value)
    }
    if(isCorrect) {
      responseCallback.current = null 
      onComplete()
    }
  }, [onComplete])

  const onLoad = useCallback(() => {
    setLoading(false)
    onComplete()
  }, [onComplete])

  const messageList = useMemo(() => {
    return lifecycleList.map(item => {
      const { key, element: Element } = item
      return (
        <MessageBubble id={key} key={key}>
          {
            typeof Element === 'string' ? (
              <TextAnimation 
                id={key}
                value={Element}
                onComplete={onComplete}
              />
            )
            :
            <Element
              id={key}
              onComplete={onComplete}
            />
          }
        </MessageBubble>
      ) 
    })
  }, [lifecycleList])

  useEffect(() => {
    onLoad()
  }, [])

  return (
    <div className="home-page">
      {
        loading && (
          <Loading 
            onLoad={onLoad}
          />
        )
      }
      <div className="home-page-message-list-wrapper zero-scrollbar">
        {messageList}
      </div>
      <div className="home-page-response-wrapper">
        <SelectBox onResponse={onResponse} />
      </div>
    </div>
  )

}

export default Home