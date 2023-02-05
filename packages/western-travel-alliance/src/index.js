
// constants
const Container = document.querySelector('#app')
const Canvas = document.querySelector('#canvas canvas')

const ContainerWidth = Container.clientWidth
const ContainerHeight = Container.clientHeight

// ------------images------------

// 测试图片
const TEST_IMAGE = "data:image/jpeg;base64,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" 
const ANOTHER_TEST_IMAGE = "data:image/jpeg;base64,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"
// 九宫格图片
const GRID_IMAGES = new Array(9).fill(TEST_IMAGE)
// 连线图片
const LINE_CONNECT_IMAGES = new Array(8).fill(TEST_IMAGE)
// 抽奖图片
const LUCKY_IMAGES = new Array(9).fill(0).map(item => Math.random() > 0.5 ? TEST_IMAGE : ANOTHER_TEST_IMAGE)

// ------------images------------

// eventemitter 
const EVENT_EMITTER = new EventEmitter()
const EVENT_EMITTER_NAME = {
  // 碰撞
  ON_COLLISION: 'ON_COLLISION',
  // 球体静止
  ON_SLEEP: 'ON_SLEEP',
  // 下一球
  ON_NEXT_BALL: 'ON_NEXT_BALL',
  // 下一步 
  // ? 用于在释放下一球之前做一些判断
  ON_NEXT: 'ON_NEXT',
  // 下一关
  ON_RESET: 'ON_RESET',
  // 游戏结束
  ON_GAME_OVER: 'ON_GAME_OVER',
  // 本关通关
  ON_GAME_WIN: 'ON_GAME_WIN',
  // 游戏开始 游戏暂停后开始
  ON_GAME_START: 'ON_GAME_START',
  // 游戏暂停 
  ON_GAME_STOP: 'ON_GAME_STOP',
  // 游戏启动 游戏一开始启动的时候
  ON_GAME_PLAY: 'ON_GAME_PLAY',
  // 游戏静止 游戏通过一关后的暂时静止
  ON_GAME_STATIC: 'ON_GAME_STATIC',
  // 游戏动画定时器
  ON_ANIMATION_REQUEST: 'ON_ANIMATION_REQUEST',
  // 转盘抽奖 触发抽奖
  ON_LUCKY: 'ON_LUCKY',
  // 转盘抽奖完成
  ON_LUCKY_DONE: 'ON_LUCKY_DONE',
  // 点亮宫格
  ON_GRID_LIGHTING: 'ON_GRID_LIGHTING',
  // 更新连线奖励
  ON_LINE_CONNECT: 'ON_LINE_CONNECT',
  // 积分
  ON_SCORE: 'ON_SCORE'
}

const LUCKY_TYPE_MAP = {
  // 分数增加
  SCORE: 'SCORE',
  // 连线点亮
  GRID_LIGHT: 'GRID_LIGHT'
}

// game info 
const GAME_DATA = {
  score: 0,
  currentStep: 0,
  lineConnectScore: [10, 30, 60, 100, 150, 240, 300, 400],
  step: [
    {
      hinder: [
        ...new Array(6).fill(0).map((_, index) => {
          return {
            position: {
              x: ContainerWidth / 7 * (index + 1),
              y: ContainerHeight / 5 * 1.2
            },
            lucky: false 
          }
        }),
        ...new Array(4).fill(0).map((_, index) => {
          return {
            position: {
              x: ContainerWidth / 5 * (index + 1),
              y: ContainerHeight / 5 * 1.7
            },
            lucky: false 
          }
        }),
        ...new Array(3).fill(0).map((_, index) => {
          return {
            position: {
              x: ContainerWidth / 4 * (index + 1),
              y: ContainerHeight / 5 * 2.2
            },
            lucky: false 
          }
        }),
        ...new Array(6).fill(0).map((_, index) => {
          return {
            position: {
              x: ContainerWidth / 7 * (index + 1),
              y: ContainerHeight / 5 * 2.7
            },
            lucky: false 
          }
        }),
        ...new Array(2).fill(0).map((_, index) => {
          return {
            position: {
              x: ContainerWidth / 3 * (index + 1),
              y: ContainerHeight / 5 * 3.2
            },
            lucky: true 
          }
        }),
      ],
      // 抽奖除亮灯外的其他奖励
      // score 积分
      lucky: [
        {
          type: LUCKY_TYPE_MAP.SCORE,
          value: 100,
          label: '100积分',
          image: ANOTHER_TEST_IMAGE
        }
      ],
      // 判断是否赢了
      isWin() {

      }
    }
  ]
}

// 缓存加载的图片
const IMAGE_MAP = {}

// utils 

// 图片加载
function loader(image, callback) {
  if(IMAGE_MAP[image]) return callback(IMAGE_MAP[image])
  const dom = new Image() 
  dom.src = image 
  dom.onload = () => {
		callback && callback(dom)
    IMAGE_MAP[image] = dom 
  }
}
function getCurrentStep() {
  return GAME_DATA.step[GAME_DATA.currentStep]
}
// 获取当前关卡的转盘图片数据
function getCurrentStepLucky() {
  return getCurrentStep().lucky
}
// 获取当前关卡的障碍数据
function getCurrentStepHinder() {
  return getCurrentStep().hinder
}
// 是否为球
function isBall(object) {
  return object.__internal_type__ === 'BALL'
}
// 是否为底
function isBottomBorder(object) {
  return object.__internal_type__ === 'BOTTOM_BORDER'
}
// 获取球的尺寸
function getBallSize() {
  return (ContainerWidth - BottomHinder.WIDTH * 0 - Border.BORDER_SIZE * 2) / 9 
}
// 唯一id
function uuid(prefix) {
  return (prefix || 'PREFIX') + Date.now() + Math.random() + Math.random()
}
// 是否为碰撞阻碍
function isHinder(object) {
  return object.__internal_type__ === 'HINDER'
}
//  是否为抽奖阻碍
function isLuckyHinder(object) {
  return isHinder(object) && !!object.__internal_lucky__
}

// ------------matter-js------------

const {
  Engine,
  Render,
  Runner,
  Body,
  Events: MatterEvents,
  Composite,
  Composites,
  Common,
  MouseConstraint,
  Mouse,
  Bodies
} = Matter

// create engine
const EngineInstance = Engine.create() 
const WorldInstance = EngineInstance.world 
// create renderer
const renderInstance = Render.create({
  canvas: Canvas,
  engine: EngineInstance,
  options: {
    width: ContainerWidth,
    height: ContainerHeight,
    wireframes: false,
    background: 'transparent',

    // showDebug: true,
    // showStats: true,
    // showPerformance: true,
    // showBounds: true,
    // showVelocity: true,
    // showCollisions: true,
    // showSeparations: true,
    // showAxes: true,
    // showPositions: true,
    // showAngleIndicator: true,
    // showIds: true,
    // showVertexNumbers: true,
    // showConvexHulls: true,
    // showInternalEdges: true,
    // showMousePosition: true
  }
})

Render.run(renderInstance)

// create runner 
const RunnerInstance = Runner.create() 
Runner.run(RunnerInstance, EngineInstance)

// ------------matter-js------------

// ------------konva------------

const Stage = new Konva.Stage({
	container: "#animation-canvas",
	width: ContainerWidth,
	height: ContainerHeight,
})

const Layer = new Konva.Layer()

Stage.add(Layer)

// ------------konva------------

// ------------event------------



// ------------event------------

// 球体
class Ball {

  constructor() {
    this.create()
    this.append()
    this.eventBind()
  }

  instance 

  disabled = false 
  died = false 

  create() {
    const size = getBallSize()
    this.instance = Bodies.circle(
      ContainerWidth / 2, 
      size / 2, 
      size / 2 - BottomHinder.WIDTH / 1.8, 
      { 
        render: { fillStyle: '#456' },
        __internal_type__: 'BALL',
        friction: 0.00001,
        restitution: 0.5,
        density: 0.001
      }
    )
  }

  append() {
    Composite.add(WorldInstance, [
      this.instance,
    ])
  }

  onSleep(target) {
    if(this.died || this.disabled) return 
    const { bodyA, bodyB } = target 
    if(bodyA.id === this.instance.id || bodyB.id === this.instance.id) {
      if(isBall(bodyA) && isBall(bodyB)) {
        EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_OVER)
      }else if((isBall(bodyA) || isBall(bodyB)) || (isBottomBorder(bodyA) || isBottomBorder(bodyB))) {
        EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_NEXT)
      }

    }
  }

  onGameOver() {
    this.died = true 
  }

  onCollision() {
    if(this.died || this.disabled) return 
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_SLEEP, this.onSleep, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_COLLISION, this.onCollision, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.onGameOver, this)
  }

  eventUnBind() {
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_SLEEP, this.onSleep)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_COLLISION, this.onCollision)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.onGameOver)
  }

}

// 阻碍点
class Hinder {

  constructor() {
    this.init()
    this.eventBind()
  }

  instances = {}
  static UNIT = 0.05

  disabled = false 

  init() {
    this.instance = {}
    this.create() 
    this.append()
  }

  create() {

    getCurrentStepHinder().forEach(hinder => {

      const { position, lucky } = hinder

      const __internal_type__ = "HINDER"
      const __internal_id__ = uuid('HINDER')
      const unit = getBallSize()
      const size = Hinder.UNIT * unit
      this.instances[__internal_id__] = Bodies.circle(
        position.x,
        position.y, 
        size, 
        { 
          __internal_type__,
          __internal_id__,
          __internal_lucky__: lucky,
          isStatic: true, 
          render: { fillStyle: lucky ? '#0ff' : '#060a19' } 
        }
      )
      
    })
  }

  append() {
    Composite.add(WorldInstance, Object.values(this.instances))
  }

  onCollision(bodyA, bodyB) {
    if(this.disabled) return 
    // 触发幸运抽奖
    if((isBall(bodyA) || isBall(bodyB) ) && (isLuckyHinder(bodyA) || isLuckyHinder(bodyB))) {
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_LUCKY)
    }
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_COLLISION, this.onCollision, this)
  }

  eventUnBind() {
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_COLLISION, this.onCollision)
  }

}

// 外框
class Border {

  constructor() {
    this.init()
    this.append()
  }

  static BORDER_SIZE = 10

  BorderLeft 
  BorderTop 
  BorderRight 
  BorderBottom

  init() {
    this.BorderLeft = Bodies.rectangle(
      Border.BORDER_SIZE / 2, 
      ContainerHeight / 2, 
      Border.BORDER_SIZE, 
      ContainerHeight, 
      { isStatic: true, render: { fillStyle: '#060a19' } 
    })
    this.BorderTop = Bodies.rectangle(
      ContainerWidth / 2, 
      Border.BORDER_SIZE / 2, 
      ContainerWidth, 
      Border.BORDER_SIZE, 
      { isStatic: true, render: { fillStyle: '#060a19' } 
    })
    this.BorderRight = Bodies.rectangle(
      ContainerWidth - Border.BORDER_SIZE / 2, 
      ContainerHeight / 2, 
      Border.BORDER_SIZE, 
      ContainerHeight, 
      { isStatic: true, render: { fillStyle: '#060a19' } 
    })
    this.BorderBottom = Bodies.rectangle(
      ContainerWidth / 2, 
      ContainerHeight - Border.BORDER_SIZE / 2, 
      ContainerWidth, 
      Border.BORDER_SIZE, 
      { isStatic: true, render: { fillStyle: '#060a19' } 
    })
  }

  append() {
    Composite.add(WorldInstance, [
      this.BorderLeft,
      this.BorderTop,
      this.BorderRight,
      this.BorderBottom
    ])
  }

  // 移除底部档条
  // 表示游戏结束清除球
  rotateBorder() {
   
    
  }

  onGameOver() {
    this.rotateBorder()
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.onGameOver, this)
  }

  eventUnBind() {
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.onGameOver, this)
  }

}

// 底部挡板
class BottomHinder {

  constructor() {
    this.create()
    this.append()
  }

  static WIDTH = 5
  instances = {}

  create() {

    new Array(8).fill(0).forEach((_, index) => {
      const __internal_type__ = "BOTTOM_HINDER"
      const __internal_id__ = uuid('BOTTOM_HINDER')
      const unit = getBallSize()
      const height = unit * 2.2
      this.instances[__internal_id__] = Bodies.rectangle(
        unit * (index + 1) + Border.BORDER_SIZE,
        ContainerHeight - height / 2, 
        BottomHinder.WIDTH, 
        height, 
        { 
          __internal_type__,
          __internal_id__,
          isStatic: true, 
          render: { fillStyle: '#060a19' } 
        }
      )

    })
  }

  append() {
    Composite.add(WorldInstance, Object.values(this.instances))
  }

  eventBind() {
   
  }

  eventUnBind() {

  }

}

// 顶部档条
class TopHinder {

  constructor() {
    this.init()
    this.append()
    this.eventBind()
  }

  static WIDTH = 10
  // ? 为了在旋转的时候还是保持球的活动范围
  static HINDER_HEIGHT_UNIT = 1.7

  instanceLeft 
  instanceRight 

  rotate = {
    direction: -1,
    value: 0,
    area: 0.3,
    unit: 0.005
  }

  init() {
    const ballSize = getBallSize()
    
    const height = ballSize * 1.5
    const leftX = ContainerWidth / 2 - (ballSize + TopHinder.WIDTH) / TopHinder.HINDER_HEIGHT_UNIT
    const leftY = Border.BORDER_SIZE + height / 3
    const rightX = ContainerWidth / 2 + (ballSize + TopHinder.WIDTH) / TopHinder.HINDER_HEIGHT_UNIT 
    const rightY = leftY

    this.instanceLeft = Bodies.rectangle(
      leftX, 
      leftY, 
      TopHinder.WIDTH, 
      height, 
      {   
        __internal_center_top_pos__: {
          x: leftX,
          y: Border.BORDER_SIZE
        },
        isStatic: true, 
        render: { 
          fillStyle: '#f0f' 
        } 
      }
    )
    this.instanceRight = Bodies.rectangle(
      rightX, 
      rightY, 
      TopHinder.WIDTH, 
      height, 
      {   
        __internal_center_top_pos__: {
          x: rightX,
          y: Border.BORDER_SIZE
        },
        isStatic: true, 
        render: { 
          fillStyle: '#ff0' 
        } 
      }
    )
  }

  append() {
    Composite.add(WorldInstance, [
      this.instanceLeft,
      this.instanceRight,
    ])
  }

  onAnimation() {

    this.rotate.value += (this.rotate.direction * this.rotate.unit) 
    if(Math.abs(this.rotate.value) >= this.rotate.area) {
      this.rotate.direction *= -1
    }

    Body.rotate(this.instanceLeft, this.rotate.unit * Math.PI * this.rotate.direction, this.instanceLeft.__internal_center_top_pos__)
    Body.rotate(this.instanceRight, this.rotate.unit * Math.PI * this.rotate.direction, this.instanceRight.__internal_center_top_pos__)
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_ANIMATION_REQUEST, this.onAnimation, this)
  }

  eventUnBind() {
  EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_ANIMATION_REQUEST, this.onAnimation)
  }

}

// 抽奖
class LuckyPie {
  constructor() {
    this.eventBind()
  }

  static getTargetInfo() {
    const ballSize = getBallSize()

    return {
      width: ballSize * 2,
      height: ballSize,
    }
  }

  instance
  loading = false 
  

  initBase() {
    LUCKY_IMAGES.forEach((item) => {
      loader(item)
    })
  }

  init() {
    if(!this.instance) {
      const { 
        startY,
        height: opHeight,
      } = LineConnect.getTargetInfo()
      const {
        width,
        height,
      } = LuckyPie.getTargetInfo()
      const textHeight = height / 2
      loader(LUCKY_IMAGES[0], (image) => {
        this.instance = new Konva.Image({
          x: ContainerWidth / 2 - width / 2,
          y: startY + (LineConnect.COUNT + 1) * opHeight + textHeight,
          width,
          height,
          image
        })
        Layer.add(this.instance)
        Layer.add(
          new Konva.Text({
            x: ContainerWidth / 2 - width / 2,
            y: startY + (LineConnect.COUNT + 1) * opHeight,
            align: 'center',
            text: '开启幸运抽奖',
            width,
            height: height / 2,
            fontSize: ContainerWidth / 30
          })
        )
      })

      this.initBase()
    }


    getCurrentStepLucky().forEach(item => {
      loader(item.image)
    })

  }

  // 开始抽奖
  onLucky() {
    if(this.loading) return 
    this.loading = true 
    const extraLucky = getCurrentStepLucky()
    const allLucky = [
      ...LUCKY_IMAGES,
      ...extraLucky.map(item => item.image)
    ]
    const total = 9 + extraLucky.length
    const speed = 5
    let changeTotal = 150 
    let luckyResult = 0

    const lucky = () => {
      requestAnimationFrame(() => {
        changeTotal --
        if(changeTotal % speed === 0) {
          luckyResult = Math.floor(Math.random() * total) 
          loader(allLucky[luckyResult], image => {
            this.instance.image(image)
          })
        }
        if(changeTotal > 0) {
          lucky()
        }else {
          let params = {}
          if(luckyResult < LUCKY_IMAGES.length) {
            params.type = LUCKY_TYPE_MAP.GRID_LIGHT
            params.value = luckyResult
          }else {
            const target = extraLucky[luckyResult - LUCKY_IMAGES.length]
            params.type = target.type
            params.value = target.value
          }
          this.loading = false 
          EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_LUCKY_DONE, params)
        }
      })

    }
    setTimeout(lucky, 500)
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_RESET, this.init, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_LUCKY, this.onLucky, this)
  }

  eventUnBind() {
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_RESET, this.init)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_LUCKY, this.onLucky)
  }
}

// 九宫格
class GridBlock {

  constructor() {
    this.init()
    this.eventBind()
  }

  static getTargetInfo() {
    const ballSize = getBallSize()
    const size = ballSize / 1.2
    const startX = ContainerWidth / 2 - size * 1.5 
    const startY = (TopHinder.HINDER_HEIGHT_UNIT + 0.5) * ballSize 
    return {
      size,
      startX,
      startY
    }
  }

  instances = []
  instancesLightMap = new Array(9).fill(false)
  isInit = true 

  // {
  //   '012': {
  //     0: false,
  //     1: false,
  //     2: false 
  //   }
  // }
  generateLineConnectMap() {

    return [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 7],
    ].reduce((acc, cur) => {
      const key = cur.join('')
      acc[key] = cur.reduce((acc, cur) => {
        acc[cur] = false 
        return acc 
      }, {})
      return acc 
    }, {})
  }

  init() {

    // 已存在则无须初始化
    if(this.instances.length) {
      return this.instances.forEach((_, index) => {
        this.stateChange(false, index)
      })
    }

    const {
      size,
      startX, 
      startY
    } = GridBlock.getTargetInfo()

    new Array(9).fill(0).forEach((_, index) => {
      const xUnit = index % 3
      const yUnit = Math.floor(index / 3)
      loader(GRID_IMAGES[index], image => {
        const instance = new Konva.Image({
          x: startX + xUnit * size,
          y: startY + yUnit * size,
          width: size,
          height: size,
          image,
        })
        this.instances.push(instance)
        Layer.add(instance)
      })
    })

  }

  // 重置
  onReset() {
    if(this.isInit) {
      this.isInit = false 
      return 
    }
    this.init()
  }

  // 判断是否触发连线
  lineConnectJudge() {
    const lineConnectMap = this.generateLineConnectMap()
    const counter = Object.values(lineConnectMap).reduce((acc, cur) => {
      if(Object.keys(cur).every((item) => this.instancesLightMap[item])) acc ++
      return acc 
    }, 0)

    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_LINE_CONNECT, counter)

  }

  stateChange(isLight, index) {
    this.instancesLightMap[index] = isLight
    loader(isLight ? ANOTHER_TEST_IMAGE : TEST_IMAGE, image => {
      this.instances[index].image(image)
    })
  }

  // 球进洞点亮宫格
  onGridLighting(index) {
    this.stateChange(true, index)
    this.lineConnectJudge()
  }

  eventBind() {

    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_RESET, this.onReset, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GRID_LIGHTING, this.onGridLighting, this)

  }

  eventUnBind() {
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_RESET, this.onReset)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GRID_LIGHTING, this.onGridLighting)
  }

}

// 连线记录
class LineConnect {

  constructor() {
    this.init()
    this.eventBind()
  }

  static COUNT = 8
  static getTargetInfo() {
    const {
      size,
      startX: blockStartX, 
      startY: blockStartY
    } = GridBlock.getTargetInfo()

    return {
      width: size * 2.5,
      height: size / 1.5,
      startX: blockStartX + size * 4,
      startY: blockStartY
    }
  }

  instances = []
  isInit = true 
  connectCounter = 0 

  init() {
    this.connectCounter = 0 

    // 已存在则无须初始化
    if(this.instances.length) {
      return this.instances.forEach((_, index) => {
        this.stateChange(true, index)
      })
    }

    const {
      width,
      height,
      startX,
      startY
    } = LineConnect.getTargetInfo()

    new Array(LineConnect.COUNT).fill(0).forEach((_, index) => {
      loader(LINE_CONNECT_IMAGES[index], image => {
        const instance = new Konva.Image({
          x: startX,
          y: startY + index * height,
          width,
          height,
          image,
        })
        this.instances.push(instance)
        Layer.add(instance)
      })
    })

  }

  // 重置
  onReset() {
    if(this.isInit) {
      this.isInit = false 
      return 
    }
    this.init()
  }

  stateChange(isNormal, index) {
    loader(isNormal ? TEST_IMAGE : ANOTHER_TEST_IMAGE, image => {
      this.instances[index].image(image)
    })
  }

  // 触发连线
  onLineConnect(count) {
    new Array(count).fill(0).forEach((_, index) => {
      this.stateChange(false, this.instances.length - index - 1)
    })
    const addCount = count - this.connectCounter
    this.connectCounter = count 
    !!this.connectCounter && EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_SCORE, addCount * GAME_DATA.lineConnectScore[this.connectCounter - 1] || 0)
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_RESET, this.onReset, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_LINE_CONNECT, this.onLineConnect, this)
  }

  eventUnBind() {
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_RESET, this.onReset)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_LINE_CONNECT, this.onLineConnect)
  }

}

// 积分
class Score {

  constructor() {
    this.init()
    this.eventBind()
  }

  instance 

  fillText() {
    return `当前分数：${GAME_DATA.score}`
  }

  init() {
    if(!this.instance) {
      this.instance = new Konva.Text({
        x: 0,
        y: Border.BORDER_SIZE * 2,
        align: 'right',
        text: this.fillText(),
        width: ContainerWidth - Border.BORDER_SIZE * 2,
        fontSize: ContainerWidth / 25
      })
      Layer.add(this.instance)
    }
  }

  onScore(score) {
    GAME_DATA.score += score 
    StorageInstance.setValue({
      score: GAME_DATA.score
    })
    this.instance.text(this.fillText())
  }

  // 抽奖结果
  onLuckyDone({ value, type }) {
    switch(type) {
      case LUCKY_TYPE_MAP.SCORE:
        this.onScore(value)
        break 
      case LUCKY_TYPE_MAP.GRID_LIGHT:
        EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GRID_LIGHTING, value)
    }
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_SCORE, this.onScore, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_LUCKY_DONE, this.onLuckyDone, this)
  }

  eventUnBind() {
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_SCORE, this.onScore)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_LUCKY_DONE, this.onLuckyDone)
  }

}

// 碰撞
class Collision {

  constructor() {
    this.bind() 
  }

  collisionMap = {

  }

  collisionTimeout

  onCollisionStart = (event) => {
    event.pairs.forEach(pair => {
      const { bodyA, bodyB } = pair
      const collisionMapKeyA = bodyA.id + '--' + bodyB.id
      const collisionMapKeyB = bodyB.id + '--' + bodyA.id
      // 去除之前的碰撞
      if(this.collisionMap[collisionMapKeyA]) delete this.collisionMap[collisionMapKeyA]
      if(this.collisionMap[collisionMapKeyB]) delete this.collisionMap[collisionMapKeyB]
      clearTimeout(this.collisionTimeout)

      this.collisionMap[collisionMapKeyA] = pair 

      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_COLLISION, bodyA, bodyB)

      // 2s 后碰撞仍然存在则确定为静止
      this.collisionTimeout = setTimeout(() => {
        if(this.collisionMap[collisionMapKeyA]) {
          const target = this.collisionMap[collisionMapKeyA]
          EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_SLEEP, target)

          delete this.collisionMap[collisionMapKeyA]
        }
      }, 1000)

    })
    // debugger
  }

  onCollisionEnd = (event) => {
    event.pairs.forEach(pair => {
      const { bodyA, bodyB } = pair
      const collisionMapKeyA = bodyA.id + '--' + bodyB.id
      const collisionMapKeyB = bodyB.id + '--' + bodyA.id
      delete this.collisionMap[collisionMapKeyA]
      delete this.collisionMap[collisionMapKeyB]
    })
  }

  bind() {
    // MatterEvents.on(EngineInstance, 'collisionActive', this.onCollisionActive)
    MatterEvents.on(EngineInstance, 'collisionStart', this.onCollisionStart)
    MatterEvents.on(EngineInstance, 'collisionEnd', this.onCollisionEnd)
  }

  unBind() {
    MatterEvents.off(EngineInstance, 'collisionActive', this.onCollisionStart)
    MatterEvents.off(EngineInstance, 'collisionEnd', this.onCollisionEnd)
  }

}

// 发球
class ServeBall {

  constructor() {
    this.init()
    this.eventBind()
  }

  disabled = true  
  lucky = false 

  serverBall = () => {
    if(this.disabled || this.lucky) return 
    this.disabled = true 
    new Ball()
  }

  init() {
    // 先简单使用键盘，后面再改
    window.addEventListener('keydown', this.serverBall)
  }

  onNextBall() {
    this.disabled = false 
  }

  onDisabled() {
    this.disabled = true 
  }

  onLucky() {
    this.lucky = true 
  }

  onLuckyDone() {
    this.lucky = false  
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_NEXT_BALL, this.onNextBall, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.onDisabled, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_PLAY, this.onNextBall, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_STATIC, this.onDisabled, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_START, this.onNextBall, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_STOP, this.onDisabled, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_WIN, this.onDisabled, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_LUCKY, this.onLucky, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_LUCKY_DONE, this.onLuckyDone, this)
  }

  eventUnBind() {
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_NEXT_BALL, this.onNextBall)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.onDisabled)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_PLAY, this.onNextBall)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_STATIC, this.onDisabled)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_START, this.onNextBall)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_STOP, this.onDisabled)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_WIN, this.onDisabled)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_LUCKY, this.onLucky)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_LUCKY_DONE, this.onLuckyDone)
  }

}

// 动画定时器
class Animation {

  constructor() {
    this.eventBind()
  }

  isStop = false  

  animation() {
    if(this.isStop) return 
    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_ANIMATION_REQUEST)
    requestAnimationFrame(this.animation.bind(this))
  }

  start() {
    this.isStop = false  
    this.animation()
  }

  stop() {
    this.isStop = true 
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.stop, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_PLAY, this.start, this)
  }

  eventUnBind() {
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.stop)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_PLAY, this.start)
  }

}

// 缓存相关
// 存储游戏信息
class StorageFactory {

  key = 'western_travel_alliance'

  static Storage = localStorage

  base = {
    score: 0,
    currentStep: 0
  }

  init() {
    this.getValue()
  }

  reset() {
    this.setValue(this.base)
  }

  getValue() {
    let result = StorageFactory.Storage.getItem(this.key)
    if(!result) {
      StorageFactory.Storage.setItem(this.key, JSON.stringify(this.base))
      return this.base 
    }else {
      return JSON.parse(result) 
    }
  }

  setValue(value) {
    const origin = this.getValue() 
    StorageFactory.Storage.setItem(this.key, JSON.stringify({
      ...origin,
      ...value 
    }))
  }

}

// 交互相关
class Interactive {

  constructor() {
    this.init()
    this.eventBind()
  }

  guide = {
    images: [],
    instance: null,
    children: [],
    tick: 1,
    visible: false 
  }
  gameComplete = {
    images: [],
    instance: null,
    children: [],
    tick: 1,
    visible: false
  }
  gameOver = {
    images: [],
    instance: null,
    children: [],
    tick: 1,
    visible: false
  }
  gameStop = {
    images: [],
    instance: null,
    children: [],
    tick: 1,
    visible: false
  }
  gameWin = {
    images: [],
    instance: null,
    children: [],
    tick: 1,
    visible: false
  }
  nextBll = {
    images: [],
    instance: null,
    children: [],
    tick: 1,
    visible: false
  }
  luckyDone = {
    images: [],
    instance: null,
    children: [],
    tick: 1,
    visible: false
  }

  getCommonSizeInfo() {
    const width = ContainerWidth / 2
    const height = width / 2
    const x = ContainerWidth / 2 - width / 2
    const y = ContainerHeight / 2 - height / 2
    return {
      width,
      height,
      x,
      y,
      visible: false 
    }
  }

  generateWrapper() {
    
    const wrapper = new Konva.Group(this.getCommonSizeInfo()) 
    return wrapper
  }

  initGameComplete() {
    const { width, height } = this.getCommonSizeInfo()
    this.gameComplete.instance = this.generateWrapper() 
    const test = new Konva.Rect({
      width,
      height,
      x: 0,
      y: 0,
      fill: 'red'
    })
    test.on('click', () => {
      this.gameComplete.instance.visible(false)
    })
    this.gameComplete.instance.add(test)
    Layer.add(this.gameComplete.instance)
  }

  initGameOver() {
    const { width, height } = this.getCommonSizeInfo()
    this.gameOver.instance = this.generateWrapper() 
    const test = new Konva.Rect({
      width,
      height,
      x: 0,
      y: 0,
      fill: 'yellow'
    })
    test.on('click', () => {
      this.gameOver.instance.visible(false)
    })
    this.gameOver.instance.add(test)
    Layer.add(this.gameOver.instance)
  }

  initGameStop() {
    const { width, height } = this.getCommonSizeInfo()
    this.gameStop.instance = this.generateWrapper() 
    const test = new Konva.Rect({
      width,
      height,
      x: 0,
      y: 0,
      fill: 'green'
    })
    test.on('click', () => {
      this.gameStop.instance.visible(false)
    })
    this.gameStop.instance.add(test)
    Layer.add(this.gameStop.instance)
  }

  initGameWin() {
    const { width, height } = this.getCommonSizeInfo()
    this.gameWin.instance = this.generateWrapper() 
    const test = new Konva.Rect({
      width,
      height,
      x: 0,
      y: 0,
      fill: 'pink'
    })
    test.on('click', () => {
      this.gameWin.instance.visible(false)
    })
    this.gameWin.instance.add(test)
    Layer.add(this.gameWin.instance)
  }

  initNextBall() {
    const { width, height } = this.getCommonSizeInfo()
    this.nextBll.instance = this.generateWrapper() 
    const test = new Konva.Rect({
      width,
      height,
      x: 0,
      y: 0,
      fill: 'blue'
    })
    this.nextBll.instance.add(test)
    Layer.add(this.nextBll.instance)
  }

  initLuckyDone() {
    const { width, height } = this.getCommonSizeInfo()
    this.luckyDone.instance = this.generateWrapper() 
    const test = new Konva.Rect({
      width,
      height,
      x: 0,
      y: 0,
      fill: '#0ff'
    })
    this.luckyDone.instance.add(test)
    Layer.add(this.luckyDone.instance)
  }

  init() {
    this.initGameComplete()
    this.initGameOver() 
    this.initGameStop()
    this.initGameWin()
    this.initNextBall()
    this.initLuckyDone()
  }

  // 动画
  animation() {

  }

  // 游戏引导
  guide() {
    // TODO 
  }

  // 游戏通关
  onGameComplete() {
    this.gameComplete.instance.visible(true)
  }

  // 游戏结束
  onGameOver() {
    this.gameOver.instance.visible(true)
  }

  // 游戏暂停
  onGameStop() {
    this.gameStop.instance.visible(true)
  }

  // 游戏通关（本关）
  onGameWin() {
    const value = StorageInstance.getValue()
    if(value.currentStep + 1 === GAME_DATA.step.length) {
      this.onGameComplete()
    }else {
      this.gameWin.instance.visible(true)
      const newStep = value.currentStep + 1
      setTimeout(() => {
        StorageInstance.setValue({
          currentStep: newStep
        })
        GAME_DATA.currentStep = newStep
        this.gameWin.instance.visible(false)
        EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_RESET)
      }, 1000) 
    }
  }

  // 下一球
  onNextBall() {
    console.log('next ball')
    // TODO 
  }

  // 下一步
  onNext() {
    // 判断一下是否游戏可以下一关
    if(GAME_DATA.step[GAME_DATA.currentStep].isWin()) {
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_WIN)
    }else {
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_NEXT_BALL)
    }
  }

  // 抽奖完成
  onLuckyDone({ value, type }) {
    console.log('lucky done')
    // TODO 
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.onGameOver, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_STOP, this.onGameStop, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_WIN, this.onGameWin, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_NEXT_BALL, this.onNextBall, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_NEXT, this.onNext, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_LUCKY_DONE, this.onLuckyDone, this)
  }

  eventUnBind() {
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.onGameOver)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_STOP, this.onGameStop)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_WIN, this.onGameWin)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_NEXT_BALL, this.onNextBall)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_NEXT, this.onNext)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_LUCKY_DONE, this.onLuckyDone)
  }

}

// 游戏
class Game {

  // 游戏开始
  start() {

    this.gameInfoInit()
    new Animation()
    new LuckyPie()
    new GridBlock()
    new LineConnect()
    new TopHinder()
    new ServeBall()
    new Collision()
    new Hinder()
    new BottomHinder()
    new Border()
    new Score() 
    new Interactive()

    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_PLAY)
    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_RESET)
  }

  // 数据重置
  gameInfoReset() {
    StorageInstance.reset()
  }

  // 数据初始化
  gameInfoInit() {
    const value = StorageInstance.getValue()
    Object.entries(value).forEach(item => {
      const [ key, value ] = item
      GAME_DATA[key] = value  
    })
  }

}

const StorageInstance = new StorageFactory()
new Game().start()
