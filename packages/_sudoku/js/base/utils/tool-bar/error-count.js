import { EVENT_EMITTER, EVENT_EMITTER_NAME } from "../../../databus"

// 错误次数
class ErrorCount {

  value = 3 

  calDefaultCount = 3 

  start() {
    this.value = this.calDefaultCount 
  }

  errored(errorModal) {
    // 游戏结束
    if(!this.value) {
      EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_END)
    }else {
      errorModal[this.calDefaultCount - this.value].visible = false 
      this.value -- 
    }
  }

  added(errorModal) {
    if(this.value >= this.calDefaultCount) {
      wx.showToast({
        title: '最多只有3次错误~',
        duration: 1500,
        mask: true,
        icon: 'none'
      })
      return 
    }
    this.value ++ 
    errorModal[this.value - 1].visible = true 
  }

}

export default new ErrorCount()