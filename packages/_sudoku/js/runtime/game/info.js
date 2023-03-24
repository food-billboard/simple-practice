import cax from '../../libs/cax'
import DataBus, { ColorStyleManage, EVENT_EMITTER, EVENT_EMITTER_NAME } from '../../databus'
import Image from './components/image'
import { Interval } from '../../base/utils/index'
import ErrorCount from '../../base/utils/error-count'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth

const databus = new DataBus()

export default class Info extends cax.Group {
  constructor (options) {
    super()

    Object.entries(options).forEach(([key, value]) => {
      this[key] = value 
    })

    Interval.onChange((value) => {
      if(this.timeoutText) {
        this.timeoutText.text = value 
      }
    })
    this.init()
    this.eventBind()
  }

  // 定时器
  interval = new Interval()
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
      color: ColorStyleManage.defaultFontColor,
      baseline: 'middle'
    })
    this.level.x = 20 
    this.level.y = this.height / 2

    this.timeoutText = new cax.Text('00:00:00', {
      font: '16px Arial',
      color: ColorStyleManage.defaultFontColor,
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

  // 游戏开始
  onGameStart() {
    this.level.text = `难度: ${databus.difficulty}`
    this.errorModal.forEach(object => {
      object.visible = true  
    })
    ErrorCount.start() 
    if(this.timeoutText) this.timeoutText.text = '00:00:00'
    this.interval.update(true)
  }

  // 游戏暂停
  onGameStop() {
    this.interval.stop()
  }

  // 游戏继续
  onGameContinue() {
    this.interval.update()
  }

  onInputError() {
    ErrorCount.errored(this.errorModal)
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_START, this.onGameStart, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_STOP, this.onGameStop, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_CONTINUE, this.onGameContinue, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_INPUT_ERROR, this.onInputError, this)
  }

  eventUnBind() {
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_START, this.onGameStart)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_STOP, this.onGameStop)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_INPUT_ERROR, this.onInputError)
  }

}
