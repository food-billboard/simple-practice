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
  style?: CSSProperties,
  className?: string
}

type LifecycleDataSourceItemElement = Pick<CommonAnimationProps, 'value' | 'immediately' | 'notation' | 'style' | 'className'> & {
  element: any
  id?: string
  wrapperStyle?: CSSProperties
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

// 口罩动画
const HealthyEmojiAnime = (props: CommonAnimationProps) => {

  const { style, onComplete } = props

  useEffect(() => {
    Anime
    .timeline({
      endDelay: 1000,
      delay: 500,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      loop: false,
      complete: onComplete
    })
    .add({ 
      targets: '#healthy-emoji .no-smile',  
      keyframes: [
        {
          fontSize: '20px',
          opacity: 0
        }
      ]
    }, 100)
    .add({ 
      targets: '#healthy-emoji .smile',  
      keyframes: [
        {
          opacity: 1,
          fontSize: '40px'
        }
      ],
    }, 0)
    .play()
  }, [])

  return (
    <div style={style} id="healthy-emoji" className="home-page-emoji">
      <span className="no-smile">😷 </span>
      <span className="smile">😊 </span>
    </div>
  )

}

// 点赞
const LikeAnimation = (props: CommonAnimationProps) => {

  const { style, onComplete } = props

  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const path = [
      'm48.41771,19.16353c-1.26263,-2.04342 -3.45159,-3.33394 -5.87036,-3.46725c-0.15116,-0.02122 -0.30227,-0.03177 -0.45787,-0.03177l-8.3488,-0.00668c0.36474,-1.58942 0.54936,-3.21736 0.54936,-4.86314c0,-1.54817 -0.17625,-3.13428 -0.52421,-4.71478c-0.02453,-0.11209 -0.06023,-0.21976 -0.10598,-0.3218c-0.8678,-3.14321 -3.69588,-5.31208 -6.98188,-5.31208c-3.99484,0 -7.24509,3.25031 -7.24509,7.24509c0,0.18293 0.00724,0.36587 0.02228,0.54936c-0.12046,3.13821 -1.76124,6.03096 -4.40303,7.75426c-0.79247,0.51697 -1.01615,1.57831 -0.49912,2.37078c0.51641,0.79196 1.57719,1.01671 2.37078,0.49912c3.61,-2.35461 5.83803,-6.32599 5.96018,-10.62421c0.00168,-0.07308 -0.00056,-0.14611 -0.0078,-0.21919c-0.01117,-0.11041 -0.01673,-0.22032 -0.01673,-0.33017c0,-2.10533 1.71325,-3.81858 3.81858,-3.81858c1.7869,0 3.31721,1.218 3.72041,2.96196c0.01953,0.0842 0.04519,0.16564 0.07696,0.24429c0.25764,1.25146 0.38815,2.50016 0.38815,3.71597c0,2.05622 -0.34134,4.07847 -1.01447,6.01148c-0.18237,0.52365 -0.0998,1.10316 0.22088,1.55485c0.32124,0.45231 0.84102,0.72112 1.39594,0.72168l10.59912,0.00556c0.07808,0.01448 0.15672,0.02341 0.23592,0.02621c1.32286,0.05467 2.5197,0.74678 3.21461,1.86997c0.42997,0.67538 0.62744,1.47009 0.57221,2.3005c-0.00443,0.05187 -0.00668,0.10485 -0.00612,0.15784c0,0.04687 0.00225,0.09312 0.00612,0.13887c0.00056,0.01841 -0.00168,0.03626 -0.00612,0.05355c-0.00556,0.02066 -0.01061,0.04238 -0.0156,0.0636l-4.11249,18.12307c-0.05018,0.07028 -0.09537,0.14499 -0.13438,0.22194c-0.32568,0.64523 -0.8042,1.17843 -1.39033,1.54536c-0.58949,0.37367 -1.26487,0.58225 -1.96141,0.60678c-0.04687,-0.00337 -28.18176,-0.01229 -28.18176,-0.01229c-0.02565,-0.00112 -0.0513,-0.00168 -0.07696,-0.00168c0,0 -6.08956,0.00949 -6.18296,0.02509c-0.10598,0 -0.18905,-0.08251 -0.18905,-0.18737l0.01645,-22.83729c0,-0.10429 0.08476,-0.18905 0.16536,-0.18961l0.06831,0.00668c0.06444,0.00724 0.14555,0.0156 0.19354,0.01061l4.59825,-0.01218l0,18.6154c0,0.94644 0.76682,1.71325 1.71325,1.71325s1.71325,-0.76682 1.71325,-1.71325l0,-19.79563c0,-0.09756 0,-0.47347 0,-0.57108c0,-0.94644 -0.76681,-1.69652 -1.71325,-1.69652c-0.08251,0 -6.44785,0.01673 -6.54961,0.01673c-1.99352,0 -3.61555,1.62181 -3.61555,3.61449l-0.01645,22.83729c0,1.99324 1.62209,3.61499 3.61555,3.61499c0.13943,0 6.111,-0.02509 6.111,-0.02509c0.02509,0.00112 0.05074,0.00168 0.07583,0.00168c0,0 28.05518,0.01504 28.1126,0.01504c1.39706,0 2.75893,-0.39483 3.93012,-1.13717c1.07582,-0.67369 1.96253,-1.6391 2.56932,-2.79575c0.20078,-0.30839 0.35301,-0.65141 0.45287,-1.02115c0.00612,-0.02285 0.01173,-0.04519 0.01673,-0.06803l4.10749,-18.12027c0.08757,-0.34078 0.12383,-0.69042 0.10985,-1.0418c0.08734,-1.53806 -0.29357,-3.02101 -1.09389,-4.27752z',
      'm21.56901,21.61757c-1.4409,0 -2.60834,1.16744 -2.60834,2.60834l0,2.54468c0,1.4409 1.16744,2.60834 2.60834,2.60834c1.44091,0 2.60835,-1.16744 2.60835,-2.60834l0,-2.54468c0,-1.44091 -1.16744,-2.60834 -2.60835,-2.60834z',
      'm34.0138,21.2009c-1.48695,0 -2.69169,1.20474 -2.69169,2.69169l0,2.62599c0,1.48695 1.20475,2.69169 2.69169,2.69169c1.48695,0 2.69169,-1.20475 2.69169,-2.69169l0,-2.62599c0,-1.48695 -1.20483,-2.69169 -2.69169,-2.69169z',
      'm33.1063,33.59929c-1.07222,-0.70413 -2.51791,-0.40468 -3.23508,0.65688c-0.00989,0.0145 -1.02045,1.48074 -2.56133,1.48074c-1.49823,0 -2.43032,-1.35648 -2.49352,-1.45175c-0.68741,-1.08143 -2.11783,-1.40987 -3.21069,-0.73236c-1.09815,0.68281 -1.43579,2.12619 -0.75368,3.22434c0.84058,1.35273 3.14588,3.64199 6.45789,3.64199c3.29522,0 5.62951,-2.27254 6.48911,-3.61453c0.69124,-1.07905 0.3773,-2.50035 -0.6927,-3.20532z'
    ]
    svgRef.current?.append(...path.map(path => {
      return Rough.svg(svgRef).path(path, {
        fill: COLOR_LIST[5],
        stroke: 'null'
      })
    }) as any)
    setTimeout(onComplete, 400)
  }, [])

  return (
    <div className="home-page-like" style={style}>
      <svg width="50" height="50" ref={svgRef} />
    </div>
  )

}

// Anime组件
const AnimeComponent = (props: CommonAnimationProps & {
  config: Anime.AnimeParams
}) => {

  const { config: originConfig, id, style, onComplete } = props
  const { value, ...config } = originConfig 

  useEffect(() => {
    Anime({
      targets: `#${id}`,
      complete: onComplete,
      ...config
    }).play()
  }, [])

  return (
    <div id={id} style={style}>
      {value}
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
    <div
      className="home-page-chart-wrapper"
    >
      <svg
        ref={chartRef}
        className="home-page-bar-chart"
      >

      </svg>
    </div>
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
    <div
      className="home-page-chart-wrapper"
    >
      <svg
        ref={chartRef}
        className="home-page-line-chart"
      >

      </svg>
    </div>
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
    <div
      className="home-page-chart-wrapper"
    >
      <svg
        ref={chartRef}
        className="home-page-radar-chart"
      >

      </svg>
    </div>
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
    <div
      className="home-page-chart-wrapper"
    >
      <svg
        ref={chartRef}
        className="home-page-pie-chart"
      >

      </svg>
    </div>
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

  const { onComplete, delay = 0 } = props

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

  const { value, onComplete, delay = 0, prefix = '', suffix = '', style, className } = props

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
    setTimeout(onComplete, 2200 + delay);
  }, [])

  return (
    <div className={`${className} home-page-number`} style={style}>
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

  const { value, onComplete, shakeProps = {}, id, notation = [], delay = 0 } = props

  useEffect(() => {
    if (!notation.length) {
      setTimeout(onComplete, 1000 + delay)
    } else {
      annotationGroup(notation.map(item => {
        const { element, config } = item
        const dom = document.querySelector(element)
        if (!dom) return
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
  const { value, onComplete, delay = 0 } = props

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

  const { value, onComplete, id, immediately, notationIndex = [], notation = [], delay = 0 } = props

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
    actionComplete.current--
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

// 图片
const Image = (props: CommonAnimationProps) => {

  const { onComplete, delay = 0, value } = props

  useEffect(() => {
    setTimeout(onComplete, 1000 + delay);
  }, [])

  return (
    <WiredImage src={value} className="home-page-image" />
  )

}

// svg动画
const SvgAnimation = (props: CommonAnimationProps & {
  svgId: string
}) => {

  const { svgId, onComplete: propsOnComplete, children, delay = 0 } = props

  const completed = useRef(false)

  const onComplete = useCallback(() => {
    if (completed.current) return
    completed.current = true
    propsOnComplete()
  }, [])

  const vivusRef = useRef<Vivus>();

  useEffect(() => {
    setTimeout(() => {
      vivusRef.current = new Vivus(
        svgId,
        {
          type: 'sync',
          duration: 500,
          // delay: 200
        },
        () => {
          setTimeout(onComplete, delay)
        },
      )
      setTimeout(onComplete, 5000)
    }, 0)
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
      <svg id="dumbbell" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1" width="150" height="150">
        <path strokeWidth={2} stroke={COLOR_LIST[0]} fill="none" d="M914.691674 425.709877v-28.76201c0-47.583643-38.705456-86.288076-86.290123-86.288076-10.168573 0-19.719071 2.077307-28.764056 5.308902v-34.072958c0-47.58262-38.704433-86.289099-86.288077-86.2891-47.58262 0-86.288076 38.70648-86.288076 86.2891v143.815166H396.939681v-143.815166c0-47.610249-36.543215-85.334357-83.900708-86.260447l-0.870831-0.028653h-0.310061v0.028653c-48.284606 0.617052-87.496598 39.26725-87.496599 86.260447v34.072958c-9.044985-3.230571-18.624136-5.308902-28.764056-5.308902-47.583643 0-86.288076 38.704433-86.288076 86.288076v28.76201c-47.583643 0-86.289099 38.707503-86.2891 86.290123S61.725707 598.290123 109.30935 598.290123v28.763033c0 47.58262 38.704433 86.290123 86.288076 86.290123 10.139921 0 19.720094-2.079354 28.764056-5.308902v34.070911c0 47.583643 39.238598 86.290123 87.496599 86.290123h1.179869c47.048455 0 83.900708-37.890906 83.900708-86.290123v-143.815165h230.120638v143.815165c0 47.583643 38.705456 86.290123 86.288076 86.290123 47.583643 0 86.288076-38.70648 86.288076-86.290123V708.034377c9.046009 3.229548 18.596506 5.308902 28.764056 5.308902 47.584666 0 86.290123-38.707503 86.290123-86.290123v-28.763033c47.58262 0 86.288076-38.70648 86.288076-86.2891s-38.70341-86.291146-86.286029-86.291146zM80.543247 512c0-15.871447 12.893632-28.76201 28.765079-28.76201v57.526066c-15.871447 0-28.76508-12.921262-28.765079-28.764056z m115.054179 143.816189c-15.869401 0-28.760987-12.893632-28.760987-28.763033V396.947867c0-15.842795 12.892609-28.763033 28.760987-28.763033 15.871447 0 28.764056 12.920238 28.764056 28.763033v230.105289c0 15.870424-12.892609 28.763033-28.764056 28.763033z m143.815165 86.289099c0 16.685998-11.095687 28.763033-26.373618 28.763034h-1.179869c-16.236767 0-29.972579-13.174018-29.972579-28.763034v-460.210576c0-15.139785 14.410169-28.594188 30.28264-28.763034 15.281001 0.168845 27.24445 12.780046 27.24445 28.763034v460.210576h-0.001024z m57.52709-201.341232v-57.526066h230.120638v57.526066H396.939681z m345.173794 201.341232c0 15.870424-12.923308 28.763033-28.76508 28.763034-15.89703 0-28.760987-12.893632-28.760986-28.763034v-460.210576c0-15.841772 12.863957-28.763033 28.760986-28.763034 15.841772 0 28.76508 12.921262 28.76508 28.763034v460.210576z m115.051109-115.052132c0 15.870424-12.920238 28.763033-28.763033 28.763033-15.89703 0-28.764056-12.893632-28.764056-28.763033V396.947867c0-15.842795 12.867026-28.763033 28.764056-28.763033 15.842795 0 28.763033 12.920238 28.763033 28.763033v230.105289z m57.52709-86.2891v-57.526066c15.841772 0 28.763033 12.891586 28.763033 28.76201 0 15.842795-12.921262 28.764056-28.763033 28.764056z" />
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
      <svg id="barbell" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1" p-id="8722" width="150" height="150">
        <path strokeWidth={2} stroke={COLOR_LIST[2]} fill="none" d="M204.8 699.733333H170.666667c-27.306667 0-51.2-23.893333-51.2-51.2v-273.066666c0-27.306667 23.893333-51.2 51.2-51.2h34.133333c27.306667 0 51.2 23.893333 51.2 51.2v273.066666c0 27.306667-23.893333 51.2-51.2 51.2z m-34.133333-341.333333c-10.24 0-17.066667 6.826667-17.066667 17.066667v273.066666c0 10.24 6.826667 17.066667 17.066667 17.066667h34.133333c10.24 0 17.066667-6.826667 17.066667-17.066667v-273.066666c0-10.24-6.826667-17.066667-17.066667-17.066667H170.666667z" p-id="8723"/>
        <path strokeWidth={2} stroke={COLOR_LIST[2]} fill="none" d="M307.2 802.133333H273.066667c-27.306667 0-51.2-23.893333-51.2-51.2V273.066667c0-27.306667 23.893333-51.2 51.2-51.2h34.133333c27.306667 0 51.2 23.893333 51.2 51.2v477.866666c0 27.306667-23.893333 51.2-51.2 51.2z m-34.133333-546.133333c-10.24 0-17.066667 6.826667-17.066667 17.066667v477.866666c0 10.24 6.826667 17.066667 17.066667 17.066667h34.133333c10.24 0 17.066667-6.826667 17.066667-17.066667V273.066667c0-10.24-6.826667-17.066667-17.066667-17.066667H273.066667zM887.466667 699.733333h-34.133334c-27.306667 0-51.2-23.893333-51.2-51.2v-273.066666c0-27.306667 23.893333-51.2 51.2-51.2h34.133334c27.306667 0 51.2 23.893333 51.2 51.2v273.066666c0 27.306667-23.893333 51.2-51.2 51.2z m-34.133334-341.333333c-10.24 0-17.066667 6.826667-17.066666 17.066667v273.066666c0 10.24 6.826667 17.066667 17.066666 17.066667h34.133334c10.24 0 17.066667-6.826667 17.066666-17.066667v-273.066666c0-10.24-6.826667-17.066667-17.066666-17.066667h-34.133334z"  p-id="8724"/>
        <path strokeWidth={2} stroke={COLOR_LIST[2]} fill="none" d="M785.066667 802.133333h-34.133334c-27.306667 0-51.2-23.893333-51.2-51.2V273.066667c0-27.306667 23.893333-51.2 51.2-51.2h34.133334c27.306667 0 51.2 23.893333 51.2 51.2v477.866666c0 27.306667-23.893333 51.2-51.2 51.2z m-34.133334-546.133333c-10.24 0-17.066667 6.826667-17.066666 17.066667v477.866666c0 10.24 6.826667 17.066667 17.066666 17.066667h34.133334c10.24 0 17.066667-6.826667 17.066666-17.066667V273.066667c0-10.24-6.826667-17.066667-17.066666-17.066667h-34.133334z" p-id="8725"/>
        <path strokeWidth={2} stroke={COLOR_LIST[2]} fill="none" d="M716.8 563.2H341.333333c-10.24 0-17.066667-6.826667-17.066666-17.066667v-68.266666c0-10.24 6.826667-17.066667 17.066666-17.066667h375.466667c10.24 0 17.066667 6.826667 17.066667 17.066667v68.266666c0 10.24-6.826667 17.066667-17.066667 17.066667z m-358.4-34.133333h341.333333v-34.133334h-341.333333v34.133334z" p-id="8726"/>
      </svg>
    </SvgAnimation>
  )
}

// 壶铃
const KettleBell = (props: CommonAnimationProps) => {
  return (
    <SvgAnimation
      {...props}
      svgId="kettlebell"
    >
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5816"
        width="150"
        height="150"
        id="kettlebell"
      >
        <path strokeWidth={4} stroke={COLOR_LIST[3]} fill="none" p-id="5819" d="M709.973333 853.333333H348.16c-3.413333 0-6.826667 0-10.24-3.413333-61.44-54.613333-98.986667-136.533333-98.986667-218.453333 0-160.426667 129.706667-290.133333 290.133334-290.133334s290.133333 129.706667 290.133333 290.133334c0 81.92-37.546667 163.84-98.986667 218.453333-3.413333 3.413333-6.826667 3.413333-10.24 3.413333z m-354.986666-34.133333h348.16c51.2-47.786667 81.92-116.053333 81.92-187.733333 0-139.946667-116.053333-256-256-256S273.066667 491.52 273.066667 631.466667c0 71.68 30.72 139.946667 81.92 187.733333z">
        </path>
        <path strokeWidth={4} stroke={COLOR_LIST[3]} fill="none" d="M324.266667 648.533333c-10.24 0-17.066667-6.826667-17.066667-17.066666 0-122.88 98.986667-221.866667 221.866667-221.866667 10.24 0 17.066667 6.826667 17.066666 17.066667s-6.826667 17.066667-17.066666 17.066666c-102.4 0-187.733333 85.333333-187.733334 187.733334 0 10.24-6.826667 17.066667-17.066666 17.066666z">
        </path>
        <path strokeWidth={4} stroke={COLOR_LIST[3]} fill="none" d="M689.493333 430.08c-3.413333 0-6.826667 0-10.24-3.413333-17.066667-13.653333-37.546667-23.893333-58.026666-30.72-6.826667-6.826667-10.24-13.653333-6.826667-20.48v-17.066667C614.4 310.613333 576.853333 273.066667 529.066667 273.066667S443.733333 310.613333 443.733333 358.4v17.066667c0 6.826667-3.413333 17.066667-10.24 20.48-20.48 6.826667-40.96 17.066667-58.026666 30.72-3.413333 3.413333-10.24 3.413333-13.653334 3.413333-6.826667 0-10.24-6.826667-10.24-10.24-6.826667-23.893333-10.24-44.373333-10.24-61.44 0-102.4 85.333333-187.733333 187.733334-187.733333S716.8 256 716.8 358.4c0 17.066667-3.413333 37.546667-10.24 58.026667 0 6.826667-6.826667 10.24-10.24 10.24-3.413333 0-3.413333 3.413333-6.826667 3.413333zM648.533333 368.64c10.24 3.413333 20.48 10.24 30.72 17.066667 3.413333-10.24 3.413333-20.48 3.413334-27.306667C682.666667 273.066667 614.4 204.8 529.066667 204.8S375.466667 273.066667 375.466667 358.4c0 6.826667 0 17.066667 3.413333 27.306667 10.24-6.826667 20.48-13.653333 30.72-17.066667v-10.24C409.6 293.546667 464.213333 238.933333 529.066667 238.933333S648.533333 293.546667 648.533333 358.4v10.24z">
        </path>
      </svg>
    </SvgAnimation>


  )
}

// 路径动画
const PathAnimation = (props: CommonAnimationProps & {
  svgRef: any
  shapeRef: any
}) => {

  const { svgRef, shapeRef, children, onComplete, delay = 0 } = props

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

// 聊天框
const MessageBubble = (props: Omit<CommonAnimationProps, 'onComplete'> & Pick<LifecycleDataSourceItem, 'direction'> & {
  wrapperStyle?: CSSProperties
}) => {

  const { id, children, direction, wrapperStyle = {} } = props

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
              <WiredImage src="data:image/jpeg;base64,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" />
            </Avatar>
          )
        }
        <div>
          <WiredCard ref={cardRef} style={wrapperStyle as any}>
            {/* @ts-ignore */}
            {children}
          </WiredCard>
        </div>
        {
          direction !== 'left' && (
            <Avatar color="green" style={{ marginLeft: 15 }}>
              <WiredImage src="data:image/jpeg;base64,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" />
            </Avatar>
          )
        }
      </div>
    </div>
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
          const { element: Element, value, id, immediately, wrapperStyle, ...nextProps } = element
          return (
            <div key={id} style={wrapperStyle}>
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

  const { onResponse: propsOnResponse } = props

  const [options, setOptions] = useState<Options[]>([])

  const selected = useRef(false)

  const onResponse = useCallback((value: string, origin: Options) => {
    if (selected.current) return
    selected.current = true
    propsOnResponse(value, origin)
  }, [])

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
    selected.current = false
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
      className="w-100 h-100 home-page-select-button-wrapper zero-scrollbar"
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
        value: 'data:image/jpeg;base64,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',
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
        value: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wgARCAAyADIDAREAAhEBAxEB/8QAHAAAAQUBAQEAAAAAAAAAAAAABwADBAYIAQUC/8QAGgEBAAIDAQAAAAAAAAAAAAAAAAQFAQIDBv/aAAwDAQACEAMQAAAA1SIqUWXM13a1z7EyFO21Q2U+HOH8aY0warOpn7aIRBxnGPHv4OzevWO6IqhMxiq1doD5XMxy4JWYrw4QxvPcLXvqRxS+U2rz5MHD6yHthbUHtcFir83dtIqEcwHMy2Gcy5MdR524IX//xAAyEAACAQMCAwYEBQUAAAAAAAABAgMEBREAIQYHEhMxMkFRYRAUcXQVICI2gUJisbPB/9oACAEBAAE/ANE6p71Vy3Gvpn7FUgl6BIh6tiAQPrgjO2mqseKrfPsQNPcJYwTFUl8eTgEatNRJVUMc8oUGQdQC+Q9D7/GRFkjZG8LAqfodVPDFTQU0jW24yMBuUqQG2HkGGCNvrq5Xq5Jca1REkVNTxRzCWomWENG+QGBYgEZVhtqyX2aqrY2+aoZ4ZFkAWlqRMyMq5/WF8OfLfVlgaltVLA5y6RKGPvjf8l3SR7VWLTL1zmFxGucdTYOBn6649o+JKGzW268XyiqFZKXMWCRQzqOlYiT3HpzgABQdWXja5cOz22t+WkSgeYzAvEQs6AhZMN/UAp28gdQOJYUddgyhh/Pxl4imS5PT9lD0rP2Wc746+n17/P8A5qkvE810lo3p0AWUxh1diCAuSfDj1HpkYznXElFbil0prrTQPT1EpaaOfdJcjY4Odc4eC+IuJZbJTcN2dPwOhpZQggIBh9SwJG2PCBrkhzTo+YMFTRpQzUVXQRRnDuHEkZ2DfCovcsVZNElMpjibozIxQs2Adtjtv3nGmpaVbt2Qp5WJjVutGYgZkLYO+wyM++rdJbmu5RI446hBlWDsXwWIAP8AaSCcdxO/fq+z0kKVVReqSiemposvKQS2T4UUEbk6m4kuM9XNWUtVLTKgKJCjZRVO2GHc23eTrkDxLBy85j1dNfYqnsKqA0qGGFpHJD5QhFyxB1BUiWCOQRzDqUNhoyCM+o1JbKaWdpnTLuctnub9PTgj0xnb30LbAKgzh5+0OMnt3xgEnGM4xudtR2+BHEih+1z1doXJY+xOdx7d2udkBg4bhmid+h65DNknzUqv8A41y4pKGtv1fTV1KJiYEmiD7rkEhtvM+HfXLaCKO01MBiTqo62eJCVGVUt1AA/Rvy88/wBpxfcx65efvun+wn/ymuXngvn37f60+H//xAAiEQACAQMDBQEAAAAAAAAAAAABAgADESAEBRMQITEzQRL/2gAIAQIBAT8A6GqBOQTnuYvcYVNPOIwUyDE7DBvERgDGUMZ8w+Sq5Vpo3Li5xItF03OQJQ22nRUho62Jp4eRNtYB5u1V0tUEdv3ZsdB71m9eiJ616f/EACIRAAIBAwQDAQEAAAAAAAAAAAECAAMEERITICEFEDIzQf/aAAgBAwEBPwD0KJM2DDb4EIweFK6m6s1giVO24L0Y+SIr6RM98P7KNIOsuaOiMMcD9S31s+FjWa7crptvwA7nhyprYMumZBLk6m4+J/WXvxLz69f/2Q==',
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
      key: '8-2',
      element: {
        value: 'data:image/jpeg;base64,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',
        element: Image
      },
      direction: 'left',
    },
    {
      key: '8-1',
      element: [
        {
          element: TextAnimation,
          value: '今年总计锻炼：',
          id: '1'
        },
        {
          element: NumberAnimation,
          value: 200,
          id: '2',
          suffix: '次💪 '
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
          wrapperStyle: {
            textAlign: 'center'
          },
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
        },
        {
          value: '壶铃',
          element: TextAnimation,
          id: '6'
        },
        {
          value: '',
          element: KettleBell,
          id: '7'
        },
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
          wrapperStyle: {
            textAlign: 'center'
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
                type: 'highlight',
                color: COLOR_LIST[0]
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
          wrapperStyle: {
            textAlign: 'center'
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
              type: 'circle',
              color: COLOR_LIST[0]
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
                type: 'circle',
                color: COLOR_LIST[0]
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
          value: '',
          id: 'fit_boom',
          style: {
            fontSize: '30px'
          },
          config: {
            value: '💨💨',
            loop: false,
            duration: 5000,
            delay: 400,
            keyframes: [
              {
                translateX: 100,
                opacity: 0,
              }
            ]
          }
        }
      ]
    },
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
      key: '13-1',
      element: {
        value: 'data:image/jpeg;base64,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',
        element: Image
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
              type: 'circle',
              color: COLOR_LIST[1]
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
          id: '3',
          shakeProps: {
            h: 5,
            v: 5,
            dur: 300,
            int: 10,
            max: 100
          },
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
                type: 'highlight',
                color: COLOR_LIST[1]
              }
            }
          ]
        },
        {
          id: '3',
          element: Image,
          value: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wgARCAAyADIDAREAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAABQYDBAcBAgj/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAADcQSCCY6Mp0og8AkJdCwfABlR7NjAYyEwtkwkmRnAofTIKLIsCcaOJA2g0GnCwCzQwwLRYBYNEE30lP//EADUQAAEDAgQEBAMGBwAAAAAAAAECAwQFEQAGEiETFCIxEEFRgQdCcSMzUmGRsSQ0U3J0dbL/2gAIAQEAAT8AxXKmaehjhKa4jjqRpdUUgo8zcA2wuv1AV3lUtNcoHLBdiSsabi3vffEavT34sBaoOl54q1o3GsgK6U3+gNztiDWKq/V0sPRW2YypDiUqUhQUpCU3/W/jVkSnKe8mEtaHynoUggEH3BGHxVxLdDSwUJRZF7AKHbv+PYntbe2HombUQNBly3ZQ5VKiyWx854liQPc4nMZuDFKCFzVOpcWZZaWjdJXdN72+UWsMMs5oGY5C1uPil3cUlJKVXBT0gDvsfK+MrtVZmM8itEl7XdJ16hpJNt/W1ri3fwzhU3KdTQIy9D77nDQv8AsSpQ/MAHGe8sPxcrQMzQ5c7jrsZmuU6TZzsob4+Eeeaka2xQatJelMSQQwt7dbS04qlVp9JY49TmMRGe2t9wJGEfEPJ63NAzFA914YeakNJdYcQ42oXC0KBB9/CrUyNWaqI1RccHB0uMNDZLiNtd/W52PoMZnchKhimT4Ds1iX0KZbtuLj8x277YfoGVMrvGvxoU2KaZLPd8lC7pI2BJ7nFXqtVzTV+Zlh+XMdJLbLTZWWx30oSOwHqO/cnC6DmAIJcodXA/xVHGTc1VHJVYaDofahKI5uE6hSLNk2KwgjYjCHmlISpKwQRcYmTY7GY4LDj6A68w4hKCd73SR+tjipNSlAOxlruhCuhJFyfK19r/XbGdKK/W8uGj6wZ0y7qOLZPWhFxfT5arY+F+Sq5Rc3mZUWGENRkONLs/c3WARipMxxV0y31ywplKSlLSrC5uL7HcAE3B288fE/K86o0CkM0mIuW8mSu6CQhZCkKA3UcUCn1qJQabGlffsxGkOfbfMEAHGbKepeYY4d0IYqOhkPujobcRcgHe+o/LitRcxUN6LGRmGcIvGB5l3QrjI/pklPSoHEGM/UMx8xNXNeajMocD7b4DqFFRskbiyTpuQO9gDiqzqhz8aaxNfjRdFmJTjCErkWvdKidtI7gEAncg4mZ+qAMxt+FCmNRYfOayFtKXpJtsL2BsbG+IkSXKVGlVB9tQbs42yy2UpSojuSSSbAn08M/oSvLhCwFDmG/wDrGVf43KULnPt9bA18Xr1fW+F0unIjVFSIEVJ5ZW4ZTjOYDlfZjr6mEMhSGjulJ9QMV/8AnMz/AOqa/deI/wBw3/aP28P/xAAUEQEAAAAAAAAAAAAAAAAAAABQ/9oACAECAQE/AEf/xAAUEQEAAAAAAAAAAAAAAAAAAABQ/9oACAEDAQE/AEf/2Q=='
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
                type: 'underline',
                color: COLOR_LIST[1]
              }
            }
          ]
        },
        {
          value: '🎮',
          element: ShakeAnimation,
          id: '2',
          shakeProps: {
            h: 5,
            v: 5,
            dur: 300,
            int: 10,
            max: 100
          },
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
                type: 'highlight',
                color: COLOR_LIST[1]
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
              type: 'underline',
              color: COLOR_LIST[2]
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
              type: 'circle',
              color: COLOR_LIST[2]
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
          wrapperStyle: {
            textAlign: 'center'
          },
          id: '3'
        }
      ],
      direction: 'left'
    },
    {
      key: '29-1',
      element: {
        value: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAwICQoJBwwKCQoNDAwOER0TERAQESMZGxUdKiUsKyklKCguNEI4LjE/MigoOk46P0RHSktKLTdRV1FIVkJJSkf/2wBDAQwNDREPESITEyJHMCgwR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0f/wgARCAAyADIDAREAAhEBAxEB/8QAGwAAAgIDAQAAAAAAAAAAAAAABAYDBwABBQL/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/2gAMAwEAAhADEAAAALTEsS4mLGruGxPypwMrtnPq8goq6FYu2hhVGk64vwlloUnE42mzAEQyYPHUwXwEgBgsPGQhPJ7PJswmP//EADQQAAEDAwICCAQFBQAAAAAAAAECAwQABREGEiExBxATFEJRYYEiMkGSFSMzYnFTgqHC0v/aAAgBAQABPwCtR9IUC0vORYLXfpSCQv6No96l9ImpH15blMRv2Msf9VB6Sb+wR3oRZiPVBQfuFaa1PA1HFK4xLT7f6rCyNyOvpHv67NZgxFWUSpuUA/VCBzNAAAJSMADgKgWq4XI4gQX5Xq02Sn7vl/zTGgNTPc4KGfR19NNm6aQ1KjejZJYwsoC8pWD4f4UKt81m4QGJsc5afQFo/gjq6X0LE+2L8BZcFaPEJeqoDdyZaejOrLZDvLcQdpqTHk7Wm4LrbDaSNw2Z4elPLjzpojusyyGV8VFJQ2VAA8+G72yK6Q9Krny41yYeDPyRn/c4Qa01aPwGxMW3ty/2Xj9SckDq1jpwaktIYQ4GX2l72nDTGiGLHeWHb9PIh8Ch9obEB0HktRJKaS42oBSVpUDyIIrUUYN6ibukq9FiK2gBDC3w20FjxH4v9Saeu41JMRabdlEbg4++6C2XUJIJS0kjKsnAKuvFXOZGisFMlQAWkgAo3A/TiPcVM0/ZFwXmUOsNPgZccEFWfNRABFMWCxtWgI7VgLLZZL7cIpUVCtMW1iNPbzdFzJLCl7SWCghAG0oBJNY6pOpOwuz8NccBLRI3lfkkKzirjd25RYdfhcisN7X8HBTnljjkU4YShJPc1uAtqWtSpCsE4CSM44cAPSjPitsRViAcuqcSkCYrCckbsZHEk++ajXSNEuby0QjvQFq394KslSwnkR5ihqoEtDuwG8Aklz92PKs0WGSoktIJ3ZyUihFj/H+Q19gru0fdnsGs457BXdmP6Dfi8AoxmCvJYbP9grsWuzx2SMb842jz6v/EABgRAQEAAwAAAAAAAAAAAAAAABEAECBQ/9oACAECAQE/AMM7Ecf/xAAUEQEAAAAAAAAAAAAAAAAAAABQ/9oACAEDAQE/AEf/2Q==',
        element: Image
      },
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
                type: 'highlight',
                color: COLOR_LIST[3]
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
          wrapperStyle: {
            textAlign: 'center'
          },
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
          element: ShakeAnimation,
        },
        {
          id: '4',
          value: '🙉',
          element: ShakeAnimation,
        },
        {
          id: '5',
          value: '🙈',
          element: ShakeAnimation,
        },
        {
          id: '3',
          wrapperStyle: {
            textAlign: 'center'
          },
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
                type: 'highlight',
                color: COLOR_LIST[4]
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
          shakeProps: {
            h: 5,
            v: 5,
            dur: 300,
            int: 10,
            max: 100
          },
          value: '👏🏻 👏🏻 👏🏻 👏🏻 👏🏻 👏🏻'
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
                type: 'circle',
                color: COLOR_LIST[4]
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
                type: 'circle',
                color: COLOR_LIST[4]
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
                type: 'highlight',
                color: COLOR_LIST[4]
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
                type: 'underline',
                color: COLOR_LIST[4]
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
          value: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwkHBgoJCAkLCwoMDxkQDw4ODx4WFxIZJCAmJSMgIyIoLTkwKCo2KyIjMkQyNjs9QEBAJjBGS0U+Sjk/QD3/2wBDAQsLCw8NDx0QEB09KSMpPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT3/wgARCAAjAGQDAREAAhEBAxEB/8QAGgAAAgMBAQAAAAAAAAAAAAAAAAECAwQFB//EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/2gAMAwEAAhADEAAAAPYTOaykRYBIylUpc7FtIGY1lQywAMwyRcMiUGgiMYAQM9kyVXZsTj53fni+teTutdjGRlCRYQOXc9EumgQwAAAD/8QANhAAAQIDBgIGCAcAAAAAAAAAAQIDABESBAUTITFREDIUIiNBkqEgU2FigZGxwUJSVGNxk9H/2gAIAQEAAT8Ad5PlCEkvEiWRz5h3+3Lg/wDh+O/2hGJR1KJT75/eO1/b847bdvzhNVPXlP2aRlVluPzxabzZYtS2MdsLQlClJKVEgKNKdNzBveysrDbz6KyFGSUqPLzQh9txSkoUCpEqh3ifBzk+UJV2wExzesVvtpwdIFNRkM+8j6RjNgc/kYBCgCNDxKk1dVWUxqtUOv4ayKUHQTKwDCHG1pmvDTqOYGAkAkjU6nfgsTTnP4QhaUrOTxJMusky14KRVLMiWxlCU0iQJP8AJn6GF76/EYftTbS6SlBMp5rSPrAtNkpE3WR3yqEdMs/6hvxiAQRMGHCEtqUVUgAme0G9WFNYqL1bDYGZwYYvqwqCiLehcG/7sS6WzbGgsGRENX9dj1WHbGlUmRhq/btenh2tCpQm0sKAIdRI+9HSGfWI8QhLrajJK0k7AiHGA6QSTGAByKKd8pzhDDaMwM+DgCmVg5gpMC4Lv6vYr/tX/sWVhuz2ZDbQkgDIEkxSNopG0SEUjaKRtFI2geh//8QAIhEAAgECBQUAAAAAAAAAAAAAAQIAERIDECEwUSAxMkBh/9oACAECAQE/ANkkCfPZCk9paeJaeM71utrrGxUQ0YxFL+MLAGhyoZQyh6hoY2rbf//EAB8RAAMBAAIBBQAAAAAAAAAAAAECEQAQEjADEyAhQP/aAAgBAwEBPwDwwnA39NGo1HPtt17z6zeoimMcXUCk4uoMJ4o1Go+TCrlEXx//2Q==',
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
          value: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wgALCAAyADIBAREA/8QAGwAAAQUBAQAAAAAAAAAAAAAAAAMEBQYHAQL/2gAIAQEAAAAA39DAJXa1gr2V6P7tYRkOs7miNr0ao5scqyr1A7erM8zVgqeI3VZMAO//xAAvEAACAgIBAwIFAwMFAAAAAAABAgMEBREhAAYSEyIQFDEyQQcgI0JRUhY2YXGB/9oACAEBAAE/AOrNmGnVls2JFjgiUvI7HQVQNknruf8AXHMW7bp28IadP+iaVPOWTrsrv7v2ejNl8jQTJYGDZs2RGsMgA+5o/wDPx6r2IrVaKxA6yQyqHR1PDKRsEfs7zxj5jsvL45JxAZ4GQya3odJ+iGHTK/IWu7pjOUMvopAgfQ6jfA5LtKfA4HJ1HiiqNBGK0qkqFGuuwLHn2fj6zxSwWYYFMkEqFHiDbKjRA41wP2Z//bmSI+oqyEf+Kes3kquKufOz1J7XrRKiRLPHog/cQjsABojZ6xiU6gp246xiN2TwjSOwXiQeJIIAJUbC/Qcb6wyzWnlytkRq9gLGiRsWCxoW1snWySSfp+QOdbPwy/qfKokczw+pKiM6cMFJ58T+D1f7kSj249nLuZqpqqbArQM8n8g0Ade0EgjqDM4nO0KHz0D1ryp6UU8lFZmKsB9uw3j5aB0erXceEw+IiOLgsymhA8MASExpGOAzFfaDrW9KN8EDrG9zQTduiXD2g8MUXhEtms8TkIVDt7teZAJOhrrBz2p6LtbfzdJ5Yw3GyquVG9cb4/AHwv1Bcr+l5tEwdXR1+qsp2D/yOOR/brL9rXL3bNzDVpcdVSYEoYajIFf6huH6rV5psMla54iYwmGYx8jY2pIJ/HHHV2pPJiZKdXXrSRiCIyHQ8m0o2dcDn69YTtjI4vAwYyU4uz4O0peau76kYk70W511j6a0KMddXLldlnbguxJLMf8Askn4Wbnc/wDqKQJLf+XXJenGI41KuP8AEkj7Ah2T1Sv9wRZaZJ58iU8p3RJ3kUeCrLrWl2wBCD+/2nqHOZ2UW2gS1I7QEwRFZAxbaaBAJKHltnx40eOq+Sz9ulOatnLSO1hHCfKBJIx5svj7l+0+HO+dc7HWUzPc1cQB0vwyG0IZAPc+/RU+Xs2oQ+489T5buxO3cbIlzJvLHWneZ4wPMOX/AIywK60o2PcesbNlZMXUezVridoEMg+YP3a5/o/afj//2Q==',
          element: Image
        }
      ],
      direction: 'left'
    },
    {
      key: '43',
      element: [
        {
          value: '健身计划还要持续下去🦆 ',
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
          value: '',
          element: HealthyEmojiAnime
        },
        {
          id: '3-1',
          value: 'data:image/jpeg;base64,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',
          element: Image
        },
        {
          element: TextAnimation,
          id: '2',
          value: [
            '拾起我的',
            '羽毛球',
            '运动'
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
                type: 'box',
                color: COLOR_LIST[5]
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
                type: 'circle',
                color: COLOR_LIST[5]
              }
            }
          ]
        },
        {
          id: '3',
          value: 'data:image/jpeg;base64,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',
          element: Image
        },
        {
          id: '6',
          value: [
            '一定要给自己亿点',
            '亿',
            '点',
            '压力'
          ],
          element: TextAnimation,
          notationIndex: [
            {
              index: 1,
              selector: 'new_year_code_number'
            },
            {
              index: 3,
              selector: 'new_year_code_strict'
            }
          ],
          notation: [
            {
              element: '.new_year_code_number',
              config: {
                type: 'box',
                color: COLOR_LIST[5]
              }
            },
            {
              element: '.new_year_code_strict',
              config: {
                type: 'highlight',
                color: COLOR_LIST[5]
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
                type: 'circle',
                color: COLOR_LIST[5]
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
          value: '',
          element: LikeAnimation
        },
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
const COLOR_LIST = ['red', 'yellow', 'green', 'pink', '#0f0', 'blue']
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
    value && EVENT_EMITTER.emit(EVENT_EMITTER_LISTENER.POST_MESSAGE, value)
    if (responseCallback.current) return
    let nextMessage: LifecycleDataSourceItem | undefined
    // 当前消息已经没有了
    if (!dataSourceRef.current![currentDataSource.current!].length) {
      nextMessage = {
        ...getCommonPrompt(optionsCounter.current === options.current.length),
        options: options.current
      }
    } else {
      nextMessage = dataSourceRef.current![currentDataSource.current!].shift()
    }
    responseCallback.current = nextMessage?.options
    if (nextMessage) {
      const { skip } = nextMessage
      setLifecycleList(prev => [...prev, nextMessage!])

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
      const isMulti = Array.isArray(element)
      if (isMulti) {
        children = (
          <MultiMessageWrapper id={key} onComplete={onComplete.bind(null, item)} value={element} />
        )
      } else {
        const { element: Element, value, wrapperStyle, ...nextProps } = element
        children = (
          <Element
            {...nextProps}
            id={key}
            onComplete={onComplete.bind(null, item)}
            value={value}
          />
        )
      }
      return (
        <MessageBubble id={key} key={key} direction={direction} wrapperStyle={isMulti ? {} : (element as LifecycleDataSourceItemElement).wrapperStyle}>
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