import { useState, useCallback, useEffect, useRef } from 'react'
import EventEmitter from 'eventemitter3'
import debounce from 'debounce'
import {  
  Button,
  InputNumber,
  Modal,
  Radio, 
  RadioGroup
} from 'rsuite'
import {
  Engine,
  Render,
  Runner,
  Body,
  Events,
  Composite,
  Bodies,
  World
} from 'matter-js'
import 'rsuite/dist/rsuite.min.css'
import 'animate.css'
import './index.css'

const EVENT_EMITTER = new EventEmitter()

const WORD_MAP = [
  "升官发财", "五福临门",
  ...new Array(100).fill(0).map((item, index) => `${Date.now()}_${Math.random()}_${index}`)
]
const WORD_ALL_MAP = [
  ...WORD_MAP
]

let GAME_DATA = {
  word: [] as string[],
  preset: {
    winType: '0', // 0 时间 1 分数
    winValue: 60, // 胜利条件值
  },
}

class Collision {

  constructor(options: {
    onCollision: (bodyA: any, bodyB: any) => void
    onSleep: (data: any) => void
    engine: Engine
  }) {
    this.eventBind(options.engine)
    this.onCollision = options.onCollision
    this.onSleep = options.onSleep
  }

  onCollision
  onSleep 

  collisionMap: {
    [key: string]: any 
  } = {}

  collisionTimeout: {
    [key: string]: any 
  } = {}

  onCollisionStart = (event: any) => {
    event.pairs.forEach((pair: any) => {
      const { bodyA, bodyB } = pair
      const collisionMapKeyA = bodyA.id + "--" + bodyB.id
      const collisionMapKeyB = bodyB.id + "--" + bodyA.id
      // 去除之前的碰撞
      delete this.collisionMap[collisionMapKeyA]
      delete this.collisionMap[collisionMapKeyB]
      clearTimeout(this.collisionTimeout[collisionMapKeyA])
      clearTimeout(this.collisionTimeout[collisionMapKeyB])
      delete this.collisionTimeout[collisionMapKeyA]
      delete this.collisionTimeout[collisionMapKeyB]

      this.collisionMap[collisionMapKeyA] = pair

      this.onCollision(bodyA, bodyB)


      // 1s 后碰撞仍然存在则确定为静止
      this.collisionTimeout[collisionMapKeyA] = setTimeout(() => {
        if (this.collisionMap[collisionMapKeyA]) {
          const target = this.collisionMap[collisionMapKeyA]
          this.onSleep(target)
          delete this.collisionMap[collisionMapKeyA]
          delete this.collisionTimeout[collisionMapKeyA]
        }
      }, 1000)
    })
  }

  onCollisionEnd = (event: any) => {
    event.pairs.forEach((pair: any) => {
      const { bodyA, bodyB } = pair
      const collisionMapKeyA = bodyA.id + "--" + bodyB.id
      const collisionMapKeyB = bodyB.id + "--" + bodyA.id
      delete this.collisionMap[collisionMapKeyA]
      delete this.collisionMap[collisionMapKeyB]
      clearTimeout(this.collisionTimeout[collisionMapKeyA])
      clearTimeout(this.collisionTimeout[collisionMapKeyB])
      delete this.collisionTimeout[collisionMapKeyA]
      delete this.collisionTimeout[collisionMapKeyB]
    })
  }

  reset() {
    // 去除碰撞key缓存
    this.collisionMap = {}
    // 去除定时器
    Object.values(this.collisionTimeout).forEach((item) => clearTimeout(item))
    this.collisionTimeout = {}
  }

  eventBind(engine: Engine) {
    Events.on(engine, "collisionStart", this.onCollisionStart)
    Events.on(engine, "collisionEnd", this.onCollisionEnd)
  }

  eventUnBind(engine: Engine) {
    Events.off(engine, "collisionStart", this.onCollisionStart)
    Events.off(engine, "collisionEnd", this.onCollisionEnd)
  }
}

type CommonProps = {
  currentStep: number
  onNextStep: () => void 
}

const SuccessModal = (props: {

} & CommonProps) => {

  const { onNextStep } = props 

  return (
    <Modal>
       <Modal.Header>
        <Modal.Title>收集完成！</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        222222
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onNextStep} appearance="primary">
          重新试试
        </Button>
      </Modal.Footer>
    </Modal>
  )

}

const GameCanvas = (props: {

} & CommonProps) => {

  const { currentStep, onNextStep } = props 

  const [ winValue, setWinValue ] = useState(GAME_DATA.preset.winValue)

  const EngineInstance = useRef<Engine>()
  const WorldInstance = useRef<World>()
  const RenderInstance = useRef<Render>()
  const RunnerInstance = useRef<Runner>()
  const collisionInstance = useRef<Collision>()

  const isWin = useCallback(() => {
    return GAME_DATA.preset.winValue <= winValue
  }, [winValue])

  // 随机掉落词语
  const createWord = useCallback(() => {

  }, [])

  // 创建初始物体
  const initExtraBody = useCallback(() => {

  }, [])

  // 键盘事件绑定
  const keybordEventBind = useCallback(() => {

  }, [])

  // 碰撞
  const onCollision = useCallback(() => {

  }, [])

  // 静止
  const onSleep = useCallback(() => {

  }, [])

  // start game 
  useEffect(() => {
    let winValue = GAME_DATA.preset.winValue
    setWinValue(winValue)
    if(currentStep === 2 && GAME_DATA.preset.winType == '0') {
      const timeup = () => {
        setTimeout(() => {
          winValue -- 
          setWinValue(winValue)
          if(winValue > 0) {
            timeup()
          }else {
            onNextStep()
          }
        }, 1000)
      }
      timeup()
    }
  }, [currentStep])

  // init 
  useEffect(() => {
    const container = document.querySelector('#flag-getter-caontainer')
    const containerWidth = container?.clientWidth || 0
    const containerHeight = container?.clientHeight || 0
    // create engine
    EngineInstance.current = Engine.create()
    WorldInstance.current = EngineInstance.current!.world
    // create renderer
    RenderInstance.current = Render.create({
      canvas: document.querySelector('#flag-getter-canvas') as any,
      engine: EngineInstance.current,
      options: {
        width: containerWidth,
        height: containerHeight,
        wireframes: false,
        background: "transparent",
      },
    })
    Render.run(RenderInstance.current)
    // create runner
    RunnerInstance.current = Runner.create()
    Runner.run(RunnerInstance.current, EngineInstance.current)

    keybordEventBind()

    initExtraBody()

    collisionInstance.current = new Collision({
      engine: EngineInstance.current,
      onCollision,
      onSleep
    })
  }, [])

  useEffect(() => {
    const resize = () => {

    }
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div 
      className="flag-getter-main"
      style={{
        visibility: currentStep === 1 ? 'visible' : 'hidden'
      }}
    >
      <div className="flag-getter-score">{winValue}{GAME_DATA.preset.winType == '0' ? 's' : ''}</div>
      <canvas id="flag-getter-canvas" />
    </div>
  )
}

// 词云
const WorldCloud = (props: {
  value: string[]
  onChange: (value: string[]) => void 
}) => {

  const { value, onChange } = props 

  const wordStyleMap = useRef(WORD_MAP.map(() => {
    return { 
      fontSize: Math.ceil(Math.random() * 12 + 12) + 'px',
      animationDuration: Math.random() + 0.5 + 's'
    }
  }))

  const handleClick = useCallback((target: string) => {
    const newValue = [...value]
    const index = value.indexOf(target)
    if(!!~index) {
      newValue.splice(index, 1)
    }else {
      newValue.push(target)
    }
    onChange(newValue)
  }, [value, onChange])

  return (
    <div className="flag-getter-word-cloud">
      {
        WORD_MAP.map((item, index) => {
          const active = value.includes(item)
          return (
            <div
              onClick={() => handleClick(item)}
              key={item}
              style={{
                ...wordStyleMap.current[index],
                ...(active ? { color: 'red' } : {})
              }}
            >
              {item.slice(0, 4)}
            </div>
          )
        })
      }
    </div>
  )

}

const StartModal = (props: {

} & CommonProps) => {

  const { currentStep, onNextStep } = props 

  const [ winType, setWinType ] = useState(GAME_DATA.preset.winType)
  const [ winValue, setWinValue ] = useState(GAME_DATA.preset.winValue)
  const [ wordValue, setWordValue ] = useState<string[]>([])

  const handleClick = useCallback(() => {
    GAME_DATA.preset = {
      ...GAME_DATA.preset,
      winType,
      winValue
    }
    GAME_DATA.word = wordValue
    onNextStep()
  }, [winType, winValue, onNextStep, wordValue])

  useEffect(() => {
    setWinType(GAME_DATA.preset.winType)
    setWinValue(GAME_DATA.preset.winValue)
    setWordValue([])
  }, [currentStep])

  return (
    <div 
      id="flag-getter-starter"
      style={{
        visibility: currentStep === 0 ? 'visible' : 'hidden'
      }}
    >
      <h4>
        请选择你的新年<strong>flag</strong>
      </h4>
      <WorldCloud value={wordValue} onChange={setWordValue} />
      <h4>
        请选择目标
      </h4>
      <RadioGroup name="radioList" inline value={winType} onChange={value => setWinType(value as string)}>
        <Radio value="0">时间</Radio>
        <Radio value="1">分数</Radio>
      </RadioGroup>
      <InputNumber postfix={winType === '0' ? '秒' : '分'} value={winValue} onChange={value => setWinValue(value as number)} />
      <Button onClick={handleClick} appearance="primary">发起收集！</Button>
    </div>
  )
}

function App() {

  const [ currentStep, setCurrentStep ] = useState(0)

  const handleNext = useCallback(() => {
    setCurrentStep(prev => {
      return (prev + 1) % 3  
    })
  }, [])

  return (
    <div id="flag-getter-caontainer">
      <StartModal  
        currentStep={currentStep}
        onNextStep={handleNext}
      />
      <GameCanvas 
        currentStep={currentStep}
        onNextStep={handleNext}
      />
      <SuccessModal 
        currentStep={currentStep}
        onNextStep={handleNext}
      />
    </div>
  )
}

export default App
