(function () {
	// constants
	const Container = document.querySelector("#app")

	const ContainerWidth = Container.clientWidth
	const ContainerHeight = Container.clientHeight

	// ------------images------------

  // ------------images------------

	// eventemitter
	const EVENT_EMITTER = new EventEmitter()
	const EVENT_EMITTER_NAME = {
		// 游戏结束
		ON_GAME_OVER: 'ON_GAME_OVER',
		// 游戏开始
		ON_GAME_PLAY: 'ON_GAME_PLAY',
		// 动画
		ON_ANIMATION: 'ON_ANIMATION',
		// 柱子移动
		ON_COLUMN_MOVE: 'ON_COLUMN_MOVE',
		// 柱子出现
		ON_COLUMN_SHOW: 'ON_COLUMN_SHOW',
		// 柱子消失
		ON_COLUMN_HIDDEN: 'ON_COLUMN_HIDDEN'
	}

	// game info
	const GAME_DATA = {
		score: 0,
		currentStep: 0,
		lineConnectScore: [10, 30, 60, 100, 150, 240, 300, 400],
		gridLightScore: 10,
	}

	// 缓存加载的图片
	const IMAGE_MAP = {}

	// utils

  function debounce(func, wait, immediate){
    var timeout, args, context, timestamp, result;
    if (null == wait) wait = 100;
  
    function later() {
      var last = Date.now() - timestamp;
  
      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    };
  
    var debounced = function(){
      context = this;
      args = arguments;
      timestamp = Date.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }
  
      return result;
    };
  
    debounced.clear = function() {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    };
    
    debounced.flush = function() {
      if (timeout) {
        result = func.apply(context, args);
        context = args = null;
        
        clearTimeout(timeout);
        timeout = null;
      }
    };
  
    return debounced;
  }

	// 图片加载
	function loader(image, callback) {
		if (IMAGE_MAP[image]) {
			return (
				callback &&
				callback(IMAGE_MAP[image].dom, {
					width: IMAGE_MAP[image].width,
					height: IMAGE_MAP[image].height,
				})
			)
		}
		const dom = new Image()
		dom.style.objectFit = "contain"
		dom.src = image
		dom.onload = () => {
			const width = dom.width
			const height = dom.height
			callback &&
				callback(dom, {
					width,
					height,
				})
			IMAGE_MAP[image] = {
				dom,
				width,
				height,
			}
		}
	}
	// 唯一id
	function uuid(prefix) {
		return (prefix || "PREFIX") + Date.now() + Math.random() + Math.random()
	}

	function random(max, min) {
		return Math.ceil(Math.random() * (max - min + 1) + min)
	}

	// ------------konva------------

	// 动画
	const Stage = new Konva.Stage({
		container: "#canvas",
		width: ContainerWidth,
		height: ContainerHeight,
	})

	const Layer = new Konva.Layer()

	Stage.add(Layer)

	// ------------konva------------

	// ------------event------------

	// ------------event------------

	// 鸟
	class Bird {

		static Size = 20

	} 

	// 背景
	class Background {
		constructor() {
			this.init()
			this.eventBind()
		}

		init() {

		}

		animation() {

		}

		eventBind() {
			EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_ANIMATION, this.animation, this)
		}

		eventUnBind() {
			EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_ANIMATION, this.animation)
		}
	}

	// 柱子
	class Column {
		constructor({
			id, 
			isShow 
		}) {
			this.id = id 
			this.isShow = isShow
			this.init()
			this.eventBind()
		}

		instanceTop 
		instanceBottom 

		id 
		position = {
			x: 0,
			unit: 1
		}
		width = 30 
		bottomHeight = 20 
		topHeight = 20 
		isShow = false 

		init() {

			const max = ContainerHeight / 2 - Bird.Size * .5
			const min = ContainerHeight / 2 - Bird.Size * 4
			this.width = 30 
			this.position.x = ContainerWidth + this.width * 2

			const height = random(max, min)

			if(Math.random() > 0.5) {
				this.topHeight = height 
				this.instanceTop = new Konva.Rect({
					x: this.position.x,
					y: 0,
					width: this.width,
					height,
					fill: '#0f0',
				})
				if(height <= ContainerHeight - Bird.Size * 4) {
					const realHeight = random(ContainerHeight - height - Bird.Size * 2, ContainerHeight - height - Bird.Size * 3)
					this.instanceBottom = new Konva.Rect({
						x: this.position.x,
						y: ContainerHeight - realHeight,
						width: this.width,
						height,
						fill: '#0f0',
					})
				}
			}else {
				this.bottomHeight = height 
				this.instanceBottom = new Konva.Rect({
					x: this.position.x,
					y: ContainerHeight - height,
					width: this.width,
					height,
					fill: '#0f0',
				})
				if(height <= ContainerHeight - Bird.Size * 4) {
					this.instanceBottom = new Konva.Rect({
						x: this.position.x,
						y: 0,
						width: this.width,
						height: random(ContainerHeight - ContainerHeight - height - Bird.Size, Bird.Size * 4),
						fill: '#0f0',
					})
				}
			}




			this.instanceTop && Layer.add(this.instanceTop)
			this.instanceBottom && Layer.add(this.instanceBottom)
		}

		animation = () => {
			this.position.x -= this.position.unit
			this.instanceTop && this.instanceTop.x(this.position.x)
			this.instanceBottom && this.instanceBottom.x(this.position.x)

			// 显示
			if(this.position.x > 0 && this.position.x <= ContainerWidth && this.position.x >= this.width) {
				if(!this.isShow) {
					this.isShow = true 
					EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_COLUMN_SHOW)
				}
			}
			// 隐藏
			else if(this.position.x + this.width <= 0) {
				EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_COLUMN_HIDDEN, this.id)
				this.instanceTop && this.instanceTop.destroy()
				this.instanceBottom && this.instanceBottom.destroy()
				this.eventUnBind()
			}

		}	

		eventBind() {
			EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_COLUMN_MOVE, this.animation, this)
		}

		eventUnBind() {
			EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_COLUMN_MOVE, this.animation)
		}
	}

	// 柱子生成
	class ColumnFactory {

		constructor() {
			this.init()
			this.eventBind()
		}

		timing = {
			value: 1,
			current: 0 
		}

		instances = {}

		init() {
			this.onColumnShow()
		}

		animation() {
			// 动画执行
			if(this.timing.current === 0) {
				EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_COLUMN_MOVE)
			}

			this.timing.current ++ 
			this.timing.current %= this.timing.value
		}

		onColumnShow() {
			const id = uuid()
			this.instances[id] = new Column({
				id,
			})
		}

		onColumnHidden(id) {
			const target = this.instances[id]


			delete this.instances[id]
		}

		eventBind() {
			EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_ANIMATION, this.animation, this)
			EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_COLUMN_SHOW, this.onColumnShow, this)
			EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_COLUMN_HIDDEN, this.onColumnHidden, this)
		}

		eventUnBind() {
			EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_ANIMATION, this.animation)
			EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_COLUMN_SHOW, this.onColumnShow)
			EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_COLUMN_HIDDEN, this.onColumnHidden)
		}

	}

	// 动画定时器
	class Animation {
		constructor() {
			this.eventBind()
		}

		isStop = false

		animation() {
			if (this.isStop) return
			EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_ANIMATION)
			requestAnimationFrame(this.animation.bind(this))
		}

		start() {
			this.isStop = false
			this.animation()
		}

		stop() {
			this.isStop = true
		}

		eventBind() {
			EVENT_EMITTER.addListener(
				EVENT_EMITTER_NAME.ON_GAME_OVER,
				this.stop,
				this
			)
			EVENT_EMITTER.addListener(
				EVENT_EMITTER_NAME.ON_GAME_PLAY,
				this.start,
				this
			)
		}

		eventUnBind() {
			EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.stop)
			EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_PLAY, this.start)
		}
	}

	// 游戏
	class Game {
		constructor() {
			this.eventBind()
		}

		// 游戏开始
		start() {
			new Animation() 
			new ColumnFactory()

			EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_PLAY)
		}

		// 重玩
		gameRePlay() {
			
		}

		// 数据重置
		gameInfoReset() {
			
		}

		// 数据初始化
		gameInfoInit() {
			
		}

		eventBind() {
			
		}

		eventUnBind() {
			
		}
	}

	const GameInstance = new Game()
	GameInstance.start()

})()
