import { EVENT_EMITTER, EVENT_EMITTER_NAME } from '../../../databus'

class MemoAction {
  
  emit() {
    wx.showToast({
      title: '功能研发中~',
      icon: 'none',
      mask: true,
      duration: 1500
    })
    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_MEMO)
  }

}

export default new MemoAction()