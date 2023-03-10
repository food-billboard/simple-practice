import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import EventEmitter from 'eventemitter3'
import { useGetState, useSize } from 'ahooks'
import { CARD } from './constants'
import './index.css'

const CARD_KEYS = Object.keys(CARD)
const CARD_NORMAL_KEYS = CARD_KEYS.filter(item => !['0', '14'].includes(item))

const EVENT_EMITTER = new EventEmitter()
const EVENT_EMITTER_NAME = {
  // 游戏开始
  ON_GAME_START: "ON_GAME_START",
  // 游戏结束
  ON_GAME_OVER: "ON_GAME_OVER",
  // 重新生成牌
  ON_CARD_RESTART: "ON_CARD_RESTART",
  // 可以翻牌
  ON_CARD_OPEN_START: "ON_CARD_OPEN_START",
  // 翻牌结束
  ON_CARD_OPEN_END: "ON_CARD_OPEN_END",
  // 翻牌
  ON_CARD_OPEN: "ON_CARD_OPEN",
  // 位置变换
  ON_CARD_POSITION_CHANGE: "ON_CARD_POSITION_CHANGE",
  // 卡片关闭
  ON_CARD_CLOSE: "ON_CARD_CLOSE"
}
const GAME_INFO = {
  // 是否可以点击翻拍
  canClick: false
}

const generateCard = ({
  isJoker = false,
  isBack = false
}: {
  isJoker?: boolean
  isBack?: boolean
}) => {
  let result: string
  let value: string
  if (isJoker) {
    result = CARD['14']
    value = '14'
  } else if (isBack) {
    result = CARD['0']
    value = '0'
  } else {
    value = CARD_NORMAL_KEYS[Math.floor(Math.random() * CARD_NORMAL_KEYS.length)]
    result = (CARD as any)[value]
  }
  return {
    style: {
      backgroundImage: `url(${result})`
    },
    value
  }
}

const BACKG_CARD_PROPS = generateCard({ isBack: true })

const Card = (props: {
  x: number
  y: number
}) => {

  const { x, y } = props

  const [frontProps, setFrontProps] = useState<ReturnType<typeof generateCard>>()
  const [currentFront, setCurrentFront] = useState(false)
  const [position, setPosition, getPosition] = useGetState({
    x,
    y,
    initial: {
      x,
      y
    }
  })

  const instance = useRef<HTMLDivElement>(null)
  // 卡牌的值
  const cardValue = useRef<string>()

  // 点击
  const handleClick = useCallback(() => {
    if (GAME_INFO.canClick) {
      setCurrentFront(() => {
        return true
      })
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CARD_OPEN, cardValue.current)
      GAME_INFO.canClick = false
    }
  }, [])

  useEffect(() => {
    // 卡片值改变
    const onCardChange = (isJoker: boolean) => {
      const result = generateCard({ isJoker })
      cardValue.current = result.value
      setFrontProps(result)
    }
    // 卡片位置改变
    const onCardPositionChange = (type: string) => {
      // TODO 
      // 根据不同的类型做相应的变换
    }
    // 游戏开始
    const onGameStart = () => {
      setPosition(prev => {
        return {
          ...prev,
          ...prev.initial
        }
      })
    }
    // 翻转
    const onCardRotate = (isOpen: boolean) => {
      setCurrentFront(isOpen)
    }

    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_CARD_CLOSE, onCardRotate)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_START, onGameStart)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_CARD_RESTART, onCardChange)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_CARD_POSITION_CHANGE, onCardPositionChange)

    return () => {
      EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_CARD_CLOSE, onCardRotate)
      EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_START, onGameStart)
      EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_CARD_RESTART, onCardChange)
      EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_CARD_POSITION_CHANGE, onCardPositionChange)
    }
  }, [])

  return (
    <div
      className="home-page-card"
      ref={instance}
      style={{
        transform: `translateX(${position.x * 100}%) translateY(${position.y * 100}%) rotateY(${currentFront ? 0 : 180}deg)`
      }}
      onClick={handleClick}
    >
      <div className={"home-page-card-front"} style={frontProps?.style}>

      </div>
      <div className={"home-page-card-back"} style={BACKG_CARD_PROPS.style}>

      </div>
    </div>
  )

}

const RightMessage = () => {

  return (
    <div>2222</div>
  )

}

const Home = () => {

  const [ size, setSize ] = useState({ width: 0, height: 0 })

  const contentRef = useRef<HTMLDivElement>(null)

  const cardList = useMemo(() => {
    return new Array(16).fill(0).map((item, index) => {
      return (
        <Card
          key={index}
          x={index % 4}
          y={Math.floor(index / 4)}
        />
      )
    })
  }, [])

  const { realWidth, realHeight } = useMemo(() => {
    const { width = 0, height = 0 } = size || {}
    let realWidth = Math.min(Math.max(118, width), 472 * 2)
    let realHeight = realWidth * 164 / 118

    if (realHeight > height * 0.8) {
      realHeight = height * 0.8
      realWidth = 118 / 164 * realHeight
    }

    return {
      realWidth,
      realHeight
    }
  }, [size])

  useEffect(() => {
    const onResize = () => {
      const { width=0, height=0 } = contentRef.current?.getBoundingClientRect() || {}
      setSize({
        width,
        height
      })
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div
      className="home-page"
      ref={contentRef}
    >
      <div className="home-page-wrapper">
        <div
          className="home-page-main"
        >
          <div
            className="home-page-left"
            style={{
              width: realWidth,
              height: realHeight
            }}
          >
            {cardList}
          </div>
          <div className="home-page-right">
            <RightMessage />
          </div>
        </div>
      </div>
    </div>
  )

}

export default Home