import cax from '../../libs/cax'
import DataBus from '../../databus'
import BlockGroup from './block-group'
import Header from './header'
import Number from './number'
import Toolbar from './toolbar'
import Info from './info'
import { BANNER_HEIGHT } from '../banner'

const dataBus = new DataBus()

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight

export default class Game extends cax.Group {
  constructor () {
    super()

    this.visible = false 
    this.x = 0
    this.y = 0
    this.width = screenWidth
    this.height = screenHeight - BANNER_HEIGHT

    // 除了数独外的剩余高度
    const restHeight = this.height - screenWidth
    const unitHeight = restHeight / 4

    const header = new Header({
      height: unitHeight
    })
    const info = new Info({
      height: unitHeight,
      y: unitHeight
    })
    const blockGroup = new BlockGroup({
      y: unitHeight * 2
    }) 
    const number = new Number({
      height: unitHeight,
      y: unitHeight * 2 + screenWidth
    })
    const toolbar = new Toolbar({
      height: unitHeight,
      y: unitHeight * 3 + screenWidth
    })

    this.add(header, number, toolbar, info, blockGroup)

  }

  update () {
    if(dataBus.gameStep === 1) {
      if(!this.visible) this.visible = true 
    }else if(this.visible) {
      this.visible = false 
    }
  }

}
