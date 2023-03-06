import cax from '../libs/cax'
import { EVENT_EMITTER_NAME, EVENT_EMITTER, ContainerWidth, ContainerHeight, FLAG_MAP } from '../databus'
import { BACKGROUND_NORMAL_HEIGHT } from './background'
import { BIRD_HEIGHT, BIRD_START_X } from './bird'
import { random, uuid } from '../utils'

const COLUMN_BOTTOM_IMAGE = 'images/pipe.png'
const COLUMN_TOP_IMAGE = 'images/pipe-top.png'

const MIN_PIPE_HEIGHT = BIRD_HEIGHT * 4
const MIN_PIPE_RANGE = BIRD_HEIGHT * 4
const MAX_PIPE_HEIGHT = BACKGROUND_NORMAL_HEIGHT - MIN_PIPE_HEIGHT
const PIPE_WIDTH = 138
const PIPE_HEIGHT = 1093
const PIPE_SCALE = MAX_PIPE_HEIGHT / PIPE_HEIGHT
const SCALE_PIPE_WIDTH = PIPE_SCALE * PIPE_WIDTH
const SCALE_PIPE_HEIGHT = MAX_PIPE_HEIGHT

// 柱子
class ColumnObject {
	constructor({ id, isShow, add, first }) {
		this.id = id
		this.isShow = isShow
		this.add = add 
		this.init(first)
		this.addChild()
		this.eventBind()
		return this
	}

	add 

	instanceTop
	instanceBottom

	id
	position = {
		x: 0,
		y: 0,
		unit: 1.5,
	}

	bottomHeight = 0
	topHeight = 0
	isShow = false
	scored = false

	scoreInfo = {}

	init(first) {
		this.isShow = false 
		this.scored = false 

		this.scoreInfo = {
			value: 1,
			text: FLAG_MAP[Math.floor(Math.random() * FLAG_MAP.length)],
		}

		const realContainerHeight = BACKGROUND_NORMAL_HEIGHT

		const max = MAX_PIPE_HEIGHT
		const min = MIN_PIPE_HEIGHT
		this.position.x = ContainerWidth + SCALE_PIPE_WIDTH * (first ? 0.5 : 4)

		const height = random(max, min)

		if (Math.random() > 0.5) {
			this.topHeight = height
			this.instanceTop = new cax.Bitmap(COLUMN_TOP_IMAGE)
			this.instanceTop.x = this.position.x
			this.instanceTop.y = - (SCALE_PIPE_HEIGHT - height)

			if (height < max - MIN_PIPE_RANGE) {
				this.bottomHeight = random(
					realContainerHeight - height - MIN_PIPE_RANGE,
					min
				)
				this.position.y = realContainerHeight - this.bottomHeight
				this.instanceBottom = new cax.Bitmap(COLUMN_BOTTOM_IMAGE)
				this.instanceBottom.x = this.position.x
				this.instanceBottom.y = this.position.y
			}
		} else {
			this.bottomHeight = height
			this.position.y = realContainerHeight - height
			this.instanceBottom = new cax.Bitmap(COLUMN_BOTTOM_IMAGE)
			this.instanceBottom.x = this.position.x 
			this.instanceBottom.y = this.position.y

			if (height <= max - MIN_PIPE_RANGE) {
				this.topHeight = random(
					realContainerHeight - height - MIN_PIPE_RANGE,
					min
				)
				this.instanceTop = new cax.Bitmap(COLUMN_TOP_IMAGE)
				this.instanceTop.x = this.position.x 
				this.instanceTop.y = -(SCALE_PIPE_HEIGHT - this.topHeight)

			}
		}

	}

	addChild() {
		if(this.instanceTop) {
			this.instanceTop.scaleX = this.instanceTop.scaleY = PIPE_SCALE
			this.add(this.instanceTop)
		}
		if(this.instanceBottom) {
			this.instanceBottom.scaleX = this.instanceBottom.scaleY = PIPE_SCALE
			this.add(this.instanceBottom)
		}
	}

	animation = () => {
		this.position.x -= this.position.unit
		if(this.instanceTop) this.instanceTop.x = this.position.x
		if(this.instanceBottom) this.instanceBottom.x = this.position.x

		const positionList = []
		if (this.instanceTop)
			positionList.push([this.position.x, 0, SCALE_PIPE_WIDTH, this.topHeight])
		if (this.instanceBottom)
			positionList.push([
				this.position.x,
				this.position.y,
				SCALE_PIPE_WIDTH,
				this.bottomHeight,
			])

		// 积分
		if (this.position.x + SCALE_PIPE_WIDTH < BIRD_START_X && !this.scored) {
			this.scored = true
			EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_SCORE, this.scoreInfo)
		}
		EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_COLUMN_KNOCK, positionList)

		// 显示
		if (
			this.position.x > 0 &&
			this.position.x <= ContainerWidth &&
			this.position.x >= SCALE_PIPE_WIDTH
		) {
			if (!this.isShow) {
				this.isShow = true
				EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_COLUMN_SHOW)
			}
		}
		// 隐藏
		else if (this.position.x + SCALE_PIPE_WIDTH <= 0) {
			EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_COLUMN_HIDDEN, this.id)
			this.instanceTop && this.instanceTop.destroy() 
			this.instanceBottom && this.instanceBottom.destroy()
			this.eventUnBind()
		}
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

	onDestroy() {
		this.eventUnBind()
		this.instanceTop && this.instanceTop.destroy()
		this.instanceBottom && this.instanceBottom.destroy()
	}
}

// 柱子生成
export default class ColumnFactory extends cax.Group {
	constructor() {
		super()
		this.eventBind()
	}

	timing = {
		value: 1,
		current: 0,
	}
	starting = false 
	first = true 

	instances = {}

	animation() {
		if(!this.starting) return 
		// 动画执行
		if (this.timing.current === 0) {
			EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_COLUMN_MOVE)
		}

		this.timing.current++
		this.timing.current %= this.timing.value
	}

	onColumnShow() {
		const id = uuid()
		this.instances[id] = new ColumnObject({
			id,
			add: this.add.bind(this),
			first: this.first
		})
		this.first = false 
	}

	onColumnHidden(id) {
		const target = this.instances[id]
		delete this.instances[id]
	}

	onGamePlay() {
		this.onColumnShow()
	}

	onGamePlayBefore() {
		this.starting = true 
		this.first = true 
	}

	onDestroy() {
		Object.values(this.instances).forEach((instance) => {
			instance.onDestroy()
		})
		this.instances = {}
	}

	eventBind() {
		EVENT_EMITTER.addListener(
			EVENT_EMITTER_NAME.ON_GAME_PLAY_BEFORE,
			this.onGamePlayBefore,
			this
		)
		EVENT_EMITTER.addListener(
			EVENT_EMITTER_NAME.ON_DESTROY,
			this.onDestroy,
			this
		)
		EVENT_EMITTER.addListener(
			EVENT_EMITTER_NAME.ON_GAME_PLAY,
			this.onGamePlay,
			this
		)
		EVENT_EMITTER.addListener(
			EVENT_EMITTER_NAME.ON_ANIMATION,
			this.animation,
			this
		)
		EVENT_EMITTER.addListener(
			EVENT_EMITTER_NAME.ON_COLUMN_SHOW,
			this.onColumnShow,
			this
		)
		EVENT_EMITTER.addListener(
			EVENT_EMITTER_NAME.ON_COLUMN_HIDDEN,
			this.onColumnHidden,
			this
		)
	}

	eventUnBind() {
		EVENT_EMITTER.removeListener(
			EVENT_EMITTER_NAME.ON_GAME_PLAY_BEFORE,
			this.onGamePlayBefore
		)
		EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_DESTROY, this.onDestroy)
		EVENT_EMITTER.removeListener(
			EVENT_EMITTER_NAME.ON_GAME_PLAY,
			this.onGamePlay
		)
		EVENT_EMITTER.removeListener(
			EVENT_EMITTER_NAME.ON_ANIMATION,
			this.animation
		)
		EVENT_EMITTER.removeListener(
			EVENT_EMITTER_NAME.ON_COLUMN_SHOW,
			this.onColumnShow
		)
		EVENT_EMITTER.removeListener(
			EVENT_EMITTER_NAME.ON_COLUMN_HIDDEN,
			this.onColumnHidden
		)
	}
}