import { EVENT_EMITTER, EVENT_EMITTER_NAME } from '../../databus'
import cax from '../../libs/cax'


const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth

const NORMAL_COLOR = '#ffffff'
const ACTIVE_COLOR = '#ff7700'

export default class Number extends cax.Group {
  constructor (options) {
    super()

    Object.entries(options).forEach(([key, value]) => {
      this[key] = value 
    })

    this.init()
    this.eventBind()
   
  }

  activeIndex = -1 
  instances = [] 
  texts = [] 

  onClickNumber(value) {
    if(this.activeIndex !== value) {
      if(!!~this.activeIndex) this.texts[this.activeIndex - 1].color = NORMAL_COLOR
      this.texts[value - 1].color = ACTIVE_COLOR
    }
    this.activeIndex = value 
  }

  init() {
    // 间距
    const space = 4
    const size = this.height * 0.8 
    const startY = (this.height - size) / 2
    const startX = (screenWidth - (size * 9 + space * 8)) / 2
    this.instances = new Array(9).fill(0).map((_, index) => {
      const group = new cax.Group()

      const rect = new cax.Rect(size, size, {
        fillStyle: 'pink',
      })
      rect.x = startX + (size + space) * index 
      rect.y = startY

      const text = new cax.Text(index + 1, {
        font: '16px Arial',
        color: NORMAL_COLOR,
        baseline: 'middle',
        textAlign: 'center'
      })
      text.x = rect.x + rect.width / 2
      text.y = rect.y + rect.height / 2

      rect.on('tap', this.onClickNumber.bind(this, index + 1))
      text.on('tap', this.onClickNumber.bind(this, index + 1))

      group.add(rect, text)
      this.texts.push(text)
      return group 
    })
    this.add(...this.instances)
  }

  onInput(callback) {
    callback(this.activeIndex)
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_INPUT, this.onInput, this)
  }

  eventUnBind() {
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_INPUT, this.onInput, this)
  }

}
