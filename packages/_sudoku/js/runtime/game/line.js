import cax from '../../libs/cax'
import { EVENT_EMITTER, EVENT_EMITTER_NAME } from '../../databus'
import Block from './block'
import { generateSudoku } from '../../base/utils'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth

export default class BlockGroup extends cax.Group {
  constructor () {
    super()
    this.init()
  }

  init() {
    
    const horizontalLines = new Array(10).fill(0).map((_, index) => {
      const line = new cax.Rect(screenWidth, 1, {
        fillStyle: 'red'
      })
      line.x = 0 
      line.y = index * (screenWidth / 9)
      return line 
    })
    const verticalLines = new Array(10).fill(0).map((_, index) => {
      const line = new cax.Rect(1, screenWidth, {
        fillStyle: 'red'
      })
      line.x = index * (screenWidth / 9) 
      line.y = 0
      return line 
    })

    this.add(...horizontalLines, ...verticalLines)

  }

}
