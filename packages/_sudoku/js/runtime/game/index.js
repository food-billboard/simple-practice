import cax from '../../libs/cax'
import DataBus, { EVENT_EMITTER, EVENT_EMITTER_NAME } from '../../databus'
import BlockGroup from './block-group'
import Header from './header'
import Number from './number'
import Toolbar from './toolbar'
import Info from './info'
import Modal from './modal'
import { BANNER_HEIGHT } from '../banner'

const dataBus = new DataBus()

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight
const statusBarHeight = info.statusBarHeight

export default class Game extends cax.Group {
  constructor () {
    super()

    this.visible = false 
    this.x = 0
    this.y = 0
    this.width = screenWidth
    this.height = screenHeight - BANNER_HEIGHT

    // 除了数独外的剩余高度
    const restHeight = this.height - screenWidth - statusBarHeight
    const unitHeight = restHeight / 4
    const startY = statusBarHeight 

    const header = new Header({
      height: unitHeight,
      y: startY
    })
    const info = new Info({
      height: unitHeight,
      y: startY + unitHeight
    })
    const blockGroup = new BlockGroup({
      y: startY + unitHeight * 2
    }) 
    const number = new Number({
      height: unitHeight,
      y: startY + unitHeight * 2 + screenWidth
    })
    const toolbar = new Toolbar({
      height: unitHeight,
      y: startY + unitHeight * 3 + screenWidth
    })
    const modal = new Modal()

    this.add(header, number, toolbar, info, blockGroup, modal)

    this.eventBind()

  }

  update () {
    if(dataBus.gameStep === 1) {
      if(!this.visible) {
        this.visible = true 
        EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_START)
      }
    }else if(this.visible) {
      this.visible = false 
    }
  }

  // 退出游戏
  onGameQuite() {
    dataBus.gameStep = 0
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_QUITE, this.onGameQuite, this)
  }

}
