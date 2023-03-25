import { EVENT_EMITTER, EVENT_EMITTER_NAME } from '../../../databus'

class ClearAction {
  
  constructor() {
    this.eventBind()
  }

  inputMap = {}

  emit() {
    // TODO 
    // 可能需要根据是否看广告来进行后续的清除行为
    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_CLEAR, (index) => {
      const result = this.inputMap[index]
      delete this.inputMap[index]
      return result
    })
  }

  onInputEnd(index, value) {
    this.inputMap[index] = value 
  }

  onGameStart() {
    this.inputMap = {}
  }

  eventBind() {
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_START, this.onGameStart, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_INPUT_END, this.onInputEnd, this)
  }

}

export default new ClearAction()