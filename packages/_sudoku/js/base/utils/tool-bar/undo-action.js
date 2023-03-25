import { EVENT_EMITTER, EVENT_EMITTER_NAME } from '../../../databus'

class UndoAction {
  
  emit() {
    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_UNDO)
  }

}

export default new UndoAction()