import React, { CSSProperties, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import EventEmitter from 'eventemitter3'
import { debounce } from 'lodash'
import Anime from 'animejs'
import Vivus from 'vivus'
import { CountUp } from 'countup.js';
import QRCode from 'qrcode'
import { annotate, annotationGroup } from 'rough-notation'
import type { RoughAnnotationConfig } from 'rough-notation/lib/model';
// @ts-ignore
import { Shake } from 'reshake'
// @ts-ignore
import * as ChartXkcd from 'chart.xkcd'
import { WiredProgress } from "wired-elements-react/lib/WiredProgress"
import { WiredButton } from "wired-elements-react/lib/WiredButton"
import { WiredCard } from "wired-elements-react/lib/WiredCard"
import { WiredImage } from "wired-elements-react/lib/WiredImage"
// @ts-ignore
import Rough from 'roughjs/bundled/rough.esm'
import type { RoughSVG } from 'roughjs/bin/svg'
import './index.css'

// ----hooks---- 
const useChartInit = (init: () => void, onComplete: () => void, depts: any[]) => {

  const complete = useRef(false)

  useEffect(() => {
    setTimeout(() => {
      init()
    }, 0)
    if (!complete.current) {
      complete.current = true
      setTimeout(onComplete, 400)
    }
  }, depts)

}
// ----hooks----

// ----type----

type Options = {
  value: string
  text: string
  skip?: number
  map?: keyof ReturnType<typeof getLifecycle>
}

type RoughInstance = RoughSVG

type CommonAnimationProps = {
  id: string
  onComplete: () => void
  immediately?: boolean
  children?: ReactNode
  animate?: boolean
  value?: any
  delay?: number
  notation?: {
    element: string,
    config: RoughAnnotationConfig
  }[]
}

type LifecycleDataSourceItemElement = {
  value?: any,
  element: any
  id?: string
  immediately?: boolean
  notation?: {
    element: string,
    config: RoughAnnotationConfig
  }[]
  [key: string]: any
}

type LifecycleDataSourceItem = {
  key: string
  element: LifecycleDataSourceItemElement[] | LifecycleDataSourceItemElement
  direction: 'left' | 'right'
  response?: (value: string) => boolean
  options?: Options[]
  skip?: number
}

// ----type----

// ----components----

// Anime组件
const AnimeComponent = (props: CommonAnimationProps & {
  config: Anime.AnimeParams
}) => {

  const { config, children, id } = props 

  useEffect(() => {
    Anime({
      targets: `#${id}`,
      ...config
    })
  }, [])

  return (
    <div>

    </div>
  )

}

// 柱形图
const BarChart = (props: {
  title: string
  value: {
    x: string
    y: number
  }[]
} & Pick<CommonAnimationProps, 'onComplete'>) => {

  const { title, value, onComplete } = props

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

  useChartInit(() => {
    new ChartXkcd.Bar(chartRef.current, {
      title,
      data: realData,
      options: {
        backgroundColor: 'transparent',
        dataColors: COLOR_LIST
      }
    })
  }, onComplete, [title, realData])

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
} & Pick<CommonAnimationProps, 'onComplete'>) => {

  const { title, value, onComplete } = props

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

  useChartInit(() => {
    new ChartXkcd.Line(chartRef.current, {
      title,
      data: realData,
      options: {
        backgroundColor: 'transparent',
        dataColors: COLOR_LIST
      }
    })
  }, onComplete, [title, realData])

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
} & Pick<CommonAnimationProps, 'onComplete'>) => {

  const { title, value, onComplete } = props

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

  useChartInit(() => {
    new ChartXkcd.Radar(chartRef.current, {
      title,
      data: realData,
      options: {
        backgroundColor: 'transparent',
        dataColors: COLOR_LIST
      }
    })
  }, onComplete, [title, realData])

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
  }[],
} & Pick<CommonAnimationProps, 'onComplete'>) => {

  const { title, value, onComplete } = props

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

  useChartInit(() => {
    new ChartXkcd.Pie(chartRef.current, {
      title,
      data: realData,
      options: {
        backgroundColor: 'transparent',
        dataColors: COLOR_LIST
      }
    })
  }, onComplete, [title, realData])

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

  const { id, onComplete } = props

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
      startIndex++
      if (startIndex >= 7) {
        currentLine++
        startIndex = 0
      }
      if (dom) dom.style.fill = 'red'
      return dom!
    })

    svgRef.current?.append(...children)

  }, [])

  // 初始化
  const init = useCallback(() => {
    if (svgRef.current) svgRef.current.innerHTML = ''
    createEmpty()
    createDateText()
    createLegend()
    createDataChart()
  }, [])

  useEffect(() => {
    roughRef.current = Rough.svg(svgRef)
    init()

    setTimeout(onComplete, 1000)
  }, [])

  return (
    <svg ref={svgRef} className="github-commit-svg" />
  )

}

// 健康码
const HealthyAnimation = (props: CommonAnimationProps) => {

  const { onComplete, delay=0 } = props

  const [qrCode, setQrCode] = useState<string>()

  const onLoad = useCallback(() => {
    annotate(document.querySelector('#healthy-card')!, {
      type: 'circle'
    }).show()
    setTimeout(onComplete, 1200 + delay)
  }, [onComplete])

  const generateQrCode = async () => {
    return new Promise<string>((resolve, reject) => {
      QRCode.toDataURL('https://food-billboard.github.io/', {
        margin: 4,
        color: {
          light: NORMAL_COLOR,
          dark: '#4BA164',
        },
      }, (error, url) => {
        if (error) {
          reject(error);
        } else {
          resolve(url);
        }
      });
    })
      .then((url) => {
        setQrCode(url);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    generateQrCode()
  }, [])

  return (
    <div className="te-ce">
      <img
        id={"healthy-card"}
        src={qrCode}
        onLoad={onLoad}
        alt="我的健康码"
      />
    </div>
  )

}

// 数字动画
const NumberAnimation = (props: CommonAnimationProps & {
  prefix?: ReactNode
  suffix?: ReactNode
}) => {

  const { value, onComplete, delay=0, prefix='', suffix='' } = props

  const chartId = useRef<string>('number_animation_' + Date.now().toString() + (Math.random() * 100).toFixed(0))

  useEffect(() => {
    const instance = new CountUp(
      document.querySelector(`#${chartId.current}`) as any,
      value,
      {
        duration: 2,
      },
    );
    instance.start();
    setTimeout(onComplete, 2200 +  delay);
  }, [])

  return (
    <div>
      <span>{prefix}</span>
      <span id={chartId.current}></span>
      <span>{suffix}</span>
    </div>
  )

}

// 物体抖动
const ShakeAnimation = (props: CommonAnimationProps & {
  shakeProps?: any
}) => {

  const { value, onComplete, shakeProps = {}, id, notation = [], delay=0 } = props

  useEffect(() => {
    if (!notation.length) {
      setTimeout(onComplete, 1000 + delay)
    } else {
      annotationGroup(notation.map(item => {
        const { element, config } = item
        const dom = document.querySelector(element)
        if(!dom) return 
        return annotate(dom as HTMLElement, config)
      }).filter(Boolean) as any).show()
      setTimeout(onComplete, 800 * notation.length + 400 + delay)
    }
  }, [])

  return (
    <Shake
      h={56}
      v={39}
      r={20}
      dur={70}
      int={16.1}
      max={73}
      fixed={true}
      fixedStop={false}
      freez={false}
      {...shakeProps}
    >
      <div className="home-page-shake" id={id}>{value}</div>
    </Shake>
  )

}

// 头像
const Avatar = (props: {
  children?: ReactNode
  color: string
  style?: CSSProperties
}) => {

  const { color, children, style } = props

  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    svgRef.current?.appendChild(Rough.svg(svgRef).circle(25, 25, 50, {
      fill: color
    }))
  }, [color])

  return (
    <div className="home-page-avatar" style={style}>
      <svg ref={svgRef} />
      <span>{children}</span>
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

// 普通文字
const NormalText = (props: CommonAnimationProps & {
  value: string
  onComplete: () => void
}) => {
  const { value, onComplete, delay=0 } = props

  useEffect(() => {
    setTimeout(onComplete, 400 + delay)
  }, [])

  return (
    <div>
      {value}
    </div>
  )
}

// 文字动画
const TextAnimation = (props: CommonAnimationProps & {
  value: string | string[]
  notationIndex?: {
    index: number
    selector: string
  }[]
}) => {

  const { value, onComplete, id, immediately, notationIndex = [], notation = [], delay=0 } = props

  const [animationText, setAnimationText] = useState('')

  const timerRef = useRef<NodeJS.Timeout>()
  const complete = useRef(false)
  const actionComplete = useRef(1 + (notationIndex.length ? 1 : 0))

  const realValue = useMemo(() => {
    return Array.isArray(value) ? value.join('') : value
  }, [value])

  const realAnimationText = useMemo(() => {
    if (!notationIndex.length || animationText.length < realValue.length) return animationText
    complete.current = true
    return value.map((item: any, index: number) => {
      const target = notationIndex.find(item => item.index === index)
      if (!target) return item
      return (
        <span className={target.selector} key={index}>
          {item}
        </span>
      )
    })
  }, [animationText])

  const notationAnimation = () => {
    actionComplete.current -- 
    if (!actionComplete.current) {
      setTimeout(onComplete, delay)
    }
  }

  useEffect(() => {
    clearInterval(timerRef.current)
    let index = 1
    timerRef.current = setInterval(() => {
      index++
      setAnimationText(realValue.slice(0, index))
      if (index >= realValue.length + 20 || (immediately && index >= realValue.length + 5)) {
        clearInterval(timerRef.current)
        notationAnimation()
      }
    }, 66)

    return () => {
      clearInterval(timerRef.current)
    }
  }, [realValue, id])

  useEffect(() => {
    if (!complete.current) return
    annotationGroup(notation.map(item => {
      const { element, config } = item
      return annotate(document.querySelector(element)!, config)
    })).show()
    setTimeout(notationAnimation, 800 * notation.length + 400)
  }, [realAnimationText])

  return (
    <div>
      {realAnimationText}
    </div>
  )
}

// 聊天框
const MessageBubble = (props: Omit<CommonAnimationProps, 'onComplete'> & Pick<LifecycleDataSourceItem, 'direction'>) => {

  const { id, children, direction } = props

  const cardRef = useRef<any>()

  const _onResize = useCallback((targetId: string) => {
    if (targetId === id) {
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
      className={`home-page-message-box-${direction}`}
    >
      <div className="home-page-message-box dis-flex">
        {
          direction === 'left' && (
            <Avatar color="yellow" style={{ marginRight: 15 }}>
              前
            </Avatar>
          )
        }
        <div>
          <WiredCard ref={cardRef}>
            {/* @ts-ignore */}
            {children}
          </WiredCard>
        </div>
        {
          direction !== 'left' && (
            <Avatar color="green" style={{ marginLeft: 15 }}>
              后
            </Avatar>
          )
        }
      </div>
    </div>
  )

}

// 图片
const Image = (props: CommonAnimationProps) => {

  const { onComplete, delay=0 } = props 

  useEffect(() => {
    setTimeout(onComplete, 1000 + delay);
  }, [])

  return (
    <WiredImage />
  )

}

// svg动画
const SvgAnimation = (props: CommonAnimationProps & {
  svgId: string
}) => {

  const { svgId, onComplete, children, delay=0 } = props

  const vivusRef = useRef<Vivus>();

  useEffect(() => {

    vivusRef.current = new Vivus(
      svgId,
      {
        type: 'delayed',
        // duration: 500,
        // delay: 200
      },
      onComplete,
    );
    return () => {
      vivusRef.current?.destroy();
    };
  }, []);

  return (
    <div>
      {children}
    </div>
  );

}

// 哑铃
const Dumbbell = (props: CommonAnimationProps) => {

  return (
    <SvgAnimation
      {...props}
      svgId="dumbbell"
    >
      <svg id="dumbbell" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1" p-id="14487" width="150" height="150">
        <path strokeWidth={2} stroke={COLOR_LIST[0]} fill="none" d="M914.691674 425.709877v-28.76201c0-47.583643-38.705456-86.288076-86.290123-86.288076-10.168573 0-19.719071 2.077307-28.764056 5.308902v-34.072958c0-47.58262-38.704433-86.289099-86.288077-86.2891-47.58262 0-86.288076 38.70648-86.288076 86.2891v143.815166H396.939681v-143.815166c0-47.610249-36.543215-85.334357-83.900708-86.260447l-0.870831-0.028653h-0.310061v0.028653c-48.284606 0.617052-87.496598 39.26725-87.496599 86.260447v34.072958c-9.044985-3.230571-18.624136-5.308902-28.764056-5.308902-47.583643 0-86.288076 38.704433-86.288076 86.288076v28.76201c-47.583643 0-86.289099 38.707503-86.2891 86.290123S61.725707 598.290123 109.30935 598.290123v28.763033c0 47.58262 38.704433 86.290123 86.288076 86.290123 10.139921 0 19.720094-2.079354 28.764056-5.308902v34.070911c0 47.583643 39.238598 86.290123 87.496599 86.290123h1.179869c47.048455 0 83.900708-37.890906 83.900708-86.290123v-143.815165h230.120638v143.815165c0 47.583643 38.705456 86.290123 86.288076 86.290123 47.583643 0 86.288076-38.70648 86.288076-86.290123V708.034377c9.046009 3.229548 18.596506 5.308902 28.764056 5.308902 47.584666 0 86.290123-38.707503 86.290123-86.290123v-28.763033c47.58262 0 86.288076-38.70648 86.288076-86.2891s-38.70341-86.291146-86.286029-86.291146zM80.543247 512c0-15.871447 12.893632-28.76201 28.765079-28.76201v57.526066c-15.871447 0-28.76508-12.921262-28.765079-28.764056z m115.054179 143.816189c-15.869401 0-28.760987-12.893632-28.760987-28.763033V396.947867c0-15.842795 12.892609-28.763033 28.760987-28.763033 15.871447 0 28.764056 12.920238 28.764056 28.763033v230.105289c0 15.870424-12.892609 28.763033-28.764056 28.763033z m143.815165 86.289099c0 16.685998-11.095687 28.763033-26.373618 28.763034h-1.179869c-16.236767 0-29.972579-13.174018-29.972579-28.763034v-460.210576c0-15.139785 14.410169-28.594188 30.28264-28.763034 15.281001 0.168845 27.24445 12.780046 27.24445 28.763034v460.210576h-0.001024z m57.52709-201.341232v-57.526066h230.120638v57.526066H396.939681z m345.173794 201.341232c0 15.870424-12.923308 28.763033-28.76508 28.763034-15.89703 0-28.760987-12.893632-28.760986-28.763034v-460.210576c0-15.841772 12.863957-28.763033 28.760986-28.763034 15.841772 0 28.76508 12.921262 28.76508 28.763034v460.210576z m115.051109-115.052132c0 15.870424-12.920238 28.763033-28.763033 28.763033-15.89703 0-28.764056-12.893632-28.764056-28.763033V396.947867c0-15.842795 12.867026-28.763033 28.764056-28.763033 15.842795 0 28.763033 12.920238 28.763033 28.763033v230.105289z m57.52709-86.2891v-57.526066c15.841772 0 28.763033 12.891586 28.763033 28.76201 0 15.842795-12.921262 28.764056-28.763033 28.764056z" p-id="14488" />
      </svg>
    </SvgAnimation>
  )

}

// 杠铃
const Barbell = (props: CommonAnimationProps) => {
  return (
    <SvgAnimation
      {...props}
      svgId="barbell"
    >
      <svg id="barbell" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1" p-id="15108" width="150" height="150">
        <path strokeWidth={2} stroke={COLOR_LIST[2]} fill="none" d="M199.68 256a76.8 76.8 0 0 1 76.8 76.8v358.4a76.8 76.8 0 1 1-153.6 0v-358.4a76.8 76.8 0 0 1 76.8-76.8z m0 51.2a25.6 25.6 0 0 0-25.5488 23.92064L174.08 332.8v358.4a25.6 25.6 0 0 0 51.1488 1.67936L225.28 691.2v-358.4a25.6 25.6 0 0 0-25.6-25.6zM61.44 358.4a61.44 61.44 0 0 1 61.44 61.44v184.32a61.44 61.44 0 0 1-122.88 0V419.84a61.44 61.44 0 0 1 61.44-61.44z m0 51.2a10.24 10.24 0 0 0-10.16832 9.04192L51.2 419.84v184.32a10.24 10.24 0 0 0 20.40832 1.19808L71.68 604.16V419.84a10.24 10.24 0 0 0-10.24-10.24zM824.32 256a76.8 76.8 0 0 1 76.8 76.8v358.4a76.8 76.8 0 1 1-153.6 0v-358.4a76.8 76.8 0 0 1 76.8-76.8z m0 51.2a25.6 25.6 0 0 0-25.5488 23.92064L798.72 332.8v358.4a25.6 25.6 0 0 0 51.1488 1.67936L849.92 691.2v-358.4a25.6 25.6 0 0 0-25.6-25.6zM962.56 358.4a61.44 61.44 0 0 1 61.44 61.44v184.32a61.44 61.44 0 0 1-122.88 0V419.84a61.44 61.44 0 0 1 61.44-61.44z m0 51.2a10.24 10.24 0 0 0-10.16832 9.04192L952.32 419.84v184.32a10.24 10.24 0 0 0 20.40832 1.19808L972.8 604.16V419.84a10.24 10.24 0 0 0-10.24-10.24z" p-id="15109" />
        <path strokeWidth={2} stroke={COLOR_LIST[2]} fill="none" d="M768 479.42656v51.2H256v-51.2z" p-id="15110" />
      </svg>
    </SvgAnimation>
  )
}

// 路径动画
const PathAnimation = (props: CommonAnimationProps & {
  svgRef: any
  shapeRef: any
}) => {

  const { svgRef, shapeRef, children, onComplete, delay=0 } = props

  const chartInstance = useRef<Anime.AnimeInstance>()

  useEffect(() => {
    chartInstance.current && Anime.remove(chartInstance.current);
    const pathData = Anime.path(`#${svgRef.current} path`);
    chartInstance.current = Anime({
      targets: `#${shapeRef.current}`,
      translateX: [pathData('x')],
      translateY: [pathData('y')],
      loop: false,
      direction: 'to',
      rotate: pathData('angle'),
      duration: 20000,
    });
    setTimeout(onComplete, 3000 + delay)
  }, [])

  return (
    <div className="home-page-path-animation">
      {children}
    </div>
  )

}

// 公交路线
const BusPathAnimation = (props: CommonAnimationProps) => {

  const svgRef = useRef('bus-path-animation')
  const shapeRef = useRef('bus-shape-animation')

  return (
    <PathAnimation
      svgRef={svgRef}
      shapeRef={shapeRef}
      {...props}
    >
      <svg
        id={svgRef.current}
      >
        <g>
          <path d="M10 10 L120 50 H140 V100" fill="none" stroke="red" strokeWidth="2" />
        </g>
      </svg>
      {/* @ts-ignore */}
      {/* <svg ref={shapeRef} t="1671115381884" viewBox="0 0 1024 1024" version="1.1" p-id="2786" width="200" height="200">  
        <path d="M325.818182 488.727273v-139.636364c0-13.963636-9.309091-23.272727-23.272727-23.272727s-23.272727 9.309091-23.272728 23.272727v116.363636H139.636364v-186.181818h302.545454v186.181818h-46.545454c-13.963636 0-23.272727 9.309091-23.272728 23.272728s9.309091 23.272727 23.272728 23.272727h69.818181c13.963636 0 23.272727-9.309091 23.272728-23.272727V256c0-13.963636-9.309091-23.272727-23.272728-23.272727H116.363636c-13.963636 0-23.272727 9.309091-23.272727 23.272727v232.727273c0 13.963636 9.309091 23.272727 23.272727 23.272727h186.181819c13.963636 0 23.272727-9.309091 23.272727-23.272727z" p-id="2787"/>
        <path d="M256 768m-23.272727 0a23.272727 23.272727 0 1 0 46.545454 0 23.272727 23.272727 0 1 0-46.545454 0Z" p-id="2788"/>  
        <path d="M814.545455 768m-23.272728 0a23.272727 23.272727 0 1 0 46.545455 0 23.272727 23.272727 0 1 0-46.545455 0Z" p-id="2789"/>
        <path d="M975.127273 456.145455l-76.8-25.6c-6.981818-2.327273-13.963636-11.636364-13.963637-20.945455V209.454545c0-39.563636-30.254545-69.818182-69.818181-69.818181H69.818182C30.254545 139.636364 0 169.890909 0 209.454545v512c0 39.563636 30.254545 69.818182 69.818182 69.818182 13.963636 0 23.272727-9.309091 23.272727-23.272727s-9.309091-23.272727-23.272727-23.272727-23.272727-9.309091-23.272727-23.272728V209.454545c0-13.963636 9.309091-23.272727 23.272727-23.272727h744.727273c13.963636 0 23.272727 9.309091 23.272727 23.272727v200.145455c0 30.254545 18.618182 55.854545 48.872727 65.163636l76.8 25.6c9.309091 2.327273 16.290909 11.636364 16.290909 20.945455V581.818182h-23.272727c-13.963636 0-23.272727 9.309091-23.272727 23.272727s9.309091 23.272727 23.272727 23.272727h23.272727v93.090909c0 13.963636-9.309091 23.272727-23.272727 23.272728H930.909091c-11.636364-53.527273-58.181818-93.090909-114.036364-93.090909-9.309091 0-16.290909 0-23.272727 2.327272V256c0-13.963636-9.309091-23.272727-23.272727-23.272727h-209.454546c-13.963636 0-23.272727 9.309091-23.272727 23.272727v488.727273H372.363636c-11.636364-53.527273-58.181818-93.090909-114.036363-93.090909-65.163636 0-116.363636 51.2-116.363637 116.363636s51.2 116.363636 116.363637 116.363636c55.854545 0 102.4-39.563636 114.036363-93.090909h186.181819c13.963636 0 23.272727-9.309091 23.272727-23.272727v-93.090909h162.909091c-23.272727 16.290909-39.563636 41.890909-44.218182 69.818182H651.636364c-13.963636 0-23.272727 9.309091-23.272728 23.272727s9.309091 23.272727 23.272728 23.272727h48.872727c11.636364 53.527273 58.181818 93.090909 114.036364 93.090909s102.4-39.563636 114.036363-93.090909H954.181818c39.563636 0 69.818182-30.254545 69.818182-69.818182v-200.145454c0-30.254545-18.618182-55.854545-48.872727-65.163636zM256 837.818182c-39.563636 0-69.818182-30.254545-69.818182-69.818182s30.254545-69.818182 69.818182-69.818182 69.818182 30.254545 69.818182 69.818182-30.254545 69.818182-69.818182 69.818182z m325.818182-279.272727h46.545454c13.963636 0 23.272727 9.309091 23.272728 23.272727s9.309091 23.272727 23.272727 23.272727 23.272727-9.309091 23.272727-23.272727c0-39.563636-30.254545-69.818182-69.818182-69.818182h-46.545454V279.272727h162.909091v116.363637c-6.981818 0-11.636364 2.327273-16.290909 6.981818l-46.545455 46.545454c-9.309091 9.309091-9.309091 23.272727 0 32.581819 4.654545 4.654545 11.636364 6.981818 16.290909 6.981818s11.636364-2.327273 16.290909-6.981818l30.254546-30.254546V628.363636h-162.909091v-69.818181z m232.727273 279.272727c-39.563636 0-69.818182-30.254545-69.818182-69.818182s30.254545-69.818182 69.818182-69.818182 69.818182 30.254545 69.818181 69.818182-30.254545 69.818182-69.818181 69.818182z" p-id="2790"/>
      </svg> */}
      <div id={shapeRef.current} style={{ display: 'inline-block', position: 'absolute', top: 0, left: 0 }}>
        2222
      </div>
    </PathAnimation>
  )

}

// 地铁路线
const SubwayPathAnimation = (props: CommonAnimationProps) => {

  const svgRef = useRef('subway-path-animation')
  const shapeRef = useRef('subway-shape-animation')

  return (
    <PathAnimation
      svgRef={svgRef}
      shapeRef={shapeRef}
      {...props}
    >
      <svg
        id={svgRef.current}
      >
        <g>
          <path d="M10 10 L120 50 H140 V100" fill="none" stroke="red" strokeWidth="2" />
        </g>
      </svg>
      {/* @ts-ignore */}
      {/* <svg ref={shapeRef} t="1671115381884" viewBox="0 0 1024 1024" version="1.1" p-id="2786" width="200" height="200">  
        <path d="M325.818182 488.727273v-139.636364c0-13.963636-9.309091-23.272727-23.272727-23.272727s-23.272727 9.309091-23.272728 23.272727v116.363636H139.636364v-186.181818h302.545454v186.181818h-46.545454c-13.963636 0-23.272727 9.309091-23.272728 23.272728s9.309091 23.272727 23.272728 23.272727h69.818181c13.963636 0 23.272727-9.309091 23.272728-23.272727V256c0-13.963636-9.309091-23.272727-23.272728-23.272727H116.363636c-13.963636 0-23.272727 9.309091-23.272727 23.272727v232.727273c0 13.963636 9.309091 23.272727 23.272727 23.272727h186.181819c13.963636 0 23.272727-9.309091 23.272727-23.272727z" p-id="2787"/>
        <path d="M256 768m-23.272727 0a23.272727 23.272727 0 1 0 46.545454 0 23.272727 23.272727 0 1 0-46.545454 0Z" p-id="2788"/>  
        <path d="M814.545455 768m-23.272728 0a23.272727 23.272727 0 1 0 46.545455 0 23.272727 23.272727 0 1 0-46.545455 0Z" p-id="2789"/>
        <path d="M975.127273 456.145455l-76.8-25.6c-6.981818-2.327273-13.963636-11.636364-13.963637-20.945455V209.454545c0-39.563636-30.254545-69.818182-69.818181-69.818181H69.818182C30.254545 139.636364 0 169.890909 0 209.454545v512c0 39.563636 30.254545 69.818182 69.818182 69.818182 13.963636 0 23.272727-9.309091 23.272727-23.272727s-9.309091-23.272727-23.272727-23.272727-23.272727-9.309091-23.272727-23.272728V209.454545c0-13.963636 9.309091-23.272727 23.272727-23.272727h744.727273c13.963636 0 23.272727 9.309091 23.272727 23.272727v200.145455c0 30.254545 18.618182 55.854545 48.872727 65.163636l76.8 25.6c9.309091 2.327273 16.290909 11.636364 16.290909 20.945455V581.818182h-23.272727c-13.963636 0-23.272727 9.309091-23.272727 23.272727s9.309091 23.272727 23.272727 23.272727h23.272727v93.090909c0 13.963636-9.309091 23.272727-23.272727 23.272728H930.909091c-11.636364-53.527273-58.181818-93.090909-114.036364-93.090909-9.309091 0-16.290909 0-23.272727 2.327272V256c0-13.963636-9.309091-23.272727-23.272727-23.272727h-209.454546c-13.963636 0-23.272727 9.309091-23.272727 23.272727v488.727273H372.363636c-11.636364-53.527273-58.181818-93.090909-114.036363-93.090909-65.163636 0-116.363636 51.2-116.363637 116.363636s51.2 116.363636 116.363637 116.363636c55.854545 0 102.4-39.563636 114.036363-93.090909h186.181819c13.963636 0 23.272727-9.309091 23.272727-23.272727v-93.090909h162.909091c-23.272727 16.290909-39.563636 41.890909-44.218182 69.818182H651.636364c-13.963636 0-23.272727 9.309091-23.272728 23.272727s9.309091 23.272727 23.272728 23.272727h48.872727c11.636364 53.527273 58.181818 93.090909 114.036364 93.090909s102.4-39.563636 114.036363-93.090909H954.181818c39.563636 0 69.818182-30.254545 69.818182-69.818182v-200.145454c0-30.254545-18.618182-55.854545-48.872727-65.163636zM256 837.818182c-39.563636 0-69.818182-30.254545-69.818182-69.818182s30.254545-69.818182 69.818182-69.818182 69.818182 30.254545 69.818182 69.818182-30.254545 69.818182-69.818182 69.818182z m325.818182-279.272727h46.545454c13.963636 0 23.272727 9.309091 23.272728 23.272727s9.309091 23.272727 23.272727 23.272727 23.272727-9.309091 23.272727-23.272727c0-39.563636-30.254545-69.818182-69.818182-69.818182h-46.545454V279.272727h162.909091v116.363637c-6.981818 0-11.636364 2.327273-16.290909 6.981818l-46.545455 46.545454c-9.309091 9.309091-9.309091 23.272727 0 32.581819 4.654545 4.654545 11.636364 6.981818 16.290909 6.981818s11.636364-2.327273 16.290909-6.981818l30.254546-30.254546V628.363636h-162.909091v-69.818181z m232.727273 279.272727c-39.563636 0-69.818182-30.254545-69.818182-69.818182s30.254545-69.818182 69.818182-69.818182 69.818182 30.254545 69.818181 69.818182-30.254545 69.818182-69.818181 69.818182z" p-id="2790"/>
      </svg> */}
      <div id={shapeRef.current} style={{ display: 'inline-block', position: 'absolute', top: 0, left: 0 }}>
        2222
      </div>
    </PathAnimation>
  )

}

// 复合消息
const MultiMessageWrapper = (props: CommonAnimationProps & {
  value: LifecycleDataSourceItemElement[]
}) => {

  const { value, onComplete: propsOnComplete } = props
  const [stateValue, setStateValue] = useState<LifecycleDataSourceItemElement[]>([{
    ...value.slice(0, 1)[0],
    immediately: value.length !== 1
  }])

  const currentIndex = useRef(0)

  const onComplete = useCallback(() => {
    currentIndex.current++
    if (currentIndex.current === value.length) {
      propsOnComplete()
    } else {
      setStateValue(prev => {
        return [
          ...prev,
          {
            ...value[currentIndex.current],
            immediately: value.length - 1 !== currentIndex.current
          }
        ]
      })
    }
  }, [propsOnComplete, value])

  return (
    <div className="dis-flex home-page-message-box-multi">
      {
        stateValue.map(element => {
          const { element: Element, value, id, immediately, ...nextProps } = element
          return (
            <div key={id}>
              <Element
                {...nextProps}
                value={value}
                id={id}
                onComplete={onComplete}
                immediately={immediately}
              />
            </div>
          )
        })
      }
    </div>
  )

}

// 加载动画
const Loading = ({ onLoad }: { onLoad: () => void }) => {

  const [step, setStep] = useState(0)

  const timerRef = useRef<NodeJS.Timeout>()

  const content = useMemo(() => {
    if (step <= 20) return '加载历史中。。。'
    if (step <= 50) return '计算历史中。。。'
    if (step < 100) return '打包历史中。。。'
    if (step >= 100) return '加载成功！！！'
  }, [step])

  useEffect(() => {
    if (step === 120) {
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
  onResponse: (value: string, origin: Options) => void
}) => {

  const { onResponse } = props

  const [options, setOptions] = useState<Options[]>([])

  const selectOptions: any = useMemo(() => {
    return options.map(item => {
      const { value, text } = item
      return (
        <WiredButton
          elevation={3}
          key={value}
          onclick={() => onResponse(value, item)}
        >
          {(text || value) as any}
        </WiredButton>
      )
    })
  }, [options, onResponse])

  const onPostMessage = useCallback((value: LifecycleDataSourceItem) => {
    const options = value.options || []
    setOptions(options)
  }, [])

  useEffect(() => {
    EVENT_EMITTER.addListener(EVENT_EMITTER_LISTENER.POST_MESSAGE, onPostMessage)
    return () => {
      EVENT_EMITTER.removeListener(EVENT_EMITTER_LISTENER.POST_MESSAGE, onPostMessage)
    }
  }, [onPostMessage])

  return (
    <div
      className="w-100 home-page-select-button-wrapper dis-flex"
    >
      {selectOptions}
    </div>
  )

}

// ----components----

// ----constants----

function getLifecycle() {
  // 历史数据的一个记录
  const LIFE_CYCLE_DATA_SOURCE: LifecycleDataSourceItem[] = [

    {
      key: '1',
      element: {
        value: '你好，2023的我',
        element: TextAnimation
      },
      direction: 'left'
    },
    {
      key: '2',
      element: {
        value: '我是2022的我',
        element: TextAnimation
      },
      direction: 'left'
    },
    {
      key: '2-1',
      element: {
        value: '图片地址',
        element: Image
      },
      direction: 'left',
      options: [
        {
          value: '你好',
          text: '你好'
        }
      ]
    },
    {
      key: '3',
      element: {
        value: '不知不觉，过了一年',
        element: TextAnimation
      },
      direction: 'left'
    },
    {
      key: '4',
      element: {
        value: '这一年发生了很多的事情',
        element: TextAnimation
      },
      direction: 'left'
    },
    {
      key: '5',
      element: {
        value: '让我来跟你说一说吧',
        element: TextAnimation
      },
      direction: 'left',
      options: [
        {
          text: '好',
          value: '好',
          skip: 2
        },
        {
          text: '不好',
          value: '不好'
        }
      ]
    },
    {
      key: '6',
      element: {
        value: '没用，我还是要跟你说',
        element: TextAnimation
      },
      direction: 'left',
    },
    {
      key: '6-1',
      element: {
        value: '图片地址',
        element: Image
      },
      direction: 'left',
    },
  ]

  // 健身
  const FIT_MODE_DATA_SOURCE: LifecycleDataSourceItem[] = [
    {
      key: '8',
      element: {
        value: '先来说一说这一年我的健身成果吧',
        element: TextAnimation
      },
      direction: 'left',
    },
    {
      key: '8-1',
      element: [
        {
          element: TextAnimation,
          value: '今年总计锻炼次数为：',
          id: '1'
        },
        {
          element: NumberAnimation,
          value: 200,
          id: '2'
        }
      ],
      direction: 'left'
    },
    {
      key: '9',
      element: [
        {
          value: '再看看看看这一年的健身记录',
          element: TextAnimation,
          id: '1'
        },
        {
          value: [{ x: '1', y: 20 }, { x: '2', y: 20 }],
          element: BarChart,
          id: '2'
        }
      ],
      direction: 'left',
    },
    {
      key: '10',
      element: [
        {
          value: '多了很多的健身器材',
          element: TextAnimation,
          id: '1'
        },
        {
          value: '哑铃',
          element: TextAnimation,
          id: '2'
        },
        {
          value: '',
          element: Dumbbell,
          id: '3'
        },
        {
          value: '杠铃',
          element: TextAnimation,
          id: '4'
        },
        {
          value: '',
          element: Barbell,
          id: '5'
        }
      ],
      direction: 'left',
    },
    {
      key: '11',
      element: [
        {
          value: '依旧按照规定的健身计划',
          element: TextAnimation,
          id: '1'
        },
        {
          value: {
            series: ['1', '2'],
            label: ['1', '2', '3', '4'],
            value: {
              1: [20, 30, 50, 10],
              2: [40, 20, 5, 25]
            },
          },
          element: RadarChart,
          id: '2'
        },
        {
          value: [
            '两天',
            '一练'
          ],
          id: '3',
          element: TextAnimation,
          notationIndex: [
            {
              selector: 'fit_date_loop',
              index: 0
            }
          ],
          notation: [
            {
              config: {
                type: 'highlight'
              },
              element: '.fit_date_loop'
            }
          ]
        },
      ],
      direction: 'left',
    },
    {
      key: '12',
      element: [
        {
          id: '1',
          value: '体重基本没有发生变化',
          element: TextAnimation
        },
        {
          id: '2',
          value: {
            series: ['1', '2'],
            label: ['1', '2'],
            value: {
              1: [20, 30],
              2: [40, 20]
            }
          },
          element: LineChart
        }
      ],
      direction: 'left'
    },
    {
      key: 'fit_prompt',
      direction: 'left',
      element: {
        value: ['还有一个事情，我要提醒你！！！'],
        element: TextAnimation,
        notationIndex: [
          {
            index: 0,
            selector: 'fit_prompt'
          }
        ],
        notation: [
          {
            element: '.fit_prompt',
            config: {
              type: 'circle'
            }
          }
        ]
      },
      options: [
        {
          text: '什么事情呢',
          value: '什么事情呢'
        },
        {
          text: '不想听',
          value: '不想听',
          skip: 1
        }
      ]
    },
    {
      key: '12-2',
      direction: 'left',
      element: [
        {
          id: '1',
          value: [
            '热身',
            '热身',
            '热身',
          ],
          element: TextAnimation,
          notationIndex: new Array(3).fill(0).map((_, index) => {
            return {
              index,
              selector: `fit_prompt_message_${index}`
            }
          }),
          notation: new Array(3).fill(0).map((_, index) => {
            return {
              config: {
                type: 'circle'
              },
              element: `.fit_prompt_message_${index}`
            }
          })
        },
        {
          id: '2',
          value: '重要的事情说三遍',
          element: TextAnimation
        },
        {
          id: '3',
          value: '不热身就锻炼，你就是傻子',
          element: TextAnimation
        },
      ]
    },
    {
      key: '12-3',
      direction: 'left',
      element: [
        {
          element: TextAnimation,
          value: '那你就当我放了个屁吧',
          id: '1'
        },
        {
          element: AnimeComponent,
          value: '💨💨',
          id: 'fit_boom',
          config: {
            loop: false,
            duration: 3000,
            delay: 500,
            keyframes: [
              {
                translateX: 100
              }
            ]
          }
        }
      ]
    }
  ]

  // 游戏
  const GAME_MODE_DATA_SOURCE: LifecycleDataSourceItem[] = [
    {
      key: '13',
      element: {
        value: '说说游戏吧',
        element: TextAnimation
      },
      direction: 'left'
    },
    {
      key: '14',
      element: [
        {
          value: '今年的王者荣耀',
          element: TextAnimation,
          id: '1'
        },
        {
          value: '皮肤出得依旧很快',
          element: TextAnimation,
          id: '2'
        }
      ],
      direction: 'left'
    },
    {
      key: '15',
      element: {
        value: [
          '但是不影响我当',
          '豹子头'
        ],
        element: TextAnimation,
        notationIndex: [
          {
            index: 1,
            selector: 'game_money_zero'
          }
        ],
        notation: [
          {
            element: '.game_money_zero',
            config: {
              type: 'circle'
            }
          }
        ]
      },
      direction: 'left'
    },
    {
      key: '16',
      element: {
        value: '每个赛季都上了王者',
        element: TextAnimation,
      },
      direction: 'left',
    },
    {
      key: '17',
      element: [
        {
          value: '每个工作日的中午就是我的游戏时间',
          element: TextAnimation,
          id: '1'
        },
        {
          value: '一个小时刚好三局',
          element: TextAnimation,
          id: '2'
        },
        {
          value: '😈',
          element: ShakeAnimation,
          id: '3'
        },
      ],
      direction: 'left',
    },
    {
      key: '18',
      element: [
        {
          value: [
            '有时候时间到了还没打完，也受到了领导的特别',
            '问候'
          ],
          element: TextAnimation,
          id: '1',
          notationIndex: [
            {
              selector: 'game_message',
              index: 1
            }
          ],
          notation: [
            {
              element: '.game_message',
              config: {
                type: 'highlight'
              }
            }
          ]
        },
        {
          value: '但是不影响我上分😕',
          element: TextAnimation,
          id: '2'
        }
      ],
      direction: 'left',
    },
    {
      key: '19',
      element: [
        {
          value: [
            '今年还新买了',
            'switch',
            '游戏机'
          ],
          element: TextAnimation,
          id: '1',
          notationIndex: [
            {
              selector: 'game_switch',
              index: 1
            }
          ],
          notation: [
            {
              element: '.game_switch',
              config: {
                type: 'underline'
              }
            }
          ]
        },
        {
          value: '🎮',
          element: ShakeAnimation,
          id: '2'
        }
      ],
      direction: 'left',
    },
    {
      key: '20',
      element: [
        {
          value: [
            '入手了',
            '健身环'
          ],
          element: TextAnimation,
          id: '1',
          notationIndex: [
            {
              selector: 'game_switch_circle',
              index: 1
            }
          ],
          notation: [
            {
              element: '.game_switch_circle',
              config: {
                type: 'highlight'
              }
            }
          ]
        },
        {
          value: '冬天冷，就靠这个当作运动项目',
          element: TextAnimation,
          id: '2'
        }
      ],
      direction: 'left',
    },
  ]

  // 交通
  const TRAFFIC_MODE_DATA_SOURCE: LifecycleDataSourceItem[] = [
    {
      key: '21',
      element: {
        id: '1',
        value: '疫情的影响，让日常工作通勤也出现了压力',
        element: TextAnimation
      },
      direction: 'left'
    },
    {
      key: '22',
      element: {
        value: '',
        element: BusPathAnimation
      },
      direction: 'left'
    },
    {
      key: '23',
      element: {
        value: '但随着地铁的通车，也稍微缓解了高峰期的压力',
        element: TextAnimation
      },
      direction: 'left'
    },
    {
      key: '24',
      element: {
        value: '',
        element: SubwayPathAnimation
      },
      direction: 'left'
    },
    {
      key: '25',
      element: {
        value: '好在我也幸运的守护住了绿码',
        element: TextAnimation,
      },
      direction: 'left'
    },
    {
      key: 'healthy_shake_id',
      element: {
        value: '🐴 🐎 🐴 🐎',
        element: ShakeAnimation,
        shakeProps: {
          h: 5,
          v: 5,
          dur: 300,
          int: 10,
          max: 100
        },
        notation: [
          {
            element: '#healthy_shake_id',
            config: {
              type: 'underline'
            }
          }
        ]
      },
      direction: 'left'
    },
    {
      key: '27',
      element: {
        value: '',
        element: HealthyAnimation,
        id: 'healthy_qr_code_id',
        delay: 200,
        notation: [
          {
            element: '#healthy_qr_code_id',
            config: {
              type: 'circle'
            }
          }
        ]
      },
      direction: 'left'
    },
  ]

  // 工作
  const WORK_MODE_DATA_SOURCE: LifecycleDataSourceItem[] = [
    {
      key: '28',
      element: {
        value: '今年也是平平静静的在公司工作',
        element: TextAnimation,
      },
      direction: 'left'
    },
    {
      key: '29',
      element: [
        {
          prefix: '但是也因为交通迟到了',
          suffix: '次',
          value: 10,
          element: TextAnimation,
          id: '1'
        },
        {
          value: [{ x: '1', y: 20 }, { x: '2', y: 20 }],
          element: BarChart,
          id: '3'
        }
      ],
      direction: 'left'
    },
    {
      key: '30',
      element: [
        {
          value: [
            '虽然每个月有',
            '三次',
            '机会'
          ],
          element: TextAnimation,
          notationIndex: [
            {
              selector: 'work_three',
              index: 1
            }
          ],
          notation: [
            {
              element: '.work_three',
              config: {
                type: 'highlight'
              }
            }
          ],
          id: '1'
        },
        {
          value: '不过当然是不够用的，喜提扣钱',
          element: TextAnimation,
          id: '2'
        },
        {
          value: [{ x: '1', y: 20 }, { x: '2', y: 20 }],
          element: BarChart,
          id: '3'
        }
      ],
      direction: 'left'
    },
    {
      key: '31',
      element: [
        {
          id: '1',
          value: '被迫完成了两次技术分享',
          element: TextAnimation
        }
      ],
      direction: 'left'
    },
    {
      key: '32',
      direction: 'left',
      element: [
        {
          id: '1',
          value: '我的工资呢？',
          element: TextAnimation
        },
        {
          id: '2',
          value: '🤷‍♂️',
          element: ShakeAnimation
        },
        {
          id: '3',
          value: {
            series: ['1', '2'],
            label: ['1', '2'],
            value: {
              1: [20, 30],
              2: [40, 20]
            }
          },
          element: LineChart
        },
      ]
    }
  ]

  // 代码人生
  const CODE_MODE_DATA_SOURCE: LifecycleDataSourceItem[] = [
    {
      key: '33',
      element: [
        {
          id: '1',
          element: TextAnimation,
          value: '今年一如既往的活跃在github社区中'
        },
        {
          id: '2',
          element: GithubCommitHistoryChart,
          value: ''
        }
      ],
      direction: 'left'
    },
    {
      key: '34',
      element: {
        element: TextAnimation,
        value: '虽然一般都是自己做些玩玩的东西'
      },
      direction: 'left'
    },
    {
      key: '35',
      element: {
        element: TextAnimation,
        value: '不知道你想不想看我写的成果呢'
      },
      direction: 'left',
      options: [
        {
          text: '好',
          value: '好',
          skip: 1
        },
        {
          text: '不好',
          value: '不好',
        }
      ]
    },
    {
      key: '35-1',
      element: {
        element: TextAnimation,
        value: '好吧，那我讲点别的',
      },
      direction: 'left',
      skip: 2
    },
    {
      key: '36',
      element: [
        {
          element: TextAnimation,
          value: [
            '今年我主要精力都在',
            '可视化大屏项目',
            '上'
          ],
          notationIndex: [
            {
              selector: 'code_screen',
              index: 1,
            }
          ],
          notation: [
            {
              element: '.code_screen',
              config: {
                type: 'highlight'
              }
            }
          ],
          id: '1'
        },
        {
          id: '2',
          element: TextAnimation,
          value: '他是一个组件丰富，交互方便的可视化大屏设计器，并且他包含了从设计到生产的所有环节的功能。'
        },
        {
          id: '3',
          element: TextAnimation,
          value: '当然我还是一直在持续迭代的'
        },
        {
          id: '4',
          element: ShakeAnimation,
          value: '👏🏻'
        }
      ],
      options: [
        {
          text: '看起来不错的样子',
          value: '看起来不错的样子'
        }
      ],
      direction: 'left',
    },
    {
      key: '37',
      element: [
        {
          id: '1',
          value: [
            '是的，还有关于他的',
            '后台服务',
            '他也是一个老项目了，不知道你还记得吗？'
          ],
          element: TextAnimation,
          notationIndex: [
            {
              selector: 'code_server',
              index: 1
            }
          ],
          notation: [
            {
              element: '.code_server',
              config: {
                type: 'circle'
              }
            }
          ]
        },
        {
          id: '2',
          value: '他已经支撑了好几个项目的后台服务了，超级多的接口。',
          element: TextAnimation
        }
      ],
      direction: 'left'
    },
    {
      key: '38',
      direction: 'left',
      element: {
        element: TextAnimation,
        value: '我还参加了掘金的游戏比赛'
      },
      options: [
        {
          text: '是吗',
          value: '是吗',
        },
        {
          text: '没啥了不起',
          value: '没啥了不起',
          skip: 1
        }
      ]
    },
    {
      key: '39',
      direction: 'left',
      skip: 1,
      element: [
        {
          element: TextAnimation,
          value: [
            '对啊',
            '不知道你还记不记得小时候玩的红白机游戏',
            '炸弹人'
          ],
          id: '1',
          notationIndex: [
            {
              selector: 'code_game_name',
              index: 2
            }
          ],
          notation: [
            {
              element: '.code_game_name',
              config: {
                type: 'circle'
              }
            }
          ]
        },
        {
          element: TextAnimation,
          value: '我把他用javascript给重新实现了。',
          id: '2'
        },
        {
          element: TextAnimation,
          value: [
            '并且拿了',
            '优秀奖'
          ],
          id: '3',
          notationIndex: [
            {
              selector: 'code_game_award',
              index: 1
            }
          ],
          notation: [
            {
              element: '.code_game_award',
              config: {
                type: 'highlight'
              }
            }
          ]
        },
      ],
    },
    {
      key: '38-1',
      direction: 'left',
      element: {
        element: TextAnimation,
        value: '好吧，那我不说了🙂'
      }
    },
    {
      key: '40',
      direction: 'left',
      element: [
        {
          id: '1',
          value: '还有哦，我第一次给开源项目贡献了代码',
          element: TextAnimation
        },
        {
          id: '2',
          value: '😊',
          element: ShakeAnimation
        }
      ],
      options: [
        {
          text: '怎么回事呢',
          value: '怎么回事呢'
        }
      ]
    },
    {
      key: '41',
      direction: 'left',
      element: [
        {
          id: '1',
          value: [
            '我发现了',
            'antd',
            '的input组件的一个bug'
          ],
          element: TextAnimation,
          notationIndex: [
            {
              selector: 'code_antd',
              index: 1,
            }
          ],
          notation: [
            {
              element: '.code_antd',
              config: {
                type: 'underline'
              }
            }
          ]
        },
        {
          id: '2',
          value: '成功提交了代码！',
          element: TextAnimation
        },
        {
          id: '3',
          value: '看到下面的图了吗，上面有我的头像',
          element: TextAnimation
        },
        {
          id: '4',
          value: '',
          element: Image
        }
      ]
    }
  ]

  // 新年祈愿
  const NEW_YEAR_MODE_DATA_SOURCE: LifecycleDataSourceItem[] = [
    {
      key: '42',
      element: [
        {
          value: '希望明年我的体重',
          element: TextAnimation,
          id: '1'
        },
        {
          element: NumberAnimation,
          id: '2',
          value: 10,
          prefix: '还能减少',
          suffix: '斤'
        },
        {
          id: '3',
          value: '图片地址',
          element: Image
        }
      ],
      direction: 'left'
    },
    {
      key: '43',
      element: [
        {
          value: '健身计划还能持续下去🦆 ',
          element: TextAnimation,
          id: '1'
        },
        {
          element: TextAnimation,
          id: '2',
          value: '希望疫情早点结束吧',
        },
        {
          id: '3',
          value: '图片地址',
          element: AnimeComponent
        },
        {
          element: TextAnimation,
          id: '2',
          value: [
            '拾起我的羽毛球',
            '羽毛球',
            '计划'
          ],
          notationIndex: [
            {
              index: 1,
              selector: 'new_year_sport'
            }
          ],
          notation: [
            {
              element: '.new_year_sport',
              config: {
                type: 'box'
              }
            }
          ]
        },
      ],
      direction: 'left'
    },
    {
      key: '44',
      direction: 'left',
      element: [
        {
          id: '1',
          value: '还有',
          element: TextAnimation
        },
        {
          id: '2',
          value: '感觉自己的代码水平似乎到了瓶颈期',
          element: TextAnimation
        },
        {
          id: '3',
          value: '图片',
          element: Image
        },
        {
          id: '4',
          value: [
            '越来越像一个',
            'CV工程师'
          ],
          element: TextAnimation,
          notationIndex: [
            {
              index: 1,
              selector: 'new_year_code_cv'
            }
          ],
          notation: [
            {
              element: '.new_year_code_cv',
              config: {
                type: 'circle'
              }
            }
          ]
        },
        {
          id: '6',
          value: [
            '一定要给自己一点',
            '压力'
          ],
          element: TextAnimation,
          notationIndex: [
            {
              index: 0,
              selector: 'new_year_code_strict'
            }
          ],
          notation: [
            {
              element: '.new_year_code_strict',
              config: {
                type: 'highlight'
              }
            }
          ]
        },
        {
          id: '5',
          value: [
            '基础',
            '很重要，一定要多温习温习!!!'
          ],
          element: TextAnimation,
          notationIndex: [
            {
              index: 0,
              selector: 'new_year_code_base'
            }
          ],
          notation: [
            {
              element: '.new_year_code_base',
              config: {
                type: 'circle'
              }
            }
          ]
        },
        {
          id: '7',
          value: '平时也要拓展一下自己的视野，多看看，多听听',
          element: TextAnimation
        }
      ]
    },
    {
      key: '45',
      direction: 'left',
      element: [
        {
          id: '1',
          element: TextAnimation,
          value: '自己的项目也要一如既往的持续迭代🦆'
        },
        {
          id: '2',
          element: TextAnimation,
          value: '也希望有感兴趣的人能多给我提提意见'
        },
        {
          id: '3',
          value: '如果觉得不错的，也能给我几个赞',
          element: TextAnimation
        },
        {
          id: '4',
          value: '如果觉得不错的，也能给我几个赞',
          element: TextAnimation
        }
      ]
    }
  ]

  return {
    LIFE_CYCLE_DATA_SOURCE,
    FIT_MODE_DATA_SOURCE,
    GAME_MODE_DATA_SOURCE,
    TRAFFIC_MODE_DATA_SOURCE,
    WORK_MODE_DATA_SOURCE,
    CODE_MODE_DATA_SOURCE,
    NEW_YEAR_MODE_DATA_SOURCE,
  }
}

// 通用询问选项
function getOptions() {
  // 通用选项
  const COMMON_OPTIONS: Options[] = [
    {
      text: '健身',
      value: '我想听听你的健身故事',
      map: 'FIT_MODE_DATA_SOURCE'
    },
    {
      text: '游戏',
      value: '游戏你要说啥',
      map: 'GAME_MODE_DATA_SOURCE'
    },
    {
      text: '交通',
      value: '交通怎么了',
      map: 'TRAFFIC_MODE_DATA_SOURCE'
    },
    {
      text: '工作',
      value: '今年的工作如何',
      map: 'WORK_MODE_DATA_SOURCE'
    },
    {
      text: '代码人生',
      value: '啥代码人生',
      map: 'CODE_MODE_DATA_SOURCE'
    },
    {
      text: '新年祈愿',
      value: '新的一年有什么愿望',
      map: 'NEW_YEAR_MODE_DATA_SOURCE'
    },
  ]

  return COMMON_OPTIONS
}

// 通用询问
function getCommonPrompt(first: boolean) {
  // 通用的询问
  const COMMON_MODE_QUESTION: LifecycleDataSourceItem = {
    element: {
      value: `你${first ? '' : '还'}想听什么呢？`,
      element: TextAnimation
    },
    direction: 'left',
    key: 'common_prompt' + Date.now() 
  }

  return COMMON_MODE_QUESTION
}

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
// 默认背景色
const NORMAL_COLOR = "#FFF"
// 默认选中颜色
const ACTIVE_COLOR = COLOR_LIST[0]

// ----constants----

// ----utils----

const getCurrentDayCount = (year: number) => {
  return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 365 : 366
}

// ----utils----

const Home = () => {

  const [loading, setLoading] = useState(false)
  const [lifecycleList, setLifecycleList] = useState<LifecycleDataSourceItem[]>([])

  const dataSourceRef = useRef<ReturnType<typeof getLifecycle>>()
  const currentDataSource = useRef<keyof ReturnType<typeof getLifecycle>>()
  const options = useRef<Options[]>([])
  const optionsCounter = useRef(0)
  const responseCallback = useRef<any>()

  // 动画完成
  const onComplete = useCallback((value?: any) => {
    if (responseCallback.current) return
    let nextMessage: LifecycleDataSourceItem | undefined
    // 当前消息已经没有了
    if(!dataSourceRef.current![currentDataSource.current!].length) {
      nextMessage = {
        ...getCommonPrompt(optionsCounter.current === options.current.length),
        options: options.current
      }
    }else {
      nextMessage = dataSourceRef.current![currentDataSource.current!].shift()
    }
    responseCallback.current = nextMessage?.options
    if (nextMessage) {
      const { skip } = nextMessage
      setLifecycleList(prev => [...prev, nextMessage!])
      EVENT_EMITTER.emit(EVENT_EMITTER_LISTENER.POST_MESSAGE, nextMessage)

      if (skip) {
        dataSourceRef.current![currentDataSource.current!].splice(0, skip)
      }
    }
  }, [])

  // 交互响应
  const onResponse = useCallback((value: string, origin: Options) => {

    options.current = options.current.filter(item => item.value !== value)

    responseCallback.current = null
    const nextMessage: LifecycleDataSourceItem = {
      key: Date.now().toString(),
      element: {
        value,
        element: NormalText
      },
      direction: 'right'
    }
    setLifecycleList(prev => {
      return [
        ...prev,
        nextMessage
      ]
    })
    EVENT_EMITTER.emit(EVENT_EMITTER_LISTENER.POST_MY_MESSAGE, nextMessage)

    const { skip, map } = origin
    // 切换消息展示类型
    if (map) {
      currentDataSource.current = map
    }
    if (typeof skip === 'number') {
      dataSourceRef.current![currentDataSource.current!].splice(0, skip)
    }
  }, [])

  const onLoad = useCallback(() => {
    setLoading(false)
    currentDataSource.current = 'LIFE_CYCLE_DATA_SOURCE'
    dataSourceRef.current = getLifecycle()
    options.current = getOptions()
    optionsCounter.current = options.current.length
    responseCallback.current = null
    onComplete()
  }, [onComplete])

  const messageList = useMemo(() => {
    return lifecycleList.map(item => {
      const { key, element, direction } = item
      let children: any
      if (Array.isArray(element)) {
        children = (
          <MultiMessageWrapper id={key} onComplete={onComplete} value={element} />
        )
      } else {
        const { element: Element, value, ...nextProps } = element
        children = (
          <Element
            {...nextProps}
            id={key}
            onComplete={onComplete.bind(null, element)}
            value={value}
          />
        )
      }
      return (
        <MessageBubble id={key} key={key} direction={direction}>
          {children}
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