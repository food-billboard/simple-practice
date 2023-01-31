
const Container = document.querySelector('#app')
const Canvas = document.querySelector('#canvas')
const ScoreContainer = document.querySelector('#score')
const LineConnectContainer = document.querySelector('#line-connect')

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

let index = 0
setInterval(() => {
  index += 120
  scoreChange(index)

}, 3000)

// const {
//   Engine,
//   Render,
//   Runner,
//   Body,
//   Events: MatterEvents,
//   Composite,
//   Composites,
//   Common,
//   MouseConstraint,
//   Mouse,
//   Bodies
// } = Matter

// // create engine
// const EngineInstance = Engine.create() 
// const WorldInstance = EngineInstance.world 
// // create renderer
// const renderInstance = Render.create({
//   element: Canvas,
//   engnine: EngineInstance,
//   options: {
//     width: 800,
//     height: 600,
//     wireframes: false
//   }
// })

// Render.run(renderInstance)

// // create runner 
// const RunnerInstance = Runner.create() 
// Runner.run(RunnerInstance, EngineInstance)