import cax from '../../libs/cax'
import { uuid } from '../../base/utils/index'
import DataBus, { EVENT_EMITTER, EVENT_EMITTER_NAME, ColorStyleManage } from '../../databus'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth

const databus = new DataBus() 

const NORMAL_BACKGROUND = ColorStyleManage.defaultBackgroundColor
const NORMAL_TEXT = ColorStyleManage.defaultFontColor

const ACTIVE_BACKGROUND = ColorStyleManage.activeBackgroundColor
const ACTIVE_TEXT = ColorStyleManage.activeFontColor

const ERROR_TEXT = ColorStyleManage.errorFontColor

const PRIMARY_ACTIVE_BACKGROUND = ColorStyleManage.primaryActiveBackgroundColor

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
  // 是否是被点击的
  active = false 
  // 是否是输入错误的
  error = false 

  init(value=0) {
    this.numberValue = value 
    if(!this.text) {
      this.text = new cax.Text(value, {
        baseline: 'middle',
        textAlign: 'center',
        font: "20px Arial",
        color: NORMAL_TEXT
      })
      this.text.x = this.width / 2
      this.text.y = this.height / 2 + 1

      this.background = new cax.Rect(this.width, this.height, {
        fillStyle: NORMAL_BACKGROUND
      })

      this.background.on('tap', this.handleTap.bind(this))
      this.text.on('tap', this.handleTap.bind(this))

      this.instance.add(this.background, this.text)
    }else {
      this.text.text = value || ''
    }
  }

  // 计算是否发生冲突
  handleJudge(needCal) {

    const relation = needCal ? this.calRelation() : databus.tapRelationBlocks

    const duplicate = relation.reduce((acc, cur) => {
      const [ x, y ] = cur.split(',')
      const number = databus.sudokuData[+x + y * 9]
      if(!!number && this.numberValue === number) {
        acc.push(cur)
      }
      return acc 
    }, [])

    return duplicate
  }

  // 计算点击关联的单元格
  calRelation() {
    const startX = Math.floor(this.x / 3) * 3
    const startY = Math.floor(this.y / 3) * 3
    const besideY = new Array(3).fill(0).map((_, index) => startY + index)
    return [
      ...new Array(9).fill(0).map((_, index) => {
        return `${index},${this.y}`
      }),
      ...new Array(9).fill(0).reduce((acc, _, index) => {
        if(!besideY.includes(index)) {
          acc.push(`${this.x},${index}`)
        }
        return acc 
      }, []),
      ...new Array(3).fill(0).reduce((acc, cur, index) => {
        const currentY = startY + index 
        if(this.y !== currentY) {
          acc.push(...new Array(3).fill(0).map((_, index) => {
            return `${startX + index},${currentY}`
          }))
        }
        return acc 
      }, [])
    ]
  }

  // 点击
  handleTap() {
    this.active = true 
    databus.tapRelationBlocks = this.calRelation()
    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_BLOCK_TAP, {
      index: this.index, 
      value: this.numberValue
    })
  }

  // 响应点击关联
  onBlockTap(config) {
    const { value, index } = config

    this.active = this.index === index

    // 相同数字高亮文字
    if(!this.error) {
      if(typeof value !== 'undefined' && this.numberValue === value) {
        this.text.color = ACTIVE_TEXT
      }else {
        this.text.color = NORMAL_TEXT
      }
    }
    // 关联单元格高亮背景
    if(this.active) {
      this.background.option.fillStyle = PRIMARY_ACTIVE_BACKGROUND
    }else if(databus.tapRelationBlocks.includes(`${this.x},${this.y}`)) {
      this.background.option.fillStyle = ACTIVE_BACKGROUND
    }else {
      this.background.option.fillStyle = NORMAL_BACKGROUND
    }
  }

  // 数字输入
  onInput(number) {
    if(this.active && !this.numberValue) {
      databus.setSudokuData([[this.index, number]])
      this.init(number)
      this.numberValue = number 
      // 验证
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_INPUT_JUDGE, this.index, this.handleJudge(false))
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_INPUT_END, this.index, number)
      this.handleTap()

      // 判断是否游戏结束
      if(databus.isSudokuComplete()) {
        EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_COMPLETE)
      }
    }
  }

  // 输入判断
  onInputJudge(currentInputIndex, _duplicate) {

    const duplicate = _duplicate || this.handleJudge(true)

    if(duplicate.includes(`${this.x},${this.y}`) && duplicate.length > 1) {
      this.error = true  
      this.text.color = ERROR_TEXT
      if(currentInputIndex === this.index) {
        EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_INPUT_ERROR)
      }
    }else if(!_duplicate) {
      if(this.error) {
        this.error = false 
      }
      this.text.color = NORMAL_TEXT
    }
  }

  // 游戏开始
  onGameStart() {
    if(this.active || this.error || this.text.color !== NORMAL_TEXT) {
      this.active = false 
      this.error = false 
      this.text.color = NORMAL_TEXT
    }
    this.background.option.fillStyle = NORMAL_BACKGROUND
  }

  // 清除内容
  onClear(judge) {
    if(this.active && judge(this.index)) {
      // 清除内容
      this.numberValue = undefined 
      this.text.text = '' 
      databus.setSudokuData([[this.index, 0]])
      // 清除错误提示
      if(this.error) {
        EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_INPUT_JUDGE)
      }
    }
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_START, this.onGameStart, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_INPUT, this.onInput, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_BLOCK_TAP, this.onBlockTap, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_INPUT_JUDGE, this.onInputJudge, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_CLEAR, this.onClear, this)
  }

  eventUnBind() {
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_START, this.onGameStart)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_INPUT, this.onInput)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_BLOCK_TAP, this.onBlockTap)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_INPUT_JUDGE, this.onInputJudge)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_CLEAR, this.onClear, this)
  }

}
