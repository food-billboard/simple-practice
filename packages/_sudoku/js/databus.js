import Pool from './base/pool'
import EventEmitter from './base/event-emitter'

export const EVENT_EMITTER = new EventEmitter()
export const EVENT_EMITTER_NAME = {
  // 游戏开始
  ON_GAME_START: "ON_GAME_START",
  // 游戏结束
  ON_GAME_END: "ON_GAME_END",
  // 游戏完成
  ON_GAME_COMPLETE: "ON_GAME_COMPLETE",
  // 游戏暂停
  ON_GAME_STOP: "ON_GAME_STOP",
  // 游戏继续
  ON_GAME_CONTINUE: "ON_GAME_CONTINUE",
  // 强制退出
  ON_GAME_QUITE: "ON_GAME_QUITE",
  // 填入内容校验
  ON_INPUT_JUDGE: "ON_INPUT_JUDGE",
  // 填入内容错误
  ON_INPUT_ERROR: "ON_INPUT_ERROR",
  // 填入错误内容重置
  ON_INPUT_ERROR_RESET: "ON_INPUT_ERROR_RESET",
  // 填入数字
  ON_INPUT: "ON_INPUT",
  // 填入完成
  ON_INPUT_END: "ON_INPUT_END",
  // 清除
  ON_CLEAR: "ON_CLEAR",
  // 撤销
  ON_UNDO: "ON_UNDO",
  // 笔记
  ON_SUMMARY: "ON_SUMMARY",
  // 提示
  ON_MEMO: "ON_MEMO",
  // 单元格点击
  ON_BLOCK_TAP: "ON_BLOCK_TAP"
}

let instance
let colorManage 

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if (instance) return instance

    instance = this

    this.pool = new Pool()

    this.reset()
  }

  // 游戏完成总数
  sudokuCompleteTotal = 81 
  // 数独的数据
  sudokuData = []
  // 点击数独时的关联单元格集合
  tapRelationBlocks = [] 

  reset() {
    // 难度
    this.difficulty = 0
    // 介绍页还是游戏页
    this.gameStep = 0
    // 分数
    this.score = 0
    // 是否游戏结束
    this.gameOver = false 
  }

  initSudokuData(value) {
    this.sudokuData = value 
  }

  setSudokuData(value) {
    value.forEach(item => {
      this.sudokuData[item[0]] = item[1]
    })
  }

  isSudokuComplete() {
    return this.sudokuData.filter(item => !!item).length === 81 
  }

}

// 颜色管理
class _ColorStyleManage {
  constructor() {
    if (colorManage) return colorManage

    colorManage = this
  }

  get backgroundColor() {
    return '#eee'
  }

  // 边框的颜色
  get borderColor() {
    return '#ff7700'
  }

  // 默认文字颜色
  get defaultFontColor() {
    return '#000'
  }

  // active文字颜色
  get activeFontColor() {
    return '#ff7700'
  }

  // 错误的文字颜色
  get errorFontColor() {
    return '#f00'
  }

  // 顶级选中背景颜色
  get primaryActiveBackgroundColor() {
    return '#777'
  }

  // 选中的背景颜色
  get activeBackgroundColor() {
    return '#999' 
  }

  // 普通的背景颜色
  get defaultBackgroundColor() {
    return '#eee'
  }

  // 普通二级背景颜色
  get nextBackgroundColor() {
    return '#ddd'
  }

  // 广告位的颜色
  get bannerColor() {
    return 'gray'
  }

  // 一级标题
  get titleFontSize() {
    return 28 
  }

  // 正文
  get contentFontSize() {
    return 16 
  }

  // 大按钮
  get primaryButtonSize() {
    return 20 
  }

  // 普通按钮
  get defaultButtonSize() {
    return 16 
  }

}

export const ColorStyleManage = new _ColorStyleManage() 
