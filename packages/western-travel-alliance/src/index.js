
// constants
const Container = document.querySelector('#app')
const Canvas = document.querySelector('#canvas canvas')
const ScoreContainer = document.querySelector('#score')

const ContainerWidth = Container.clientWidth
const ContainerHeight = Container.clientHeight

// eventemitter 
const EVENT_EMITTER = new EventEmitter()
const EVENT_EMITTER_NAME = {
  // 碰撞
  ON_COLLISION: 'ON_COLLISION',
  // 球体静止
  ON_SLEEP: 'ON_SLEEP',
  // 下一球
  ON_NEXT_BALL: 'ON_NEXT_BALL',
  // 下一关
  ON_NEXT_STEP: 'ON_NEXT_STEP',
  // 游戏结束
  ON_GAME_OVER: 'ON_GAME_OVER',
  // 游戏通关
  ON_GAME_COMPLETE: 'ON_GAME_COMPLETE',
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
  ON_ANIMATION_REQEUST: 'ON_ANIMATION_REQEUST'
}

// game info 
const GAME_DATA = {
  score: 0
}

// utils 

// 积分变动
function scoreChange(value) {
  const options = {
    startVal: GAME_DATA.score,
  };
  GAME_DATA.score = value 
  let instance = new countUp.CountUp('score', value, options);
  if (!instance.error) {
    instance.start();
  } else {
    console.error(instance.error);
  }
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
  return ContainerWidth / 9 
}
// 唯一id
function uuid(prefix) {
  return (prefix || 'PREFIX') + Date.now() + Math.random() + Math.random()
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

// 物体
class ObjectBody {

  constructor() {

  }

  create() {

  }

  eventBind() {

  }

  eventUnBind() {

  }

  destroy() {

  }

}

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
        __internal_type__: 'BALL'
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
        console.log('游戏结束')
      }else if((isBall(bodyA) || isBall(bodyB)) || (isBottomBorder(bodyA) || isBottomBorder(bodyB))) {
        EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_NEXT_BALL)
        console.log('下一球')
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

  onGameOver() {

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

  static WIDTH = 10
  instances = {}

  create() {

    new Array(9).fill(0).forEach((_, index) => {
      const __internal_type__ = "BOTTOM_HINDER"
      const __internal_id__ = uuid('BOTTOM_HINDER')
      const unit = getBallSize()
      const height = unit * 2.2
      this.instances[__internal_id__] = Bodies.rectangle(
        unit * (index + 1),
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

  static WIDTH = 20

  instanceLeft 
  instanceRight 

  rotate = {
    direction: -1,
    value: 0
  }

  init() {
    const ballSize = getBallSize()
    const height = ballSize * 2
    const leftX = ContainerWidth / 2 - ballSize / 2 - TopHinder.WIDTH / 2
    const leftY = Border.BORDER_SIZE + height / 2
    const rightX = ContainerWidth / 2 + ballSize / 2 + TopHinder.WIDTH / 2
    const rightY = leftY

    this.instanceLeft = Bodies.rectangle(
      leftX, 
      leftY, 
      TopHinder.WIDTH, 
      height, 
      {   
        __internal_left_top_pos__: {
          x: leftX - TopHinder.WIDTH / 2,
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
         __internal_left_top_pos__: {
          x: rightX - TopHinder.WIDTH / 2,
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
    const unit = 0.01

    this.rotate.value += this.rotate.direction * unit 
    if(Math.abs(this.rotate.value) >= 0.4) {
      this.rotate.direction *= -1
    }

    // // 顺时针旋转
    // if(this.rotate.direction === -1) {
    //   this.rotate.value -= unit
    //   if(this.rotate.value <= -0.4) {
    //     this.rotate.direction = 1
    //   }
    // }
    // // 逆时针旋转
    // else {
    //   this.rotate.value += unit
    //   if(this.rotate.value >= 0.4) {
    //     this.rotate.direction = -1
    //   }
    // }
    Body.rotate(this.instanceLeft, unit * Math.PI, this.instanceLeft.__internal_left_top_pos__)
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_ANIMATION_REQEUST, this.onAnimation, this)
  }

  eventUnBind() {
  EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_ANIMATION_REQEUST, this.onAnimation)
  }

}

// 抽奖
class LuckyPie {

}

// 九宫格
class GridBlock {

}

// 连线记录
class LineConnect {

}

// 积分
class Score {

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

  serverBall = () => {
    if(this.disabled) return 
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

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_NEXT_BALL, this.onNextBall, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.onDisabled, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_PLAY, this.onNextBall, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_STATIC, this.onDisabled, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_START, this.onNextBall, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_STOP, this.onDisabled, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_WIN, this.onDisabled, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_COMPLETE, this.onNextBall, this)
  }

  eventUnBind() {
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_NEXT_BALL, this.onNextBall)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.onDisabled)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_PLAY, this.onNextBall)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_STATIC, this.onDisabled)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_START, this.onNextBall)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_STOP, this.onDisabled)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_WIN, this.onDisabled)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_COMPLETE, this.onNextBall)
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
    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_ANIMATION_REQEUST)
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

// 游戏
class Game {

  // 游戏开始
  start() {
    new Animation()
    new TopHinder()
    new ServeBall()
    new Collision()
    new BottomHinder()
    new Border()
    new Score() 

    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_PLAY)
    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_NEXT_STEP)
  }

}

new Game().start()

// // add bodies
// Composite.add(WorldInstance, [
//   Bodies.rectangle(400, 600, 1200, 50.5, { isStatic: true, render: { fillStyle: '#060a19' } })
// ]);

// var stack = Composites.stack(100, 0, 10, 8, 10, 10, function(x, y) {
//   return Bodies.circle(x, y, Common.random(15, 30), { restitution: 0.6, friction: 0.1 });
// });

// Composite.add(WorldInstance, [
//   stack,
//   // Bodies.polygon(200, 460, 3, 60),
//   // Bodies.polygon(400, 460, 5, 60),
//   // Bodies.rectangle(600, 460, 80, 80)
// ]);
