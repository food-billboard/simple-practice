import cax from "../libs/cax"
import { random } from '../utils'
import { EVENT_EMITTER, EVENT_EMITTER_NAME, ContainerWidth, ContainerHeight } from '../databus'

// 祝福语
export default class Text extends cax.Group {
	constructor(text) {
    super()
		this.init(text)
		this.eventBind()
	}

	instance

	position = {
		x: 0,
		y: 0,
		unit: 1,
	}

	timing = {
		value: 1,
		current: 0,
	}

	init(text) {
		const unit = random(2, 1.1)
		this.position = {
			unit,
			x: ContainerWidth,
			y: random(ContainerHeight - 50 - Bird.HEIGHT, Bird.HEIGHT),
		}
		let realText = text
		if (!text) {
			realText = "送上我的新年祝福"
		} else if (realText.length > 4) {
			realText = text
		} else {
			realText = `祝你新的一年--${text}`
		}

		this.instance = new cax.Text(realText, {
			x: this.position.x,
			y: this.position.y,
			fill: "white",
			fontStyle: "bold",
		})
    this.instance.x = this.position.x 
    this.instance.y = this.position.y 
    this.add(this.instance)
	}

	animation = () => {
		// 动画执行
		if (this.timing.current === 0 && this.instance) {
			this.position.x -= this.position.unit
			this.instance.x = this.position.x

			if (this.position.x + 48 <= 0) {
				this.instance.destroy()
				this.eventUnBind()
			}
		}

		this.timing.current++
		this.timing.current %= this.timing.value
	}

	eventBind() {
		EVENT_EMITTER.addListener(
			EVENT_EMITTER_NAME.ON_COLUMN_MOVE,
			this.animation,
			this
		)
	}

	eventUnBind() {
		EVENT_EMITTER.removeListener(
			EVENT_EMITTER_NAME.ON_COLUMN_MOVE,
			this.animation
		)
	}
}