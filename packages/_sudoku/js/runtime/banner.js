import { ColorStyleManage } from '../databus'
import cax from '../libs/cax'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight

export const BANNER_HEIGHT = screenHeight * 0.2

export default class Banner extends cax.Group {
  constructor () {
    super()

    this.y = screenHeight - BANNER_HEIGHT
    this.width = screenWidth
    this.height = BANNER_HEIGHT

    this.rect = new cax.Rect(screenWidth, BANNER_HEIGHT, {
      fillStyle: ColorStyleManage.bannerColor
    })

    this.text = new cax.Text('广告位招租', {
      font: '20px Arial',
      color: ColorStyleManage.fontColor,
      baseline: 'middle',
      textAlign: 'center'
    })

    this.text.x = screenWidth / 2
    this.text.y = BANNER_HEIGHT / 2

    this.add(this.rect, this.text)
  }

}
