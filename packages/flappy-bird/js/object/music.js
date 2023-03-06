import { EVENT_EMITTER, EVENT_EMITTER_NAME } from '../databus'

const hitMedia = 'media/knock.mp3'
const flyMedia = 'media/fly.mp3'

export default class Music {

  constructor() {
    this.init() 
    this.eventBind()
  }

  flyInstance 
  knockInstance 
  birdFlyPlay = false 
  knockPlay = false 

  init() {
    this.flyInstance = wx.createInnerAudioContext()
    this.flyInstance.src = flyMedia

    this.knockInstance = wx.createInnerAudioContext()
    this.knockInstance.src = hitMedia
  }

  onBirdFly() {
    if(this.birdFlyPlay) return 
    this.birdFlyPlay = true 
    this.flyInstance.play()
  }

  onKnock() {
    if(this.knockPlay) return 
    this.knockPlay = true 
    this.knockInstance.play()
  }

  onBirdFlyEnd() {
    this.birdFlyPlay = false 
  }

  onKnockEnd() {
    this.knockPlay = false 
  }

  eventBind() {
    this.flyInstance.onEnded(this.onBirdFlyEnd)
    this.knockInstance.onEnded(this.onKnockEnd)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_BIRD_FLY, this.onBirdFly, this)
    EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_BIRD_KNOCK_COLUMN, this.onKnock, this)
  }

  eventUnBind() {
    this.flyInstance.offEnded(this.onBirdFlyEnd)
    this.knockInstance.offEnded(this.onKnockEnd)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_BIRD_FLY, this.onBirdFly)
    EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_BIRD_KNOCK_COLUMN, this.onKnock)
  }

}