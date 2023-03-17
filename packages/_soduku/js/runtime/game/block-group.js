import cax from '../../libs/cax'
import { EVENT_EMITTER, EVENT_EMITTER_NAME } from '../../databus'
import Block from './block'
import Line from './line'
import { generateSoduku } from '../../base/utils'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth

const line = new Line()
export default class BlockGroup extends cax.Group {
  constructor (options) {
    super()

    this.eventBind()

    Object.entries(options).forEach(([key, value]) => {
      this[key] = value 
    })

    this.rect = new cax.Rect(screenWidth, screenWidth, {
      fillStyle: 'yellow'
    })

    this.add(this.rect, line)
    this.initBlock()
   
  }

  instances

  initBlock() {
    const result = new Array(9 * 9).fill(0).map((_, index) => {
      const block = new Block({
        x: index % 9,
        y: Math.floor(index / 9)
      })
      return block 
    })
    this.add(...result.map(item => item.instance))
    this.instances = result 
  }

  init() {
    const dataSource = generateSoduku()
    this.instances.forEach((block, index) => {
      block.init(dataSource[index])
    })
  }

  update () {
    
  }

  onGameStart() {
    this.init()
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_START, this.onGameStart, this)
  }

  eventUnBind() {
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_START, this.onGameStart)
  }

}
