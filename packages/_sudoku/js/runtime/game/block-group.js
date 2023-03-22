import cax from '../../libs/cax'
import { EVENT_EMITTER, EVENT_EMITTER_NAME } from '../../databus'
import Block from './block'
import Line from './line'
import { generateSudoku } from '../../base/utils'
import DataBus from '../../databus'

const databus = new DataBus() 

const line = new Line()
export default class BlockGroup extends cax.Group {
  constructor (options) {
    super()

    this.eventBind()

    Object.entries(options).forEach(([key, value]) => {
      this[key] = value 
    })

    this.initBlock()
    this.add(line)
   
  }

  instances

  initBlock() {
    const result = new Array(9 * 9).fill(0).map((_, index) => {
      const block = new Block({
        x: index % 9,
        y: Math.floor(index / 9)
      }, {
        index
      })
      return block 
    })
    this.add(...result.map(item => item.instance))
    this.instances = result 
  }

  init() {
    databus.initSudokuData(generateSudoku().slice(0, -2))
    this.instances.forEach((block, index) => {
      block.init(databus.sudokuData[index])
    })
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
