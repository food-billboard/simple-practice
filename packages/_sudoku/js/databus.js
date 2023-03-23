import Pool from './base/pool'
import EventEmitter from './base/event-emitter'

export const EVENT_EMITTER = new EventEmitter()
export const EVENT_EMITTER_NAME = {
  // 游戏开始
  ON_GAME_START: "ON_GAME_START",
  // 游戏结束
  ON_GAME_END: "ON_GAME_END",
  // 填入内容错误
  ON_INPUT_ERROR: "ON_INPUT_ERROR",
  // 填入数字
  ON_INPUT: "ON_INPUT",
  // 清除
  ON_CLEAR: "ON_CLEAR",
  // 撤销
  ON_UNDO: "ON_UNDO",
  // 重玩
  ON_RESTART: "ON_RESTART",
  // 笔记
  ON_SUMMARY: "ON_SUMMARY",
  // 提示
  ON_MEMO: "ON_MEMO",
  // 单元格点击
  ON_BLOCK_TAP: "ON_BLOCK_TAP"
}

let instance

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

  // 数独的数据
  sudokuData = []
  // 点击数独时的关联单元格集合
  tapRelationBlocks = [] 

  reset() {
    // 难度
    this.difficulty = 0
    // 介绍页还是游戏页
    this.gameStep = 1
    // 容错次数
    this.errorCount = 3 
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

}
