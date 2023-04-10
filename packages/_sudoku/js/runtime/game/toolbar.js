import { ColorStyleManage, EVENT_EMITTER, EVENT_EMITTER_NAME } from '../../databus'
import cax from '../../libs/cax'
import ClearAction from '../../base/utils/tool-bar/clear-action'
import MemoAction from '../../base/utils/tool-bar/memo-action'
import SummaryAction from '../../base/utils/tool-bar/summary-action'
import UndoAction from '../../base/utils/tool-bar/undo-action'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth

export default class Toolbar extends cax.Group {
  constructor (options) {
    super()

    Object.entries(options).forEach(([key, value]) => {
      this[key] = value 
    })

    this.init()
   
  }

  onClear() {
    ClearAction.emit()
  }

  onUndo() {
    UndoAction.emit()
  }

  onRestart() {
    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_START)
  }

  onSummary() {
    SummaryAction.emit()
  }

  onMemo() {
    MemoAction.emit()
  }

  onClickAction(value) {
    switch(value) {
      case '清除':
        return this.onClear()
      case '撤销':
        return this.onUndo()
      case '重玩':
        return this.onRestart()
      case '笔记':
        return this.onSummary()
      case '提示':
        return this.onMemo()
    }
  }

  init() {
    const text = [
      '清除', '重玩', '笔记', '提示'
    ]
    const length = text.length
    // 间距
    const space = 8
    const size = this.height
    const startY = (this.height - size) / 2
    const startX = (screenWidth - (size * length + space * (length - 1))) / 2
    this.instances = text.map((value, index) => {
      const group = new cax.Group()

      // const rect = new cax.Rect(size, size, {
      //   fillStyle: 'pink',
      // })
      // rect.x = startX + (size + space) * index 
      // rect.y = startY
      // rect.on('tap', this.onClickNumber.bind(this, index + 1))

      const text = new cax.Text(value, {
        font: '16px Arial',
        color: ColorStyleManage.activeFontColor,
        baseline: 'middle',
        textAlign: 'center'
      })
      text.x = startX + (size + space) * index  + size / 2
      text.y = startY + size / 2
      text.on('tap', this.onClickAction.bind(this, value))

      group.add(text)
      return group 
    })
    this.add(...this.instances)
  }
}
