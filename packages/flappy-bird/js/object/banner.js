import cax from "../libs/cax"
import { EVENT_EMITTER, EVENT_EMITTER_NAME, ContainerWidth, ContainerHeight, BANNER_HEIGHT } from '../databus'
import { BACKGROUND_NORMAL_HEIGHT } from './background'

// 广告位
export default class Banner extends cax.Group {
	constructor() {
    super()
		// this.init()
	}

	banner 

  canAddLife = true 

	init() {

    this.y = ContainerHeight
    this.width = ContainerWidth
    this.height = BANNER_HEIGHT

    // this.banner = wx.createBannerAd({
    //   adUnitId: 'SLOT_ID_BIZ_BOTTOM',
    //   adIntervals: 30,
    //   style: {
    //     left: 0,
    //     top: ContainerHeight - BACKGROUND_NORMAL_HEIGHT,
    //     width: ContainerWidth,
    //     height: BANNER_HEIGHT
    //   }
    // })

    // this.banner.show()

    this.rect = new cax.Rect(ContainerWidth, BANNER_HEIGHT, {
      fillStyle: 'gray'
    })

    this.text = new cax.Text('广告位招租', {
      font: '20px Arial',
      color: '#ff7700',
      baseline: 'middle',
      textAlign: 'center'
    })

    this.text.x = ContainerWidth / 2
    this.text.y = BANNER_HEIGHT / 2

    this.add(this.rect, this.text)

	}

  onGamePlayBefore() {
    this.canAddLife = true  
  }

  onGamePlay() {
    this.canAddLife = false 
  }

  eventBind() {

		EVENT_EMITTER.addListener(
			EVENT_EMITTER_NAME.ON_GAME_PLAY_BEFORE,
			this.onGamePlayBefore,
			this
		)
		EVENT_EMITTER.addListener(
			EVENT_EMITTER_NAME.ON_GAME_PLAY,
			this.onGamePlay,
			this
		)
	}

	eventUnBind() {

		EVENT_EMITTER.removeListener(
			EVENT_EMITTER_NAME.ON_GAME_PLAY_BEFORE,
			this.onGamePlayBefore
		)
		EVENT_EMITTER.removeListener(
			EVENT_EMITTER_NAME.ON_GAME_PLAY,
			this.onGamePlay
		)
	}

}