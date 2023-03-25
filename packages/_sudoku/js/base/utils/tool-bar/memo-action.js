import { EVENT_EMITTER, EVENT_EMITTER_NAME } from '../../../databus'

class MemoAction {
  
  emit() {
    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_MEMO)
  }

}

export default new MemoAction()