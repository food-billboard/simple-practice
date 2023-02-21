import Pool from './base/pool'

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

  reset() {
    // 难度
    this.difficulty = 0
    // 介绍页还是游戏页
    this.gameStep = 1
    // 游戏时间
    this.gameTime = 0 
    this.frame = 0
    // 分数
    this.score = 0
    // 数独块
    this.blocks = []
    this.animations = []
    // 是否游戏结束
    this.gameOver = false
  }

  /**
   * 回收数独块
   * 此后不进入帧循环
   */
  removeBlocks(block) {
    const temp = this.blocks.shift()

    temp.visible = false

    this.pool.recover('block', block)
  }

}
