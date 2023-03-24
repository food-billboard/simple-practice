import cax from '../libs/cax'
import { ColorStyleManage } from '../databus'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight

export default class BackGround extends cax.Group {
  constructor () {
    super()

    const background = new cax.Rect(screenWidth, screenHeight, {
      fillStyle: ColorStyleManage.backgroundColor
    })

    this.add(background)
  }
}
