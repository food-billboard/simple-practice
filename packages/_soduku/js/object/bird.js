import cax from "../libs/cax"
import {
	ContainerWidth,
	ContainerHeight,
	EVENT_EMITTER,
	EVENT_EMITTER_NAME,
} from "../databus"
import { knockJudge } from "../utils"
import { BACKGROUND_NORMAL_HEIGHT } from "./background"

const BIRD_IMAGE = "images/bird.png"

const BIRD_BASE_HEIGHT = 32
const BIRD_BASE_WIDTH = 46
const SCALE = ContainerWidth / 375
export const BIRD_HEIGHT = BIRD_BASE_HEIGHT * SCALE
export const BIRD_WIDTH = BIRD_BASE_WIDTH * SCALE
export const BIRD_START_X = 100

// 鸟
export default class Bird extends cax.Group {
	constructor() {
		super()
		this.init()
		this.eventBind()
	}

	instance

	defaultPosition = {
		x: 100,
		y: ContainerHeight / 2 - BIRD_HEIGHT / 2,
	}

	timing = {
		value: 1,
		current: 0,
	}

	moveActionInfo = {
		current: "bottom",
		top: {
			g: 5,
			gDefault: 6,
			unit: -0.3,
			angleLimit: -30,
			angleUnit: -10,
		},
		bottom: {
			g: 0,
			gDefault: 9.8,
			unit: 0.2,
			angleLimit: 70,
			angleUnit: 5,
		},
	}

	disabled = true
	selfDie = false 

	init() {
		this.instance = new cax.Sprite({
			framerate: 7,
			imgs: [BIRD_IMAGE],
			frames: [
				[0, 0, 46, 32],
				[46, 0, 46, 32],
				[92, 0, 46, 32],
			],
			animations: {
				normal: {
					frames: [0, 1, 2],
				},
			},
			playOnce: false,
			currentAnimation: "normal",
		})
		this.instance.x = this.defaultPosition.x
		this.instance.y = this.defaultPosition.y
		console.log(this.instance, 222)
		this.instance.originX = BIRD_BASE_WIDTH / 2
		this.instance.originY = BIRD_BASE_HEIGHT / 2
		this.instance.scaleX = this.instance.scaleY = SCALE
		this.add(this.instance)
	}

	onClick = () => {
		this.moveActionInfo.top.g = this.moveActionInfo.top.gDefault
		this.moveActionInfo.current = "top"
	}

	onGamePlay() {
		this.disabled = false
		this.selfDie = false 
		if (this.instance) {
			this.instance.x = this.defaultPosition.x
			this.instance.y = this.defaultPosition.y
		}
	}

	onGameOver() {
		this.disabled = true
		this.instance && this.instance.gotoAndStop('normal')
	}

	onColumnKnock(objects) {
		if(this.disabled) return 
		const target = {
			x: this.instance.x,
			y: this.instance.y,
			width: BIRD_WIDTH,
			height: BIRD_HEIGHT,
		}
		const isKnock = objects.some((item) => {
			return knockJudge(target, {
				x: item[0],
				y: item[1],
				width: item[2],
				height: item[3],
			})
		})

		if (isKnock && false) {
			EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_OVER)
		}
	}

	onAnimation() {
		if (this.timing.current === 0) {
			// 上升
			if (this.moveActionInfo.current === "top") {
				if (this.instance.y > 0) {
					this.instance.y -= this.moveActionInfo.top.g
				}
				if (this.instance.rotation > this.moveActionInfo.top.angleLimit) {
					this.instance.rotation += this.moveActionInfo.top.angleUnit
				}
				this.moveActionInfo.top.g += this.moveActionInfo.top.unit
				if (this.moveActionInfo.top.g <= 0) {
					this.moveActionInfo.current = "bottom"
					this.moveActionInfo.bottom.g = 0
				}
			} else {
				if (this.instance.y + BIRD_HEIGHT >= BACKGROUND_NORMAL_HEIGHT) {
					EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_OVER)
					return
				}
				this.instance.y += this.moveActionInfo.bottom.g
				if (this.moveActionInfo.bottom.g < this.moveActionInfo.bottom.gDefault)
					this.moveActionInfo.bottom.g += this.moveActionInfo.bottom.unit
				if (this.instance.rotation < this.moveActionInfo.bottom.angleLimit) {
					this.instance.rotation += this.moveActionInfo.bottom.angleUnit
				}
			}
		}

		this.timing.current++
		this.timing.current %= this.timing.value
	}

	eventBind() {
		wx.onTouchStart(this.onClick)

		EVENT_EMITTER.addListener(
			EVENT_EMITTER_NAME.ON_ANIMATION,
			this.onAnimation,
			this
		)
		EVENT_EMITTER.addListener(
			EVENT_EMITTER_NAME.ON_GAME_PLAY,
			this.onGamePlay,
			this
		)
		EVENT_EMITTER.addListener(
			EVENT_EMITTER_NAME.ON_GAME_OVER,
			this.onGameOver,
			this
		)
		EVENT_EMITTER.addListener(
			EVENT_EMITTER_NAME.ON_COLUMN_KNOCK,
			this.onColumnKnock,
			this
		)
	}

	eventUnBind() {
		wx.offTouchStart(this.onClick)

		EVENT_EMITTER.removeListener(
			EVENT_EMITTER_NAME.ON_GAME_PLAY,
			this.onGamePlay
		)
		EVENT_EMITTER.removeListener(
			EVENT_EMITTER_NAME.ON_ANIMATION,
			this.onAnimation
		)
		EVENT_EMITTER.removeListener(
			EVENT_EMITTER_NAME.ON_GAME_OVER,
			this.onGameOver
		)
		EVENT_EMITTER.removeListener(
			EVENT_EMITTER_NAME.ON_COLUMN_KNOCK,
			this.onColumnKnock
		)
	}
}
