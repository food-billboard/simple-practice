import { EVENT_EMITTER, EVENT_EMITTER_NAME } from '../../databus'
import cax from '../../libs/cax'
import IconButton from './components/icon-button'

export default class Header extends cax.Group {
  constructor (options) {
    super()

    Object.entries(options).forEach(([key, value]) => {
      this[key] = value 
    })

    this.init() 
   
  }

  stopButton

  init() {

    this.stopButton = new IconButton({
      image: 'images/stop.png',
      width: this.height * 0.8,
      height: this.height * 0.8,
      originWidth: 128,
      originHeight: 128,
      onClick: this.handleStop,
    })
    this.stopButton.x = 12 
    this.stopButton.y = this.height * 0.1

    this.add(this.stopButton)

  }

  handleStop() {
    EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_STOP)
  }

}
