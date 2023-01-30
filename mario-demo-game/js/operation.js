window.onload = function() {
	/*变量参数;
		oStart: 游戏开始界面;
		oLoading: loading界面;
		oMain: 主界面;
		oInterphase: 地图主界面;
		oScore: 数据界面;
		oScoreDate: 数据信息;
		oTime: 时间数据;
		oChild: 人物;
		oSpecialCoin: 特殊砖块;
		life: 玛丽生命数量;
		timer: 闯关定时器;
		objMoveTimer: 物体运动检测定时器;
		monsterMoveTimer: 怪物运动定时器;
		buffMoveTimer: buff运动定时器;
		operateTimer: 人物操作函数定时器;
		up: 键盘按键是否按下的集合;
			83: s
			65: a
			68: d
			74: j
			75: k
		object: 物体对象数据;
		specialBrick: 特殊砖块集合;
		music: 各种音乐的集合;
		LOCK: 位移执行开关;
		_lock: 游戏暂停按钮;
		_isSide: 是否到达左边边界;
		jumpLock: 跳跃开关;
		child_moveLock: 人物碰撞;
			moveLockArrOn: 运动开关启动集合;
			moveLockArrOff: 运动开关关闭集合;
			objMoveArr: 碰撞物体检测;
		buff_moveLock: buff碰撞;
		bomb_moveLock: 子弹碰撞;
		monster_moveLock: 怪物碰撞;
		buffArr: 神秘砖块的物品显示集合;
		buffDirect: buff运动方向;
		monsterArr: 可视区怪物的集合;
		monsterDirect: 怪物运动方向集合;
		bombDirect: 子弹运动方向集合;
		personState: 人物状态;
		objChecked: 可视区怪物的集合;
		pos: 物体位置信息;
		time: 闯关时间倒计时;
		_positionBottom: 人物初始落地点;
		_positionTop: 人物距离顶部的距离;
		_positionLeft: 人物初始距离左边的距离;
		_brickSize: 砖块的大小;
		_brickBottom: 砖块堆距离底部的距离;
		_childWidth: 人物初始宽度;
		_childHeight: 人物初始高度;
		_pipeSize: 水泥管的高度;
		_stoneTop: 人物碰到墙的高度;
		_stoneHeight: 墙的height;
		_moneyWorth: 金币的分数;
		_isBomb: 人物是否可以发射子弹;
		_bombSize: 子弹的大小;
		_isUnbeatable: 人物是否是无敌状态;
		isWin: 是否赢得游戏的判断;
		isMute: 是否静音的开关;
		mute:静音图片;
		unmute:非静音图片;
		bombShooting: 正在发射中的子弹集合;
		aCanvas: 两个绘图界面;
		contextChild: 人物绘图环境;
		contextDetail: 地图绘制环境;
		holeArr: 地图上坑的位置;
		isHug: 人物是否处于抱旗状态;
		isRun: 人物是否处于跑动状态;
		date: 时间间隔控制器;
	*/
	var oStart = document.getElementById("start"),
		oLoading = document.getElementById("loading"),	
		oMain = document.getElementById("main"),	
		oInterphase = oMain.getElementsByClassName("main")[0],	
		oScore = document.getElementById("score"),	
		oScoreDate = oScore.getElementsByClassName("score")[0],
		oTime = oScore.getElementsByClassName("Time")[0],	
		oChild = oMain.getElementsByClassName("main_person")[0],
		aCanvas = document.getElementsByTagName("canvas"),	
		contextChild = aCanvas[0].getContext("2d"),		
		contextDetail = aCanvas[1].getContext("2d"),	
		oSpecialCoin = oMain.getElementsByClassName("special")[0],
		aMusic = document.querySelectorAll("#direction audio"),
		oMusicControls = document.querySelector("#direction p"),
		up = {	
			83: [false, down],	
			65:	[false, back],	
			68:	[false, go],	
			74:	[false, jump],	
			75:	[false, attack]	
		},		
		child_moveLock = {		
			"moveLockArrOn": {	
				"pipeGoLock": true,	
				"pipeBackLock": true, 
				"stoneGoLock": true, 
				"stoneBackLock": true, 
			},
			"moveLockArrOff": {	
				"pipeJumpLock": false,	
				"stoneJumpLock": false,	
				"brickJumpBottomLock": false,	
				"brickJumpTopLock": false,	
				"isBrickSide": false,	
				"isStoneSide": false,	
				"isPipeSide": false	
			},
			"objMoveArr": {	
				"hole": false,
				"brick": false,
				"stone": false,
				"monster": false,
				"pipe": false,
				"flag": false,
				"bomb": false
			}
		},
		buff_moveLock = {		
			"moveLockArrOn": {	
				"pipeGoLock": true,	
				"pipeBackLock": true, 
				"stoneGoLock": true, 
				"stoneBackLock": true, 
			},
			"moveLockArrOff": {	
				"pipeJumpLock": false,	
				"stoneJumpLock": false,	
				"brickJumpBottomLock": false,	
				"brickJumpTopLock": false,	
				"isBrickSide": false,	
				"isStoneSide": false,	
				"isPipeSide": false	
			},
			"objMoveArr": {	
				"hole": false,
				"brick": false,
				"stone": false,
				"monster": false,
				"pipe": false,
				"flag": false,
				"bomb": false
			}
		},
		bomb_moveLock = {		
			"moveLockArrOn": {	
				"pipeGoLock": true,	
				"pipeBackLock": true, 
				"stoneGoLock": true, 
				"stoneBackLock": true, 
			},
			"moveLockArrOff": {	
				"pipeJumpLock": false,	
				"stoneJumpLock": false,	
				"brickJumpBottomLock": false,	
				"brickJumpTopLock": false,	
				"isBrickSide": false,	
				"isStoneSide": false,	
				"isPipeSide": false	
			},
			"objMoveArr": {	
				"hole": false,
				"brick": false,
				"stone": false,
				"monster": false,
				"pipe": false,
				"flag": false,
				"bomb": false
			}
		},
		monster_moveLock = {	
			"moveLockArrOn": {	
				"pipeGoLock": true,	
				"pipeBackLock": true, 
				"stoneGoLock": true, 
				"stoneBackLock": true, 
			},
			"moveLockArrOff": {	
				"pipeJumpLock": false,	
				"stoneJumpLock": false,	
				"brickJumpBottomLock": false,	
				"brickJumpTopLock": false,	
				"isBrickSide": false,	
				"isStoneSide": false,	
				"isPipeSide": false	
			},
			"objMoveArr": {	
				"hole": false,
				"brick": false,
				"stone": false,
				"monster": false,
				"pipe": false,
				"flag": false,
				"bomb": false
			}
		},
		buffArr = {		
			"mushroom":[],
			"flower": [],
			"star": [],
			"money": []
		},
		buffDirect = {	
			"mushroom":[],
			"star": [],
			"money": [],
			"flower": []
		},
		monsterArr = {	
			"monsterMush": [],
			"tortoise": []
		},
		monsterDirect =	{	
			"monsterMush": [],
			"tortoise": []
		},
		bombDirect = {		
			"bomb": []
		},
		personState = {		
			"child": true,
			"adult": false,
			"cooker": false
		},
		objChecked = {
			"monsterMush": [],
			"tortoise": [],
			"money": [],
			"flower": [],
			"mushroom": [],
			"star": []
		},
		music = {
			"jump": "music/jump.mp3",
			"coin": "music/coin.mp3",
			"big": "music/big.mp3",
			"died": "music/died.mp3",
			"win": "music/win.mp3",
			"monsterMush": "music/monsterMush.mp3",
			"brickBreak": "music/brickBreak.mp3"
		},
		pos = {},	
		object = {},	
		specialBrick = {},		
		holeArr = [[1962, 2028], [2510, 2576], [4632, 4698]],
		bombShooting = [],
		LOCK = true,	
		_lock = true,	
		_isSide = false,	
		jumpLock = true,
		_isBomb = false,
		_isUnbeatable = false,	
		isWin = false,
		isHug = false,
		isRun = false,	
		isMute = false,
		timer = null,	
		objMoveTimer = null,	
		monsterMoveTimer = null,	
		buffMoveTimer = null,	
		operateTimer = null,
		life = 3,
		time = 300,	
		_positionBottom = 64,		
		_positionTop = 404,		
		_positionLeft = 85,		
		_brickSize = 32,	
		_brickBottom = 160,	
		_childWidth = 25,	
		_childHeight = 32,	
		_pipeSize = 0,	
		_stoneTop = 0,	
		_stoneHeight = 32,	
		_moneyWorth = 100,		
		_bombSize = 17,
		mute = "pic/mute.png",
		unmute = "pic/unmute.png",
		date = 0;
	/*
		子弹的构造函数;
	*/
	function Bomb() {};	
	/*
		子弹的操作函数;
	*/
	Bomb.prototype = {
		context: contextDetail,	//地图绘制环境;
		/*
			初始化;
			direct: 子弹的运动方向;
		*/
		init: function(direct) {	
			this.y = oChild.offsetTop + (oChild.offsetHeight / 2);
			this._x = 0;	//子弹的初始位置;
			this._range = 300;	//运动距离;
			this.direct = direct;
			this.speed = 4;
			if(this.direct % 2 == 0) {
				this.x = oChild.offsetLeft + oChild.offsetWidth + 5;
			}else {
				this.x = oChild.offsetLeft - oChild.offsetWidth - 5;
			}
		},
		draw: function() {
			this.context.beginPath();
			draw.bomb(this.context, this.x, this.y);
		},
		move: function() {
			if(this.direct % 2 == 0) {	//判断运动方向;
				this.x += this.speed;
			}else {
				this.x -= this.speed;
			}
			this._x += this.speed;
			this.draw();
		}
	}
	/*
		对象的深度克隆;
		origin: 源对象;
		target: 目标对象;
	*/
	function deepClone(origin, target) {
		var target = target || {},
			toString = Object.prototype.toString,
			array = "[object Array]";
		for(var attr in origin) {
			if(origin.hasOwnProperty(attr)) {
				if(origin[attr] != null && typeof origin[attr] == "object") {
					if(toString.call(origin[attr]) == array) {
						target[attr] = [];
					}else {
						target[attr] = {};
					}
					deepClone(origin[attr], target[attr]);
				}else {
					target[attr] = origin[attr];
				}
			}
		}
		return target;
	}
	/*
		初始化;
	*/
	function init() {
		document.addEventListener("keypress", initDetail, false);
		oMusicControls.addEventListener("click", controls, false);
	}
	/*
		音乐控制;
		e: 事件对象;
	*/
	function controls(e) {
		if(!isMute) {
			this.style.background = "url(" + mute + ")";
			isMute = true;
			aMusic[0].pause();
		}else {
			this.style.background = "url(" + unmute + ")";
			isMute = false;
			if(oMain.style.display == "block") {
				aMusic[0].play();
			}
		}
		this.style.backgroundSize = "50% 50%";
		this.style.backgroundPosition = "30px center";
		this.style.backgroundRepeat = "no-repeat";
	}
	/*
		重新开始游戏;
		elem: 生命计数器;
	*/
	function restart(elem) {
		elem.innerHTML = ("x" + life);
		detail();
	}
	/*
		初始化细节;
		e: 事件对象;
	*/
	function initDetail(e) {
		var event = e || window.event;
		if(event.charCode == "104" && oMain.style.display != "block") {
			oStart.style.display = "none";
			oLoading.style.display = "block";
			oLoading.getElementsByTagName("span")[0].innerHTML = ("x" + life);	//人物生命的显示;
			var timeout = setTimeout(function() {	//loading界面地图加载;
				detail();
				document.removeEventListener("keypress", initDetail, false);
			}, 2000);
		}
	}
	/*
		游戏初始化共有方法;
	*/
	function detail() {
		object = deepClone(obj, object);
		oLoading.style.display = "none";
		oMain.style.display = "block";
		if(!isMute) {
			aMusic[0].play();
		}
		oSpecialCoin.index = 6;	//设定特殊砖块剩余可碰撞次数;
		if(!oSpecialCoin.classList.contains("special")) {
			oSpecialCoin.classList.add("special");
			oSpecialCoin.classList.remove("nouse");
		}
		oTime.innerHTML = time;
		changeRole("child");
		oChild.style.zIndex = "99";
		start();	//正式开始游戏;
		loadingData();	//加载场景元素位置数据;
		specialBrick = deepClone(nodeArr[1], specialBrick);
		_childWidth = 25;
		_childHeight = 32;
		isRun = false;
		oChild.width = _childWidth;
		oChild.height = _childHeight;
		_positionTop = 404;
		_positionTop = oMain.offsetHeight - _positionBottom - oChild.offsetHeight;
	}
	/*
		切换人物状态;
		state: 人物需要切换的状态;
	*/
	function changeRole(state) {
		for(var attr in personState) {
			if(attr != state) {
				personState[attr] = false;
			}else {
				personState[attr] = true;
			}
		}
		_positionTop = oMain.offsetHeight - _positionBottom - _childHeight;
	}
	/*
		游戏开始;
	*/
	function start() {
		stopGame();	//游戏停止功能;
		interval(); //游戏倒计时功能;
		objCheck();	//物体运动检测功能;
		document.addEventListener("keydown", walk, false);
		document.addEventListener("keyup", stop, false);
	}
	/*
		人物移动;
		e: 事件对象;
	*/
	function walk(e) {	
		var event = e || window.event;
		if(up[event.keyCode] && _lock) {		//如果是有效按键;
			up[event.keyCode][0] = true;
			if(LOCK) {	//判断是否为第一次启动定时器;
				LOCK = false;
				operateTimer = setInterval(function() {
					pos.left = oChild.offsetLeft;	//人物距离左边的位置;
					pos.top = oChild.offsetTop,		//人物距离上边的位置;
					pos._x = oInterphase.offsetLeft;	//地图主界面的距离左边的值;
					for(var attr in up) {
						if(up[attr][0] && jumpLock) {	//正常情况下的位移操作;
							up[attr][1](pos);
						}
						if(up[attr][0] && attr == 75) {	//解决空中射子弹的方法;
							up[attr][1](pos);
						}
						if(!up[attr][0] && attr == 83) {	//解决空中可以蹲下的问题;
							stand(attr);
						}
						if(up[65][0] || up[68][0]) {
							isRun = true;
						}else {
							isRun = false;
						}
					}
				}, 10);
			}
		}
	}
	/*
		人物蹲下之后站起来;
		attr: 按键集合的按键序号;
	*/
	function stand(attr) {
		if(oChild.height == parseInt(_childHeight / 2)) {
			oChild.height = oChild.height * 2;
		}
	}
	/*
		按键抬起触发事件;
		e: 事件对象;
	*/
	function stop(e) {		
		var event = e || window.event,
			index = 0,		//没有按下的键集合数量;
			length = 0;		//up集合的总数量;
		if(up[event.keyCode]) {
			up[event.keyCode][0] = false;
			for(var attr in up) {
				if(up[attr][0]) {	//只要有一个按键还是按下的状态定时器就继续执行;
					return;
				}
			}
			clearInterval(operateTimer);	//按键全部抬起,定时器清除;
			stand(83);
			LOCK = true;	//开关打开;
			isRun = false;
		}
	}
	/*
		前进;
		pos: 物体位置信息对象;
	*/
	function go(pos) {
		pos.top = oChild.offsetTop;
		pos.left = oChild.offsetLeft;
		pos._x = oInterphase.offsetLeft;
		var bottom = oMain.offsetHeight - pos.top - oChild.height,
			_position = [oChild.offsetLeft, oChild.offsetTop],
			_size = [oChild.offsetWidth, oChild.offsetHeight];
		if(!leaveCheck(child_moveLock["objMoveArr"]) && bottom != _positionBottom && jumpLock){	//上一次有碰撞而下一次没有碰撞的情况;
			jumpLock = false;
			leave(0.8, child_moveLock, _position, _size, - pos._x);
		}else if(- pos._x <= oInterphase.offsetWidth - oMain.offsetWidth && child_moveLock["moveLockArrOn"]["pipeGoLock"] && child_moveLock["moveLockArrOn"]["stoneGoLock"]) {
			var left = pos.left;
			pos.left ++;
			goCheck(pos, (pos.left - left));		//如果视口需要改变;
			oChild.style.left = pos.left + "px";
			child_moveLock["moveLockArrOn"]["stoneBackLock"] = true;
		}
		if(!_isUnbeatable) {
			isImpact(1, child_moveLock, _position, _size);
		}
		if(oChild.offsetTop != _positionTop) {
			isImpact(2, child_moveLock, _position, _size);
		}
		isImpact(3, child_moveLock, _position, _size);
		isImpact(5, child_moveLock, _position, _size);
	}
	/*
		判断视口是否需要改变并进行改变;
		pos: 物体位置信息对象;
		_x: 物体距离上一次位置的变化值;
	*/
	function goCheck(pos, _x) {	
		if(- pos._x <= oInterphase.offsetWidth - oMain.offsetWidth && pos["left"] + pos["_x"] > oMain.offsetWidth / 2 && - oInterphase.offsetLeft < 5690) {	//人物位置超过视口宽度一半以上;
			pos._x -= _x;
			oInterphase.style.left = pos._x + "px";
		}
	}
	/*
		下蹲;
		pos: 物体位置信息对象;
	*/
	function down(pos) {
		if(oChild.height == parseInt(_childHeight)) {
			oChild.height = oChild.height / 2;
		}
	}
	/*
		后退;
		pos: 物体位置信息对象;
	*/
	function back(pos) {
		pos.top = oChild.offsetTop;
		var bottom = oMain.offsetHeight - pos.top - oChild.offsetHeight,
			_position = [oChild.offsetLeft, oChild.offsetTop],
			_size = [oChild.width, oChild.height];
		if(Math.abs(oInterphase.offsetLeft) != oChild.offsetLeft) {
			if(bottom != _positionBottom && !leaveCheck(child_moveLock["objMoveArr"])) {
				jumpLock = false;
				leave(-0.8, child_moveLock, _position, _size, - oInterphase.offsetLeft);
			}else if(child_moveLock["moveLockArrOn"]["pipeBackLock"] && child_moveLock["moveLockArrOn"]["stoneBackLock"]) {
				pos.left --;
				oChild.style.left = pos.left + "px";
				child_moveLock["moveLockArrOn"]["stoneGoLock"] = true;
			}
		}
		if(!_isUnbeatable) {
			isImpact(1, child_moveLock, _position, _size);
		}
		isImpact(3, child_moveLock, _position, _size);
		isImpact(5, child_moveLock, _position, _size);
		if(oChild.offsetTop != _positionTop) {
			isImpact(2, child_moveLock, _position, _size);
		}
	}
	/*
		跳跃;
		pos: 物体位置信息对象;
	*/
	function jump(pos) {
		if(jumpLock) {
			jumpLock = false;
			/*
				data: 跳跃数据集合;
				viewportTimer: 持续判断是否需要改变视口位置的定时器;
				maxHeightTimer: 人物到达最高处的定时器;
				clearTimer: 完成位置变换后的清理工作定时器;
				left: 人物的left值;
				top: 人物的top值;
				bottom: 人物初始bottom值;
				countLeft: 人物运动的即时位置left信息;
				countBottom: 人物运动的即时位置bottom信息;
				_position: 物体位置信息;
				_size: 物体的大小;
				xSpeed: 纵向运动速度;
				ySpeed: 横向运动速度;
			*/
			var data = "",
				viewportTimer = "",	
				maxHeightTimer = "",	
				clearTimer = "",	
				left = oChild.offsetLeft,	
				top = oChild.offsetTop,	
				bottom = oMain.offsetHeight - top - oChild.height,	
				countLeft = 0,	
				countBottom = 0,
				_position = [],
				_size = [oChild.width, oChild.height],
				ySpeed = 3,
				xSpeed = 1.5;
			if(up[83][0]) {		//人物跳跃方式的赋值;
				data = jumpCheck([50]);
			}else {
				data = jumpCheck([140]);
			}
			for(var attr in up) {	//人物跳跃过程中对其他操作进行限制;
				if(attr != 75) {
					up[attr][0] = false;
				}
			}
			if(!isMute) {	//跳跃音乐播放;
				aMusic[1].src = music["jump"];
				aMusic[1].play();
			}
			viewportTimer = setInterval(function() {	//开始运动;
				if(countBottom < data[0]) {	//跳起高度在最大值范围内;
					goCheck(pos, 1);
					countBottom += ySpeed;	
					if(data.length != 1) {	//判断人物是否需要左右移动;
						if(data[1] > 0 && countLeft <= (data[1] / 2)) {
							countLeft += xSpeed;
						}else if(data[1] < 0 && countLeft >= (data[1] / 2)) {
							countLeft -= xSpeed;
						}
					}
					oChild.style.bottom = (bottom + countBottom) + "px";
					oChild.style.left = (left + countLeft) + "px";
					_position = [oChild.offsetLeft, oChild.offsetTop];
					isImpact(2, child_moveLock, _position, _size);
					isImpact(3, child_moveLock, _position, _size);
					isImpact(5, child_moveLock, _position, _size);
					isImpact(7, child_moveLock, _position, _size);
					isImpact(9, child_moveLock, _position, _size);
					if(_isSide) {		//边界检测碰撞;
						clearInterval(viewportTimer);
						clear(viewportTimer, countBottom, countLeft, bottom, data, left, pos, xSpeed, ySpeed);
					}else if(child_moveLock["moveLockArrOff"]["brickJumpBottomLock"]){		//如果人物碰到砖块;
						clearInterval(viewportTimer);
						child_moveLock["moveLockArrOff"]["brickJumpBottomLock"] = false;
						clear(viewportTimer, countBottom, countLeft, bottom, data, left, pos, xSpeed, ySpeed);
					}else {		//如果有边侧碰撞;
						_airImpactCheck(viewportTimer, viewportTimer, data, countLeft, countBottom, bottom, xSpeed, ySpeed);
					}
				}else {		//如果跳起高度超过最大值;
					clearInterval(viewportTimer);
					initLock(child_moveLock);
					if(up[65][0]) {
						oChild.style.left = (oChild.offsetLeft - 3) + "px";	
					}else if(up[68][0]){
						oChild.style.left = (oChild.offsetLeft + 3) + "px";
					}
					clear(viewportTimer, countBottom, countLeft, bottom, data, left, pos, xSpeed, ySpeed);
				}
			}, 1000 / 60);
		}
	}
	/*
		清除;
		viewportTimer: 持续判断是否需要改变视口位置的定时器;
		countBottom: 人物运动的即时位置bottom信息;
		countLeft: 人物运动的即时位置left信息;
		bottom: 人物初始bottom值;
		data: 跳跃数据集合;
		left: 人物的left值;
		pos: 物体位置信息对象; 
		xSpeed: 横向运动速度;
		ySpeed: 纵向运动速度;
	*/
	function clear(viewportTimer, countBottom, countLeft, bottom, data, left, pos, xSpeed, ySpeed) {
		var _position = [],
			_size = [oChild.width, oChild.height];
		maxHeightTimer = setInterval(function() {	//人物开始向下运动;
			pos.left = oChild.offsetLeft;	//人物距离左边的位置;
			pos.top = oChild.offsetTop,		//人物距离上边的位置;
			pos._x = oInterphase.offsetLeft;	//地图主界面的距离左边的值;
			goCheck(pos, 1);
			if(!_isSide) {
				if(data.length != 1) {	//判断人物是否需要左右移动;
					if(data[1] > 0 && countLeft <= data[1]) {
						countLeft += xSpeed;
					}else if(data[1] < 0 && countLeft >= data[1]) {
						countLeft -= xSpeed;
					}
					oChild.style.left = (left + countLeft) + "px";
				}
			}
			countBottom -= ySpeed;
			oChild.style.bottom = (bottom + countBottom) + "px";
			_position = [oChild.offsetLeft, oChild.offsetTop];
			if(!_isUnbeatable) {	//如果不是无敌的;
				isImpact(1, child_moveLock, _position, _size);
			}	
			isImpact(2, child_moveLock, _position, _size);	//对人物向下运动过程中的碰撞进行检测;
			isImpact(3, child_moveLock, _position, _size);
			isImpact(5, child_moveLock, _position, _size);
			isImpact(7, child_moveLock, _position, _size);
			isImpact(9, child_moveLock, _position, _size);	//如果左跳碰到边界;
			if(child_moveLock["objMoveArr"]["hole"] || parseInt(oChild.style.bottom) <= _positionBottom) {	//如果人物到达最底部或者碰到坑;
				clearInterval(maxHeightTimer);
				initLock(child_moveLock);
				oChild.style.bottom = _positionBottom + "px";
				jumpLock = true;
				isRun = false;
				viewportTimer = null;
				maxHeightTimer = null;
				_isSide = false;
			}else {		//如果人物碰到砖块,墙,水泥管或者旗子或者没碰到东西;
				_airImpactCheck(viewportTimer, maxHeightTimer, data, countLeft, countBottom, bottom, xSpeed, ySpeed);	//空中碰撞检测;
			}	
		}, 1000 / 60);	
	}
	/*
		空中碰撞检测;
		viewportTimer: 持续判断是否需要改变视口位置的定时器;
		moveTimer: 运动定时器;
		dataMove: 移动数据;
		left: 横向移动的数据;
		bottom: 纵向移动的数据;
		_Bottom: 人物起跳距离底部的位置;
		xSpeed: 横向运动速度;
		ySpeed: 纵向运动速度;
	*/
	function _airImpactCheck(viewportTimer, moveTimer, dataMove, left, bottom, _Bottom, xSpeed, ySpeed) {
		var _position = [],
			_size = [oChild.width, oChild.height];
		if(leaveCheck(child_moveLock["objMoveArr"])) {	//判断是否有碰撞;
			if(child_moveLock["objMoveArr"]["monster"] || child_moveLock["moveLockArrOff"]["isBrickSide"] || child_moveLock["moveLockArrOff"]["isStoneSide"] || child_moveLock["moveLockArrOff"]["isPipeSide"] || child_moveLock["objMoveArr"]["flag"]) {	//判断是否为侧面碰撞;
				clearInterval(moveTimer);
				child_moveLock["moveLockArrOff"]["isBrcikSide"] = false;
				child_moveLock["moveLockArrOff"]["isStoneSide"] = false;
				child_moveLock["moveLockArrOff"]["isPipeSide"] = false;
				var flag = child_moveLock["objMoveArr"]["flag"];
				if(!child_moveLock["objMoveArr"]["monster"]) {
					if(dataMove[1] > 0 && left <= dataMove[1]) {
						oChild.style.left = (oChild.offsetLeft - 2) + "px";
					}else if(dataMove[1] < 0 && left >= dataMove[1]) {
						oChild.style.left = (oChild.offsetLeft + 2) + "px";
					}
				}
				if(flag) {	//判断是否为旗子的碰撞;
					oChild.style.left = oChild.offsetLeft + 18 + "px";
					gameover(timer, objMoveTimer, 7);
				}else {
					var checkTimer = setInterval(function() {
						bottom -= ySpeed;
						oChild.style.bottom = (_Bottom + bottom) + "px";
						_position = [oChild.offsetLeft, oChild.offsetTop];
						if(!_isUnbeatable) {
							isImpact(1, child_moveLock, _position, _size);
						}	
						isImpact(2, child_moveLock, _position, _size);	//对人物向下运动过程中的碰撞进行检测;
						isImpact(3, child_moveLock, _position, _size);
						isImpact(5, child_moveLock, _position, _size);
						if((child_moveLock["objMoveArr"]["hole"] || child_moveLock["moveLockArrOff"]["brickJumpTopLock"] || child_moveLock["moveLockArrOff"]["stoneJumpLock"] || child_moveLock["moveLockArrOff"]["pipeJumpLock"]) || parseInt(oChild.style.bottom) <= _positionBottom) {	//判断人物是否有碰撞;
							clearInterval(checkTimer);
							if(parseInt(oChild.style.bottom) <= _positionBottom) {
								oChild.style.bottom = _positionBottom + "px";
							}else {
								var _bottom = _Bottom + _brickBottom - _brickSize;
								land(_bottom, _Bottom, child_moveLock);
							}	
							jumpLock = true;
							isRun = false;
							viewportTimer = null;
							moveTimer = null;
							checkTimer = null;
							_isSide = false;
						}
					}, 1000 / 60);	
				}
			}else {		//如果是顶部碰撞;
				var _bottom = _Bottom + _brickBottom - _brickSize;
				land(_bottom, _Bottom, child_moveLock);
				oChild.style.left = oChild.offsetLeft + "px";
				clearInterval(moveTimer);
				jumpLock = true;
				isRun = false;
				viewportTimer = null;
				moveTimer = null;
				_isSide = false;
			}
		}
	}
	/*
		人物落地操作;	
		bottom: 人物落地位置;
		_bottom: 人物初始位置;
		impactType: 碰撞类型;
	*/
	function land(bottom, _bottom, impactType) {
		var impact = impactType["moveLockArrOff"];
		if(impact["brickJumpTopLock"]) {	//砖块;
			bottom = _brickBottom;
		}else if(impact["stoneJumpLock"]) {		//墙;
			bottom = oMain.offsetHeight - _stoneTop;	
		}else {		//水泥管;
			bottom = _positionBottom + _pipeSize;
		}
		oChild.style.bottom = bottom + "px";
		for(var attr in impact) {
			if(attr != "brickJumpBottomLock") {
				impact[attr] = false;
			}
		}
	}
	/*
		跳跃高度确定;
		data: 数据参考;
	*/
	function jumpCheck(data) {
		var left = 140,
			right = 140;
		if(Math.abs(oInterphase.offsetLeft) != oChild.offsetLeft) {
			if(up[68][0]) {	//右键按下;
				data.push(data[0] - 35 > 0 ? left : left - 60);
			}else if(up[65][0]) {	//左键按下;
				data.push(data[0] - 35 > 0 ? -right : -right + 60);
			}
		}
		return data;
	}
	/*
		攻击;
		pos: 物体位置信息对象;
	*/
	function attack(pos) {
		var size = [_bombSize, _bombSize],
			direct = 0;
		if(_isBomb) {	//判断是否具有发射子弹的资格;
			if(bombShooting.length < 1) {	//如果正在发射中的子弹数量小于1时;
				up[75][0] = false;
				var b = new Bomb();	//创建子弹;
				if(up[65][0]) {
					direct = 1;
				}
				bombShooting.push(b);
				bombShooting[0].init(direct);
				bombShooting[0].draw();
				bombDirect["bomb"].push(direct);
			}
		}
	}
	/*
		运动开关的集体开关操作;
	*/
	function moveLockOperate() {
		clearMove();
		initLock(child_moveLock);
		initLock(buff_moveLock);
		initLock(bomb_moveLock);
		initLock(monster_moveLock);
		initArray(buffArr);
		initArray(buffDirect);
		initArray(monsterArr);
		initArray(monsterDirect);
		initArray(bombDirect);
		initArray(objChecked);
		pos = {};
		object = {};	
		specialBrick = {};		
		bombShooting = [];
		personState = {		
			"child": true,
			"adult": false,
			"cooker": false
		}
		_childWidth = 25;	
		_childHeight = 32;
		_positionBottom = 64;	
		_positionTop = 404;
		time = 300;
		LOCK = true;
		jumpLock = true;
		_lock = true;
		_isBomb = false;
		_isUnbeatable = false;
		_isSide = false;
		timer = null;	
		operateTimer = null;
		isWin = false;
		monsterMoveTimer = null;
		buffMoveTimer = null;
		objMoveTimer = null;
	}
	/*
		初始化所有数组;
		array: 初始化对象;
	*/
	function initArray(array) {
		for(var arr in array) {
			array[arr] = [];
		}
	}
	/*
		初始化所有锁;
		lock: 锁的集合;
	*/
	function initLock(lock) {
		for(var attr in lock) {
			if(attr == "moveLockArrOn") {
				for(var on in lock["moveLockArrOn"]) {
					lock["moveLockArrOn"][on] = true;
				}
			}else if(attr == "moveLockArrOff"){
				for(var off in lock["moveLockArrOff"]) {
					lock["moveLockArrOff"][off] = false;
				}
			}else {
				for(var obj in lock["objMoveArr"]) {
					lock["objMoveArr"][obj] = false;
				}
			}
		}
	}
	/*
		游戏倒计时定时器;
	*/
	function interval() {	
		timer = setInterval(function() {
			if(time >= 0) {
				oScore.getElementsByClassName("Time")[0].innerHTML = time --;	//时间--;
				monsterMove();
			}else{
				gameover(timer, objMoveTimer, 4);
			}
		}, 1000);
	}
	/*
		物体运动检测定时器;
	*/
	function objCheck() {
		var index = 0,
			person = {
				"jump": false,
				"run": false,
				"hug": false,
				"stand": false
			};
		objMoveTimer = setInterval(function() {
			generalMove(monster_moveLock, monsterArr, monsterDirect);
			generalMove(buff_moveLock, buffArr, buffDirect);
			if(bombShooting.length != 0) {
				if(bombShooting[0]["x"] > - oInterphase.offsetLeft && bombShooting[0]["x"] <= - oInterphase.offsetLeft + oMain.offsetWidth) {
					bombShoot(bomb_moveLock, bombShooting, bombDirect);
				}else {
					bombShooting.shift();
					bombDirect["bomb"].shift();
					initLock(bomb_moveLock);
				}
			}
			for(var attr in personState) {	//人物状态检测;
				if(personState[attr]) {
					person["state"] = attr;
					break;
				}
			}
			if(!jumpLock) {	//人物运动状态变化;
				personChange(person, "jump", "state");
			}else if(isHug) {
				personChange(person, "hug", "state");
			}else if(isRun) {
				personChange(person, "run", "state");
			}else {
				personChange(person, "stand", "state");
			}
			contextDetail.clearRect(-oInterphase.offsetLeft, 0, oInterphase.offsetWidth, oInterphase.offsetHeight);
			contextChild.clearRect(0, 0, oChild.width, oChild.height);
			loadingElement(contextDetail, {"posX": - oInterphase.offsetLeft, "posY": 0}, object, buffArr, monsterArr, bombShooting, index, person, contextChild, _isUnbeatable);
			index ++;
		}, 1000 / 60);
	}
	/*
		改变人物运动状态;
		person: 人物状态集合;
		target: 人物需要启用的状态;
	*/
	function personChange(person, target, state) {
		for(var attr in person) {
			if(attr == state) {
				continue;
			}else if(attr == target) {
				person[attr] = true;
			}else {
				person[attr] = false;
			}
		}
	}
	/*
		子弹射击;
		impactType: 碰撞锁集合;
		objArr: 碰撞物体信息;
		directArr: 物体运动方向集合;
	*/
	function bombShoot(impactType, objArr, directArr) {
		var	size = [_bombSize, _bombSize],	//子弹大小;
			attr = "bomb",	//检测物体名称;
			impactObj = impactType["objMoveArr"],	//物体运动集合;
			impactOff = impactType["moveLockArrOff"],	//物体关闭锁;
			impactOn = impactType["moveLockArrOn"];	//物体打开锁;
		for(var i = 0, len = objArr.length; i < len; i ++) {
			if(objArr[i]) {
				isImpact(2, impactType, [objArr[i]["x"], objArr[i]["y"]], size);
				isImpact(3, impactType, [objArr[i]["x"], objArr[i]["y"]], size);
				isImpact(5, impactType, [objArr[i]["x"], objArr[i]["y"]], size);
				isImpact(6, impactType, [objArr[i]["x"], objArr[i]["y"]], size);
				isImpact(4, impactType, [objArr[i]["x"], objArr[i]["y"]], size);
				isImpact(8, child_moveLock, [oChild.offsetLeft, oChild.offsetTop], [oChild.offsetWidth, oChild.offsetHeight]);
				if(leaveCheck(impactType["objMoveArr"])) {
					if(impactObj["brick"]) {	//brick;
						if(!impactOff["brickJumpTopLock"]) {	//侧边碰撞;
							directArr[attr][i] ++;
						}
					}
					if(impactObj["stone"]) {	//stone;
						if(impactOff["isStoneSide"]) {	//侧边碰撞;
							directArr[attr][i] ++;
						}
					}
					if(impactObj["pipe"]) {		//pipe;
						if(impactOff["pipeJumpLock"]) {	//侧边碰撞;
							directArr[attr][i] ++;
						}
					}
					if(impactObj["monster"]) {	//monster;
						bombShooting.shift();
						directArr[attr].shift();
					}
					if(impactObj["pipe"]) {		//pipe;
						directArr[attr][i] ++;
					}
				}else {		//没有碰撞;
					if(objArr[i]) {
						if(objArr[i]["y"] + size[1] < 500 - _positionBottom) {		//判断是否在空中;
							down = true;
						}else if(objArr[i]["y"] + size[1] >= 500 - _positionBottom){	//没有在空中;
							objArr[i]["y"] = 500 - _positionBottom - size[1];
							down = false;
						}
					}
				}
				if(child_moveLock["objMoveArr"]["bomb"]) {	//子弹;
					bombShooting.shift();
					directArr[attr].shift();
					if(personState["child"]) {
						gameover(timer, objMoveTimer, 4);
					}else {
						_childWidth /= 1.2;
						_childHeight /= 1.2;
						changeRole("child");
						oChild.width = _childWidth;
						oChild.height = _childHeight;
						_isBomb = false;
					}
				}
				if(objArr[i]) {
					objArr[i]["direct"] = directArr[attr][i];
					if(objArr[i]["_x"] >= objArr[i]["_range"]) {		//判断是否到达最大距离;
						objArr.shift();
						directArr[attr].shift();
					}
				}
			}
		}
	}
	/*
		怪物运动;
	*/
	function monsterMove() {
		var area,
			position;
		area = {		//可视区范围位置信息;
				"left": - oInterphase.offsetLeft, 
				"width": oMain.offsetWidth, 
				"height": oMain.offsetHeight
		}
		for(var attr in object) {		
			if(attr == "monsterMush" || attr == "tortoise") {	//判断是否是怪物;
				position = object[attr]["position"];
				for(var i = 0, len = position.length; i < len; i ++) {	//对所有怪物位置信息进行遍历;
					if(position[i][0] <= area["left"] + area["width"] && position[i][0] >= area["left"] + area["width"] / 2) {	//判断物体是否即将进入可视区;		
						if(monsterArr[attr].length != 0) {		//判断显示区物体集合是否为空;
							for(var j = 0, lenJ = monsterArr[attr].length; j < lenJ; j ++) {
								if(objChecked[attr].indexOf(i) != -1) {
									break;
								}
							}
							if(j == lenJ) {		//如果没有找到相同位置的物体;
								monsterArr[attr].push(position[i]);
								monsterDirect[attr].push(1);
								objChecked[attr].push(i);
							}
						}else if(monsterArr[attr].length == 0){		//如果显示为空;
							if(objChecked[attr].indexOf(i) == -1) {
								monsterArr[attr].push(position[i]);
								monsterDirect[attr].push(1);
								objChecked[attr].push(i);
							}
						}
					}				
				}
			}
		}
	}
	/*
		金币的运动方式;
		target: 金币对象;
		size: 金币大小;
		position: 金币位置;
	*/
	function moneyMove(position, size) {
		var speed = 3;
		if(position["distance"] >= 20) {
			position[1] -= 3;
			position["distance"] -= 3;
		}else if(position["distance"] >= 0){
			position[1] += 3;
			position["distance"] -= 3;
		}
	}
	/*
		运动方法;
		impactType: 碰撞锁集合;
		objArr: 碰撞物体信息;
		directArr: 物体运动方向集合;
	*/
	function generalMove(impactType, objArr, directArr) {
		var down = false,	//物体是否需要做垂直落体的判断;
			speed,	//运动速度;
			downSpeed = 8,	//下降速度;
			size,	//物体的大小;
			impactObj = impactType["objMoveArr"],	//物体运动集合;
			impactOff = impactType["moveLockArrOff"],	//物体关闭锁;
			impactOn = impactType["moveLockArrOn"];	//物体打开锁;
		if(impactType == monster_moveLock) {	//设置具体物体的运动速度;
			speed = 1;
		}else {
			speed = 2;
		}
		for(var attr in objArr) {
			switch(attr) {
				case "flower":
				case "monsterMush": 
				case "mushroom": size = [33, 33]; break;
				case "star": size = [30, 34]; break;
				case "tortoise": size = [33, 44]; break;
				case "money": size = [17, 17]; break;
				default: throw new Error("please select the right object!");
			}
			for(var i = 0, len = objArr[attr].length; i < len; i ++) {
				if(objArr[attr][i]) { 
					if(attr == "money")	{	//判断是否为金币移动;
						moneyMove(objArr[attr][i], size);
						if(objArr[attr][i]["distance"] <= 0) {
							objArr[attr].splice(i, 1);
							_money();
						}
					}else if(attr == "flower") {	//判断是否为花;
						isImpact(6, child_moveLock, [oChild.offsetLeft, oChild.offsetTop], [oChild.offsetWidth, oChild.offsetHeight]);
					}else {
						isImpact(2, impactType, objArr[attr][i], size);
						isImpact(3, impactType, objArr[attr][i], size);
						isImpact(5, impactType, objArr[attr][i], size);
						if(impactType == monster_moveLock && !_isUnbeatable) {
							isImpact(4, child_moveLock, [oChild.offsetLeft, oChild.offsetTop], [oChild.offsetWidth, oChild.offsetHeight]);
						}
						if(impactType == buff_moveLock){
							isImpact(6, child_moveLock, [oChild.offsetLeft, oChild.offsetTop], [oChild.offsetWidth, oChild.offsetHeight]);
						}
						if(leaveCheck(impactType["objMoveArr"])) {	
							if(impactObj["brick"]) {	//brick;
								if(impactOff["brickJumpTopLock"]) {	//顶部碰撞;
									down = false;
								}else {		//侧边碰撞;
									directArr[attr][i] ++;
								}
							}
							if(impactObj["stone"]) {	//stone;
								directArr[attr][i] ++;
							}
							if(impactObj["pipe"]) {		//pipe;
								if(impactOff["pipeJumpLock"]) {	//顶部碰撞;
									down = false;
								}else {		//侧边碰撞;
									directArr[attr][i] ++;
								}
							}
						}else {		//没有碰撞;
							if(objArr[attr][i]) {
								if(objArr[attr][i][1] + size[1] < 500 - _positionBottom) {		//判断是否在空中;
									down = true;
								}else if(objArr[attr][i][1] + size[1] >= 500 - _positionBottom){	//没有在空中;
									objArr[attr][i][1] = 500 - _positionBottom - size[1];
									down = false;
								}
							}
						}
						if(objArr[attr][i]) {
							if(down) {
								objArr[attr][i][1] += downSpeed;
							}else {
								if(directArr[attr][i] % 2 == 1) {	//如果是向左移动;
									objArr[attr][i][0] -= speed;
								}else {	//如果是向右移动;
										objArr[attr][i][0] += speed;
								}
							}
						}
					}
				}
			}
		}
	}
	/*
		游戏停止开始功能;
	*/
	function stopGame() {		
		document.addEventListener("keypress", press, false);
	}
	/*
		游戏停止具体实现;
	*/
	function press(e) {
		var event = e || window.event;
		if(event.charCode == "104") {	//判断当前按键是否是H;
			if(_lock) {
				clearInterval(timer);	//清除定时器;
				clearInterval(monsterMoveTimer);	//清除怪物运动定时器;
				clearInterval(buffMoveTimer);	//清除buff运动定时器;
				clearInterval(objMoveTimer);
				_lock = false; //地图上其他所有会动的物体全部停止运动;
			}else {
				interval();		//开启定时器;
				objCheck();	//开启定时器;
				_lock = true;
			}
		}
	}
	/*
		游戏结束;
		timer: 游戏倒计时定时器名称;
		objTimer: canvas运动定时器;
		impactType: 碰撞类型;
	*/
	function gameover(timer, objTimer, impactType) {
		var elem = oLoading.getElementsByTagName("span")[0],
			timeout = null,
			_time = null;
		clearInterval(timer);
		clearInterval(operateTimer);
		document.removeEventListener("keydown", walk, false);	//清除走动开关;
		document.removeEventListener("keyup", stop, false);		//清除停止开关;
		document.removeEventListener("keypress", press, false);	//清除按键抬起开关;
		if(impactType == 4) {
			clearInterval(objTimer);
			jumpLock = true;
			isHug = false;
			isRun = false;
			died();
			if(!isMute) {
				aMusic[0].pause();
				aMusic[0].load();	//重新加载音乐;
				aMusic[1].src = music["died"];
				aMusic[1].play();
			}
			timeout = setTimeout(function() {
				oChild.style.transition = "";
				oChild.style.transform = "rotate(0)";
				diedDetail(elem);
				timeout = null;
			}, 4000);
		}else if(impactType == 7) {
			//这里定义游戏到达终点时的一种自动运动的轨迹;
			var speed = 2,	//人物运动的速度;
				countBottom = oMain.offsetHeight - oChild.offsetTop - oChild.height,	//人物需要下降的距离;
				endAnimationTimer = null;	//人物下降用的定时器;
			var time = setTimeout(function() {
				endAnimationTimer = setInterval(function() {
					if(countBottom >= _positionBottom) {	//人物还在空中的时候;
						countBottom -= speed;
						oChild.style.bottom = countBottom + "px";
					}else {		//人物落地后;
						jumpLock = true;
						isHug = false;
						isRun = true;
						if(!isMute) {
							aMusic[0].pause();
							aMusic[1].src = music["win"];
							aMusic[1].play();
						}
						oChild.style.bottom = _positionBottom + "px";
						goHome(endAnimationTimer, speed, time, elem, objTimer);
					}
				}, 1000 / 60);
			}, 1500);
		}else {
			jumpLock = true;
			isHug = false;
			isRun = false;
			clearInterval(objTimer);
			if(!isMute) {
				aMusic[0].pause();
				aMusic[0].load();	//重新加载音乐;
				aMusic[1].src = music["died"];
				aMusic[1].play();
			}
			timeout = setTimeout(function() {
				diedDetail(elem);
				timeout = null
			}, 2000);
		}
		_time = setTimeout(function() {
			moveLockOperate();
			time = null;
		}, 20);
	}
	/*
		人物死亡流程细节;
		elem: 时间显示器;
	*/
	function diedDetail(elem) {
		oTime.innerHTML = "";	//时间清零;		
		life --;
		time = 300;
		oMain.style.display = "none";
		oInterphase.style.left = 0;
		oChild.style.left = _positionLeft + "px";
		oChild.style.bottom = _positionBottom + "px";
		if(isWin) {	//判断是否赢得游戏;
			elem.style.letterSpacing = "normal";
			elem.style.fontSize = "12px";
			elem.innerHTML = "You Win!!";
			life = 3;
			document.addEventListener("keypress", _restart, false);
			oLoading.style.display = "block";
		}else if(life < 0) {	//判断命是不是没了;
			elem.style.letterSpacing = "normal";
			elem.style.fontSize = "12px";
			elem.innerHTML = "Game Over";
			life = 3;
			document.addEventListener("keypress", _restart, false);
			oLoading.style.display = "block";
		}else {
			elem.innerHTML = ("x" + life);
			oLoading.style.display = "block";
			var timeout = setTimeout(function() {
				restart(elem);
				timeout = null;
			}, 1000);
		}
	}
	/*
		死亡效果;
	*/
	function died() {
		oChild.style.transition = "3s";
		oChild.style.transform = "rotate(-90deg)";
	}
	/*
		游戏回到初始状态方法;
		e: 事件对象：
	*/
	function _restart(e) {
		var event = e || window.event;
		if(event.charCode == 104) {
			oLoading.getElementsByTagName("span")[0].style.letterSpacing = "19px";
			oLoading.getElementsByTagName("span")[0].style.fontSize = "16px";
			oLoading.style.display = "none";
			oStart.style.display = "block";
			init();
			document.removeEventListener("keypress", _restart, false);
		}
	}
	/*
		碰撞检测;
		CheckType: 检测类型;
			1: hole;
			2: brick;
			3: stone;
			4: monster;
			5: pipe;
			6: buff;	
			7: flag;
			8: bomb;
			9: leftArea;
		impactType: 被检测碰撞物体类型;
			child_moveLock
			buff_moveLock
			bomb_moveLock
		position: 物体位置信息;
		size: 物体的大小;
	*/
	function isImpact(checkType, impactType, position, size) {
		var area = {"left": - oInterphase.offsetLeft, "width": oMain.offsetWidth},
			pos = {},
			detail;
		pos = {
			"left": position[0],
			"bottom": oMain.offsetHeight - size[1] - position[1],
			"top": position[1],
			"width": size[0],
			"height": size[1]
		}
		switch(checkType) {
			case 1: 
				if(typeof holeCheck(area, holeArr, pos) == "object") {	//掉坑的判断;
					detail = holeCheck(area, holeArr, pos);
					impactType["objMoveArr"]["hole"] = true;
					if(impactType == child_moveLock) {
						oChild.style.left = ((detail["position"][1] - detail["position"][0]) / 2 + detail["position"][0] + "px");
						oChild.style.bottom = "0px";
						gameover(timer, objMoveTimer, 1);	
					}
				}
				break; 
			case 2: 
				if(typeof brickCheck(area, nodeArr[1], pos) == "object") {	//碰到砖头的判断;
					detail = brickCheck(area, nodeArr[1], pos);
					impactType["objMoveArr"]["brick"] = true;
					_brickBottom = oMain.offsetHeight - detail["element"][1] - _brickSize + _brickSize;
					if(impactType != bomb_moveLock) {
						if(detail["person"][0] + pos.width - detail["position"][0] <= 2 || detail["position"][0] + detail["size"][0] - detail["person"][0] <= 2) {	//边侧碰撞;
							impactType["moveLockArrOff"]["isBrickSide"] = true;
						}else if(detail["person"][1] < detail["position"][1]) {	//如果是顶部碰撞;
							impactType["moveLockArrOff"]["brickJumpTopLock"] = true;
						}else {		//底部碰撞;
							impactType["moveLockArrOff"]["brickJumpBottomLock"] = true;
							_mysteryCheck(detail["node"], detail["position"]);
						}
					}
				}else {
					impactType["moveLockArrOff"]["brickJumpBottomLock"] = false;
					impactType["moveLockArrOff"]["brickJumpTopLock"] = false;
					impactType["objMoveArr"]["brick"] = false;
					impactType["moveLockArrOff"]["isBrickSide"] = false;
				}
				break; 
			case 3: 
				if(typeof stoneCheck(area, nodeArr[2], pos) == "object") {		//碰到墙的检测;
					detail = stoneCheck(area, nodeArr[2], pos);
					impactType["objMoveArr"]["stone"] = true;
					_stoneTop = detail["position"][1];	//设定碰到墙的位置的高度;
					if(impactType == child_moveLock) {
						if(detail["person"][1] == _positionTop) {	//人物在地面;
							if(detail["person"][0] <= detail["position"][0]) {
								impactType["moveLockArrOn"]["stoneGoLock"] = false;
							}else if(detail["person"][0] >= detail["position"][0] + _stoneHeight) {
								impactType["moveLockArrOn"]["stoneBackLock"] = false;
							}
						}else {	//人在上面;
							if(impactType == child_moveLock && !personState["child"]) {
								detail["person"][1] += 6.4;
								detail["person"][0] += 5;
								pos["width"] = 25;
								pos["height"] = 32;
							}
							if(detail["position"][1] - detail["person"][1] <= 5) {		//前进后退检测;
								if(detail["person"][0] >= detail["position"][0] && detail["person"][0] - detail["position"][0] - detail["size"][0] <= 2) {	//左侧碰撞;
									impactType["moveLockArrOn"]["stoneBackLock"] = false;
								}else if(detail["person"][0] <= detail["position"][0] && detail["position"][0] - detail["person"][0] - pos["width"] <= 2){		//右侧碰撞;
									impactType["moveLockArrOn"]["stoneGoLock"] = false;
								}
							}else {		//无法前进的检测;
								impactType["moveLockArrOn"]["stoneBackLock"] = true;
								impactType["moveLockArrOn"]["stoneGoLock"] = true;
							}
							if(detail["person"][1] < detail["position"][1]) {	//人物顶部判断;
								impactType["moveLockArrOff"]["stoneJumpLock"] = true;
							}
							if(detail["person"][0] + pos["width"] - detail["position"][0] <= 4 || detail["position"][0] + detail["size"][0] - detail["person"][0] <= 4) {		//边侧检测;
								impactType["moveLockArrOff"]["isStoneSide"] = true;
							}
						}
					}
				}else {
					impactType["objMoveArr"]["stone"] = false;
					impactType["moveLockArrOn"]["stoneGoLock"] = true;
					impactType["moveLockArrOn"]["stoneBackLock"] = true;
					impactType["moveLockArrOff"]["stoneJumpLock"] = false;
					impactType["moveLockArrOff"]["isStoneSide"] = false;
				}
				break;
			case 4:
				if(typeof monsterCheck(area, monsterArr, pos) == "object") {	//碰到怪物的检测;
					var obj,
						abandon;
					detail = monsterCheck(area, monsterArr, pos);
					if(pos.bottom > _positionBottom || impactType == bomb_moveLock) {	//判断人物是否是从上面碰到或子弹碰撞;
						var time = null;
						if(!isMute) {
							aMusic[1].src = music["monsterMush"];
							aMusic[1].play();
						}
						impactType["objMoveArr"]["monster"] = true;
						obj = monsterArr[detail["type"]];
						for(var i = 0, len = obj.length; i < len; i ++) {
							if(obj[i][0] == detail["position"][0]) {
								abandon = i;
								clearInterval(objMoveTimer);
								break;
							}
						}
						if(impactType == child_moveLock) {
							pos.left -= 10;
							oChild.style.left = pos.left + "px";
						}
						obj.splice(abandon, 1);
						time = setTimeout(function() {
							objCheck();
							impactType["objMoveArr"]["monster"] = false;
							time = null;
						}, 200);
					}else {		//不是从上面碰到的;
						if(!_isUnbeatable && impactType == child_moveLock) {	//不是无敌的情况;
							if(!personState["child"]) {	//不是小人的情况;
								_isUnbeatable = true;
								_isBomb = false;
								_childWidth /= 1.2;
								_childHeight /= 1.2;
								changeRole("child");
								oChild.width = _childWidth;
								oChild.height = _childHeight;
								var time = setTimeout(function() {
									_isUnbeatable = false;
									time = null;
								}, 1000);
							}else {	//小孩的情况;
								if(new Date().getTime() - date >= 100) {
									gameover(timer, objMoveTimer, 4);
									date = new Date().getTime();
								}
							}	
						}
					}
				}
				break;
			case 5:
				if(typeof pipeCheck(area, object, pos) == "object") {		//碰到水泥管的检测;
					detail = pipeCheck(area, object, pos);
					impactType["objMoveArr"]["pipe"] = true;
					_pipeSize = detail["size"][1];
					if((pos.top + pos.height) - detail["position"][1] <= 2 && (pos.top + pos.height) - detail["position"][1] >= -1) {	//顶部碰撞;
						impactType["moveLockArrOn"]["pipeGoLock"] = true;
						impactType["moveLockArrOn"]["pipeBackLock"] = true;
						impactType["moveLockArrOff"]["pipeJumpLock"] = true;		
					}else {	//左右碰撞;
						if(pos.left <= detail["position"][0]) {	//如果是左碰撞;
							impactType["moveLockArrOn"]["pipeGoLock"] = false;
						}else {	//如果是右碰撞;
							impactType["moveLockArrOn"]["pipeBackLock"] = false;
						}
						if(detail["person"][0] + pos.width - detail["position"][0] <= 3 || detail["position"][0] + detail["size"][0] - detail["person"][0] <= 3) {		//边侧碰撞;
							impactType["moveLockArrOff"]["isPipeSide"] = true;
						}
					}
				}else {
					impactType["objMoveArr"]["pipe"] = false;
					impactType["moveLockArrOn"]["pipeGoLock"] = true;
					impactType["moveLockArrOn"]["pipeBackLock"] = true;
					impactType["moveLockArrOff"]["pipeJumpLock"] = false;
					impactType["moveLockArrOff"]["isPipeSide"] = false;
				}
				break;
			case 6:
				if(typeof buffCheck(area, buffArr, {canvasWidth, canvasHeight, objName}, pos) == "object") {	//碰到buff的检测;
					detail = buffCheck(area, buffArr, {canvasWidth, canvasHeight, objName}, pos);
					switch(detail["type"]) {
						case "flower": _flower(deleteBuff(detail["type"], detail["position"])); 
							break;
						case "mushroom": _mushroom(deleteBuff(detail["type"], detail["position"]));
							break;
						case "star": _star(deleteBuff(detail["type"], detail["position"])); break;
					}
				};
				break;
			case 7: 
				if(typeof flagCheck(area, object, pos) == "object") {	//碰到旗杆或者旗子的检测;
					impactType["objMoveArr"]["flag"] = true;
					isHug = true;
				}
				break;
			case 8: 
				if(typeof bombCheck(area, bombShooting, pos) == "object") {
					detail = bombCheck(area, bombShooting, pos);
					impactType["objMoveArr"]["bomb"] = true;
				}
				break;
			case 9: 
				_isSide = leftAreaCheck(area, pos);
				break;
			default: throw new Error("please write one argument");
		}
	}
	/*
		清除行动按钮;
	*/
	function clearMove() {
		for(var attr in up) {
			up[attr][0] = false;
		}
	}
	/*
		两个物体的碰撞检测;
		obj1:{
			x: 物体的x坐标;
			y: 物体的y坐标;
			width: 物体的宽度;
			height: 物体的高度;
		}
		obj2:{
			x: 物体的x坐标;
			y: 物体的y坐标;
			width: 物体的宽度;
			height: 物体的高度;
		}
	*/
	function _isImpact(obj1, obj2) {
		return (obj1.x + obj1.width > obj2.x && obj1.x < (obj2.x + obj2.width) && obj1.y + obj1.height >= obj2.y && obj1.y <= (obj2.y + obj2.height));
	}
	/*
		是否在坑内的判断;
		area: 可视区当前的位置信息;
		holeArr: 坑所在位置的坐标信息;
		childPos: 人物当前的所在位置信息;
	*/
	function holeCheck(area, holeArr, childPos) {
		for(var i = 0, len = holeArr.length; i < len; i ++) {
			if(area.left < holeArr[i][0] && (area.left + area.width) > holeArr[i][1]) {	//判断每一个坑是否在可视区范围内;
				if(childPos.left > holeArr[i][0] && childPos.left < holeArr[i][1]) {	//判断人物是否在可视区所在的坑内;
					if(childPos.bottom == _positionBottom) {	//判断是否在平地上;
						return {
							"bol": true,
							"position": [holeArr[i][0], holeArr[i][1]]
						}
					}
				}
			}
		}
		return false;
	}
	/*
		是否碰到砖块的判断;
		area: 可视区当前的位置信息;
		nodeArr: 砖块的位置信息;
		childPos: 人物当前的所在位置信息;
	*/
	function brickCheck(area, nodeArr, childPos) {
		var children,	//砖块堆的子元素;
			nodePosition,
			brick,		
			childPosition = {};
		for(var i = 0, len = nodeArr.length; i < len; i ++) {
			nodePosition = {
				"x": nodeArr[i]["left"],
				"y": nodeArr[i]["top"],
				"width": nodeArr[i]["width"],
				"height": nodeArr[i]["height"]
			}
			childPosition = {
				"x": childPos.left,
				"y": childPos.top,
				"height": childPos.height,
				"width": childPos.width
			}
			if(typeof stone_brick_check(area, nodeArr[i], children, childPosition, nodePosition) == "object") {	//碰撞检测;
				return stone_brick_check(area, nodeArr[i], children, childPosition, nodePosition);
			}	
		}
		return false;
	}
	/*
		是否碰到墙的判断;
		area: 可视区的位置信息;
		nodeArr: 墙的位置信息;
		childPos: 人物的位置信息;
	*/
	function stoneCheck(area, nodeArr, childPos) {
		var stone,
			children,
			childPosition,
			nodePosition;
		for(var attr in nodeArr) {
			stone = nodeArr[attr];
			childPosition = {
				"x": childPos.left,
				"y": childPos.top,
				"width": childPos.width,
				"height": childPos.height
			}
			nodePosition = {
				"x": stone["left"],
				"y": stone["top"],
				"width": stone["width"],
				"height": stone["height"]
			}
			if(typeof stone_brick_check(area, stone, children, childPosition, nodePosition) == "object") {
				return stone_brick_check(area, stone, children, childPosition, nodePosition);
			}
		}
		return false;
	}
	/*
		是否碰到怪物的判断;
		area: 可见区位置的信息;
		monsterArr: 怪物的位置信息;
		childPos: 人物的位置信息;
	*/
	function monsterCheck(area, monsterArr, childPos) {
		var monster,	//怪物集合;
			monsterPosition,
			size,
			correct = [],
			_childPos;
		for(var attr in monsterArr) {	//对每一种怪物逐一判断;
			if(attr == "monsterMush" || attr == "tortoise") {
				monster = monsterArr[attr];
				if(monster.length == 0) {	//判断可视区内怪物数量是否为空;
					continue;
				}else {
					if(attr == "monsterMush") {		//确定检测怪物的大小;
						size = [33, 33];
					}else {
						size = [33, 50];
					}
					if(typeof monster_buff_check(monster, monsterPosition, _childPos, monster, childPos, size, attr) == "object") {
						return monster_buff_check(monster, monsterPosition, _childPos, monster, childPos, size, attr);
					}
				}

			}
		}
		return false;
	}
	/*
		是否碰到水泥管和旗子的判断;
		area: 可见区位置的信息;
		pipeArr: 水泥管和旗子的位置信息;
		childPos: 人物的位置信息;
	*/
	function pipeCheck(area, pipeArr, childPos) {
		var pipe,
			height,
			pipePosition;
		for(var attr in pipeArr) {
			pipe = pipeArr[attr];
			if(attr == "pipe") {
				for(var i = 0, len = pipe["position"].length; i < len; i ++) {
					if(pipe["position"][i][0] > area.left && (area.left + area.width) > pipe["position"][i][0]) {	//判断物体是否在可视区范围内;
						height = pipe["height"][0];
						if(i < 2) {
							height = pipe["height"][1];
						}
						pipePosition = {
							"x": pipe["position"][i][0], 
							"y": pipe["position"][i][1], 
							"width": pipe["width"], 
							"height": height
						}
						if(_isImpact({"x": childPos.left, "y": childPos.top, "width": childPos.width, "height": childPos.height}, pipePosition)) {
							return {
								"bol": true,
								"position": [pipePosition["x"], pipePosition["y"]],
								"size": [pipePosition["width"], pipePosition["height"]],
								"person": [childPos.left, childPos.top]
							}
						}
					}
				}
			}
		}
		return false;
	}
	/*
		是否碰到buff的判断;
		area: 可见区位置的信息;
		buff: buff的位置信息;
		buffSize: buff的大小信息;
		childPos: 人物的位置信息;
	*/
	function buffCheck(area, buff, buffSize, childPos) {
		var _buff,
			index,
			width,
			height,
			position = {},
			size,
			_pos;
		for(var attr in buff) {
			_buff = buff[attr];
			if(_buff.length != 0) {	//判断当前显示buff是否为空;
				index = buffSize["objName"][attr];
				width = buffSize["canvasWidth"][index];
				height = buffSize["canvasHeight"][index];
				size = [width, height];
				if(typeof monster_buff_check(_buff, position, _pos, _buff, childPos, size, attr) == "object") {
					return monster_buff_check(_buff, position, _pos, _buff, childPos, size, attr);
				}
			}
		}
		return false;
	}
	/*
		是否碰到旗子或旗杆的判断;
		area: 可见区的位置信息;
		flagArr: 旗子的位置信息;
		childPos: 人物的位置信息;
	*/
	function flagCheck(area, flagArr, childPos) {
		var flag,
			flagPosition,
			left = 6070,
			top = 119,
			width = 4,
			height = 289;
		for(var attr in flagArr) {
			if(attr == "flag") {	//判断物体是否为旗子;
				flag = flagArr[attr];
				if(flag["position"][0][0] > area.left && (area.left + area.width) > flag["position"][0][0]) {	//判断物体是否在可视区范围内;
					flagPosition = {	//旗子的位置信息;
						"x": left,
						"y": top,
						"width": width,
						"height": height
					}
					if(_isImpact({"x": childPos.left, "y": childPos.top, "width": childPos.width, "height": childPos.height}, flagPosition)) {
						return {
							"bol": true,
							"position": [childPos.left, childPos.top]
						}
					}
					return false;
				}
			}
		}
	}
	/*
		是否碰到子弹的检测;
		area: 可视区位置信息;
		bombArr: 子弹位置集合;
		pos: 检测物体集合;
	*/
	function bombCheck(area, bombArr, pos) {
		var correct = [],	//碰撞集合;
			size = [17, 17],	//子弹大小;
			bomb;	//子弹详细信息;
		if(bombArr.length != 0) {
			for(var i = 0, len = bombArr.length; i < len; i ++) {
				bomb = {
					"x": bombArr[i]["x"],
					"y": bombArr[i]["y"],
					"width": size[0],
					"height": size[1]
				}
				if(_isImpact({"x": pos["left"], "y": pos["top"], "width": pos["width"], "height": pos["height"]}, bomb)) {
					correct.push({
						"bol": true,
						"position": [bomb["x"], bomb["y"]],
						"index": i,
						"size": size
					});
				}
			}
			if(correct.length != 0) {
				return correct;
			}
		}
		return false;
	}
	/*
		左边界碰撞检测;
		area: 可视区位置信息;
		pos: 物体位置信息;
	*/
	function leftAreaCheck(area, pos) {
		if(pos["left"] <= area["left"]) {
			return true;
		}
	}
	/*
		碰撞检测的细节;
		array: 被检测对象的集合;
		_origin: 被检测对象数据;
		_target: 检测对象数据;
		origin: 数据;
		target: 数据;
		size: 大小;
		attr: 类型;
	*/
	function monster_buff_check(array, _origin, _target, origin, target, size, attr) {
		for(var i = 0, len = array.length; i < len; i ++) {
			_origin = {
				"x": origin[i][0],
				"y": origin[i][1],
				"width": size[0],
				"height": size[1]
			}
			_target = {
				"x": target["left"],
				"y": target["top"],
				"width": target["width"],
				"height": target["height"]
			}
			if(_isImpact(_target, _origin)) {
				return {
					"bol": true,
					"position": [_origin["x"], _origin["y"]],
					"size": [size[0], size[1]],
					"type": attr
				}
			}
		}
	}
	/*
		人物是否需要离开碰撞物的判断;
		objMoveArr: 物体具体名称信息;
	*/
	function leaveCheck(objMoveArr) {
		var obj = "";
		for(var attr in objMoveArr) {
			if(objMoveArr[attr] && attr != "bomb") {
				return true;
			}
		}
		return false;
	}
	/*
		物体离开碰撞物的方法;
		direct: 物体运动的方向;
		impactType: 被检测物体类型;
		position: 被检测物体位置信息;
		size: 被检测物体大小信息;
		viewport: 视口位置信息;
	*/
	function leave(direct, impactType, position, size, viewport) {
		var left = position[0],	//物体left;
			top = position[1],	//物体top;
			bottom = oMain.offsetHeight - position[1] - size[1],	//人物的初始位置;
			index = direct,		//方向;
			speed = 4,		//人物垂直掉落速度;
			pos = [],	//物体实时位置信息;
			isLR = true,	//判断是否需要横向运动;
			impactObj = impactType["objMoveArr"],
			impactOff = impactType["moveLockArrOff"],
			impactOn = impactType["moveLockArrOn"];
		var timer = setInterval(function() {
			bottom -= speed;
			if(impactType == child_moveLock) {	//判断检测对象是否为人物;
				if(isLR) {		//如果需要横向移动;
					left += index;
					oChild.style.left = left + "px";
				}
				oChild.style.bottom = bottom + "px";	
			}else {	//判断检测对象是否不是人物;
				top += speed;
			}
			pos = [left, oMain.offsetHeight - bottom - size[1]];
			if(!_isUnbeatable) {
				isImpact(1, impactType, pos, size);
			}
			isImpact(2, impactType, pos, size);
			isImpact(3, impactType, pos, size);
			isImpact(5, impactType, pos, size);
			viewport = - oInterphase.offsetLeft;
			if(leaveCheck(impactType["objMoveArr"]) || (bottom <= _positionBottom)) {	//判断人物是否到达落地点;
				if(impactType == child_moveLock) {
					if(bottom <= _positionBottom) {		//判断人物是否已经到达地面;
						clearInterval(timer);
						oChild.style.bottom = _positionBottom + "px";
						jumpLock = true;
						isRun = false;
					}else if(impactOff["isBrickSide"] || impactOff["isStone"] || impactOff["isPipeSide"]){		//判断人物是否是边侧碰撞;
						isLR = false;
					}else {		//判断人物是否是顶部碰撞;
						clearInterval(timer);
						jumpLock = true;
						isRun = false;
					}
				}
			}
		}, 1000 / 60);	
	}
	/*
		各类物体的碰撞检测的共有方法;
		area: 可视区的位置信息;
		objArr: 判断物体的信息;
		children: 碰撞集合的子元素;
		childPosition: 人物的位置信息;
		nodePosition: 物体的位置信息;
	*/
	function stone_brick_check(area, objArr, children, childPosition, nodePosition) {
		if(area.left < (nodePosition["x"] + nodePosition["width"]) && (area.left + area.width) > nodePosition["x"]) {	//判断物体是否在可视区范围内;
				var elem = [nodePosition["x"], nodePosition["y"]];
				if(_isImpact(childPosition, nodePosition)) {	//判断可视区范围内的物体集合是否与人物有碰撞;
				children = objArr["node"].children;
				for(var j = 0, length = children.length; j < length; j ++) {	
					nodePosition["x"] = objArr["left"] + children[j].offsetLeft;
					nodePosition["y"] = objArr["top"] + children[j].offsetTop;
					nodePosition["width"] = children[j].offsetWidth;
					nodePosition["height"] = children[j].offsetHeight;
					if(_isImpact(childPosition, nodePosition)) {	//判断可视区范围内的物体是否与人物有碰撞;
						return {
							"bol": true,	//是否碰撞的判断值;
							"position": [nodePosition["x"], nodePosition["y"]],	//砖块的位置信息;
							"size": [nodePosition["width"], nodePosition["height"]],	//砖块堆的宽高;
							"person": [childPosition["x"], childPosition["y"]],	//人物当前的left & top 值;
							"element": elem,	//砖块堆元素的位置信息;
							"node": [children[j], objArr["node"]]
						}
					}
				}
			}
		}
	}
	/*
		是否为特殊用处物体;
		elem: 碰撞元素与其父元素集合;
		position: 碰撞元素的位置信息;
	*/
	function _mysteryCheck(elem, position) {
		var	child = elem[0],
			classList = child.classList;
		if(classList.contains("mystery")) {	//判断碰撞砖块是否是神秘砖块;
			child.classList.remove("mystery");
			child.classList.add("nouse");
			for(var i = 0, len = classList.length; i < len; i ++) {		//碰撞砖块类集合遍历;
				switch(classList[i]) {
					case "money":	//金币; 
						if(!isMute) {
							aMusic[1].src = music["coin"];
							aMusic[1].play();
						}
						upMotion("money", countPosition(position, object["money"]["position"]));
						break;	
					case "mushroom":	//蘑菇;
						if(personState["child"]) {
							if(!isMute) {
								aMusic[1].src = music["big"];
								aMusic[1].play();
							}
							upMotion("mushroom", countPosition(position, object["mushroom"]["position"]));
						}else {
							upMotion("flower", countPosition(position, object["flower"]["position"]));
						}
						break; 
					case "flower":	//花; 
						if(personState["adult"] || personState["cook"]) {
							upMotion("flower", countPosition(position, object["flower"]["position"]));
						}else {
							if(!isMute) {
								aMusic[1].src = music["big"];
								aMusic[1].play();
							}
							upMotion("mushroom", countPosition(position, object["mushroom"]["position"]));
						}
						break;	
					case "star":	//星星; 
						upMotion("star", countPosition(position, object["star"]["position"]));
						break;	
				}
			}	
		}else if(classList.contains("special")) {	//特殊砖块;
			if(!isMute) {
				aMusic[1].src = music["coin"];
				aMusic[1].play();
			}
			upMotion("money", countPosition(position, object["money"]["position"]));
			oSpecialCoin.index --;
			if(oSpecialCoin.index == 0) {
				classList.remove("special");
				classList.remove("usual");
				classList.add("nouse");
			}
		}else if(classList.contains("usual")) {
			if(!personState["child"]) {
				if(!isMute) {	//跳跃音乐播放;
					aMusic[1].src = music["brickBreak"];
					aMusic[1].play();
				}
				child.classList.add("hidden");
			}else {
				brickAnimation(elem[0]);
			}
		}
	}
	/*
		砖块运动动画;
		elem: 被碰撞的砖块;
	*/
	function brickAnimation(elem) {
		var top = elem.offsetTop,
			_y = 0,
			init = top;
		var timer = setInterval(function() {
			if(_y <= 10) {	//上升;
				top --;
				elem.style.top = top + "px";
			}else if(_y <= 20) {	//下降;
				top ++;
				elem.style.top = top + "px";
			}else {		//停止;
				clearInterval(timer);
				timer = null;
				elem.style.top = init + "px";
			}
			_y ++;
		}, 1000 / 60);
	}
	/*
		计算物体位置信息方法;
		position: 砖块的位置信息;
		array: 物体的位置信息集合;
	*/
	function countPosition(position, array) {
		for(var i = 0, len = array.length; i < len; i ++) {
			if(array[i][0] - position[0] < 32 && array[i][0] - position[0] >= 0) {	//计算距离砖块最近的位置坐标;
				return array[i];
			}
		}
	}
	/*
		基础的向上运动;
		obj: 运动物体名称;
		callback: 计算物体坐标的回调函数;
	*/
	function upMotion(obj, callback) {	
		var position = callback;
		draw[obj](contextDetail, position[0], position[1]);
		buffArr[obj].push(position);
		buffDirect[obj].push(0);
		if(obj == "money") {
			buffArr[obj][buffArr[obj].length - 1].distance = 40;
		}
	}
	/*
		将碰撞的buff从数组中删除;
		elem: buff类型;
		position: buff位置信息;
	*/
	function deleteBuff(elem, position) {
		for(var attr in buffArr) {	
			if(attr == elem) {
				for(var i = 0, len = buffArr[attr].length; i < len; i ++) {
					if(position[0] == buffArr[attr][i][0]) {
						buffArr[elem].splice(i, 1);
					}
				}
			}
		}
	}
	/*
		吃到钱的情况;
	*/
	function _money() {
		var inner = oScoreDate.innerHTML,
			scoreLength = 5,
			zero = "0";
		inner = (parseInt(inner) + _moneyWorth).toString();
		if(inner.length != 5) {		//判断分数长度是否需要补零;
			for(var i = 0, len = scoreLength - inner.length; i < len; i ++) {
				zero += "0";
			}
			zero += inner;
			oScoreDate.innerHTML = zero;
		}
	}
	/*
		吃到蘑菇的情况;
		callback: 回调函数;
	*/
	function _mushroom(callback) {
		if(personState["child"]) {	//判断人物是否为大人状态;
			_childWidth *= 1.2;
			_childHeight *= 1.2;
			oChild.width = _childWidth;
			oChild.height = _childHeight;
			changeRole("adult");
			_isBomb = false;
		}
		callback;
	}
	/*
		吃到花的情况;
		callback: 回调函数;
	*/
	function _flower(callback) {
		if(personState["adult"]) {	//判断人物是否为大人状态;
			changeRole("cooker");
			_isBomb = true;
		}
		callback;
	}
	/*
		吃到星星的情况;
		callback: 回调函数;
	*/
	function _star(callback) {
		_isUnbeatable = true;
		var timer = setTimeout(function() {
			_isUnbeatable = false;
		}, 10000);
		callback;
	}
	/*
		人物回家过程;
		animation: 人物下降的动画定时器;
		speed: 人物运动的速度点;
		time: 人物回家动画定时器;
		elem: 分数元素;
	*/
	function goHome(animation, speed, time, elem, objTimer) {
		clearInterval(animation);
		animation = null;
		var left = oChild.offsetLeft,	//人物初始位置的left值;
			countLeft = 6335 + 70;	//人物需要运动的距离;
			goHomeTimer = null,		//人物运动的定时器;
			index = 0,
			viewLeft = oInterphase.offsetLeft,
			_viewLeft = 6050;
			person = {
				"jump": false,
				"hug": false,
				"run": true,
				"stand": false
			};
		for(var attr in personState) {
			if(personState[attr]) {
				person["state"] = attr;
			}
		}
		isRun = true;
		goHomeTimer = setInterval(function() {
			if(left <= countLeft) {
				left += speed;
				if(viewLeft <= _viewLeft) {
					viewLeft -= speed;
					oInterphase.style.left = viewLeft + "px";
				}
				oChild.style.left = left + "px";
				contextDetail.clearRect(-oInterphase.offsetLeft, 0, oInterphase.offsetWidth, oInterphase.offsetHeight);
				loadingElement(contextDetail, {"posX": - oInterphase.offsetLeft, "posY": 0}, object, buffArr, monsterArr, bombShooting, index, person, contextChild);
				index ++;
			}else {
				clearInterval(goHomeTimer);
				oChild.style.zIndex = -1;	//将人物的位置向屏幕后方移动;
				clearInterval(objTimer);
				var timer = setTimeout(function() {
					goHomeTimer = null;
					timer = null;
					isWin = true;
					diedDetail(elem);
					timeout = null;
					time = null;
					isRun = false;
				}, 3000);	
			}
		}, 1000 / 60);
	}
	init();
}