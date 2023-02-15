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
    this.gameTime = 0 
    this.frame = 0
    this.score = 0
    this.blocks = []
    this.animations = []
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
