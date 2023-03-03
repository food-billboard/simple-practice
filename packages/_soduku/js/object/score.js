import cax from '../libs/cax'
import { ContainerWidth, ContainerHeight, EVENT_EMITTER, EVENT_EMITTER_NAME, GAME_DATA } from '../databus'
// import Text from './text'
import { BIRD_HEIGHT } from './bird'

const SCORE_IMAGE = new Array(10).fill(0).map((_, index) => `images/${index}.png`)
const RESTART = 'images/restart.png'

const RESTART_WIDTH = 107 
const RESTART_HEIGHT = 38 
const SCORE_WIDTH = 24
const SCALE = ContainerWidth / 375
const SCALE_SCORE_WIDTH = SCORE_WIDTH * SCALE

// 分数
export default class Score extends cax.Group {
	constructor() {
    super()
		this.init()
		this.eventBind()
	}

	scoreInstances = []
	restartInstance

	init() {

		this.restartInstance = new cax.Bitmap(RESTART)
		this.restartInstance.x = ContainerWidth / 2 - (RESTART_WIDTH * SCALE) / 2
		this.restartInstance.y = ContainerHeight / 2 - (RESTART_HEIGHT * SCALE) / 2
		this.restartInstance.scaleX = this.restartInstance.scaleY = SCALE
		this.restartInstance.alpha = 0 
		this.restartInstance.on("tap", () => {
			if(!this.restartInstance.alpha) return 
			this.restartInstance.alpha = 0
			GAME_DATA.score = 0 
			GAME_DATA.data = {}
			EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_RESTART)
		})
		this.add(this.restartInstance)

		this.reset()
	}

	reset() {
		const scoreInstances = [...this.scoreInstances]
		scoreInstances.forEach((item) => item.destroy())
		this.scoreInstances = []

		this.update()
	}

	update(text) {
		this.updateScore()
		this.updateText(text)
	}

	updateText(text) {
		// new Text(text)
	}

	updateScore() {
		const value = GAME_DATA.score.toString()
		const numbers = value.split("")
		const length = this.scoreInstances.length
		let newScoreTemp = []
		const startIndex = numbers.length - length
		const REAL_SCALE_SCORE_WIDTH = SCALE_SCORE_WIDTH * 1.1
		const startX = ContainerWidth / 2 - (numbers.length * REAL_SCALE_SCORE_WIDTH) / 2

		this.scoreInstances.forEach((instance, index) => {
			const targetNumber = numbers[index + startIndex]
			instance.img.src = SCORE_IMAGE[targetNumber]
			instance.x = startX + (index + startIndex) * REAL_SCALE_SCORE_WIDTH
		})

		if (numbers.length !== length) {
			new Array(numbers.length - length).fill(0).forEach((_, index) => {
				const targetNumber = numbers[index]
				const newObject = new cax.Bitmap(SCORE_IMAGE[targetNumber])
				newObject.x = startX + index * REAL_SCALE_SCORE_WIDTH
				newObject.y = BIRD_HEIGHT 
				newObject.scaleX = newObject.scaleY = SCALE
				newScoreTemp[index] = newObject

				this.add(newObject)

				if (newScoreTemp.length === numbers.length - length) {
					this.scoreInstances.unshift(...newScoreTemp)
				}

			})
		}
	}

	onScore(score) {
		const { value, text } = score
		GAME_DATA.score += value
		if (!GAME_DATA.data[text]) GAME_DATA.data[text] = 0
		GAME_DATA.data[text] += value
		this.update(text)
	}

	onGameOver() {
		this.restartInstance.alpha = 1
	}

	onDestroy() {
		this.reset()
	}

	eventBind() {
		EVENT_EMITTER.addListener(
			EVENT_EMITTER_NAME.ON_DESTROY,
			this.onDestroy,
			this
		)
		EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_SCORE, this.onScore, this)
		EVENT_EMITTER.addListener(
			EVENT_EMITTER_NAME.ON_GAME_OVER,
			this.onGameOver,
			this
		)
	}

	eventUnBind() {
		EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_DESTROY, this.onDestroy)
		EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_SCORE, this.onScore)
		EVENT_EMITTER.removeListener(
			EVENT_EMITTER_NAME.ON_GAME_OVER,
			this.onGameOver
		)
	}
}