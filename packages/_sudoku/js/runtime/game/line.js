import { ColorStyleManage } from '../../databus'
import cax from '../../libs/cax'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth

export default class BlockGroup extends cax.Group {
  constructor () {
    super()
    this.init()
  }

  init() {
    
    const horizontalLines = new Array(10).fill(0).map((_, index) => {
      const line = new cax.Rect(screenWidth, index % 3 === 0 ? 2 : 1, {
        fillStyle: ColorStyleManage.borderColor
      })
      line.x = 0 
      line.y = index * (screenWidth / 9)
      return line 
    })
    const verticalLines = new Array(10).fill(0).map((_, index, array) => {
      const width = index % 3 === 0 ? 2 : 1
      const line = new cax.Rect(width, screenWidth, {
        fillStyle: ColorStyleManage.borderColor
      })
      line.x = index * (screenWidth / 9) - ((index + 1 === array.length) ? 2 : 0)
      line.y = 0
      return line 
    })

    this.add(...horizontalLines, ...verticalLines)

  }

}
