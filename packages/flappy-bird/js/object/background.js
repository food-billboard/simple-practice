import cax from "../libs/cax"
import { EVENT_EMITTER, EVENT_EMITTER_NAME, ContainerWidth, ContainerHeight } from '../databus'

const BG_WIDTH = 768
const BG_HEIGHT = 896

const BG_BOTTOM_WIDTH = 375
export const BG_BOTTOM_HEIGHT = 128

const BACKGROUND_NORMAL = 'images/background.png'
const BACKGROUND_BOTTOM = 'images/ground.png'
const BACKGROUND_BOTTOM_LIST = new Array(Math.ceil(ContainerWidth / BG_BOTTOM_WIDTH) + 1).fill(BACKGROUND_BOTTOM)

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

export class _BottomBackground extends cax.Group {

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

	unit = 2

	init() {
		this.bottomInstances = BACKGROUND_BOTTOM_LIST.map((item, index) => {
      const instance = new cax.Bitmap(item)
      instance.x = index * (BG_BOTTOM_WIDTH)
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
				if (newX + BG_BOTTOM_WIDTH <= 0) {
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

export class BottomBackground extends cax.Group {

	constructor() {
    super()
		this.init()
		this.eventBind()
	}

	bottomInstanceLeft 
	bottomInstanceRight 

	timing = {
		value: 1,
		current: 0,
	}

	unit = 1.5

	init() {

		this.bottomInstanceLeft = new cax.Bitmap(BACKGROUND_BOTTOM)
		this.bottomInstanceRight = new cax.Bitmap(BACKGROUND_BOTTOM)

		this.bottomInstanceLeft.x = 0 
		this.bottomInstanceRight.x = ContainerWidth
		this.bottomInstanceLeft.y = this.bottomInstanceRight.y = BACKGROUND_NORMAL_HEIGHT
		this.bottomInstanceLeft.scaleX = this.bottomInstanceLeft.scaleY = this.bottomInstanceRight.scaleX = this.bottomInstanceRight.scaleY = ContainerWidth / BG_BOTTOM_WIDTH

		this.add(this.bottomInstanceLeft, this.bottomInstanceRight)
	}

	animation() {
		// 动画执行
		if (this.timing.current === 0) {
			this.bottomInstanceLeft.x -= this.unit
			this.bottomInstanceRight.x -= this.unit

			if(this.bottomInstanceLeft.x <= -ContainerWidth) {
				this.bottomInstanceLeft.x = ContainerWidth
			}
			if(this.bottomInstanceRight.x <= -ContainerWidth) {
				this.bottomInstanceRight.x = ContainerWidth
			}
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