import cax from '../../libs/cax'
import DataBus, { EVENT_EMITTER, EVENT_EMITTER_NAME } from '../../databus'
import Image from '../../base/image'
import { Interval } from '../../base/utils'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth

const databus = new DataBus()

export default class Info extends cax.Group {
  constructor (options) {
    super()

    Object.entries(options).forEach(([key, value]) => {
      this[key] = value 
    })
    this.fillStyle = 'red'

    this.init()
    this.eventBind()
  }

  // 定时器
  interval = new Interval({
    onChange: (value) => {
      if(this.timeoutText) {
        this.timeoutText.text = value 
      }
    }
  })
  // 内部group 
  group 
  // 难度
  level 
  // 错误次数
  errorModal = []
  // 倒计时
  timeoutText 
  // 背景
  bg 

  init() {
    this.level = new cax.Text(`难度: ${databus.difficulty}`, {
      font: '16px Arial',
      color: '#ff7700',
      baseline: 'middle'
    })
    this.level.x = 20 
    this.level.y = this.height / 2

    this.timeoutText = new cax.Text('00:00:00', {
      font: '16px Arial',
      color: '#ff7700',
      baseline: 'middle',
      textAlign: 'right',
    })
    this.timeoutText.x = screenWidth - 20
    this.timeoutText.y = this.height / 2

    const errorHeight = this.height * 0.6
    const errorWidth = 100 / 79 * errorHeight
    this.errorModal = new Array(3).fill(0).map((_, index) => {
      const object = new Image({
        width: errorWidth,
        height: errorHeight,
        image: 'images/lucky.png',
        originWidth: 100,
        originHeight: 79
      })
      object.setProp({
        x: screenWidth / 2 - this.height * (3 / 2 - index),
        y: (this.height - errorHeight) / 2,
      })
      return object
    })

    this.add(this.level, this.timeoutText, ...this.errorModal)
  }

  onGameStart() {
    this.level.text = `难度: ${databus.difficulty}`
    this.errorModal.forEach(object => {
      object.visible = true  
    })
    this.interval.update(true)
  }

  onInputError() {
    this.errorModal[3 - databus.errorCount].visible = false 
    databus.errorCount -- 
    // 游戏结束
    if(!databus.errorCount) {
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_END)
    }
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_START, this.onGameStart, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_INPUT_ERROR, this.onInputError, this)
  }

  eventUnBind() {
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_START, this.onGameStart)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_INPUT_ERROR, this.onInputError)
  }

}
