import { EVENT_EMITTER, EVENT_EMITTER_NAME } from '../../../databus'

// 笔记
class SummaryAction {
  
  emit() {
    wx.showToast({
      title: '功能研发中~',
      icon: 'none',
      mask: true,
      duration: 1500
    })
    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_SUMMARY)
  }

}

export default new SummaryAction()