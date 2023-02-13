/**
 * 新年falg收集小游戏
 * flappy bird小游戏的魔改
 */

(function () {
	// constants
	const Container = document.querySelector("#app")
	const ScoreContainer = document.querySelector('#chart-canvas')
	const ScaleContainer = document.querySelector('.app-container')

	const ContainerWidth = Container.clientWidth
	const ContainerHeight = Container.clientHeight

	const IS_MOBILE = isMobile.any 

	let MouseScale = 1

	// ------------images------------

	const SCORE_IMAGE = [
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAkAgMAAADuoRK9AAAACVBMVEUAAAD///8UGBz+80zLAAAAAXRSTlMAQObYZgAAACFJREFUCNdjWAUCC2DU0lAgWEUOFUVbilyXQTwGp7iQKQCgDWX1PE3APgAAAABJRU5ErkJggg==',
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAkAgMAAAD9dlJJAAAACVBMVEUAAAAUGBz///9Rxbs7AAAAAXRSTlMAQObYZgAAACFJREFUCNdjCA0NDYAQUatWhRJDhMIJVnoQoaFQggFGAAB5FjxRBl8sZgAAAABJRU5ErkJggg==',
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAkAgMAAADuoRK9AAAACVBMVEUAAAD///8UGBz+80zLAAAAAXRSTlMAQObYZgAAACpJREFUCNdjWAUCC2DU0lAgWEUyBdIOpRCClFNRQPOgFPkuAwE4xYVMAQDnZWhrP6Ao+QAAAABJRU5ErkJggg==',
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAkAgMAAADuoRK9AAAACVBMVEUAAAD///8UGBz+80zLAAAAAXRSTlMAQObYZgAAACRJREFUCNdjWAUCC2DU0lAgWEUyBdIOpTDkBtZMiMfgFBcyBQDqIWhr/HTZWgAAAABJRU5ErkJggg==',
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAkAgMAAADuoRK9AAAACVBMVEUAAAD///8UGBz+80zLAAAAAXRSTlMAQObYZgAAACtJREFUCNdjWAUCC2DU0tCo0NBV9KRCyaFAzkWiuFAoBgYuZAokjEQxICgARNdeTdePdOwAAAAASUVORK5CYII=',
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAkAgMAAADuoRK9AAAACVBMVEUAAAD///8UGBz+80zLAAAAAXRSTlMAQObYZgAAAClJREFUCNdjWAUCC2DU0lAgWEUOFQXUj6CAgGIKaBKUosgUEIBTXMgUAOdlaGsyknRxAAAAAElFTkSuQmCC',
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAkAgMAAADuoRK9AAAACVBMVEUAAAD///8UGBz+80zLAAAAAXRSTlMAQObYZgAAAClJREFUCNdjWAUCC2DU0lAgWEUOFQXUD6HQ5CgxE0pRYArEY3CKC5kCAG0hZxd6e7LwAAAAAElFTkSuQmCC',
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAkAgMAAADuoRK9AAAACVBMVEUAAAD///8UGBz+80zLAAAAAXRSTlMAQObYZgAAACpJREFUCNdjWAUCC2DU0lAgWEUOFUUOBbIWieJCoRgYuKhDAU1HUAwICgCd6lP9s8Y81wAAAABJRU5ErkJggg==',
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAkAgMAAADuoRK9AAAACVBMVEUAAAD///8UGBz+80zLAAAAAXRSTlMAQObYZgAAACNJREFUCNdjWAUCC2DU0lAgWEUOFQWlMOQG1kyIx+AUFzIFAIX6ZcPfekSjAAAAAElFTkSuQmCC',
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAkAgMAAADuoRK9AAAACVBMVEUAAAD///8UGBz+80zLAAAAAXRSTlMAQObYZgAAACdJREFUCNdjWAUCC2DU0lAgWEUOFYVChVJOgZwEpSgyBQTgFBcyBQAATWcXCO3jvgAAAABJRU5ErkJggg=='
	]
	const RESTART = 'data:image/png;base64,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'
	const BIRD_IMAGE = "data:image/png;base64,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"
	const COLUMN_BOTTOM_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAADFCAMAAAACLQD3AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAbBQTFRFVDhHkZVfqbhprrxss8BwuMV0ucZ1vcl4tsRztcJysb5urbtrpbVnn69jmqpelKVaj6BVh5pPgZRLe5BIdIpDboU+aYA6Y3s2X3cyW3MvV2M0rLprzel60+5+1/KB3/mH3feG2/WE1vCA0u19yeZ3yOV3w+FzvdtuttVprMxipMVcnb9XlblSjrJMhKlEfaM/dp47bpY0aJEwY4wsX4kpXIYnWYQlV3AsssBw1fGA2vWE3PaF5P2L4vuJ0Ot8yuZ3wN5xuddssdFmqspgosNamLpSkLNNia5IgahDeaA9cJg2apMxZI4tXYcoWYMkVYAiVW4rz+t8eaA8cJc11fCA4fqJ1vGA4fqIsb9w4PqI3viHapMybII8dZw6dp06d547eZ88dp07dJs4cpo3bJQzapIyZo8uZI0tYossYIoqXogpWoUmWYMlV4IjVoEjVFM5VVw1VDhHVDhHVEFCVEo+AAAAbHFGiK5IlLhQpcZcsdFlyud40+9/1vGBzel7xOFztdRoqMpfnL9WkLVNhKpFdpw6qMlfsdBlqclfqcpfpMZczup7nb9W1O9/y+d4zep78q8cNwAAAJB0Uk5T//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/7///AP//////////////////////////////////n8yaRwAAAj5JREFUeJztl+dTwkAQxaOi2HtvYFfsvST2jr1hxd4r2LH3EkX+ZSOOGPSOTXJBZhzu829y7/be7dtQFLg8PL0U3j5KpY+3wtfPPyAwKDgkNCw8IjIqOiY2Lp4DEhKTklVqdUpqWnpGZlZ2jiY3L7+gsKi4pLSsvKKSA6qqa2imlq6uq29obGpuaW1r7+jUdnX39PZxq58HDHwDg0M/ABWjUg87AmgI+PmFXxpUzIhahxc5zAGjtB1gt8XYBzCeggcUuppRZsIe0E7ygCn99MzszJx+fkFbvLhUsryyurZevrG5tf0F7BgcrB2KMu7u7WPX3q6ROjAa+rDLYDzggMOjY9NJ1ukZzUycX1xeXd/c3t0vllZggQck8PgNPKEADQ94RgEspIH/BRBAitQ4X+QXkPzCfeEV2gIFsNApWDGnQAIsdJt8AHsKs3MvC7acEJFkpgW3sCuUJMNwW7yZhd4F6AekBtAPQkptEwmW2lV+EPX8QT9I0wA+XiF1kLHUEusgxrSOReLaoK3UFpwniU8BPhzyQvEvC3w4oEgweV399D5CTZqrTby8QPYoUfMDeRxg60AmUpZGagWw8wPL+wJoGHJAYhuUz7QWyHKSPSlvHGANI6hPYq+bPPVEzZNOaoN/fBdkmYW/C2KR8mYWOD/gRIKZJVykqzLLBPUHE3F/EDX0Svy/EDO6SxsXBT0cMyDycwsLkFnWYQ9jmH+QWX8zT566upGK+t9058U/yAvHlnPnhTsvcJflzgtkJd8BZa63r7atUqUAAAAASUVORK5CYII="
	const COLUMN_TOP_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAADFCAMAAAACLQD3AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAbBQTFRFAAAAVDhHbHFGiK5IlLhQpMZcsdFlvdtuyud40+9/3PaF5P2L3viH1vGBzel7xOFztdRoqcpfnb9WkLVNhKpFdpw6bJQzY4wsWYQlVYAiVVw1pcZcqMlfnL9WqMpfy+d41O9/pMVcsdBlzup7zep7qclf1/KBVDhHVEFCVEo+VDhHVFM5bII8dZw6dp06d547eZ88dp07dJs4cpo3cJg2bpY0apIyaJEwZo8uZI0tYossYIoqXogpXIYnWoUmWYMlV4IjVoEjVW4rs8Bw1vGA2vWE4fqI2/WE0Ot8yuZ3wN5xuddssdFmqspgosNamLpSkLNNia5IgahDeaA9apMyZI4tXYcoWYMksb9w1fCA3/mH4PqIcJc1apMxssBw1fGA4fqJ3feGz+t8eaA84vuJrLprzel60+5+1vCA0u19yeZ3yOV3w+FzttVprMxinb9XlblSjrJMhKlEfaM/dp47X4kpV3AskZVfqbhprrxsuMV0ucZ1vcl4tsRztcJysb5urbtrpbVnn69jmqpelKVaj6BVh5pPgZRLe5BIdIpDboU+aYA6Y3s2X3cyW3MvV2M0Zojd6QAAAJB0Uk5TAL//////////////////////////////////////////////////7///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Hod1fgAAAlNJREFUeJxjYGBkYmZhZWPn4OTi5uHl4xcQFBIWERUTl5AEAilGBgawAmkkBTKylCqQI0sB0JHyCvgUKCpBFSgDfYHVCpgCFSK8qYrDBPzehLsBV0gqKhEKByQFuHyB35GKhBwpzUY1RyrjsgKmQAV3QOG3grAbCCVaVlKSHC5fwAMKpy8IKiCUqgmmKIKOpFABzAo1Zdz5An+CIZy7iXUD+SGpSExk4bWClaACIhIMHbxJfJIjMxwIeXO0vkC4AWbFaH0xWl8QU18QX0aN1hdDvr6g2BcEkxzhuECqLwjGBcEChIaVGt7yQZHi8mF41VnUyXoEsz/O+kIBX4KhvCgmqRDDWfNSx5FqBNMk5cmepnUWFaskGrUnqVhnqRBq5NCuzqI8oEiqs8hriRGskkgqH2iUYIiu9Wib9SgsSBUJlVHIcYG1jCLc3ySUuwmWD6wEa3+C9SY1+hcUVs3U7VaT134gqZQjmB4IKiBoBV5H4mw/EE4whBItQW9SHlkEHalIyJGE2w+UNfakJHECkAJGdQ1NnEBDnZFBS1sKD9DWYtDS0dXTN9A31DUyNjEVMzO3sLSytrG1s3dwBNnhBFTg7OLqxs3j7uLh6eXt4+vnHxAYFGwSEhoWDlMQEekaxR2NqiAmFklBHEiBGxceBfFABQmJqFZgKIhKjEzCo4ALTUEyphUEFHBxp3DFE1SA05GpaelqUYmJ7hmZWdk57Ll5ivkFhUXFJabm4qW2EmVABeUVlc5V1TU11VXOtXX1DY1NzS2tbe0dnV3dPb19/UAFBAAAphHaSh28QlgAAAAASUVORK5CYII='
	const BACKGROUND_NORMAL = 'data:image/png;base64,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'
	const BACKGROUND_BOTTOM = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAyCAIAAABUL4V3AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAABGtJREFUeJzNmM2OHDUQgF1l9/RECVEWWCkHDvm5kCMSb4By4ModwQvwfkgICSkHHoELB7LihJRkJnTP9K9Nld1u273dszPKZETtqsfd4/bn+veu+umH78XHFACIb9XrP28uysv1JxflVfW/H5mHCW/9aUsfxphea2O07ulqzgtMeN9895UbEcZo+jkrTAic8L798WvhrRxfzyVT/zXZP7wLlOBEgBTyjDwiJrwHali9E22j265tCSqVylGhBzuP6+g1Gveio9nkBJRSASqQUiSh4eYb+zm+qzZia1e0lkRUuQQem1Z0ktacEz1sGzKlBIP7TnS0rol4JgxMvFH1d/FuvEHEe6s8V7mdZGAhdrS1kNOm1W1Z7sgq5A8JwRHGW5GjMLKo+uX3V+PNarW6/uxzkjzPq6rChVAd32+apiyK7XZblEWereL54xyO+JjXRcHR63Zvf7XGRvSjdSYxFvabq2JTF10t8mxPjo/mBHtO9IsXAhMmxZuFdAn6St+VMrAwXykfE2hLQaZF1ousNaI3TjOaPaoXW8YtQZNlx5szc7FF87VJ3lUy0gOtimD1i9eVC7DJ0mCmT26P1ZcvXgxLWAaFZUc+Bu28Z8BpGd68ueH+xfV2EM0bhGT1VNJ8D4HkP+gJmwfDw7jEV/1Q37nY0qf/6si6q2afGis8wum267oOOz+90i7yAEEikq7UoeKvxlvwWzmJGnj0GmNg8DoNVJZ1Wu/KHdWcMA2THrIEc+YZrjZGXXxM9dPe85LKMGJV1+Wu3Gy34wSqecfoMba26+vrRD8dBQNvx7ud1u26vtztqFy1bXcMY1aoOiY8YeL9jkGmqfxSsLdVuy+q3NrTJyXaceLUAzLppsSLTDqsyCmFBolnOkPVtAcuHrGrAOZ7MmeJlyGh2yRRlIIQC9zDwPH0vmj4+MS1Cl05SXnz2iBQ6wX+tRcGQBwiqN6/DedB3pvn1fWeunxXaYKV78tbvPmoQXcoQX84EWLzZow1fkX9+vNvQT8KXNCOp1SWrzPK7s27zaOrRyI9aR1IAz1a0/r4rz9exxNU1q3i2Q7G8dJD27Qo8Gp9Jfasei9iTxwqXzhoP+NjJXUW6TfAWIOhAQ7HXzzlXLpccegQpoMnuA5QdFgkP+ewRO0620k8MceziaceNiGXfVY5/YYG6p4lOJhLviiPF9TTrN/L508jHgSezzBfCX2ZZt/MJjtOqLOint2/F/GMP9w6H9hSElVb4aJ0UT8M4CXe/VVQntf0fZr7gB070GhPu49Ze/nny52eec1+58cYHVs4Y51x4s4y8A7rd9CkCtYPwl04BgXeRMEP5T18/CS8wv0IAy/y3wn6HfafvPriorydjv7IcK62yMCb5AM9nI+Iu2HMU/k68LT2YMcYotFepesJFnyAd4fMn8+8jEvDeBGLnf2ojn+Yd365PG8uXTj3TD9pK867ZrF8/D/tefzJ7jy8S8IcLzpfuz9Gh/IR/uuy6DPn+1vzU0n/X/dBuz1d/gPNHXPncrS6dwAAAABJRU5ErkJggg=='
	// ? 37 是 BACKGROUND_BOTTOM 的宽
	const BACKGROUND_LIST = new Array(Math.ceil(ContainerWidth / 37) + 1).fill(BACKGROUND_BOTTOM)

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
		ON_COLUMN_HIDDEN: 'ON_COLUMN_HIDDEN',
		// 柱子碰撞判断
		ON_COLUMN_KNOCK: 'ON_COLUMN_KNOCK',
		// 重新开始
		ON_GAME_RESTART: 'ON_GAME_RESTART',
		// 分数刷新
		ON_SCORE: 'ON_SCORE',
		// 销毁
		ON_DESTROY: 'ON_DESTROY'
	}

	const FLAG_MAP = [
		'万事如意', '鹏程万里', '一帆风顺', '锦绣前程', '百年好合', '长命百岁', '日进斗金',
		'相亲相爱', '一路平安', '安居乐业', '名列前茅', '天长地久', '出人头地', '飞黄腾达', 
		'功成名就', '无忧无虑', '招财进宝', '茁壮成长', '登峰造极', '马到成功', '金榜题名', 
		'旗开得胜', '万事大吉', '步步高升'
	]

	// game info
	const GAME_DATA = {
		score: 0,
		data: {}
	}

	// 缓存加载的图片
	const IMAGE_MAP = {}

	// utils

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

	// 唯一id
	function uuid(prefix) {
		return (prefix || "PREFIX") + Date.now() + Math.random() + Math.random()
	}

	function random(max, min) {
		return Math.ceil(Math.random() * (max - min + 1) + min)
	}

	function getWidth(target) {
		return target.width || 1
	}
	
	function getHeight(target) {
		return target.height || 1
	}

	// 碰撞检测
	function knockJudge(origin, target, coincide) {
		if(!!coincide) return origin.x === target.x && origin.y === target.y
		return origin.x < target.x + getWidth(target) && origin.x + getWidth(origin) > target.x && origin.y < target.y + getHeight(target) && origin.y + getHeight(origin) > target.y 
	}

	function _onResize() {
		const width = document.documentElement.clientWidth
		const height = document.documentElement.clientHeight
		let scale = width / ContainerWidth
		scale = Math.min(1.5, scale)
		const realHeight = ContainerHeight * scale 
		if(realHeight > height) scale = height / ContainerHeight
		ScaleContainer.style.transform = `scale(${scale})`
		MouseScale = scale 
	}

	const onResize = debounce(_onResize, 500)

	// ------------konva------------

	// 动画
	const Stage = new Konva.Stage({
		container: "#canvas",
		width: ContainerWidth,
		height: ContainerHeight,
	})

	const BackgroundLayer = new Konva.Layer()
	const Layer = new Konva.Layer()
	const BirdLayer = new Konva.Layer() 
	const InteractiveLayer = new Konva.Layer()

	Stage.add(BackgroundLayer)
	Stage.add(Layer)
	Stage.add(InteractiveLayer)
	Stage.add(BirdLayer)

	// ------------konva------------

	// ------------event------------

	// ------------event------------


	// 祝福语
	class Text {

		constructor(text) {
			this.init(text)
			this.eventBind()
		}

		instance 

		position = {
			x: 0,
			y: 0,
			unit: 1
		}

		timing = {
			value: 1,
			current: 0 
		}

		init(text) {
			const unit = random(2, 1.1)
			this.position = {
				unit,
				x: ContainerWidth,
				y: random(ContainerHeight - 50 - Bird.HEIGHT, Bird.HEIGHT)
			}
			let realText = text 
			if(!text) {
				realText = '送上我的新年祝福'
			}else if(realText.length > 4) {
				realText = text 
			}else {
				realText = `祝你新的一年--${text}`
			}
			 
			this.instance = new Konva.Text({
				x: this.position.x,
				y: this.position.y,
				text: realText,
				fill: 'white',
				fontStyle: 'bold'
			})
			InteractiveLayer.add(this.instance)
		}

		animation = () => {
			// 动画执行
			if(this.timing.current === 0 && this.instance) {
				this.position.x -= this.position.unit
				this.instance.x(this.position.x)
	
				 if(this.position.x + 48 <= 0) {
					this.instance.destroy()
					this.eventUnBind()
				}
			}

			this.timing.current ++ 
			this.timing.current %= this.timing.value

		}	

		eventBind() {
			EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_COLUMN_MOVE, this.animation, this)
		}

		eventUnBind() {
			EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_COLUMN_MOVE, this.animation)
		}

	}

	// 分数
	class Score {

		constructor() {
			this.init() 
			this.eventBind()
		}

		scoreInstances = []
		restartInstance 
		chartContext = ScoreContainer.getContext('2d')

		init() {
			loader(RESTART, (image, { width, height }) => {
				this.restartInstance = new Konva.Image({
					image,
					width,
					height,
					x: ContainerWidth / 2 - width / 2,
					y: ContainerHeight / 2 - height / 2,
					visible: false 
				})
				this.restartInstance.on(IS_MOBILE ? 'touchend' : 'click', () => {
					this.restartInstance.visible(false)
					GAME_DATA.score = 0 
					GAME_DATA.data = {}
					EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_RESTART)
				})

				InteractiveLayer.add(this.restartInstance)
			})
			this.reset()

		}

		reset() {
			const scoreInstances = [
				...this.scoreInstances
			]
			scoreInstances.forEach(item => item.destroy())
			this.scoreInstances = [] 

			this.update()

		}

		update(text) {
			this.updateScore()
			// this.updateChart(text)
			this.updateText(text)
		}

		updateText(text) {
			new Text(text)
			if(!text) {
				setTimeout(() => {
					new Text('建议在PC端游玩~')
				}, 100)
			}
		}

		updateChart(text) {
			if(!text) return 
			const textData = Object.entries(GAME_DATA.data) 

			const data = {
				labels: textData.map(item => item[0]),
				datasets: [
					{
						label: '送给你的祝福😊',
						data: textData.map(item => item[1]),
						backgroundColor: [
							'rgb(253, 101, 133)',
							'rgb(253, 158, 75)',
							'rgb(254, 104, 96)',
							'rgb(81, 192, 191)',
							'rgb(61, 163, 232)',
						],
					}
				]
			}

			if(!this.instance) {
				this.instance = new Chart(this.chartContext, {
					type: 'pie',
					data,
					options: {
						responsive: true,
						plugins: {
							legend: {
								display: false,
								position: 'top',
							},
							title: {
								display: true,
								text: `祝你新的一年--${text}`,
								color: 'white'
							},
							tooltip: {
								display: true,
								font: {
									size: 8
								}
							}
						}
					},
				})
			}else {
				this.instance.options.plugins.title.text = `祝你新的一年--${text}`
				this.instance.data = data 
				this.instance.update()
			}
			
		}

		updateScore() {
			const value = GAME_DATA.score.toString() 
			const numbers = value.split('')
			const length = this.scoreInstances.length 
			let newScoreTemp = []
			const startIndex = numbers.length - length
			const startX = ContainerWidth / 2 - numbers.length * 24 / 2

			this.scoreInstances.forEach((instance, index) => {
				const targetNumber = numbers[index + startIndex]
				loader(SCORE_IMAGE[targetNumber], image => {
					instance.image(image)
					instance.x(startX + (index + startIndex) * 24)
				})
			})

			if(numbers.length !== length) {
				new Array(numbers.length - length).fill(0).forEach((_, index) => {
					const targetNumber = numbers[index]
					loader(SCORE_IMAGE[targetNumber], image => {
						const newObject = new Konva.Image({
							image,
							x: startX + (index * 24),
							y: Bird.HEIGHT,
							width: 24,
							height: 36
						})
						newScoreTemp[index] = newObject
						InteractiveLayer.add(newObject)

						if(newScoreTemp.length === numbers.length - length) {
							this.scoreInstances.unshift(...newScoreTemp)
						}

					})
				})
			}
		}

		onScore(score) {
			const { value, text } = score 
			GAME_DATA.score += value 
			if(!GAME_DATA.data[text]) GAME_DATA.data[text] = 0 
			GAME_DATA.data[text] += value 
			this.update(text)
		}

		onGameOver() {
			if(this.restartInstance) {
				this.restartInstance.visible(true)
			}
		}

		onDestroy() {
			this.reset()
		}

		eventBind() {
			EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_DESTROY, this.onDestroy, this)
			EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_SCORE, this.onScore, this)
			EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.onGameOver, this)
		}

		eventUnBind() {
			EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_DESTROY, this.onDestroy)
			EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_SCORE, this.onScore)
			EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.onGameOver)
		}

	}

	// 鸟
	class Bird {

		static WIDTH = 23
		static HEIGHT = 16 
		static START_X = 100

		constructor() {
			this.init() 
			this.eventBind() 
		}

		instance 

		defaultPosition = {
			x: 100,
			y: ContainerHeight / 2 - Bird.HEIGHT / 2
		}
		position = {
			x: 100,
			y: ContainerHeight / 2 - Bird.HEIGHT / 2
		}

		prevClientX = -999

		disabled = true 

		init() {
			loader(BIRD_IMAGE, image => {
				this.instance = new Konva.Sprite({
					x: this.position.x,
					y: this.position.y,
					image,
					width: Bird.WIDTH,
					height: Bird.HEIGHT,
					animation: 'normal',
					animations: {
						normal: [
							0, 0, 23, 16,
							23, 0, 23, 16, 
							46, 0, 23, 16,
						]
					},
					frameRate: 7,
          frameIndex: 0,
				})
				BirdLayer.add(this.instance)
				this.instance.start()
			})
		}

		onMouseMove = (e) => {
			if(this.disabled || !this.instance) return
			let clientX
			if(IS_MOBILE) {
				clientX = e.touches[0].clientX
			}else {
				clientX = e.clientX
			}
			const prevClientX = this.prevClientX
			this.prevClientX = clientX
			if(prevClientX === -999) {
				return 
			}

			const prevInstanceY = this.instance.y()
			const rest = clientX - prevClientX
			const unit = 1 * MouseScale
			const move = rest / unit
			let newY = prevInstanceY + move
			newY = Math.max(0, newY)
			newY = Math.min(ContainerHeight - Background.height - Bird.HEIGHT, newY)
			this.instance.y(newY)

		}

		onGamePlay() {
			this.disabled = false 
			this.prevClientX = -999
			if(this.instance) {
				this.instance.start()
				this.instance.position({
					...this.defaultPosition
				})
			}
		}

		onGameOver() {
			this.disabled = true
			this.instance && this.instance.stop()
		}

		onColumnKnock(objects) {
			if(!this.instance) return 
			const target = {
				x: this.instance.x(),
				y: this.instance.y(),
				width: this.instance.width(),
				height: this.instance.height()
			}
			const isKnock = objects.some(item => {
				return knockJudge(target, {
					x: item[0],
					y: item[1],
					width: item[2],
					height: item[3]
				})
			})

			if(isKnock) {
				EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_OVER)
			}
		}

		eventBind() {
			window.addEventListener(IS_MOBILE ? 'touchmove' : 'mousemove', this.onMouseMove)

			EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_PLAY, this.onGamePlay, this)
			EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.onGameOver, this)
			EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_COLUMN_KNOCK, this.onColumnKnock, this)
		}

		eventUnBind() {
			window.removeEventListener(IS_MOBILE ? 'touchmove' : 'mousemove', this.onMouseMove)

			EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_PLAY, this.onGamePlay)
			EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_OVER, this.onGameOver)
			EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_COLUMN_KNOCK, this.onColumnKnock)
		}

	} 

	// 背景
	class Background {
		constructor() {
			this.init()
			this.eventBind()
		}

		instances = []
		background 

		timing = {
			value: 1,
			current: 0 
		}

		unit = 1
		static width = 37
		static height = 50

		init() {

			loader(BACKGROUND_NORMAL, (image) => {
				this.background = new Konva.Image({
					image,
					width: ContainerWidth,
					height: ContainerHeight - Background.height,
					x: 0,
					y: 0,
				})
				BackgroundLayer.add(this.background)
			})

			BACKGROUND_LIST.forEach((image, index) => {
				loader(image, (image, { width, height }) => {
					Background.width = width 
					this.instances[index] = new Konva.Image({
						width,
						height,
						x: index * width,
						y: ContainerHeight - height,
						image,
					})
					BackgroundLayer.add(this.instances[index])
				})
			})
		}

		animation() {
			if(this.instances.length !== BACKGROUND_LIST.length) return 
			// 动画执行
			if(this.timing.current === 0) {
				this.instances.forEach((instance, index) => {
					const x = instance.x() 
					const newX = x - this.unit
					instance.x(newX)
					if(newX + Background.width < 0) {
						const prevInstance = this.instances[(index + this.instances.length - 1) % this.instances.length]
						const prevInstaceX = prevInstance.x() 
						instance.x(prevInstaceX + Background.width - 1)
					}
				})
			}

			this.timing.current ++ 
			this.timing.current %= this.timing.value
		}

		eventBind() {
			EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_ANIMATION, this.animation, this)
		}

		eventUnBind() {
			EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_ANIMATION, this.animation)
		}
	}

	// 柱子
	class ColumnObject {
		constructor({
			id, 
			isShow 
		}) {
			this.id = id 
			this.isShow = isShow
			this.init()
			this.eventBind()
			return this 
		}

		instanceTop 
		instanceBottom 

		id 
		position = {
			x: 0,
			y: 0,
			unit: 1
		}
		width = 32 
		bottomHeight = 20 
		topHeight = 20 
		isShow = false 
		scored = false 

		scoreInfo = {}

		init() {

			this.scoreInfo = {
				value: 1,
				text: FLAG_MAP[Math.floor(Math.random() * FLAG_MAP.length)]
			}

			const realContainerHeight = ContainerHeight - Background.height

			const max = realContainerHeight - Bird.HEIGHT * 4
			const min = Bird.HEIGHT * 4
			this.position.x = ContainerWidth + this.width * 2.5

			const height = random(max, min)

			if(Math.random() > 0.5) {
				this.topHeight = height 
				loader(COLUMN_TOP_IMAGE, (image, { width: imageWidth, height: imageHeight }) => {
					this.instanceTop = new Konva.Image({
						x: this.position.x,
						width: this.width,
						height,
						image,
						corp: {
							x: 0,
							y: imageHeight - height,
							width: this.width,
							height: height
						}
					})
					Layer.add(this.instanceTop)
				})
				if(height < (max - Bird.HEIGHT * 1.5)) {
					this.bottomHeight = random(realContainerHeight - height - Bird.HEIGHT * 1.5, min)
					loader(COLUMN_BOTTOM_IMAGE, (image, { width, height }) => {
						this.position.y = realContainerHeight - this.bottomHeight
						this.instanceBottom = new Konva.Image({
							x: this.position.x,
							y: this.position.y,
							width: this.width,
							height: this.bottomHeight,
							image,
							corp: {
								x: 0,
								y: 0,
								width,
								height: this.bottomHeight
							}
						})
						Layer.add(this.instanceBottom)
					})
				}
			}else {
				this.bottomHeight = height 
				loader(COLUMN_BOTTOM_IMAGE, (image, { width: columnWidth, height: columnHeight }) => {
					this.position.y = realContainerHeight - height
					this.instanceBottom = new Konva.Image({
						x: this.position.x,
						y: this.position.y,
						width: this.width,
						height,
						image,
						corp: {
							x: 0,
							y: 0,
							width: this.width,
							height
						}
					})
					Layer.add(this.instanceBottom)
				})
				if(height <= max - Bird.HEIGHT * 1.5) {
					this.topHeight = random(realContainerHeight - height - Bird.HEIGHT * 1.5, min)
					loader(COLUMN_TOP_IMAGE, (image, { width: columnWidth, height: columnHeight }) => {
						this.instanceTop = new Konva.Image({
							x: this.position.x,
							y: 0,
							width: this.width,
							height: this.topHeight,
							image,
							corp: {
								x: 0,
								y: columnHeight - this.topHeight,
								width: this.width,
								height: this.topHeight
							}
						})
						Layer.add(this.instanceTop)
					})
				}
			}

		}

		animation = () => {
			this.position.x -= this.position.unit
			this.instanceTop && this.instanceTop.x(this.position.x)
			this.instanceBottom && this.instanceBottom.x(this.position.x)

			const positionList = []
			if(this.instanceTop) positionList.push([this.position.x, 0, this.width, this.topHeight])
			if(this.instanceBottom) positionList.push([this.position.x, this.position.y, this.width, this.bottomHeight])

			// 积分
			if(this.position.x + this.width < Bird.START_X && !this.scored) {
				this.scored = true 
				EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_SCORE, this.scoreInfo)
			}
			EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_COLUMN_KNOCK, positionList)

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

		onDestroy() {
			this.eventUnBind()
			this.instanceTop && this.instanceTop.destroy() 
			this.instanceBottom && this.instanceBottom.destroy()
		}

	}

	// 柱子生成
	class ColumnFactory {

		constructor() {
			this.eventBind()
		}

		timing = {
			value: 1,
			current: 0 
		}

		instances = {}

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
			this.instances[id] = new ColumnObject({
				id,
			})
		}

		onColumnHidden(id) {
			const target = this.instances[id]
			delete this.instances[id]
		}

		onGamePlay() {
			this.onColumnShow()
		}

		onDestroy() {
			Object.values(this.instances).forEach(instance => {
				instance.onDestroy()
			})
			this.instances = {} 
		}

		eventBind() {
			EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_DESTROY, this.onDestroy, this)
			EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_PLAY, this.onGamePlay, this)
			EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_ANIMATION, this.animation, this)
			EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_COLUMN_SHOW, this.onColumnShow, this)
			EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_COLUMN_HIDDEN, this.onColumnHidden, this)
		}

		eventUnBind() {
			EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_DESTROY, this.onDestroy)
			EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_PLAY, this.onGamePlay)
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
			_onResize()
			new Background()
			new Animation() 
			new ColumnFactory()
			new Bird()
			new Score() 

			EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_PLAY)
		}

		// 重玩
		gameRePlay() {
			EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_DESTROY)
			setTimeout(() => {
				EVENT_EMITTER.emit(EVENT_EMITTER_NAME.ON_GAME_PLAY)
			}, 100)
		}

		eventBind() {
			EVENT_EMITTER.addListener(EVENT_EMITTER_NAME.ON_GAME_RESTART, this.gameRePlay, this)
		}

		eventUnBind() {
			EVENT_EMITTER.removeListener(EVENT_EMITTER_NAME.ON_GAME_RESTART, this.gameRePlay)
		}
	}

	const GameInstance = new Game()
	GameInstance.start()

	window.onresize = onResize

})()
