
const Container = document.querySelector('#app')
const Canvas = document.querySelector('#canvas canvas')
const ScoreContainer = document.querySelector('#score')
const LineConnectContainer = document.querySelector('#line-connect')

const ContainerWidth = Container.clientWidth
const ContainerHeight = Container.clientHeight

const EVENT_EMITTER = new EventEmitter()
const EVENT_EMITTER_NAME = {
  ON_COLLISION: 'ON_COLLISION',
  ON_SLEEP: 'ON_SLEEP'
}

const GAME_DATA = {
  score: 0
}

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

// 是否为球
function isBall(object) {
  return object.__internal_type__ === 'BALL'
}
// 是否为底
function isBottomBorder(object) {
  return object.__internal_type__ === 'BOTTOM_BORDER'
}

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

  create() {
    this.instance = Bodies.rectangle(
      100, 
      100, 
      50, 
      50, 
      { 
        render: { fillStyle: '#456' },
        __internal_type__: 'BALL'
      }
    )
    console.log(this.instance)
  }

  append() {
    Composite.add(WorldInstance, [
      this.instance,
    ])
  }

  onSleep(target) {
    const { bodyA, bodyB } = target 
    if(bodyA.id === this.instance.id || bodyB.id === this.instance.id) {
      console.log(bodyA, bodyB, 22222)

      if(isBall(bodyA) && isBall(bodyB)) {
        console.log('游戏结束')
      }else if((isBall(bodyA) || isBall(bodyB)) || (isBottomBorder(bodyA) || isBottomBorder(bodyB))) {
        console.log('下一球')
      }

    }
  }

  onCollision() {

  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_SLEEP, this.onSleep, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_COLLISION, this.onCollision, this)
  }

  eventUnBind() {
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_SLEEP, this.onSleep)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_COLLISION, this.onCollision)
  }

}

// 阻碍点
class Hinder {

}

// 外框
class Border {

  constructor() {
    this.create()
    this.append()
  }

  static BORDER_SIZE = 10

  BorderLeft 
  BorderTop 
  BorderRight 
  BorderBottom

  create() {
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

  eventBind() {
   
  }

  eventUnBind() {

  }

}

// 底部挡板
class BottomHinder {

}

// 顶部档条
class TopHinder {

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

  onCollisionStart = (event) => {
    event.pairs.forEach(pair => {
      const { bodyA, bodyB } = pair
      const collisionMapKeyA = bodyA.id + '--' + bodyB.id
      const collisionMapKeyB = bodyB.id + '--' + bodyA.id
      // 去除之前的碰撞
      if(this.collisionMap[collisionMapKeyA]) delete this.collisionMap[collisionMapKeyA]
      if(this.collisionMap[collisionMapKeyB]) delete this.collisionMap[collisionMapKeyB]

      this.collisionMap[collisionMapKeyA] = pair 

      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_COLLISION, bodyA, bodyB)

      // 2s 后碰撞仍然存在则确定为静止
      setTimeout(() => {
        if(this.collisionMap[collisionMapKeyA]) {
          const target = this.collisionMap[collisionMapKeyA]

          EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_SLEEP, target)

          delete this.collisionMap[collisionMapKeyA]
        }
      }, 2000)

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

// 游戏
class Game {

  // 游戏开始
  start() {
    new Collision()
    new Border()
    new Ball()
    new Score() 
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
