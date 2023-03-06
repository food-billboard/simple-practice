import cax from "../libs/cax"
import {
	ContainerWidth,
  ContainerHeight,
	EVENT_EMITTER,
	EVENT_EMITTER_NAME,
  GAME_DATA
} from "../databus"

const LUCKY_IMAGE = "images/lucky.png"

const LUCKY_BASE_HEIGHT = 79
const LUCKY_BASE_WIDTH = 100
const SCALE = ContainerWidth / 750 / 2
export const LUCKY_HEIGHT = LUCKY_BASE_HEIGHT * SCALE
export const LUCKY_WIDTH = LUCKY_BASE_WIDTH * SCALE

// 生命
export default class Life extends cax.Group {
	constructor() {
		super()
    this.init()
		this.eventBind()
	}

	instances 
  canAddLife = true 

  init() {
    this.instances = new Array(GAME_DATA.maxLife).fill(0).map((item, index) => {
      const instance = new cax.Bitmap(LUCKY_IMAGE)
      instance.y = ContainerHeight * 0.2 
      instance.x = ContainerWidth - ((index + 1) * (LUCKY_WIDTH + 5))
      instance.scaleX = instance.scaleY = SCALE
      instance.alpha = 0 
      this.add(instance)
      return instance
    })
  }

	onColumnKnock() {
		if(GAME_DATA.life) {
      GAME_DATA.life -- 
    }
	}

  onAdEnd() {
    if(this.canAddLife) {
			if(GAME_DATA.life < GAME_DATA.maxLife) {
				GAME_DATA.life ++ 
      	this.updateLife()	
			}else {
				wx.showToast({
					title: '最多只能增加三次失误机会',
					icon: 'none',
					mask: true,
					duration: 2000
				})
			}
    }
  }

  updateLife() {
    this.instances.forEach((instance, index) => {
      instance.alpha = index < GAME_DATA.life ? 1 : 0
    })
  }

  onGamePlayBefore() {
    this.canAddLife = true 
    this.updateLife()
  }

  onGamePaly() {
    this.canAddLife = false 
  }

	eventBind() {
		EVENT_EMITTER.addListener(
			EVENT_EMITTER_NAME.ON_BIRD_KNOCK_COLUMN,
			this.onColumnKnock,
			this
		)
    EVENT_EMITTER.addListener(
			EVENT_EMITTER_NAME.ON_AD_END,
			this.onAdEnd,
			this
		)
    EVENT_EMITTER.addListener(
			EVENT_EMITTER_NAME.ON_GAME_PLAY_BEFORE,
			this.onGamePlayBefore,
			this
		)
    EVENT_EMITTER.addListener(
			EVENT_EMITTER_NAME.ON_GAME_PLAY,
			this.onGamePaly,
			this
		)
	}

	eventUnBind() {
		EVENT_EMITTER.removeListener(
			EVENT_EMITTER_NAME.ON_BIRD_KNOCK_COLUMN,
			this.onColumnKnock
		)
    EVENT_EMITTER.removeListener(
			EVENT_EMITTER_NAME.ON_AD_END,
			this.onAdEnd
		)
    EVENT_EMITTER.removeListener(
			EVENT_EMITTER_NAME.ON_GAME_PLAY_BEFORE,
			this.onGamePlayBefore
		)
    EVENT_EMITTER.removeListener(
			EVENT_EMITTER_NAME.ON_GAME_PLAY,
			this.onGamePaly
		)
	}
}
