import cax from '../../libs/cax'
import { uuid, duplicateRemoval } from '../../base/utils'
import DataBus, { EVENT_EMITTER, EVENT_EMITTER_NAME } from '../../databus'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth

const databus = new DataBus() 
export default class Block {
  constructor (position, options) {
    this.index = options.index 
    this.x = position.x 
    this.y = position.y
    this.width = screenWidth / 9
    this.height = screenWidth / 9
    this.instance = new cax.Group()
    this.instance.x = this.x * screenWidth / 9
    this.instance.y = this.y * screenWidth / 9
    this.instance.width = this.width
    this.instance.height = this.height
    this.init()
    this.eventBind() 
  }

  id = uuid()
  index 
  x = 0 
  y = 0 

  instance  
  text 
  background  
  numberValue 

  init(value=0) {
    this.numberValue = value 
    if(!this.text) {
      this.text = new cax.Text(value, {
        baseline: 'middle',
        textAlign: 'center',
        font: "20px Arial"
      })
      this.text.x = this.width / 2
      this.text.y = this.height / 2 + 1

      this.background = new cax.Rect(this.width, this.height, {
        fillStyle: 'yellow'
      })

      this.background.on('tap', this.handleTap.bind(this))
      this.instance.add(this.background, this.text)
    }else {
      this.text.text = value || ''
    }
  }

  handleJudge() {
    const dataSource = databus.sodukuData
    const columnData = dataSource.slice((this.y) * 9, (this.y + 1) * 9)
    const startY = Math.floor(this.y / 3)
    const startX = Math.floor(this.x / 3)
    const gridData = new Array(3).fill(0).reduce((acc, cur, index) => {
      acc.push(...new Array(3).fill(0).map((_, ind) => {
        return dataSource[(startY * 3 + index) * 9 + (startX * 3) + ind]
      }))
      return acc 
    }, [])

    if(duplicateRemoval(gridData).length !== gridData.length || duplicateRemoval(columnData).length !== columnData.length) {
      console.log('重复')
    }
  }

  handleTap() {
    if(!!this.numberValue) return 
    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_INPUT, (number) => {
      if(!!~number) {
        databus.setSodukuData([[this.index, number]])
        this.init(number)
        this.numberValue = number 
        // 验证
        this.handleJudge()
      }
    })
  }

  eventBind() {
    
  }

}
