import cax from "../libs/cax"
import { EVENT_EMITTER, EVENT_EMITTER_NAME, ContainerWidth, ContainerHeight } from '../databus'

const BG_WIDTH = 768
const BG_HEIGHT = 896

const BG_BOTTOM_WIDTH = 37
export const BG_BOTTOM_HEIGHT = 128

const BACKGROUND_NORMAL = 'images/background.png'
const BACKGROUND_BOTTOM = 'images/ground.png'
const BACKGROUND_BOTTOM_LIST = new Array(Math.ceil(ContainerWidth / (BG_BOTTOM_WIDTH - 1)) + 1).fill(BACKGROUND_BOTTOM)

const NORMAL_RATE = BG_HEIGHT / (BG_HEIGHT + BG_BOTTOM_HEIGHT)
export const BACKGROUND_NORMAL_HEIGHT = ContainerHeight * NORMAL_RATE

// 背景
export default class Background extends cax.Group {
	constructor() {
    super()
		this.init()
	}

	background 

	init() {

    this.background = new cax.Bitmap(BACKGROUND_NORMAL)

    this.background.x = 0

    this.background.scaleX = ContainerWidth / BG_WIDTH
    this.background.scaleY = BACKGROUND_NORMAL_HEIGHT / BG_HEIGHT

    this.add(this.background)

	}

}

export class BottomBackground extends cax.Group {

	constructor() {
    super()
		this.init()
		this.eventBind()
	}

	bottomInstances = []

	timing = {
		value: 1,
		current: 0,
	}

	unit = 1

	init() {
		this.bottomInstances = BACKGROUND_BOTTOM_LIST.map((item, index) => {
      const instance = new cax.Bitmap(item)
      instance.x = index * (BG_BOTTOM_WIDTH - 1)
      instance.y = BACKGROUND_NORMAL_HEIGHT / BG_HEIGHT * BG_HEIGHT
      return instance
    })
		this.add(...this.bottomInstances)
	}

	animation() {
		// 动画执行
		if (this.timing.current === 0) {
			this.bottomInstances.forEach((instance, index) => {
				const newX = instance.x - this.unit
				instance.x = newX
				if (newX + BG_BOTTOM_WIDTH < 0) {
					const prevInstance =
						this.bottomInstances[
							(index + this.bottomInstances.length - 1) % this.bottomInstances.length
						]
					const prevInstaceX = prevInstance.x
					instance.x = prevInstaceX + BG_BOTTOM_WIDTH - 1
				}
			})
		}

		this.timing.current++
		this.timing.current %= this.timing.value
	}

	eventBind() {
		EVENT_EMITTER.addListener(
			EVENT_EMITTER_NAME.ON_ANIMATION,
			this.animation,
			this
		)
	}

	eventUnBind() {
		EVENT_EMITTER.removeListener(
			EVENT_EMITTER_NAME.ON_ANIMATION,
			this.animation
		)
	}

}