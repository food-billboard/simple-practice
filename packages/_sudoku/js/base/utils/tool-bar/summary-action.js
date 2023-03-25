import { EVENT_EMITTER, EVENT_EMITTER_NAME } from '../../../databus'

class SummaryAction {
  
  emit() {
    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_SUMMARY)
  }

}

export default new SummaryAction()