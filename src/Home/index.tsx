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
}

type RoughInstance = RoughSVG

type CommonAnimationProps = {
  id: string
  onComplete: () => void
  immediately?: boolean
  children?: ReactNode
  animate?: boolean
  value?: any 
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
} & Pick<CommonAnimationProps, 'onComplete'>) => {

  const { title, value = [{ x: '1', y: 20 }, { x: '2', y: 20 }], onComplete } = props

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

  const { title, value = {
    series: ['1', '2'],
    label: ['1', '2'],
    value: {
      1: [20, 30],
      2: [40, 20]
    }
  }, onComplete } = props

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

  const { title, value = {
    series: ['1', '2'],
    label: ['1', '2', '3', '4'],
    value: {
      1: [20, 30, 50, 10],
      2: [40, 20, 5, 25]
    },
  }, onComplete } = props

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

  const { title, value = [{ x: '1', y: 20 }, { x: '2', y: 20 }], onComplete } = props

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
  }, [])

  return (
    <svg ref={svgRef} className="github-commit-svg" />
  )

}

// 健康码
const HealthyAnimation = (props: CommonAnimationProps) => {

  const { onComplete } = props 

  const [ qrCode, setQrCode ] = useState<string>()

  const onLoad = useCallback(() => {
    annotate(document.querySelector('#healthy-card')!, {
      type: 'circle'
    }).show()
    setTimeout(onComplete, 1200)
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
const NumberAnimation = (props: CommonAnimationProps) => {

  const { value, onComplete } = props 

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
    setTimeout(onComplete, 2200);
  }, [])

  return (
    <div id={chartId.current}>
     
    </div>
  )

}

// 物体抖动
const ShakeAnimation = (props: CommonAnimationProps & {
  shakeProps?: any 
}) => {

  const { value, onComplete, shakeProps={}, id, notation=[] } = props 

  useEffect(() => {
    if(!notation.length) {
      setTimeout(onComplete, 1000)
    }else {
      annotationGroup(notation.map(item => {
        const { element, config } = item
        return annotate(document.querySelector(element)!, config) 
      })).show()
      setTimeout(onComplete, 800 * notation.length + 400)
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
  const { value, onComplete } = props

  useEffect(() => {
    setTimeout(() => {
      onComplete()
    }, 400)
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
  onComplete: () => void
}) => {

  const { value, onComplete, id, immediately, notationIndex=[], notation=[] } = props

  const [animationText, setAnimationText] = useState('')

  const timerRef = useRef<NodeJS.Timeout>()
  const complete = useRef(false)

  const realValue = useMemo(() => {
    return Array.isArray(value) ? value.join('') : value 
  }, [value])

  const realAnimationText = useMemo(() => {
    if(realValue === '还记得那次的项目吗') console.log(notationIndex.length, animationText.length, realValue.length, 222222)
    if(!notationIndex.length || animationText.length < realValue.length) return animationText
    complete.current = true 
    return value.map((item: any, index: number) => {
      const target = notationIndex.find(item => item.index === index)
      if(!target) return item 
      return (
        <span className={target.selector} key={index}>
          {item}
        </span>
      )
    })
  }, [animationText])

  const notationAnimation = () => {
    if(!notation.length) {
      onComplete()
    }
  }

  useEffect(() => {
    clearInterval(timerRef.current)
    let index = 1
    timerRef.current = setInterval(() => {
      index++
      setAnimationText(realValue.slice(0, index))
      if (index >= realValue.length + 20 || (immediately && index >= realValue.length + 50)) {
        clearInterval(timerRef.current)
        notationAnimation()
      }
    }, 66)

    return () => {
      clearInterval(timerRef.current)
    }
  }, [realValue, id])

  useEffect(() => {
    if(!complete.current) return 
    annotationGroup(notation.map(item => {
      const { element, config } = item
      return annotate(document.querySelector(element)!, config) 
    })).show()
    setTimeout(onComplete, 800 * notation.length + 400)
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
const Image = () => {

  return (
    <WiredImage />
  )

}

// svg动画
const SvgAnimation = (props: CommonAnimationProps & {
  svgId: string
}) => {

  const { svgId, onComplete, children } = props

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

  const { svgRef, shapeRef, children, onComplete } = props

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
    setTimeout(onComplete, 3000)
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
  onResponse: (value: string) => void
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
          onclick={() => onResponse(value)}
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

// 历史数据的一个记录
const LIFE_CYCLE_DATA_SOURCE: LifecycleDataSourceItem[] = [
  {
    key: '995',
    element: [
      {
        value: '今天的你，非常的幸运',
        element: TextAnimation,
        id: '1'
      },
      {
        value: '你守护住了你的绿码',
        element: TextAnimation,
        id: '2'
      },
      {
        value: '🐴 🐎 🐴 🐎',
        element: ShakeAnimation,
        id: 'healthy_shake_id',
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
      {
        value: '',
        element: HealthyAnimation,
        id: '4'
      },
    ],
    direction: 'left'
  },
  {
    key: '996',
    element: [
      {
        value: '今年这一年',
        element: TextAnimation,
        id: '1'
      },
      {
        value: '一共锻炼了',
        element: TextAnimation,
        id: '2'
      },
      {
        value: 100,
        element: NumberAnimation,
        id: '3'
      },
      {
        value: '天',
        element: TextAnimation,
        id: '4'
      },
    ],
    direction: 'left'
  },
  {
    key: '997',
    element: [
      {
        value: [
          '还记得那次的',
          '项目',
          '吗'
        ],
        element: TextAnimation,
        id: '1',
        notationIndex: [
          {
            index: 1,
            selector: 'aaaa'
          },
          {
            index: 2,
            selector: 'bbbb'
          }
        ],
        notation: [
          {
            element: '.aaaa',
            config: {
              type: 'underline'
            }
          },
          {
            element: '.bbbb',
            config: {
              type: 'box'
            }
          }
        ]
      },
      {
        value: '合作了那个磨叽的同事',
        element: TextAnimation,
        id: '2'
      },
      {
        value: '🙉 🙉',
        element: ShakeAnimation,
        id: '3'
      }
    ],
    direction: 'left'
  },
  {
    key: '999',
    element: [
      {
        value: '两周一次的循环健身',
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
      },
    ],
    direction: 'left'
  },
  {
    key: '998',
    element: [
      {
        value: '每天早上的公交车，经常让自己迟到',
        element: TextAnimation,
        id: '1'
      },
      {
        value: '',
        element: BusPathAnimation,
        id: '2'
      },
      {
        value: '现在多了一个选择--地铁',
        element: TextAnimation,
        id: '3'
      },
      {
        value: '',
        element: SubwayPathAnimation,
        id: '4'
      },
    ],
    direction: 'left'
  },
  {
    key: '1',
    element: {
      value: '你好，年底的我',
      element: TextAnimation
    },
    direction: 'left'
  },
  {
    key: '2',
    element: {
      value: '我是年前的我',
      element: TextAnimation
    },
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
    element: {
      value: '你好鸭',
      element: TextAnimation
    },
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
  const [lifecycleList, setLifecycleList] = useState<typeof LIFE_CYCLE_DATA_SOURCE>([])

  const responseCallback = useRef<any>()

  // 动画完成
  const onComplete = useCallback((value?: any) => {
    if (responseCallback.current) return
    const nextMessage = LIFE_CYCLE_DATA_SOURCE.shift()
    responseCallback.current = nextMessage?.response
    if (nextMessage) {
      setLifecycleList(prev => [...prev, nextMessage])
      EVENT_EMITTER.emit(EVENT_EMITTER_LISTENER.POST_MESSAGE, nextMessage)
    }
  }, [])

  // 交互响应
  const onResponse = useCallback((value: string) => {
    let isCorrect = true
    if (responseCallback.current) {
      isCorrect = responseCallback.current(value)
    }
    if (isCorrect) {
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
    }
  }, [])

  const onLoad = useCallback(() => {
    setLoading(false)
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