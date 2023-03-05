import { EVENT_EMITTER, EVENT_EMITTER_NAME, BASE_STAGE } from './databus'
import Background, { BottomBackground } from "./object/background"
import Bird from './object/bird'
import ColumnFactory from './object/pipe'
import Score from './object/score'
import Banner from './object/banner'

// 动画定时器
class Animation {
	constructor() {
		this.eventBind()
		this.animation()
	}

	isStop = false

	animation() {
		BASE_STAGE.update()
		if (!this.isStop) EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_ANIMATION)
		requestAnimationFrame(this.animation.bind(this))
	}

	start() {
		this.isStop = false
	}

	stop() {
		this.isStop = true
	}

	eventBind() {
		EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.stop, this)
		EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_PLAY_BEFORE, this.start, this)
	}

	eventUnBind() {
		EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.stop)
		EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_PLAY_BEFORE, this.start)
	}
}

// 游戏
class Game {
	constructor() {
		this.eventBind()
	}

	// 游戏开始
	start() {
		const background = new Background()
		new Animation()
		const columnFactory = new ColumnFactory()
		const bottomBackground = new BottomBackground()
		const bird = new Bird()
		const score = new Score()
		const banner = new Banner()

    BASE_STAGE.add(background)
		BASE_STAGE.add(columnFactory)
		BASE_STAGE.add(bottomBackground)
		BASE_STAGE.add(score)
    BASE_STAGE.add(bird)
		BASE_STAGE.add(banner)

		EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_PLAY_BEFORE)
	}

	// 重玩
	gameRePlay() {
		EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_DESTROY)
		setTimeout(() => {
			EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_PLAY_BEFORE)
		}, 100)
	}

	eventBind() {
		EVENT_EMITTER.addListener(
			EVENT_EMITTER_NAME.ON_GAME_RESTART,
			this.gameRePlay,
			this
		)
	}

	eventUnBind() {
		EVENT_EMITTER.removeListener(
			EVENT_EMITTER_NAME.ON_GAME_RESTART,
			this.gameRePlay
		)
	}
}

new Game().start()
