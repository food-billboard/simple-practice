import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import EventEmitter from 'eventemitter3'
import { useGetState } from 'ahooks'
import { isEqual } from 'lodash'
import { CARD } from './constants'
import './index.css'

function sleep(timeout=1500): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

type ConditionClickParams = (returnValue?: {
  skip: number 
}) => void

type ConditionType = {
  value: {
    title: string 
    onClick?: (resolve: ConditionClickParams) => void 
  }[]
}

type MessageType = {
  key: string 
  // 文字内容
  content: ReactNode
  // 延迟 
  interval?: number  
  // 条件
  condition?: ConditionType
  // 等待
  wait?: () => Promise<{
    skip: number
  } | void>
  // 跳过
  skip?: number 
  origin?: any 
}

function restartGame(resolve: any) {
  EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CARD_OPEN_CHANGE, false)
  sleep(1000)
  .then(() => {
    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_START)
    resolve()
  })
}

const TRANSFORM_MAP = [
  {
    title: '第1行和第2行交换',
    action: async () => {
      const { data } = GAME_INFO
      GAME_INFO.history.push([...data])
      let changePosition: [number, number, number, number][] = []
      new Array(4).fill(0).forEach((_, index) => {
        changePosition.push([
          index, 0,
          index, 1
        ])
        let temp = data[index] 
        data[index] = data[index + 4]
        data[index + 4] = temp 
      })
      GAME_INFO.data = data 
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CARD_POSITION_CHANGE, changePosition)
      await sleep(1000)
    }
  },
  {
    title: '第2行和第3行交换',
    action: async () => {
      const { data } = GAME_INFO
      GAME_INFO.history.push([...data])
      let changePosition: [number, number, number, number][] = []
      new Array(4).fill(0).forEach((_, index) => {
        changePosition.push([
          index, 1,
          index, 2
        ])
        let temp = data[index + 4] 
        data[index + 4] = data[index + 4 * 2]
        data[index + 4 * 2] = temp 
      })
      GAME_INFO.data = data 
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CARD_POSITION_CHANGE, changePosition)
      await sleep(1000)
    }
  },
  {
    title: '第3行和第4行交换',
    action: async () => {
      const { data } = GAME_INFO
      GAME_INFO.history.push([...data])
      let changePosition: [number, number, number, number][] = []
      new Array(4).fill(0).forEach((_, index) => {
        changePosition.push([
          index, 2,
          index, 3
        ])
        let temp = data[index + 4 * 2] 
        data[index + 4 * 2] = data[index + 4 * 3]
        data[index + 4 * 3] = temp 
      })
      GAME_INFO.data = data 
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CARD_POSITION_CHANGE, changePosition)
      await sleep(1000)
    }
  },
  {
    title: '第1行和第3行交换',
    action: async () => {
      const { data } = GAME_INFO
      GAME_INFO.history.push([...data])
      let changePosition: [number, number, number, number][] = []
      new Array(4).fill(0).forEach((_, index) => {
        changePosition.push([
          index, 0,
          index, 2
        ])
        let temp = data[index] 
        data[index] = data[index + 4 * 2]
        data[index + 4 * 2] = temp 
      })
      GAME_INFO.data = data 
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CARD_POSITION_CHANGE, changePosition)
      await sleep(1000)
    }
  },
  {
    title: '第1行和第4行交换',
    action: async () => {
      const { data } = GAME_INFO
      GAME_INFO.history.push([...data])
      let changePosition: [number, number, number, number][] = []
      new Array(4).fill(0).forEach((_, index) => {
        changePosition.push([
          index, 0,
          index, 3
        ])
        let temp = data[index] 
        data[index] = data[index + 4 * 3]
        data[index + 4 * 3] = temp 
      })
      GAME_INFO.data = data 
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CARD_POSITION_CHANGE, changePosition)
      await sleep(1000)
    }
  },
  {
    title: '第2行和第4行交换',
    action: async () => {
      const { data } = GAME_INFO
      GAME_INFO.history.push([...data])
      let changePosition: [number, number, number, number][] = []
      new Array(4).fill(0).forEach((_, index) => {
        changePosition.push([
          index, 1,
          index, 3
        ])
        let temp = data[index + 4] 
        data[index + 4] = data[index + 4 * 3]
        data[index + 4 * 3] = temp 
      })
      GAME_INFO.data = data 
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CARD_POSITION_CHANGE, changePosition)
      await sleep(1000)
    }
  },
  {
    title: '第1列和第2列交换',
    action: async () => {
      const { data } = GAME_INFO
      GAME_INFO.history.push([...data])
      let changePosition: [number, number, number, number][] = []
      new Array(4).fill(0).forEach((_, index) => {
        changePosition.push([
          0, index,
          1, index
        ])
        let temp = data[index * 4] 
        data[index * 4] = data[index * 4 + 1]
        data[index * 4 + 1] = temp 
      })
      GAME_INFO.data = data 
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CARD_POSITION_CHANGE, changePosition)
      await sleep(1000)
    }
  },
  {
    title: '第2列和第3列交换',
    action: async () => {
      const { data } = GAME_INFO
      GAME_INFO.history.push([...data])
      let changePosition: [number, number, number, number][] = []
      new Array(4).fill(0).forEach((_, index) => {
        changePosition.push([
          1, index,
          2, index
        ])
        let temp = data[index * 4 + 1] 
        data[index * 4 + 1] = data[index * 4 + 2]
        data[index * 4 + 2] = temp 
      })
      GAME_INFO.data = data 
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CARD_POSITION_CHANGE, changePosition)
      await sleep(1000)
    }
  },
  {
    title: '第3列和第4列交换',
    action: async () => {
      const { data } = GAME_INFO
      GAME_INFO.history.push([...data])
      let changePosition: [number, number, number, number][] = []
      new Array(4).fill(0).forEach((_, index) => {
        changePosition.push([
          2, index,
          3, index
        ])
        let temp = data[index * 4 + 2] 
        data[index * 4 + 2] = data[index * 4 + 3]
        data[index * 4 + 3] = temp 
      })
      GAME_INFO.data = data 
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CARD_POSITION_CHANGE, changePosition)
      await sleep(1000)
    }
  },
  {
    title: '第1列和第3列交换',
    action: async () => {
      const { data } = GAME_INFO
      GAME_INFO.history.push([...data])
      let changePosition: [number, number, number, number][] = []
      new Array(4).fill(0).forEach((_, index) => {
        changePosition.push([
          0, index,
          2, index
        ])
        let temp = data[index * 4] 
        data[index * 4] = data[index * 4 + 2]
        data[index * 4 + 2] = temp 
      })
      GAME_INFO.data = data 
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CARD_POSITION_CHANGE, changePosition)
      await sleep(1000)
    }
  },
  {
    title: '第1列和第4列交换',
    action: async () => {
      const { data } = GAME_INFO
      GAME_INFO.history.push([...data])
      let changePosition: [number, number, number, number][] = []
      new Array(4).fill(0).forEach((_, index) => {
        changePosition.push([
          0, index,
          3, index
        ])
        let temp = data[index * 4] 
        data[index * 4] = data[index * 4 + 3]
        data[index * 4 + 3] = temp 
      })
      GAME_INFO.data = data 
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CARD_POSITION_CHANGE, changePosition)
      await sleep(1000)
    }
  },
  {
    title: '第2列和第4列交换',
    action: async () => {
      const { data } = GAME_INFO
      GAME_INFO.history.push([...data])
      let changePosition: [number, number, number, number][] = []
      new Array(4).fill(0).forEach((_, index) => {
        changePosition.push([
          1, index,
          3, index
        ])
        let temp = data[index * 4 + 1] 
        data[index * 4 + 1] = data[index * 4 + 3]
        data[index * 4 + 3] = temp 
      })
      GAME_INFO.data = data 
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CARD_POSITION_CHANGE, changePosition)
      await sleep(1000)
    }
  },
  {
    title: '顺时针旋转90度',
    action: async () => {
      const { data } = GAME_INFO
      GAME_INFO.history.push([...data])

      let changePosition: [number, number, number, number][] = []

      const verticalRef = new Array(4).fill(0).map((_, index) => {
        return new Array(4).fill(0).map((_, ind) => {
          return {
            value: data[index + ind * 4],
            position: [ index, ind ]
          }
        })
      })
      const newData = verticalRef.reduce<string[]>((acc, cur, index) => {
        const temp = [...cur].reverse()
        temp.forEach((item, ind) => {
          const { value, position } = item 
          const currentPosition = [ind, index]
          // 发生改变
          if(!isEqual(position, currentPosition)) {
            const isExists = changePosition.some(item => {
              return (
                (isEqual(item.slice(0, 2), position) && isEqual(item.slice(2), currentPosition)) || 
                (isEqual(item.slice(0, 2), currentPosition) && isEqual(item.slice(2), position))
              )
            })
            if(!isExists) changePosition.push([...position, ...currentPosition] as [number, number, number, number])
          }
          acc.push(value)
        })
        return acc 
      }, [])

      GAME_INFO.data = newData 
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CARD_POSITION_CHANGE, changePosition, true)
      await sleep(1000)
    }
  },
  {
    title: '逆时针旋转90度',
    action: async () => {
      const { data } = GAME_INFO
      GAME_INFO.history.push([...data])

      let changePosition: [number, number, number, number][] = []

      const verticalRef = new Array(4).fill(0).map((_, index) => {
        return new Array(4).fill(0).map((_, ind) => {
          return {
            value: data[index + ind * 4],
            position: [ index, ind ]
          }
        })
      })
      const newData = verticalRef.reduceRight<string[]>((acc, cur, index) => {
        cur.forEach((item, ind) => {
          const { value, position } = item 
          const currentPosition = [ind, 3 - index]
          // 发生改变
          if(!isEqual(position, currentPosition)) {
            const isExists = changePosition.some(item => {
              return (
                (isEqual(item.slice(0, 2), position) && isEqual(item.slice(2), currentPosition)) || 
                (isEqual(item.slice(0, 2), currentPosition) && isEqual(item.slice(2), position))
              )
            })
            if(!isExists) changePosition.push([...position, ...currentPosition] as [number, number, number, number])
          }
          acc.push(value)
        })
        return acc 
      }, [])

      GAME_INFO.data = newData 
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CARD_POSITION_CHANGE, changePosition, true)
      await sleep(1000)
    }
  },
  {
    title: '正反斜角交换',
    action: async () => {
      const { data } = GAME_INFO
      GAME_INFO.history.push([...data])
      let changePosition: [number, number, number, number][] = []
      new Array(4).fill(0).forEach((_, index) => {
        changePosition.push([
          index, index,
          3 - index, index
        ])
        let temp = data[index * 4 + index] 
        data[index * 4 + index] = data[index * 4 + 3 - index]
        data[index * 4 + 3 - index] = temp 
      })
      GAME_INFO.data = data 
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CARD_POSITION_CHANGE, changePosition)
      await sleep(1000)
    }
  },
  {
    title: '正反斜角上下交换',
    action: async () => {
      const { data } = GAME_INFO
      GAME_INFO.history.push([...data])
      let changePosition: [number, number, number, number][] = [
        [ 0, 0, 0, 3 ],
        [ 1, 1, 1, 2 ],
        [ 3, 0, 3, 3 ],
        [ 2, 1, 2, 2 ]
      ]

      changePosition.forEach(item => {
        const [ x1, y1, x2, y2 ] = item 
        let temp = data[y1 * 4 + x1] 
        data[y1 * 4 + x1] = data[y2 * 4 + x2]
        data[y2 * 4 + x2] = temp 
      })

      GAME_INFO.data = data 
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CARD_POSITION_CHANGE, changePosition)
      await sleep(1000)
    }
  },
  ...new Array(4).fill(0).map((item, index) => {
    const ind = index + 1
    return {
      title: `忽略前${ind}步`,
      necessary: ind,
      // 生成时验证
      validate: (currentDataSource: MessageType[]) => {
        return currentDataSource.reduce((acc, cur) => {
          acc += (1 - (cur.origin.necessary || 0))
          return acc 
        }, 0) > ind
      },
      action: async () => {
        const [ target ] = GAME_INFO.history.splice(-ind, ind)
        GAME_INFO.data = [...target]

        EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CARD_RECALL, target)
      }
    }
  }),
]

// 介绍的信息
const INTRODUCE_MAP: MessageType[] = [
  {
    key: '1',
    content: '你好啊！',
  },
  {
    key: '2',
    content: '马上就是愚人节了',
  },
  {
    key: '3',
    content: '让我们来玩一个简单的小游戏',
  },
  {
    key: '4',
    content: '考验一下你的记忆力',
  },
  {
    key: '5',
    content: '我们按照步骤随机打乱卡牌',
  },
  {
    key: '6',
    content: '你能正确找到joker的位置吗?',
  }
]

// 开头的信息
const MESSAGE_MAP: MessageType[] = [
  {
    key: '7',
    content: '那么正式开始吧!',
    wait: async () => {
      return new Promise(resolve => {
        const onCardCreateComplete = (position: { x: number, y: number }, value: ReturnType<typeof generateCard>) => {
          const { x, y } = position
          GAME_INFO.data[y * 4 + x] = value.value

          if(GAME_INFO.data.length === 16) {
            EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_CARD_RESTART_COMPLETE, onCardCreateComplete)
            // 翻牌
            EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CARD_OPEN_CHANGE, true)
            resolve(null)
          }
        }
        GAME_INFO.data = []
        EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_CARD_RESTART_COMPLETE, onCardCreateComplete)
        // 生成牌
        EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CARD_RESTART, { x: Math.floor(Math.random() * 4), y: Math.floor(Math.random() * 4) })
      })
      .then(() => sleep())
    }
  },
  {
    key: '8',
    content: '首先花8秒记住现在joker的位置!',
    interval: 8000
  },
  {
    key: '9',
    content: '时间到，正式开始!',
    wait: async () => {
      // 翻牌
      return new Promise(resolve => {
        EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CARD_OPEN_CHANGE, false)
        sleep().then(resolve)
      })
    }
  }
]

// 结尾的信息
const GAME_END_MAP: MessageType[] = [
  {
    key: '10',
    content: 'OK，所有步骤完成'
  },
  {
    key: '11',
    content: '请确定卡牌的位置并点击',
    wait: async () => {
      return new Promise(resolve => {
        const onCardOpen = (value: string) => {
          // 确定是否正确 
          if(value.toString() === '14') {
            resolve({
              skip: 2
            })
          }else {
            resolve()
          }
        }
        EVENT_EMITTER.once(EVENT_EMITTER_NAME.ON_CARD_OPEN, onCardOpen)
        GAME_INFO.canClick = true 
      })
    }
  },
  {
    key: '12',
    content: '恭喜你，猜错了！'
  },
  {
    key: '13',
    content: '是否明牌复刻?',
    condition: {
      value: [
        {
          title: '是',
          onClick: (resolve) => {
            // 明牌
            EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CARD_OPEN_CHANGE, true)
            sleep(1000)
            .then(() => {
              return new Promise(resolve => {
                EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CARD_OPEN_REVIEW, resolve)
              })
            })
            .then(() => {
              resolve({
                skip: 1
              })
            })
          }
        },
        {
          title: '否',
          onClick: (resolve) => {
            restartGame(() => {
              resolve({
                skip: 2
              })
            })
          }
        }
      ]
    }
  },
  {
    key: '14',
    content: '恭喜你，猜对了！',
    skip: 1,
    condition: {
      value: [
        {
          title: '点我重新开始',
          onClick: restartGame
        }
      ]
    }
  },
  {
    key: '15',
    content: '明牌操作结束！',
    condition: {
      value: [
        {
          title: '点我重新开始',
          onClick: restartGame
        }
      ]
    }
  },
]

const CARD_KEYS = Object.keys(CARD)
const CARD_NORMAL_KEYS = CARD_KEYS.filter(item => !~['0', '14'].indexOf(item))

const EVENT_EMITTER = new EventEmitter()
const EVENT_EMITTER_NAME = {
  // 游戏开始
  ON_GAME_START: "ON_GAME_START",
  // 游戏结束
  ON_GAME_OVER: "ON_GAME_OVER",
  // 重新生成牌
  ON_CARD_RESTART: "ON_CARD_RESTART",
  // 牌创建完成
  ON_CARD_RESTART_COMPLETE: "ON_CARD_RESTART_COMPLETE",
  // 翻牌
  ON_CARD_OPEN: "ON_CARD_OPEN",
  // 位置变换
  ON_CARD_POSITION_CHANGE: "ON_CARD_POSITION_CHANGE",
  // 卡片代码翻牌变化
  ON_CARD_OPEN_CHANGE: "ON_CARD_OPEN_CHANGE",
  // 明牌
  ON_CARD_OPEN_REVIEW: "ON_CARD_OPEN_REVIEW",
  // 步骤回溯
  ON_CARD_RECALL: "ON_CARD_RECALL"
}
const GAME_INFO: {
  canClick: boolean 
  data: string[] 
  isFist: boolean 
  history: string[][]
} = {
  // 是否可以点击翻牌
  canClick: false,
  // 宫格数据
  data: [],
  // 是否是第一次
  isFist: true,
  history: []
}

// 生成卡片
const generateCard = ({
  isJoker = false,
  isBack = false,
  custom
}: {
  isJoker?: boolean
  isBack?: boolean
  custom?: string 
}) => {
  let result: string
  let value: string
  if(custom) {
    result = (CARD as any)[custom]
    value = custom
  }else if (isJoker) {
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

// 生成步骤
const generateStep: () => MessageType[] = (counter=15) => {
  const prefix = `${Date.now()}${Math.random()}${Math.random()}`
  return new Array(counter).fill(0).reduce((acc, item, ind) => {
    let result: any
    while(!result) {
      const index = Math.floor(Math.random() * TRANSFORM_MAP.length)
      result = TRANSFORM_MAP[index]
      if(result.validate) {
        result = result.validate(acc, counter) ? result : undefined
      }
    }
    acc.push({
      key: `${prefix}_${ind}`, 
      content: result!.title,
      wait: result!.action,
      origin: result 
    })
    return acc 
  }, [])
}

const BACK_CARD_PROPS = generateCard({ isBack: true })

const Card = (props: {
  x: number
  y: number
}) => {

  const { x, y } = props

  const [frontProps, setFrontProps] = useState<ReturnType<typeof generateCard>>()
  const [currentFront, setCurrentFront] = useState(false)
  const [ currentRotate, setCurrentRotate ] = useState(false)
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
      GAME_INFO.canClick = false
      sleep().then(() => {
        EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CARD_OPEN, cardValue.current)
      })
    }
  }, [])

  useEffect(() => {
    // 回溯
    const onCardRecall = (target: string[]) => {
      const { x, y } = getPosition()
      const targetItem = target[y * 4 + x]
      if(targetItem !== cardValue.current) {
        const result = generateCard({ custom: targetItem })
        cardValue.current = targetItem
        setFrontProps(result)
      }
      setCurrentRotate(prev => !prev)
    }
    // 卡片值改变
    const onCardChange = (position: { x: number, y: number }) => {
      const { x, y } = getPosition()
      const result = generateCard({ isJoker: x === position.x && y === position.y })
      cardValue.current = result.value
      setFrontProps(result)
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CARD_RESTART_COMPLETE, getPosition(), result)
    }
    // 卡片位置改变
    const onCardPositionChange = (changePosition: any, isSingle: boolean /*是否单向修改*/) => {
      const { x, y } = getPosition()
      changePosition.some((item: any) => {
        // 换位置
        if(item.length === 4) {
          const [ x1, y1, x2, y2 ] = item
          if(x1 === x && y1 === y) {
            setPosition(prev => {
              return {
                ...prev,
                x: x2,
                y: y2 
              }
            })
            return true 
          }else if(x2 === x && y2 === y && !isSingle) {
            setPosition(prev => {
              return {
                ...prev,
                x: x1,
                y: y1 
              }
            })
            return true 
          } 
        }
        // 换位置+换值
        else {
           
        }
        return false
      })
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

    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_CARD_RECALL, onCardRecall)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_CARD_OPEN_CHANGE, onCardRotate)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_START, onGameStart)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_CARD_RESTART, onCardChange)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_CARD_POSITION_CHANGE, onCardPositionChange)

    return () => {
      EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_CARD_RECALL, onCardRecall)
      EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_CARD_OPEN_CHANGE, onCardRotate)
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
        transform: `translateX(${position.x * 100}%) translateY(${position.y * 100}%) rotateZ(${currentRotate ? 0 : 180}deg) rotateY(${currentFront ? 0 : 180}deg)`
      }}
      onClick={handleClick}
    >
      <div className={"home-page-card-front"} style={frontProps?.style}>

      </div>
      <div className={"home-page-card-back"} style={BACK_CARD_PROPS.style}>

      </div>
    </div>
  )

}

const RightMessage = () => {

  const [ infoList, setInfoList ] = useState<MessageType[]>([])
  const [ condition, setCondition ] = useState<ConditionType & {
    nextLoop: ConditionClickParams
  }>()

  const gameList = useRef<MessageType[]>([])

  useEffect(() => {

    // 数据执行
    const messageDeal = async (messageList: MessageType[]) => {
      let skip = 0 
    
      for(let i = 0; i < messageList.length; i ++) {
        if(!!skip) {
          skip -- 
          continue
        }
        const { interval, condition, wait, skip: nextSkip=0 } = messageList[i]
        skip = nextSkip
        await new Promise(resolve => {
          setCondition(condition ? {
            ...condition,
            nextLoop: (returnValue) => {
              if(returnValue) {
                skip = returnValue.skip
              }
              resolve(null)
            }
          } : condition)
          setInfoList(prev => {
            let newList = [...prev]
            newList.unshift(messageList[i])
            if(newList.length > 10) {
              return newList.slice(0, 10)
            }
            return newList 
          })
          if(!condition) sleep(interval).then(resolve)
        })
        if(wait) await wait().then((value) => {
          if(value) {
            skip = value.skip
          }
        })
      }
    }

    // 明牌
    const onCardOpenReview = async (callback: any) => {
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CARD_OPEN_CHANGE, true)
      await sleep()
      setInfoList(() => [])
      await messageDeal(gameList.current)
      callback()
    }

    // 一开始的文字提示
    const message = async () => {
      setInfoList(() => [])
      let messageList: MessageType[] = []
      // 第一次
      if(GAME_INFO.isFist) {
        GAME_INFO.isFist = false 
        messageList.push(...INTRODUCE_MAP)
      }
      gameList.current = generateStep()
      messageList.push(...MESSAGE_MAP, ...gameList.current, ...GAME_END_MAP)

      await messageDeal(messageList)
    
    }

    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_START, message)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_CARD_OPEN_REVIEW, onCardOpenReview)

    return () => {
      EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_START, message)
      EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_CARD_OPEN_REVIEW, onCardOpenReview)
    }
  }, [])

  return (
    <div className="home-page-message-list">
      <div className="home-page-message-list-content">
        {
          infoList.map(item => {
            const { key, content } = item 
            return (
              <div key={key} className="home-page-message-item">
                <div
                  className="home-page-message-item-avatar"
                />
                <div className="home-page-message-item-content">
                  {content}
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="home-page-message-condition">
        {
          !!condition && (
            condition.value.map(item => {
              const { nextLoop } = condition
              const { title, onClick } = item 
              return (
                <div
                  onClick={() => {
                    onClick?.(nextLoop)
                  }}
                  key={title}
                >
                  {title}
                </div>
              )
            })
          )
        }
      </div>
    </div>
  )

}

const Home = () => {

  const [ size, setSize ] = useState({ width: 0, height: 0 })

  const contentRef = useRef<HTMLDivElement>(null)

  const cardList = useMemo(() => {
    return new Array(16).fill(0).map((item, index) => {
      return (
        <Card
          // @ts-ignore 
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

  useEffect(() => {
    const onGameStart = () => {
      GAME_INFO.history = []
    }
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_START, onGameStart)
    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_START)
    return () => {
      EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_START, onGameStart)
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
          <div 
            className="home-page-right"
            style={{
              height: realHeight
            }}
          >
            <RightMessage />
          </div>
        </div>
      </div>
    </div>
  )

}

export default Home